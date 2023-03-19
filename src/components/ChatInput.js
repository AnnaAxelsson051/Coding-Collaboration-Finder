import {useState} from 'react'

const ChatInput = ({user, clickedUser, getUsersMessages, getClickedUsersMessages}) =>{
    const[textArea, setTextArea] = useState(null)
    const userId = user?.user_id
    const clickedUserId = clickedUser?.user_id

    //creating timestamp
    const addMessage = async () => {
        const message = {
            timestamp: new Date().toISOString(),
            from_userId: userId,
            to_userId: clickedUserId,
            message: textArea

        }
    }

    return (
        <div className="chat-input">
            <textarea value={textArea} onChange={(e) => setTextArea(e.target.value)}/>
            <button className="secondary-button">Submit</button>

        </div>

    )
}

export default ChatInput