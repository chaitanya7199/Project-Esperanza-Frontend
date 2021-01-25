import React, { Component } from 'react';
/* import { Redirect } from 'react-router-dom' */
import "./CardComponent.css";
import PopupComponent from './PopupComponent';
var request = require('sync-request');

var apiSignature
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

    setSignatureValues = (e) => {
        var value = JSON.parse(e.target.value)
        this.setState((prevState, props) => ({
            apiConfigData: {
                ...prevState.apiConfigData,
                [e.target.name]: value
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
                    <tbody>
                        <tr>
                            <th style={{ color: "#b11254" }}>API Endpoint</th>
                            <td>{this.state.apiConfigData.apiEndpoint}</td>
                        </tr>
                        <tr>
                            <th style={{ color: "#b11254" }}>API Signature</th>
                            <td>
                            <table>
                            <tbody>
                                {
                                    Object.keys(this.props.config["apiSignature"]).map((kname) => {
                                        return (
                                            <>
                                            <tr>
                                                <th style={{ color: "#b11254" }} className="mx-2 px-2">{kname}</th>
                                                <td className="mx-2 px-2">{this.props.config["apiSignature"][kname]}</td>
                                            </tr>
                                            </>
                                        )
                                    })
                                }
                            </tbody>
                            </table>
                            </td>
                        </tr>
                        <tr>
                            <th style={{ color: "#b11254" }}>API Method</th>
                            <td>{this.state.apiConfigData.apiMethod}</td>
                        </tr>
                    </tbody>
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
                                    this.props.deleteApiConfig(this.props.config.productID, this.props.config.partnerID)
                                }
                            }}>Delete Config</button>
                        </div>
                    </div>
                )
            }
        }
        else {
            renderBody = () => {
                {apiSignature = JSON.stringify(this.state.apiConfigData.apiSignature)}
                return (
                    <tbody>
                        <tr>
                            <th style={{ color: "#b11254" }}>API Endpoint</th>
                            <td><input type="text" className="form-control" name="apiEndpoint" value={this.state.apiConfigData.apiEndpoint} onChange={this.setValues} /></td>
                        </tr>
                        <tr>
                            <th style={{ color: "#b11254" }}>API Signature</th>
                            <td>
                            {/* <table>
                            <tbody>
                                {
                                    Object.keys(this.props.config["apiSignature"]).map((kname) => {
                                        return (
                                            <>
                                            <tr>
                                                <td style={{ color: "#b11254" }}><input type="text" className="form-control" name={kname} value={kname} onChange={this.setValues} /></td>
                                                <td><input type="text" className="form-control" name={this.props.config["apiSignature"][kname]} value={this.props.config["apiSignature"][kname]} onChange={this.setValues} /></td>
                                            </tr>
                                            </>
                                        )
                                    })
                                }
                            </tbody>
                            </table> */}

                            <textarea rows="10" type="text" className="form-control" name="apiSignature" value={apiSignature} onChange={this.setSignatureValues} />
                            {/* {JSON.stringify(this.props.config["apiSignature"])} */}
                            </td>
                        </tr>
                        <tr>
                            <th style={{ color: "#b11254" }}>API Method</th>
                            <td><input type="text" className="form-control" name="apiMethod" value={this.state.apiConfigData.apiMethod} onChange={this.setValues} /></td>
                        </tr>
                        </tbody>
                )
            }

            renderFooter = () => {
                return (
                    <div className="row">
                        <div className="col-6">
                            <button className="btn btn-primary" style={{ width: "100%" }} onClick={(e) => {
                                if (window.confirm("Are you sure you want to edit?")) {
                                    this.props.editApiConfig(this.state.apiConfigData)
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
                        <table className="table table-bordered">
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