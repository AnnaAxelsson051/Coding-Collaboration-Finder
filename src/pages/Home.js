/*Page that both logged in and not logged in users see*/
import Nav from '../components/Nav'
import AuthModal from "../components/AuthModal"
import {useState} from 'react'
/*save the state on if modal is showing or not*/
/*button in navbar and on homepage will decide
* if auth modal is shown or not*/

const Home = () => {
const[showModal,setShowModal] = useState(false)
    /*use usestate to show modal, start with show modal = false
    * iw button is clicked state is changed with setShow*/

    const authToken = false;
    /*we are logged in*/
    const handleClick = () =>{
        console.log('clicked');
        setShowModal(true)
        /*when button is clicked modal is shown*/
    }
    return (
        /*passing authToken into the navbar*/
        <div className="overlay">
            <Nav minimal={false} authToken={authToken} setShowModal={setShowModal} showModal={showModal}/>
        <div className="home">
            <h1>Find your match</h1>
            <button className="primary-button" onClick={handleClick}>
                {authToken ? 'Sign Out' : 'Create Account'}
            </button>

            {showModal && (
            <AuthModal setShowModal={setShowModal}/>
            )}

        </div>
</div>
        /*if show modal is true we show the modal*/

        /*button that says sign out or in depending on if we are logged in or not
           if authtoken exists we say sign out annars create
           if we click button we want authmodal to show up so we use on click*/

    )
}
export default Home