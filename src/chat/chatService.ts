import { environment } from "../app/environment/environment"
import axios, { AxiosError } from "axios"
import { User } from "../user/userService"

export interface Chat {
    id: number;
    user: string;
    messages: Array<Message>;
    
}

export interface Message {
    id: number;
    text: string;
    dateSend: Number;
    receptor: string;

}



export async function getCurrentChat(receptorId: string): Promise<Chat> {
    try {
        const res = (await axios.get(environment.backendUrl + "/v1/chat/" + receptorId)).data as Chat
        return Promise.resolve(res)
    } catch (err) {
        const axiosError = err as AxiosError
        if (axiosError.response && axiosError.response.status === 401) {
            console.log("error de axios")
        }
        return Promise.reject(err)
    }
}

export async function newChat (payload: Message): Promise<Chat> {
    try {
        
        const res = (await axios.post(environment.backendUrl + "/v1/chat", payload)).data as Chat
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}



export async function getUsers(): Promise<User[]> {
    try {
        const res = (await axios.get(environment.backendUrl + "/v1/users")).data as User[]
        return Promise.resolve(res)
    } catch (err) {
        const axiosError = err as AxiosError
        if (axiosError.response && axiosError.response.status === 401) {
            console.log("error de axios")
        }
        return Promise.reject(err)
    }
}
