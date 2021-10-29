import React, { useContext, useState } from 'react';
import { Button, Container, Form, Row } from 'react-bootstrap';
import googleIcon from '../../logos/google.png';
// import facebookIcon from '../../logos/facebook.png';
import './Login.css';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext, UserData } from '../../App';
import NavigationBar from '../HomePage/NavigationBar/NavigationBar';
// import { handleGoogleSignIn, initializeLoginFramework } from './AuthManager';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    // const [user, setUser] = useContext(UserData);
    // const [newUser, setNewUser] = useState(true);

    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    };
    const handleGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
            .then(result => {
                const { displayName, email, photoURL } = result.user;
                const signedInUser = { name: displayName, email, img: photoURL };
                setLoggedInUser(signedInUser);
                history.replace(from);
            })
            .catch(error => {
                const errorMessage = error.message;
                console.log(errorMessage);
            });
    };

    // initializeLoginFramework();

    // const handleGoogle = () => {
    //     handleGoogleSignIn()
    //         .then(res => {
    //             setUser(res);
    //             setLoggedInUser(res);
    //             history.replace(from);
    //         })
    //         .catch(error => {
    //             setUser(error);
    //         });
    // };

    // const handleBlur = e => {
    //     const newUserInfo = { ...user };
    //     newUserInfo[e.target.name] = e.target.value;
    //     setUser(newUserInfo);
    // };
    // const handleSubmit = e => {
    //     const { name, email, password, confirmPassword } = user;
    //     if (newUser && name && email && password && confirmPassword && password === confirmPassword) {

    //     }
    //     if (!newUser && email && password) {

    //     };
    //     e.preventDefault();
    // };

    return (
        <div>
            <NavigationBar></NavigationBar>
            {/* <Container>
                <Row className="justify-content-center mt-3" >
                    <Form onSubmit={handleSubmit} className='authCard'>
                        {
                            newUser ? <h5>Create an acount</h5>
                                : <h5>Login</h5>
                        }
                        {
                            newUser && <Form.Group onBlur={handleBlur}>
                                <Form.Control required name="name" type="text" placeholder="Your Name" />
                            </Form.Group>
                        }
                        <Form.Group onBlur={handleBlur}>
                            <Form.Control required name="email" type="email" placeholder="User Name or Email" />
                        </Form.Group>
                        <Form.Group onBlur={handleBlur}>
                            <Form.Control required name="password" type="password" placeholder="Password" />
                        </Form.Group>
                        {
                            newUser && <Form.Group onBlur={handleBlur}>
                                <Form.Control required name="confirmPassword" type="password" placeholder="Confirm Password" />
                            </Form.Group>
                        }
                        <button type="submit" className="btn greenBtn form-control">
                            {
                                newUser ? <span>Create an acount</span>
                                    : <span>Login</span>
                            }
                        </button>
                        <br />
                        <p className="text-center mt-1">
                            {
                                newUser ? <small>Already have an acount? </small>
                                    : <small>Don't have an acount? </small>
                            }
                            <Link onClick={() => { setNewUser(!newUser); setUser({ error: '' }) }} className="greenText">
                                {
                                    !newUser ? <span>Create an acount</span>
                                        : <span>Login</span>
                                }
                            </Link>
                        </p>
                        <p className="text-center text-danger">{user.error}</p>
                        {
                            user.success && <p className="text-center text-success font-weight-bold">User Created Successfully</p>
                        }
                    </Form>
                </Row>
                <div className="text-center mt-2"><p>or</p></div>
                <Row className="justify-content-center mt-1">
                    <Button className="authBtn pl-1 pr-5" variant="light"  ><img src={facebookIcon} alt="" /> Continue with Facebook</Button>

                </Row>
                <Row className="justify-content-center mt-2 mb-5">
                    <Button onClick={handleGoogle} className="authBtn pl-1 pr-5" variant="light"  ><img src={googleIcon} alt="" /> Continue with Google</Button>
                </Row>
            </Container> */}
            <Container className="text-center">
            <Row className="justify-content-md-center mt-3">
                <div className="login-card mt-5">
                    <h3>Login With</h3>
                    <Button onClick={handleGoogle} variant="light"  ><img src={googleIcon} alt="" /> Continue with Google</Button>
                    <p>Don't have an account? <a href="https://accounts.google.com/signup?hl=en" target="blank">Create an account.</a></p>
                </div>
            </Row>
        </Container>
        </div>
    );
};

export default Login;