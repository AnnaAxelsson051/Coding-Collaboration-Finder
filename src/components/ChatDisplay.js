import Chat from './Chat'
import ChatInput from "./ChatInput"
import axios from 'axios'
import { useEffect, useState } from 'react'

const ChatDisplay = ({user, clickedUser}) => {
    const userId = user?.user_id
    const clickedUserId = clickedUser?.user_id
    const [usersMessages, setUsersMessages] = useState(null)
    const [clickedUsersMessages, setClickedUsersMessages] = useState(null)

    const getUsersMessages = async (senderId, recipientId) => {
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

    const getClickedUsersMessages = async (senderId, recipientId) => {
        try{
            const response = await axios.get('http://localhost:8000/messages',{
                params: {userId: clickedUserId, correspondingUserId: userId }
            })

            /*look for anything to and from the one clicked on*/
            setClickedUsersMessages(response.data)
        } catch(error) {
            console.log(error)
        }
    }

useEffect(() => {
getUsersMessages()
getClickedUsersMessages()
},[])

    const messages = []

    //Messages with pic and timestamp
    usersMessages?.forEach(message => {
        const formattedMessage = {}
        formattedMessage['name'] = user?.first_name
        formattedMessage['img'] = user?.url
        formattedMessage['message'] = message.message
        formattedMessage['timestamp'] = message.timestamp
        messages.push(formattedMessage)
    })

    //Messages with pic and timestamp
    clickedUsersMessages?.forEach(message => {
        const formattedMessage = {}
        formattedMessage['name'] = clickedUser?.first_name
        formattedMessage['img'] = clickedUser?.url
        formattedMessage['message'] = message.message
        formattedMessage['timestamp'] = message.timestamp
        messages.push(formattedMessage)
    })

    //sorting messages
const decendingOrderMessages = messages?.sort((a,b) => a.timestamp.localeCompare(b.timestamp))

    return (
        <>
            <Chat decendingOrderMessages={decendingOrderMessages}/>
            <ChatInput/>
        </>

    )
}

export default ChatDisplay