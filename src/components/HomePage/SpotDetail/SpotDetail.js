import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import NavigationBar from '../NavigationBar/NavigationBar';
import './SpotDetail.css';
import house from '../../../images/house.png';
import { UserContext } from '../../../App';
import { useParams } from 'react-router-dom';
import imageDatas from '../../../fakeData/imageDatas';


const SpotDetail = () => {
    const insideHouse = imageDatas;

    const [loggedInUser] = useContext(UserContext);

    const [spotData, setSpotData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/spots')
            .then(res => res.json())
            .then(data => setSpotData(data))
    }, []);

    const { id } = useParams();
    const spot = spotData.find(data => data._id === id) || {};
    console.log(spot);
    console.log(id);

    const [bookingInfo, setBookingInfo] = useState({});
    const handleBlur = (e) => {
        const newBookingInfo = { ...bookingInfo };
        newBookingInfo[e.target.name] = e.target.value;
        newBookingInfo.status = 'Pending';
        setBookingInfo(newBookingInfo);
    };
    const handleSubmit = e => {
        const formData = new FormData();
        formData.append('name', bookingInfo.name || loggedInUser.name);
        formData.append('number', bookingInfo.number);
        formData.append('email', bookingInfo.email || loggedInUser.email);
        formData.append('message', bookingInfo.message);
        formData.append('house', spot.title);
        formData.append('price', spot.price);
        formData.append('status', bookingInfo.status);

        fetch('http://localhost:5000/addBooking', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })

        e.preventDefault();
    };
    return (
        <div>
            <NavigationBar></NavigationBar>
            <div className="spotWrapper text-center">
                <div className="spotInner pt-5 ">
                    <h1 className="pt-5 mt-3 font-weight-bold">Spot</h1>
                </div>
                <div className="spotOverlay"></div>
            </div>
            <Container className="mt-5">
                <Row>
                    <Col md={8}>
                        <img src={house} alt="" className="img-fluid" />
                        <div className="pt-3">
                            <Row>
                                {
                                    insideHouse.map(image =>
                                        <Col key={image.id} sm={6} md={3}>
                                            <img src={image.img} className="my-2" alt="" style={{ height: "105px" }} />
                                        </Col>
                                    )
                                }
                            </Row>
                        </div>
                        <Row className="my-3">
                            <Col>
                                <h2 className="font-weight-bold darkIndigoText">{spot.title}</h2>
                            </Col>
                            <Col>
                                <h2 className="font-weight-bold indigoText text-right">${spot.price}</h2>
                            </Col>
                        </Row>
                        <p className="text-secondary">3000 sq-ft., {spot.bedroom} Bedroom, Semi-furnished, Luxurious, South facing Spot for Orders in Rangs Malancha, Melbourne.</p>
                        <h3 className="font-weight-bold darkIndigoText">Price Detail -</h3>
                        <p className="text-secondary">
                            Orders/Month: $550 (negotiable) <br />
                            Service Charge : 8,000/= Tk per month, subject to change <br />
                            Security Deposit : 3 month’s orders <br />
                            Flat Release Policy : 3 months earlier notice required
                        </p>
                        <h3 className="font-weight-bold darkIndigoText">Property Detail -</h3>
                        <p className="text-secondary">Address & Area : Rangs Malancha, House-68, Road-6A (Dead End Road), Dhanmondi Residential Area.</p>
                        <p className="text-secondary">Floor :  A5 (5th Floor) (6 storied Building ) (South Facing Unit)</p>
                        <p className="text-secondary">Flat Size : 3000 Sq Feet.</p>
                        <p className="text-secondary">Room Category : 3 Large Bed Rooms with 3 Verandas, Spacious Drawing, Dining & Family Living Room, Highly Decorated Kitchen with Store Room and Servant room with attached Toilet.</p>
                        <p className="text-secondary">Facilities : 1 Modern Lift, All Modern Amenities & Semi Furnished.</p>
                        <p className="text-secondary">Additional Facilities : a. Electricity with full generator load, b. Central Gas Geyser, c. 2 Car Parking with 1 Driver’s Accommodation, d. Community Conference Hall, e. Roof Top Beautified Garden and Grassy Ground, f. Cloth Hanging facility with CC camera.</p>
                    </Col>
                    <Col md={4}>
                        <div className="px-1 pt-5 pb-2">
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Control onBlur={handleBlur} size="lg" value={loggedInUser.name} type="name" name="name" placeholder="Full Name" required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control onBlur={handleBlur} size="lg" type="number" name="number" placeholder="Phone No." required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control onBlur={handleBlur} size="lg" value={loggedInUser.email} type="email" name="email" placeholder="Email Address" required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Control onBlur={handleBlur} size="lg" as="textarea" name="message" rows={3} type="text" placeholder="Message" required />
                                </Form.Group>
                                <button  type="submit" size="lg" className="btn indigoBtn form-control">Request Booking</button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default SpotDetail;