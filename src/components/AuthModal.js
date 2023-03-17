/*To make modal show up button in navbar and
button on hompage will decide if we show authmodal*/
import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { useCookies } from 'react-cookie'

const AuthModal = ({setShowModal, isSignUp}) =>{
    const[email, setEmail] = useState(null)
    const[password, setPassword] = useState(null)
    const[confirmPassword, setConfirmPassword] = useState(null)
    const[error, setError] = useState(null)
    const[cookies, setCookie, removeCookie] = useCookies(['user'])

    let navigate = useNavigate()

    console.log(email, password, confirmPassword)


    const handleClick = () =>{
        setShowModal(false)
        /*when x is clicked modal disappears*/
    }

    /*prevenst page from refreshing*/
    const handleSubmit = async (e) =>{
        e.preventDefault()
        try {
            if(isSignUp && (password !== confirmPassword)){
                setError('The passwords that you have entered does not match')
           return
            }

            const response = await axios.post('http://localhost:8000/signup', {email, password})

            setCookie('Email', response.data.email)
            setCookie('UserId', response.data.userId)
            setCookie('AuthToken', response.data.token)

            const success = response.status === 201

            if (success) navigate('/onboarding')

        }catch(error){
            console.log(error)
        }
    }

    return (
        <div className="auth-modal">
            <div className="close-icon" onClick={handleClick}>x</div>
            <h2>{isSignUp ? 'Create Account' : 'Log In'}</h2>
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
                {isSignUp && <input
                    type="password"
                    id="password-check"
                    name="password-check"
                    placeholder="confirm password"
                    required={true}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />}
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