import React, { useContext, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../../logos/Logo.png';
import './NavigationBar.css';
import { NavDropdown } from 'react-bootstrap';
import firebase from 'firebase/app'
import "firebase/auth";
import { UserContext } from '../../../App';


const NavigationBar = () => {
    const history = useHistory();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: ''
    })

    let buttons;

    const handleSignOut = () => {
        firebase.auth().signOut()
        .then(res => {
            const signOutUser = {
                isSignedIn: false,
                name: '',
                email: ''
            }
            setUser(signOutUser);
            setLoggedInUser(signOutUser);
          }).catch(function(error) {
            // An error happened.
          });
    }

    if(loggedInUser.email){
        buttons = (
            <Nav>
                <NavDropdown title={loggedInUser.name} id="basic-nav-dropdown" >
                    <NavDropdown.Item><Link to="/bookings" className = "link">Go to Dashboard</Link></NavDropdown.Item>
                    <NavDropdown.Item onClick={handleSignOut}>Log Out</NavDropdown.Item>
                </NavDropdown>
            </Nav>
        )
    }
    else{
        buttons = (
            <ul className="navbar-nav menuBtn">
                <li className="nav-item">
                    <button onClick={() => history.push('/login')} className="btn greenBtn" >Login</button>
                </li>
            </ul>
        )
    }
    return (
        <Container>
            <Navbar className="" collapseOnSelect expand="md" >
                <Navbar.Brand href=""><img style={{height:"60px"}} src={logo} alt=""/></Navbar.Brand>
                <Navbar.Toggle className="ml-auto" aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="" onClick={() => history.push('/')}>Home</Nav.Link>
                        <Nav.Link href="" >About</Nav.Link>
                        <Nav.Link href="" >Service</Nav.Link>
                        <Nav.Link href="" >Concerns</Nav.Link>
                        <Nav.Link href="" >Event</Nav.Link>
                        <Nav.Link href="" >Contact</Nav.Link>
                    </Nav>
                    {buttons}
                </Navbar.Collapse>
            </Navbar>
        </Container>
    );
};

export default NavigationBar;