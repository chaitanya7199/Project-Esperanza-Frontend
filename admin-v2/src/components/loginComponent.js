import React, { Component } from 'react';
import loginlogo from '../images/loginlogo.png';
import Homepage from './Homepage';
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";
import NavbarComponent from './NavbarComponent';
import ProductComponent from './ProductComponent';

class Login extends Component {

    state = {
        userDetails: {
            userName: "",
            password: ""
        },
        loggedUser: null
    }

    componentDidMount() {
        this.setState({ loggedUser: JSON.parse(localStorage.getItem("loggeduser")) })
    }

    setValues = (e) => {
        this.setState((prevState, props) => ({
            userDetails: {
                ...prevState.userDetails,
                [e.target.name]: e.target.value
            },
        }));
    }

    login = () => {
        localStorage.setItem("loggeduser", JSON.stringify(this.state.userDetails))
        this.setState({ loggedUser: JSON.parse(localStorage.getItem("loggeduser")) })
    }

    logout = () => {
        alert("Logged out Successfully")
        localStorage.removeItem("loggeduser");
        this.setState({ loggedUser: null })
    }

    render() {
        let loggedIn = false;
        let loggedUser = this.state.loggedUser;
        if (loggedUser !== null) {
            loggedIn = true
            console.log(this.props)
        }

        return (
            <div>

                { loggedIn ? (

                    <div>
                        {/* <h2>Welcome</h2>
                    <button onClick={()=>{this.logout()}}>Logout</button> */}
                        {/* <Homepage logout={this.logout}/> */}
                        <NavbarComponent logout={this.logout} />
                        <BrowserRouter>
                            <Switch>
                                <Route exact path="/" component={Homepage} />
                                <Route exact path="/products" component={ProductComponent} />
                            </Switch>
                        </BrowserRouter>
                    </div>


                ) : (

                        <center><div className="my-5 card" style={{ width: 25 + 'rem' }}>
                            <img src={loginlogo} className="my-3 mx-5 card-img-top" alt="loginicon" style={{ width: 75 + '%', border: '2px solid black' }} />
                            <div className="card-body">
                                <h5 className="card-title">Login</h5>
                                <form onSubmit={(e) => { e.preventDefault(); this.login(); }}>
                                    <div className="form-row">
                                        <div className="form-group col-12">
                                            <label className="float-left font-weight-bold">Username:</label><br />
                                            <input type="text" name="userName" value={this.state.userName} onChange={this.setValues} className="form-control" placeholder="Enter your username" required />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-12">
                                            <label align="left" className="float-left font-weight-bold">Password:</label><br />
                                            <input type="password" name="password" value={this.state.password} className="form-control" onChange={this.setValues} placeholder="Enter your password" required />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-12">
                                            <button type="submit" className="btn btn-primary my-2" style={{ width: 100 + '%' }}>Login</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div></center>
                    )}

            </div>
        )
    }
}

export default Login;