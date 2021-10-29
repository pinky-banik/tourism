import React, { useContext, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import logo from '../../../logos/Logo.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faHome, faNotesMedical } from '@fortawesome/free-solid-svg-icons'
import './AddHouse.css';
import { UserContext } from '../../../App';

const AddHouse = () => {
    const [loggedInUser] = useContext(UserContext);
    const [addApartment, setAddApartment] = useState({});
    const [file, setFile] = useState(null);

    const handleAddHouse = e => {
        const newApartmentInfo = { ...addApartment };
        newApartmentInfo[e.target.name] = e.target.value;
        setAddApartment(newApartmentInfo);
    };
    
    const handleFileChange = (e) => {
        const newFile = e.target.files[0];
        setFile(newFile);
    };

    const handleAddedData = (e) => {

        const formData = new FormData()
        formData.append('file', file);
        formData.append('title', addApartment.title);
        formData.append('price', addApartment.price);
        formData.append('location', addApartment.location);
        formData.append('bedroom', addApartment.bedroom);
        formData.append('bathroom', addApartment.bathroom);

        fetch('https://afternoon-atoll-75607.herokuapp.com/addNewApartment', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
        e.preventDefault();
    };

    return (
        <div className="bookings">
            <div className="row">
                <div className="col-md-2 col-sm-12">
                    <div className="sidebar">
                        <div className="logo">
                            <Link to="/"><img src={logo} alt="logo" /></Link>
                        </div>
                        <div className="dashboard__link mt-5">
                            <p><Link className="link" to="bookings"><span><FontAwesomeIcon icon={faNotesMedical} size="xs" /> Booking list</span></Link></p>
                            <p><Link className="link" to="addHouse"><span className="booking-link"><FontAwesomeIcon icon={faPlus} size="xs" /> Add Rent House</span></Link></p>
                            <p><Link className="link" to="myRent"><span><FontAwesomeIcon icon={faHome} size="xs" /> My Rent</span></Link></p>
                            <p className="goHome"><Link className="link" to="/"><span><FontAwesomeIcon icon={faHome} size="xs" /> Back to Home</span></Link></p>
                        </div>
                    </div>
                </div>
                <div className="col-md-10 col-sm-12">
                    <div className="sec__title d-flex">
                        <h3 className="pl-3">Add Rent House</h3>
                        <h5 className="ml-auto user__name">{loggedInUser.name}</h5>
                    </div>
                    <div className="dashboard__content">
                        <Form className="addHouse">
                            <Row>
                                <Col>
                                    <Form.Label className="mt-1">Service Title</Form.Label>
                                    <Form.Control onBlur={handleAddHouse} name="title" type="text" placeholder="Enter title" required />
                                </Col>
                                <Col>
                                    <Form.Label className="mt-1">Price</Form.Label>
                                    <Form.Control onBlur={handleAddHouse} name="price" type="number" placeholder="Price" required />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label className="mt-1">Location</Form.Label>
                                    <Form.Control onBlur={handleAddHouse} name="location" type="text" placeholder="Location" required />
                                </Col>
                                <Col>
                                    <Form.Label className="mt-1">No of Bedroom</Form.Label>
                                    <Form.Control onBlur={handleAddHouse} name="bedroom" type="number" placeholder="Enter Quantity" required />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Label className="mt-1">No of Bathroom</Form.Label>
                                    <Form.Control onBlur={handleAddHouse} name="bathroom" type="number" placeholder="Enter Quantity" required />
                                </Col>
                                <Col>
                                    <Form.Label className="mt-1">Thumbnail</Form.Label>
                                    <Form.File onChange={handleFileChange} required />
                                </Col>
                            </Row>
                            <div className="text-right mt-3 mr-1">
                                <button type="submit" onClick={handleAddedData} className="btn greenBtn">Submit</button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddHouse;