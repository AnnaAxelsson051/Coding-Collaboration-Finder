/*What only logged in users see*/
import whiteLogo from '../images/tinder-logo-white.png'
import colorLogo from '../images/tinder-logo-color.png'
const Nav = ({minimal, authToken}) => {
    /* pass in minimal and if minimal is false ge get the standard logo (red)
    * otherwise if its not minimal we return the white logo
    * we also want a second button to sign up, that only shows up if we are not logged in*/
    return (
        <nav>
            <div className='logo-container'>
            <img className="logo" src={minimal ? colorLogo : whiteLogo}/>Test
        </div>

            {!authToken && <button className="nav-button">Log in</button>}
        </nav>
    )
}
export default Nav