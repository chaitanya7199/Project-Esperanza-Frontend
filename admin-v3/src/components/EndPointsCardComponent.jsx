import React, { Component } from 'react';
/* import { Redirect } from 'react-router-dom' */
import "./CardComponent.css";
import PopupComponent from './PopupComponent';
var request = require('sync-request');


class EndPointsCardComponent extends Component {

    state = {
        apiConfigData: this.props.config,
        cardMode: "view"
    }

    setValues = (e) => {
        this.setState((prevState, props) => ({
            apiConfigData: {
                ...prevState.apiConfigData,
                [e.target.name]: e.target.value
            },
        }));
    }

    setValidationValues = (e) => {
        this.setState((prevState, props) => ({
            apiConfigData: {
                ...prevState.apiConfigData,
                validation: {
                    ...prevState.apiConfigData.validation,
                    [e.target.name]: e.target.value
                }
            },
        }));
    }

    render() {
        console.log(this.state)
        var renderBody, renderFooter;
        if (this.state.cardMode === 'view') {
            renderBody = () => {
                return (
                    <>
                        {
                            Object.keys(this.props.config).map((keyName, keyIndex) => {
                                /* console.log(keyName) */
                                return (
                                    <tr>
                                        <th style={{ color: "#b11254" }}>{keyName}</th>
                                        {
                                            (keyName !== "validation") ?
                                                <td>{this.props.config[keyName]}</td> :
                                                <td>
                                                    {
                                                        Object.keys(this.props.config[keyName]).map((kname) => {
                                                            return (
                                                                <>
                                                                    <span style={{ color: "#b11254" }}>{kname}</span> :
                                                        {this.props.config[keyName][kname]}
                                                                    <br />
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </td>
                                        }
                                    </tr>
                                )
                            })
                        }
                    </>

                )
            }

            renderFooter = () => {
                return (
                    <div className="row">
                        <div className="col-6">
                            <button className="btn btn-success" style={{ width: "100%" }} onClick={() => {
                                this.setState({ cardMode: "edit" })
                            }}>Edit Config</button>
                        </div>
                        <div className="col-6">
                            <button className="btn btn-danger" style={{ width: "100%" }} onClick={(e) => {
                                if (window.confirm("Are you sure you want to delete?")) {
                                    this.props.deleteApiConfig(this.props.config.name)
                                }
                            }}>Delete Config</button>
                        </div>
                    </div>
                )
            }
        }
        else {
            renderBody = () => {
                return (
                    <>
                        {
                            Object.keys(this.props.config).map((keyName, keyIndex) => {
                                return (
                                    <tr>
                                        <th style={{ color: "#b11254" }}>{keyName}</th>
                                        {
                                            (keyName !== "validation") ?
                                                <input type="text" className="form-control" name={keyName} value={this.state.apiConfigData[keyName]} onChange={this.setValues} />
                                                :
                                                <td>
                                                    {
                                                        Object.keys(this.props.config[keyName]).map((kname) => {
                                                            return (
                                                                <>
                                                                    <span style={{ color: "#b11254" }}>{kname}</span> :
                                                        <input type="text" className="form-control" name={kname} onChange={this.setValidationValues} value={this.state.apiConfigData[keyName][kname]} />
                                                                    <br />
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </td>
                                        }
                                    </tr>
                                )
                            })
                        }
                    </>
                )
            }

            renderFooter = () => {
                return (
                    <div className="row">
                        <div className="col-6">
                            <button className="btn btn-primary" style={{ width: "100%" }} onClick={(e) => {
                                if (window.confirm("Are you sure you want to edit?")) {
                                    this.props.editApiConfig(this.props.config.name, this.state.apiConfigData)
                                }
                            }}>Submit</button>
                        </div>
                        <div className="col-6">
                            <button className="btn btn-secondary" style={{ width: "100%" }} onClick={() => {
                                this.setState({ cardMode: "view" })
                            }}>Cancel</button>
                        </div>
                    </div>
                )
            }
        }

        return (
            <div key={this.props.config.id} className="card col-12 my-2 mx-1 productcard">
                <div className="card-body">
                    <h5 className="card-title">{this.props.config.label}</h5>
                    <hr />
                    <form>
                        <table className="table table-bordered table-hover">
                            {renderBody()}
                        </table>
                    </form>
                    {renderFooter()}
                </div>
            </div>
        );
    }
}

export default EndPointsCardComponent;