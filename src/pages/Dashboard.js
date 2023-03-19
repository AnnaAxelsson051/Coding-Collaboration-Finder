/*What only logged in users see*/
import TinderCard from 'react-tinder-card'
import {useEffect, useState} from 'react'
import ChatContainer from '../components/ChatContainer'
import axios from 'axios'
import {useCookies} from 'react-cookie'

const Dashboard = () => {
    const[user, setUser] = useState(null)
    /*const characters = db*/
    const [lastDirection, setLastDirection] = useState()
    const [genderedUsers, setGenderedUsers] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    /*userId goes into cookies and gets userr id*/
    const userId = cookies.UserId
    const getUser = async () => {
        try {
            const response = await axios.get('http://localhost:8000/user',{
                params: {userId}
})
    setUser(response.data)
        }catch (error){
            console.log(error)
        }
    }

    const getGenderedUsers = async () => {
        try{
            const response = await axios.get('http://localhost:8000/gendered-users',{
            params: { gender: user?.gender_interest}
        })
            setGenderedUsers(response.data)
    }catch (error){
            console.log(error)
        }
}

                            /*is called each time user changes*/
    useEffect(() => {
        getUser()
        getGenderedUsers()
    },[])


    const updateMatches = async (matchedUserId) => {
        try {
            await axios.put('http://localhost:8000/addmatch', {
                userId,
                matchedUserId
            })
            getUser()  /*het user data again*/
        } catch (error) {
            console.log(error)
        }
    }



/*show only right-swiped users*/
    const swiped = (direction, swipedUserId) =>{
        if (direction ==='right'){
            updateMatches(swipedUserId)
        }
        setLastDirection(direction)
    }

    const outOfFrame = (name) =>{
         console.log(name + ' left the screen')
    }

    /*add users own user id to matches bc dont want it to show up*/
    const matchedUserIds = user?.matches.map(({user_id}) => user_id).concat(userId)

    /*if id is not included in matches we return it */
    const filteredGenderedUsers = genderedUsers?.filter(
        genderedUser => !matchedUserIds.includes(genderedUser.user_id)
    )


    return (<>
{ user &&
        <div className="dashboard">
            <ChatContainer user={user}/>
            <div className="swipe-container">
                <div className="card-container">
                    {filteredGenderedUsers?.map((genderedUser) =>
                        <TinderCard
                            className='swipe'
                            key={genderedUser.user_id}
                            onSwipe={(dir) => swiped(dir, genderedUser.user_id)}
                            onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}>
                            <div
                                style={{ backgroundImage: 'url(' + genderedUser.url + ')' }}
                                 className='card'>
                                <h3>{genderedUser.first_name}</h3>
                                <h3>Project name</h3>
                            </div>
                        </TinderCard>
                    )}
                    <div className="swipe-info">
                        {lastDirection ? <p>You swiped {lastDirection}</p> : <p/>}
                    </div>

                </div>
            </div>
        </div>}
        </>
    )
}
export default Dashboard