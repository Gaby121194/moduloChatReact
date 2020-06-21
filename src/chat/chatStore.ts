import { User } from "../user/userService"
import { Subject } from "rxjs"
import { useState, useLayoutEffect } from "react"


let receptorUser: User 

const userSubject = new Subject<User>()

export function useReceptorUser() {
  const [user, setUser] = useState(receptorUser)

  useLayoutEffect(() => {
    userSubject.subscribe((newState) => {
      setUser(newState)
    })
  }, [])

  return user
}

export function updateReceptor(user: User) {
  receptorUser =  user
  userSubject.next(receptorUser)
  console.log(user)
}


