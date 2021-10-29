import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/HomePage/Home/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ApartmentDetail from './components/HomePage/ApartmentDetail/ApartmentDetail';
import Bookings from './components/Dashboard/Bookings/Bookings';
import AddHouse from './components/Dashboard/AddHouse/AddHouse';
import MyRent from './components/Dashboard/MyRent/MyRent';
import Login from './components/Login/Login';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();
export const UserData = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    error: '',
    success: false
  });
  return (
    <UserData.Provider value={[user, setUser]}>
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <PrivateRoute path="/apartmentDetail/:id">
              <ApartmentDetail />
            </PrivateRoute>
            <PrivateRoute path="/myOrders">
            <MyRent></MyRent>
            </PrivateRoute>
            <PrivateRoute path="/manageBooking">
            <Bookings />
            </PrivateRoute>
            <Route path="/bookings">
            <Bookings />
            </Route>
            <Route path="/addHouse">
              <AddHouse />
            </Route>
            <Route path="/myRent">
              <MyRent />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </UserData.Provider>
  );
}

export default App;
