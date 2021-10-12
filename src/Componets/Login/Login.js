

import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config'
import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";


firebase.initializeApp(firebaseConfig)

function Login() {
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({

        isLogIn: false,
        name: '',
        email: '',
        password: '',
        photoURL: '',
        error: '',
        success: false
    });

    const [loggedInUser , setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };


    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const fbProvider = new firebase.auth.FacebookAuthProvider();

    // sign in button click handler
    const handleSignIn = () => {
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                const { displayName, email, photoURL } = result.user;
                const LogInUser = {
                    isLogIn: true,
                    name: displayName,
                    email: email,
                    photoURL: photoURL
                }
                setUser(LogInUser);
            })
            .catch((error) => {
                console.error(error)
            })
    }

    // fb sing in handle click event
    const handleFbSignIn = () => {
        firebase
            .auth()
            .signInWithPopup(fbProvider)
            .then((result) => {
                var user = result.user;
                console.log(`facebook user after sign in`, user)
            })
            .catch((error) => {
                console.log(error)
            });
    }

    // sign out button click handler
    const handleSignOut = () => {
        firebase.auth()
            .signOut()
            .then((result) => {
                const LogOutUser = {
                    isLogIn: false,
                    name: '',
                    email: '',
                    photoURL: ''
                }
                setUser(LogOutUser)
            })
            .catch((error) => {
                console.error(error)
            })
    }


    // input field 
    const handleSubmit = (event) => {
        // console.log(user.name,user.email,user.password)
        if (newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(response => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo)
                    console.log(response)
                    updateUserName(user.name)
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo)
                    // console.error(error)
                });
        }
        event.preventDefault();
    }

    const updateUserName = name => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: name,

        }).then(function () {
            console.log(`User name update successfully`)
        }).catch(function (error) {
            console.log(error)
        });
    }

    if (!newUser && user.email && user.password) {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((response) => {
                const newUserInfo = { ...user }
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo);
                setLoggedInUser(newUserInfo);
                history.replace(from);
                console.log(`Sign in user info `, response.user);
            })
            .catch((error) => {
                const newUserInfo = { ...user };
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo)

            });
    }
    // change event
    const handleChange = (event) => {

        let isFormValid = true;
        // email validation
        if (event.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(event.target.value);

        }
        // password validation
        if (event.target.name === 'password') {
            const isPasswordValid = event.target.value.length > 5
            const passwordHasNumber = /\d{1}/.test(event.target.value);
            isFormValid = isPasswordValid && passwordHasNumber;

        }
        if (isFormValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo)
        }
    }

    return (
        <div style={{textAlign: 'center'}}>
            {
                user.isLogIn ? <button onClick={handleSignOut} type="button" >Sign Out Google</button> : <button onClick={handleSignIn} type="button" >Sign In Google</button>
            }
            <br />
            <button onClick={handleFbSignIn}>Sign in using Facebook</button>
            {
                user.isLogIn && <div>

                    <p>Welcome, {user.name}</p>
                    <p>{user.email}</p>
                    <img src={user.photoURL} alt="photos" />
                </div>
            }
            {/* input field */}
            <h1>Our own Authentication</h1>
            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
            <label for="newUser">New Sign up</label>
            <form onSubmit={handleSubmit}>
                {
                    newUser && <input type="text" onBlur={handleChange} name="name" placeholder="Your name" required />
                }
                <br />
                <input type="text" onBlur={handleChange} name="email" placeholder="your email address" required />
                <br />
                <input type="password" onBlur={handleChange} name="password" placeholder="your password" required />
                <br />
                <input type="submit" value={newUser ? 'Sign up' : 'Sign In'} />
            </form>
            <p style={{ color: 'red' }}>{user.error}</p>
            {
                user.success && <p style={{ color: 'green' }}>User {newUser ? 'create' : 'Logged In'} successfully</p>
            }


        </div>
    );
}

export default Login;
