import { Chat, getUsers } from "./chatService"
import { useState, useEffect } from "react"
import React from "react"
import { User } from "../user/userService"
import { useErrorHandler } from "../common/utils/ErrorHandler";
import { NavLink } from "react-router-dom";
import { updateReceptor } from "./chatStore";


export default function ChatList() {
    const [chatlist, setchatlist] = useState <User[]>([])
    

    const errorHandler = useErrorHandler()
    const loadUsers = async () => {
        try {
            const result = await getUsers()
            setchatlist(result)
            console.log(result)

        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    useEffect (()=>{
        void loadUsers()
    },[])


    const updateUsuario = (user: User) => {
        updateReceptor(user)
    }

    return (
        
            <div className="list-group">
                <h2>ChatRoom</h2>
                {chatlist.map(user=> {
                        return <NavLink to="/chat" className="list-group-item list-group-item-action" key={user.id} onClick={()=>updateUsuario(user)}>{user.name}</NavLink>
                    }
                        )}
                    
            </div>
        
    )
    
}