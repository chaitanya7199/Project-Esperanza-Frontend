import React, { Component } from 'react';
/* import { Redirect } from 'react-router-dom' */
import "./CardComponent.css";
import PopupComponent from './PopupComponent';
var request = require('sync-request');


class PartnerCardComponent extends Component {

    state = {
        //editPartner: {}
        editPartner: this.props.config
    }

    componentDidMount = () => {
        var res = request(
            "GET",`http://localhost:9000/partners/${this.props.config.partnerID}`
          );
          console.log(res);
          if (res.statusCode === 200) {
            this.setState({
                editPartner: JSON.parse(res.getBody()),
            });
          }
        /*console.log(this.props.config.title)
        this.setState({
            editPartner: {
                "partnerID": "P_001",
                "partnerName": "TATA AIG",
                "logoSrc": "https://content.jdmagicbox.com/comp/pune/a1/020pxx20.xx20.121022150412.m9a1/catalogue/tata-aig-general-insurance-company-ltd-akurdi-pune-insurance-companies-2sq5fpasii.jpg?clr=1b2b4b"

            }
        })*/
    }

    /* EDIT Partner */
    setEditPartnerValues = (e) => {
        this.setState((prevState, props) => ({
            editPartner: {
                ...prevState.editPartner,
                [e.target.name]: e.target.value
            },
        }));
    }

    editPartnerBody = () => {
        return (
            <div className="container">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    var res = request('PUT', 'http://localhost:9000/partners', {
                        json: this.state.editPartner,
                    });
                    if (res.statusCode === 200) {
                        console.log(res.getBody());
                        alert("Partner edited Successfully");
                        window.location.reload(false);
                    }
                }}>
                    <div className="form-row">
                        <div className="form-group col-12">
                            <label className="float-left font-weight-bold" style={{ color: "#ae275f" }}>Partner ID:</label><br />
                            <input type="text" name="partnerID" value={this.state.editPartner.partnerID} onChange={this.setEditPartnerValues} className="form-control" placeholder={this.props.config.partnerID} required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-12">
                            <label className="float-left font-weight-bold" style={{ color: "#ae275f" }}>Partner Name:</label><br />
                            <input type="text" name="partnerName" value={this.state.editPartner.partnerName} onChange={this.setEditPartnerValues} className="form-control" placeholder={this.props.config.partnerName} required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-12">
                            <label className="float-left font-weight-bold" style={{ color: "#ae275f" }}>Partner Logo:</label><br />
                            <input type="text" name="logoSrc" value={this.state.editPartner.logoSrc} onChange={this.setEditPartnerValues} className="form-control" placeholder={this.props.config.logoSrc} required />
                        </div>
                    </div>
                    <hr />
                    <div className="form-row">
                        <div className="form-group col-12">
                            <input
                                type="submit"
                                name="submitForm"
                                value="Edit Product"
                                className="btn btn-primary"
                                style={{ width: "100%" }}
                            />
                        </div>
                    </div>
                </form>
            </div>
        )
    }

    render() {
        return (
            <div key={this.props.config.id} className="card col-md-2 mx-1 productcard">
                <img className="card-img-top mx-2" style={{ "width": 90 + "%", "height": "180px" }} src={this.props.config.logoSrc} alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title" style={{ "width": 100 + "%", "height": "45px" }}>{this.props.config.partnerName}</h5>
                    <hr />
                    <div className="row">
                        <div className="col-6">
                            <PopupComponent config={
                                {
                                    title: "Edit Partner",
                                    body: this.editPartnerBody
                                }
                            } />
                        </div>
                        <div className="col-6">
                            <button className="btn btn-primary" onClick={() => {
                                var res = request('DELETE', `http://localhost:9000/partner/${this.props.config.partnerID}`
                                );
                                if (res.statusCode === 200) {
                                    console.log(res.getBody());
                                    alert("Partner Deleted Successfully");
                                    window.location.reload(false);
                                }
                            }}>Delete Partner</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PartnerCardComponent;