import Chat from './Chat'
import ChatInput from "./ChatInput"
import axios from 'axios'
import { useEffect, useState } from 'react'

const ChatDisplay = ({user, clickedUser}) => {
    const userId = user?.user_id
    const clickedUserId = clickedUser?.user_id
    const [usersMessages, setUsersMessages] = useState(null)

    const getUsersMessages = async () => {
        try{
        const response = await axios.get('http://localhost:8000/messages',{
            params: {userId: userId, correspondingUserId: clickedUserId }
        })
    /*look for anything to and from the one clicked on*/
    setUsersMessages(response.data)
    } catch(error) {
    console.log(error)
}
}

useEffect(() => {
    getUsersMessages()
},[usersMessages])

console.log(usersMessages)

    return (
        <>
            <Chat/>
            <ChatInput/>
        </>

    )
}

export default ChatDisplay