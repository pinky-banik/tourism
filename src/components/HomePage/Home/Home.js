import React from 'react';
import Apartments from '../Apartments/Apartments';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import NavigationBar from '../NavigationBar/NavigationBar';

const Home = () => {
    return (
        <div >
            <NavigationBar></NavigationBar>
            <Header></Header>
            <Apartments></Apartments>
            <Footer></Footer>
        </div>
    );
};

export default Home;