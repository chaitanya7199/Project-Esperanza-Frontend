import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';

function PopupComponent(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow} style={props.style}>
                {props.config.title}
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title><h5 style={{ fontSize: "20px" }}>{props.config.title}</h5></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.config.body()}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    {/* <Button variant="primary" onClick={handleClose}>
                        {props.config.title}
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PopupComponent;