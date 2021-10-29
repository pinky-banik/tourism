import React from 'react';
import { Container, FormControl, InputGroup, Row } from 'react-bootstrap';
import './Header.css';

const Header = () => {
    return (
        <div className="headerWrapper">
            <Container>
                <div className="headerInnner  pt-5 ">
                    <h1 className="mt-5 pt-5 text-white font-weight-bold">FIND YOUR HOUSE RENT</h1>
                    <Row className="text-center justify-content-center" >
                        <InputGroup style={{width:"700px"}} size="lg" className="mb-3 mt-4">
                            <FormControl placeholder="Search..." />
                            <InputGroup.Append>
                                <button className="btn greenBtn" >Search</button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Row>
                </div>
            </Container>
            <div className="overlay"></div>
        </div>
    );
};

export default Header;