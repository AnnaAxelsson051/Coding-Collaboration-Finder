/*What only logged in users see*/
import TinderCard from 'react-tinder-card'
import {useState} from 'react'
import ChatContainer from '../components/ChatContainer'
const Dashboard = () => {
    const characters =[
        {
            name: 'Person1',
            url: 'https://i.pinimg.com/564x/2c/15/22/2c15222f332f689b4cf89dd886af7d1d.jpg'
        },
        {
            name: 'Person2',
            url:'https://i.pinimg.com/564x/36/04/36/3604360f00ce6e414251c37244823aa9.jpg'
        }
    ]
     /*const characters = db*/
     const[lastDirection, setLastDirection] = useState()

    const swiped = (direction, nameToDelete) =>{
         console.log('removing: ' + nameToDelete)
        setLastDirection(direction)
    }

    const outOfFrame = (name) =>{
         console.log(name + ' left the screen')
    }

    return (
        <div className="dashboard">

            <div className="swiper-container">
                <div className="card-container">
                    {characters.map((character) =>
                        <TinderCard
                            className='swipe'
                            key={character.name}
                            onSwipe={(dir) => swiped(dir, character.name)}
                            onCardLeftScreen={() => outOfFrame(character.name)}>
                            <div style={{ backgroundImage: 'url(' + character.url + ')' }}
                                 className='card'>
                                <h3>{character.name}</h3>
                            </div>
                        </TinderCard>
                    )}
                    <div className="swipe-info">
                        {lastDirection ? <p>You swiped {lastDirection}</p> : <p/>}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dashboard