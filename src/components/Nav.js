/*What only logged in users see*/
import whiteLogo from '../images/tinder-logo-white.png'
import colorLogo from '../images/tinder-logo-color.png'
const Nav = ({minimal, authToken, setShowModal, showModal, setIsSignUp}) => {
    /* pass in minimal and if minimal is false ge get the standard logo (red)
    * otherwise if its not minimal we return the white logo
    * we also want a second button to sign up, that only shows up if we are not logged in*/
    const handleClick = () =>{
        setShowModal(true)
        setIsSignUp(false) /*if we are logging in*/
    }

    return (
        <nav>
            <div className='logo-container'>
            <img className="logo" src={minimal ? colorLogo : whiteLogo}/>Test
        </div>

            {!authToken && !minimal && <button
                className="nav-button"
                onClick={handleClick}
                disabled={showModal}
            >Log In</button>}
        </nav>
    )
}
export default Nav