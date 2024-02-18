"use client";
import React, { useEffect, useState } from 'react';
import { db } from "@/lib/firebase";
import { collection,  onSnapshot } from "firebase/firestore";



const SignInForm = () => {
console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY, "NEXT_PUBLIC_FIREBASE_API_KEY");

let chat: any = []
const [chatData, setChatData] =useState([])

useEffect(() => {
  // @ts-ignore
  const unsubscribe = onSnapshot(collection(db, "messages"), (snapshot) => setChatData(snapshot.docs.map((doc) => ({ ...doc.data(), doc: doc.metadata, key: doc.id }))))
  return () => unsubscribe()
}, [])

console.log(chatData, "CHATDATA");



  return (
    <div >
      <div>
        <p>mensajes</p> 
        <div>
          {chatData.map((message: any) => (
            <div>
              <p>{message.username}</p>
              <p>{message.text}</p>
            </div>
          ))}
        </div>
        
      </div>
      <button
        
        className="boton bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
       
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default SignInForm;
