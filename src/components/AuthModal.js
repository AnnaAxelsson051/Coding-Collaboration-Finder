/*To make modal show up button in navbar and
button on hompage will decide if we show authmodal*/

const AuthModal = ({setShowModal}) =>{
    const handleClick = () =>{
        setShowModal(false)
        /*when x is clicked modal disappears*/
    }
    return (
        <div className="auth-modal">
            <div onClick={handleClick}>x</div>
            AUTH MODAL
        </div>
    )
}
export default AuthModal