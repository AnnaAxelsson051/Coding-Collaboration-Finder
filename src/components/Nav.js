/*What only logged in users see*/
/*import whiteLogo from '../images/tinder-logo-white.png'*/
/*import whiteLogo from '../images/collab.png'*/
import whiteLogo from '../images/collab-white.png'
import colorLogo from '../images/collab-black2.png'
const Nav = ({authToken, minimal, setShowModal, showModal, setIsSignUp}) => {
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
            <img className="logo" src={minimal ? colorLogo : whiteLogo}/>
               <b>COLLAB'</b>
        </div>

            {!authToken && !minimal && <button
                className="nav-button"
                onClick={handleClick}
                disabled={showModal}
            >Sign In</button>}
        </nav>

    )
}
export default Nav