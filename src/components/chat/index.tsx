"use client";
import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { db } from "@/lib/firebase";
import { useFormik } from 'formik';
import { collection,  onSnapshot } from "firebase/firestore";
import { currentUserState } from '@/lib/hooks';
import { useRecoilValue } from 'recoil';
import { LogOut, createNewMessage } from '@/lib/api';
import { useRouter } from "next/navigation";



const Chat = () => {
const router = useRouter();
const user = useRecoilValue(currentUserState)
const scrollContainerRef = useRef<HTMLDivElement>(null);

let chat: any = []
const [chatData, setChatData] =useState([])

useEffect(() => {
  // @ts-ignore
  const unsubscribe = onSnapshot(collection(db, "messages"), (snapshot) => setChatData(snapshot.docs.map((doc) => ({ ...doc.data(), doc: doc.metadata, key: doc.id }))))
  return () => unsubscribe()
}, [])
  
 useEffect(() => {
  if(chatData){
    const scrollContainer = scrollContainerRef.current;
  
  if (scrollContainer) {
    const lastChild = scrollContainer.lastElementChild as HTMLElement | null;
    
    
    if (lastChild) {
      lastChild.scrollIntoView({ behavior: 'smooth' });
    }
  }
  }
  
}, [chatData[0]]); 
const sortedMessages = chatData.slice().sort((a: any, b: any) => {
  return a.createdAt.seconds - b.createdAt.seconds;
});

const formik = useFormik({
  initialValues: {
    text: '',
  },
  onSubmit:async values => {
    try {
      await createNewMessage(values.text);
      values.text = '';
      } catch (error) {
        console.log(error);
      }
      
      }
});

const handleLogOut = () => {
  LogOut();
  router.push('/');
  
}

const handleKeyDown = (event: React.KeyboardEvent, formik: any) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    formik.handleSubmit();
  }
};

return (
  <>
    <div className="flex items-center gap-x-6 flex-col mb-6">
      <h1 className="text-3xl font-semibold leading-7 text-gray-900 mb-4">Fidoo chat</h1>
    </div>
    <div className='flex flex-col border-2 border-gray-300 w-full rounded-md p-4 max-w-md max-h-screen scrollbar scrollbar-thumb-gray-300'>
      <div>
        <div 
          className='flex flex-col gap-1 h-96 scrollbar scrollbar-thumb-gray-100 overflow-y-auto' 
          ref={scrollContainerRef} 
        >
          {sortedMessages.map((message: any) => (
            <div 
              key={message.createdAt}
              className={`border-2 border-gray-300 p-2 rounded-md max-w-[70%] ${message.author === user?.name ? 'self-end border-indigo-300' : 'self-start'}`}
            >
              <label className='text-gray-500 text-xs'>{message.author} {message.createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</label>
              <p>{message.text}</p>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={formik.handleSubmit} onKeyDown={(event) => handleKeyDown(event, formik)} className="space-y-6 w-full max-w-md">
        <div className="mb-3">
          <div className="mt-2">
            <textarea
              placeholder="Message"
              name="text"
              id="text"
              maxLength={300}
              onChange={formik.handleChange}
              value={formik.values.text}
              autoComplete='off'
              className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button 
            disabled={formik.isSubmitting} 
            onClick={handleLogOut}
            type="button" 
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Log out
          </button>
          <button
            className="boton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={formik.isSubmitting}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  </>
);
};

export default Chat;
