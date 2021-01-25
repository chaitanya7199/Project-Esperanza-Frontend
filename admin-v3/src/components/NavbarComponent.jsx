import React, { Component } from 'react';
import logo from '../images/logoesp1.PNG';

class NavbarComponent extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark" style={{"backgroundColor" : "#ae275f"}}>
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#"><img src={logo} height="50"/></a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            {/* <li className="nav-item">
                            <a className="nav-link " aria-current="page" href="/">Quick Config</a>
                            </li> */}
                            <li className="nav-item">
                            <a className="nav-link " aria-current="page" href="/products">Products</a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link " aria-current="page" href="/partners">Partners</a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link " aria-current="page" href="/form">Form</a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link " aria-current="page" href="/api-config">API Config</a>
                            </li>
                            <li className="nav-item ">
                            <a className="nav-link " aria-current="page" href="" onClick={this.props.logout}>Logout</a>
                            </li>

                            {/* <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="/about">About Us</a>
                            </li>
                            <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="#">Contact Us</a>
                            </li> */}
                        </ul>
                        </div>
                    </div>
                </nav>
               
            </div>
        );
    }
}

export default NavbarComponent;