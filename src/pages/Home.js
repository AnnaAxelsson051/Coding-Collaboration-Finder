/*Page that both logged in and not logged in users see*/

import Nav from '../components/Nav'

const Home = () => {

    const authToken = false;
    /*we are logged in*/
    const handleClick = () =>{
        console.log('clicked');
    }
    return (
        /*passing authToken into the navbar*/
        <div className="overlay">
            <Nav minimal={false} authToken={authToken}/>
        <div className="home">
            <h1>Swipe Right</h1>
            <button className="primary-button" onClick={handleClick}>
                {authToken ? 'Sign Out' : 'Create Account'}
            </button>
        </div>
</div>
        /*button that says sign out or in depending on if we are logged in or not
           if authtoken exists we say sign out annars create
           if we click button we want authmodal to show up so we use on click*/
    )
}
export default Home