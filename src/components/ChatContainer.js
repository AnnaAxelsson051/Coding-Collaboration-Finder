import ChatHeader from './ChatHeader'
import MatchesDisplay from './MatchesDisplay'
import ChatDisplay from './ChatDisplay'
import {useState} from 'react'

/*to make user name appear*/
/*save clicked user to here*/

const ChatContainer = ({user}) =>{
    const [clickedUser, setClickedUser] = useState(null)
    /*to regulate what buttons to appear*/
    return (
        <div className="chat-container">
            <ChatHeader user={user}/>
        <div>
            <button className="option" onClick={() => setClickedUser(null)}>Matches</button>
            <button className="option" disabled={!clickedUser}>Chat</button>
        </div>

            {!clickedUser && <MatchesDisplay matches={user.matches} setClickedUser={setClickedUser}/>}

            {clickedUser &&<ChatDisplay user={user} clickedUser={clickedUser}/>}
        </div>
    )
}
/*if there is a clicked user - show the chatdisplay*/

export default ChatContainer