import React, { Component } from 'react';
import PartnerCardComponent from './PartnerCardComponent';
import { getallPartners } from '../Configs/PartnerConfig'
import PopupComponent from './PopupComponent';
var request = require('sync-request');

class PartnerComponent extends Component {

    state = {
        addPartner: {}
    }

    /* ADD PRODUCT */
    setAddPartnerValues = (e) => {
        this.setState((prevState, props) => ({
            addPartner: {
                ...prevState.addPartner,
                [e.target.name]: e.target.value
            },
        }));
    }

    addPartnerBody = () => {
        return (
            <div className="container">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    var res = request('POST', 'http://localhost:9000/partners', {
                        json: this.state.addPartner,
                    });
                    if (res.statusCode === 200) {
                        console.log(res.getBody());
                        alert("Partner added Successfully");
                        /* this.props.history.push("/products"); */
                        window.location.reload(false);
                    }

                }}>
                    <div className="form-row">
                        <div className="form-group col-12">
                            <label className="float-left font-weight-bold" style={{ color: "#ae275f" }}>Partner ID:</label><br />
                            <input type="text" name="partnerID" value={this.state.addPartner.partnerID} onChange={this.setAddPartnerValues} className="form-control" placeholder="Ex : P_005" required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-12">
                            <label className="float-left font-weight-bold" style={{ color: "#ae275f" }}>Partner Name:</label><br />
                            <input type="text" name="partnerName" value={this.state.addPartner.partnerName} onChange={this.setAddPartnerValues} className="form-control" placeholder="Ex :TATA-AIG" required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-12">
                            <label className="float-left font-weight-bold" style={{ color: "#ae275f" }}>Partner Logo:</label><br />
                            <input type="text" name="logoSrc" value={this.state.addPartner.logoSrc} onChange={this.setAddPartnerValues} className="form-control" placeholder="Ex :https://example.com/image.jpeg" required />
                        </div>
                    </div>
                    <hr />
                    <div className="form-row">
                        <div className="form-group col-12">
                            <input type="submit" name="submitForm" value="Add Partner" className="btn btn-primary" style={{ width: "100%" }} />
                        </div>
                    </div>
                </form>
            </div>
        )
    }

    render() {

        const config = getallPartners();

        return (
            <div className="container my-5">
                <h3 align="center">Partner Configuration</h3>
                <hr /><PopupComponent style={{ width: "100%" }} config={
                    {
                        title: "Add Partner",
                        body: this.addPartnerBody
                    }
                } /><hr />
                <div className="row" >
                    {
                        config.map(item => {
                            return <PartnerCardComponent key={item.partnerID} config={item} history={this.props.history} />
                        })
                    }
                    {
                        /* <div key="addProduct" className="card col-md-2 mx-1 productcard">
                        <img className="card-img-top mx-2 my-4" style={{"width" : 90 + "%" , "height" :"180px"}} src="https://cdn3.iconfinder.com/data/icons/eightyshades/512/14_Add-512.png" alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title">Add Product</h5>
                        </div>
                        </div> */
                    }
                </div>
            </div>
        );
    }
}

export default PartnerComponent;