
import React, { useState, useEffect } from "react";
import { getCurrentChat, newChat, Chat } from "./chatService";
import { Message } from "./chatService"
import { useErrorHandler } from "../common/utils/ErrorHandler";

import { User } from "../user/userService";
import {  useSessionUser } from "../store/userStore";

import { useReceptorUser } from "./chatStore";
import "./chat.css"
import { getUserProfile, Profile, getPictureUrl } from "../profile/profileService";



export default function ChatRoom() {
    const receptor: User = useReceptorUser()
    const sender: User = useSessionUser() as User
    const [messages, setMessages] = useState <Message[]>([])
    const [message, setMessage] = useState("")
    const [chat, setChat] = useState<Chat>()
    const [profile, setProfile] = useState<Profile>()
    
   
   
    const handleSubmit = async (e:any) => {
        e.preventDefault()
        const list = messages
        const newMessage = {
            id: messages.length,
            text: message,
            dateSend: Date.now(),
            receptor: receptor.id,
            sender: sender.id,
            nameSender: sender.name,

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
        
    }


    const errorHandler = useErrorHandler()
    
    const loadChat = async () => {
        try {
            const result = await getCurrentChat(receptor.id)
            setChat(result)
            setMessages(result.messages)
            

        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    const loadProfile = async() => {
        try {
            const result = await getUserProfile(receptor.id)
            setProfile(result)
        } catch(error){
            errorHandler.processRestValidations(error)
        }
    }

    
    
    
    useEffect (()=>{
        
        void loadChat()
        void loadProfile()
        
    },[])

    

       return (
           <div>
               
               
               <img src={getPictureUrl(profile?.picture as string)} className="profilePhoto" alt=""/>
                <h2 className="profileName"> {profile?.name}</h2> <br></br>
               <div className="card" >
               <ul className="list-group list-group-flush">
                    {messages.map(e=> {
                    if (sender.name == e.nameSender) {
                        return <li className="alert alert-primary textSender" role="alert" key={e.id}>{e.nameSender} : {e.text} </li>
                    }
                    else {
                        return <li className="list-group-item" key={e.id}> {e.nameSender}: {e.text} </li>
                    }
                    
                    }
                        )}
                    
               </ul>
               </div>
               <form onSubmit={handleSubmit}>
                   <input type="text" onChange={handleChange} value={message} placeholder="Di hola ! ..."/>
                   <button type="button" className="btn btn-primary" onSubmit={handleSubmit}>Send</button>
               </form>
           </div>

       ) 

    
}