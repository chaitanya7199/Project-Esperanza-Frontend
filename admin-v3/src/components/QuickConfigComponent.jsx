import React, { Component } from 'react';

import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
class QuickConfigComponent extends Component {
    
    state = {
        addPartnerFlag : false
    }

    render() {
        /* document.getElementsByTagName("body")[0].style.backgroundImage="linear-gradient(30deg,white,pink)" */
        return (
            <div className="container">
                <hr /><h3 align="center">Quick Config</h3><hr />
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                            <h5>Step 1 : Select Partner</h5>
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <form>
                                <select className="form-control" onChange={()=>{
                                    this.setState({addPartnerFlag : true})
                                }}>
                                    <option>Bharti AXA</option>
                                    <option>Others</option>
                                </select>
                                {
                                    this.state.addPartnerFlag ?
                                    (
                                        
                                        <form style={{border : "2px solid purple"}} className="py-3 px-3 my-2">
                                            
                                            <h4 align="center">Add Partner</h4>
                                            <label style={{fontWeight : 500}}>Partner Name</label>
                                            <input name="partnerName" type="text" className="form-control" placeholder="Enter Partner Name"/>
                                            <label style={{fontWeight : 500}}>Upload Logo</label><br />
                                            <input name="partnerName" type="file" className="custom-file-input"/>
                                            
                                        </form>
                                    ):(<div></div>)
                                }
                            </form>
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Card.Header} variant="link" eventKey="1">
                            <h5>Step 2 : Select Product</h5>
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            <form>
                                <select className="form-control">
                                    <option>Bharti AXA</option>
                                </select>
                            </form>
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Card.Header} variant="link" eventKey="2">
                            <h5>Step 3 : Configure API</h5>
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="2">
                        <Card.Body>
                            <form>
                                <select className="form-control">
                                    <option>Bharti AXA</option>
                                </select>
                            </form>
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Card.Header} variant="link" eventKey="3">
                            <h5>Step 4 : Setup Form</h5>
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="3">
                        <Card.Body>
                            <form>
                                <select className="form-control">
                                    <option>Bharti AXA</option>
                                </select>
                            </form>
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        );
    }
}

export default QuickConfigComponent;