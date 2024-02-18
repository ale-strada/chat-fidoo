"use client";
import React, { useEffect, useState } from 'react';
import { db } from "@/lib/firebase";
import { collection,  onSnapshot } from "firebase/firestore";



const Chat = () => {

let chat: any = []
const [chatData, setChatData] =useState([])

useEffect(() => {
  // @ts-ignore
  const unsubscribe = onSnapshot(collection(db, "messages"), (snapshot) => setChatData(snapshot.docs.map((doc) => ({ ...doc.data(), doc: doc.metadata, key: doc.id }))))
  return () => unsubscribe()
}, [])

console.log(chatData, "CHATDATA");
const mensajesOrdenados = chatData.slice().sort((a: any, b: any) => {
  // Comparar las fechas de creación (createdAt) para ordenar de más viejo a más nuevo
  return a.createdAt.seconds - b.createdAt.seconds;
});



  return (
    <div >
      <div>
        <p>mensajes</p> 
        <div>
          {mensajesOrdenados.map((message: any) => (
            <div>
              <p>{message.author}, {message.createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
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

export default Chat;
