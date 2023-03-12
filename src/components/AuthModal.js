/*To make modal show up button in navbar and
button on hompage will decide if we show authmodal*/
import { useState } from 'react'

const AuthModal = ({setShowModal}) =>{
    const[email, setEmail] = useState(null)
    const[password, setPassword] = useState(null)
    const[confirmPassword, setConfirmPassword] = useState(null)
    const[error, setError] = useState(null)

    console.log(email, password, confirmPassword)

    const isSignUp = true
    const handleClick = () =>{
        setShowModal(false)
        /*when x is clicked modal disappears*/
    }

    /*prevenst page from refreshing*/
    const handleSubmit = (e) =>{
        e.preventDefault()
        try {
            if(isSignUp && (password !== confirmPassword)){
                setError('The passwords that you have entered does not match')
            }
            console.log('make a postrequest to db')
        }catch(error){
            console.log(error)
        }
    }

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
                    type="password"
                    id="password-check"
                    name="password-check"
                    placeholder="confirm password"
                    required={true}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <input
                 className="secondary-button" type="submit"/>
                <p>{error}</p>
            </form>
            <hr/>
            <h2>Get the app</h2>
        </div>
    )
}
export default AuthModal