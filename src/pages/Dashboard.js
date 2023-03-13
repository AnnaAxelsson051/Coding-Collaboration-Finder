/*What only logged in users see*/
import TinderCard from 'react-tinder-card'
import {useState} from 'react'
const Dashboard = () => {
    const characters =[
        {
            name: 'Elrich',
            url: ''
        },
        {
            name: 'hej',
            url:''
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
                            className='swipe' key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
                            <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
                                <h3>{character.name}</h3>
                            </div>
                        </TinderCard>)}
                </div>
            </div>
        </div>
    )
}
export default Dashboard