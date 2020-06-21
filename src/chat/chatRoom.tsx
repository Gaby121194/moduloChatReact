
import React, { useState, useEffect } from "react";
import { getCurrentChat, newChat } from "./chatService";
import { Message } from "./chatService"
import { useErrorHandler } from "../common/utils/ErrorHandler";
import ChatList from "./chatList";
import { User } from "../user/userService";
import {  useSessionUser } from "../store/userStore";
import { userInfo } from "os";
import { useReceptorUser } from "./chatStore";



export default function ChatRoom() {
    const receptor: User = useReceptorUser()
    const [messages, setMessages] = useState <Message[]>([])
    const [message, setMessage] = useState("")
    
   
   
    const handleSubmit = async (e:any) => {
        e.preventDefault()
        const list = messages
        const newMessage = {
            id: messages.length,
            text: message,
            dateSend: Date.now(),
            receptor: receptor.id
        }
        console.log(receptor.id)
        
        
        list.push(newMessage)
        setMessages(list)
        setMessage("")
        let result = await newChat( newMessage )
        console.log(result)

        
    }

    const handleChange = (e: any) =>{
        const newMessage = e.target.value
        setMessage(newMessage)
        console.log(message)
    }


    const errorHandler = useErrorHandler()
    
    const loadChat = async () => {
        try {
            const result = await getCurrentChat(receptor.id)
            setMessages(result.messages)
            console.log(messages)

        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    
    
    
    useEffect (()=>{
        
        void loadChat()
        
        
    },[])


       return (
           <div>
               <h1>ChatRoom</h1>
               <ul>
                    {messages.map(e=> {
                        return <li key={e.id}>{e.text}</li>
                    }
                        )}
                    
               </ul>
               <form onSubmit={handleSubmit}>
                   <input type="text" onChange={handleChange} value={message}/>
               </form>
           </div>

       ) 
    
}