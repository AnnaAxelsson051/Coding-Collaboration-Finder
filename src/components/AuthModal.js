/*To make modal show up button in navbar and
button on hompage will decide if we show authmodal*/
import { useState } from 'react'

const AuthModal = ({setShowModal}) =>{
    const[email, setEmail] = useState(null)
    const[password, setPassword] = useState(null)
    const[confirmPassword, setConfirmPassword] = useState(null)
    const[error, setError] = useState(null)

    console.log(email, password, confirmPassword)
    const handleClick = () =>{
        setShowModal(false)
        /*when x is clicked modal disappears*/
    }

    /*prevenst page from refreshing*/
    const handleSubmit = (e) =>{
        e.preventDefault()
    }
    const isSignUp= true

    return (
        <div className="auth-modal">
            <div className="close-icon" onClick={handleClick}>x</div>
            <h2>{isSignUp ? 'CREATE ACCOUNT' : 'LOG IN'}</h2>
            <p>When choosing the Log In option you are agreeing to our conditions.
                Read more about how we handle personal data in our Privacy and
                Cookie policy section</p>
            <form onSubmit={handleSubmit}>
               <input
               type="email"
               id="email"
               name="email"
               placeholder="email"
               required={true}
               onChange={(e) => setEmail(e.target.value)}
               />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password-check"
                    id="password-check"
                    name="password-check"
                    placeholder="confirm password"
                    required={true}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </form>
        </div>
    )
}
export default AuthModal