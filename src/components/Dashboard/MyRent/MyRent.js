import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import logo from '../../../logos/Logo.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faHome, faNotesMedical } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../../App';


const MyRent = () => {
    const [loggedInUser] = useContext(UserContext);
    const [myRents, setMyRents] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/bookings?email=${loggedInUser.email}`)
            .then(res => res.json())
            .then(data => setMyRents(data))
    }, [loggedInUser.email]);
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
                            <p><Link className="link" to="addHouse"><span><FontAwesomeIcon icon={faPlus} size="xs" /> Add Rent House</span></Link></p>
                            <p><Link className="link" to="myRent"><span className="booking-link"><FontAwesomeIcon icon={faHome} size="xs" /> My Rent</span></Link></p>
                            <p className="goHome"><Link className="link" to="/"><span><FontAwesomeIcon icon={faHome} size="xs" /> Back to Home</span></Link></p>
                        </div>
                    </div>
                </div>
                <div className="col-md-10 col-sm-12">
                    <div className="sec__title d-flex">
                        <h3 className="pl-3">My Rent Houses</h3>
                        <h5 className="ml-auto user__name">{loggedInUser.name}</h5>
                    </div>
                    <div className="dashboard__content">
                        <div className="table__content">
                            <Table borderless size="sm">
                                <thead className="mt-3">
                                    <tr className="tableRow">
                                        <th style={{ width: '40%' }} className="pl-3">House Name</th>
                                        <th style={{ width: '30%' }} className="pl-3 text-center">Price</th>
                                        <th style={{ width: '30%' }} className="pl-3 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        myRents.map(rent =>
                                            <tr key={rent._id}>
                                                <td style={{ width: '40%' }} className="pl-3 pt-3">{rent.house}</td>
                                                <td style={{ width: '30%' }} className="pl-3 pt-3 text-center">${rent.price}</td>
                                                <td style={{ width: '30%' }} className="pl-3 text-center"><button className="btn greenBtn mt-2 btn-sm">{rent.status}</button></td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyRent;