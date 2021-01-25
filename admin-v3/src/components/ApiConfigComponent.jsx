import React, { Component } from 'react';
import CardComponent from './CardComponent';
import { getCardConfig } from '../Configs/cardConfig'
import { getPartnerConfig, getallPartners } from '../Configs/PartnerConfig'
import { getEndPointsConfig } from "../Configs/endPointsConfig"
import PopupComponent from './PopupComponent';
import ApiConfigCardComponent from './ApiConfigCardComponent';
var request = require('sync-request');

class ApiConfigComponent extends Component {

    state = {
        partnerConfig: getallPartners(),
        productConfig: getCardConfig(),
        apiConfig: null,
        selectedProduct: null,
        selectedPartner: null,
        addConfig: {},
        addConfigFlag : false,
        tempApiSignature : ""
    }

    
    /* ADD Config */
    setAddConfigValues = (e) => {
        this.setState((prevState, props) => ({
            addConfig: {
                ...prevState.addConfig,
                [e.target.name]: e.target.value
            },
        }));
    }

    setSignatureValues = (e) => {
        this.setState((prevState, props) => ({
            tempApiSignature: e.target.value
        }));
    }

    handleInputs = (e)=>{
        this.setState(() => ({
            ...this.state,
            [e.target.name]: e.target.value,
            apiConfig: null,
            addConfigFlag : false
         }));
    }

    deleteApiConfig = (productID, partnerID) => {
        var res = request('DELETE', `http://localhost:9000/endPoints/${productID}/${partnerID}`);
        if (res.statusCode === 200) {
            console.log(res.getBody());
            alert("API Config deleted Successfully");
            window.location.reload(false);
        }
    }

    editApiConfig = (apiConfigData) =>{
        var res = request('PUT', 'http://localhost:9000/endPoints', {
            json: apiConfigData
        });
        if (res.statusCode === 200) {
            console.log(res.getBody());
            alert("API Config edited Successfully");
            window.location.reload(false);
        }
    }

    addConfigBody = () => {
        return (
            <div className="container">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    var formBody = {
                        productID : this.state.selectedProduct,
                        partnerID : this.state.selectedPartner,
                        ...this.state.addConfig,
                        apiSignature : JSON.parse(this.state.tempApiSignature)
                    }
                    var res = request('POST', 'http://localhost:9000/endPoints', {
                        json: formBody,
                    });
                    if (res.statusCode === 200) {
                        console.log(res.getBody());
                        alert("API Config added Successfully");
                        /* this.props.history.push("/products"); */
                        window.location.reload(false);
                    }

                }}>
                     <div className="form-row">
                        <div className="form-group col-12">
                            <label className="float-left font-weight-bold" style={{ color: "#ae275f" }}>Product ID: {this.state.selectedProduct}</label><br />
                        </div>
                    </div>

                    <div className="form-row my-2">
                        <div className="form-group col-12">
                            <label className="float-left font-weight-bold" style={{ color: "#ae275f" }}>Partner ID: {this.state.selectedPartner}</label><br />
                        </div>
                    </div>
                    <div className="form-row my-2">
                        <div className="form-group col-12">
                            <label className="float-left font-weight-bold" style={{ color: "#ae275f" }}>API Endpoint:</label><br />
                            <input type="text" name="apiEndpoint" value={this.state.addConfig.apiEndpoint} onChange={this.setAddConfigValues} className="form-control" placeholder="Ex: http://localhost:9090/tata-aig/travel-insurance/quote" required />
                        </div>
                    </div>

                    <div className="form-row my-2">
                        <div className="form-group col-12">
                            <label className="float-left font-weight-bold" style={{ color: "#ae275f" }}>API Method</label><br />
                            <select name="apiMethod" value={this.state.addConfig.apiMethod} onChange={this.setAddConfigValues} className="form-control" required>
                                <option>Choose Option :</option>
                                <option>GET</option>
                                <option>POST</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="form-row my-2">
                        <div className="form-group col-12">
                            <label className="float-left font-weight-bold" style={{ color: "#ae275f" }}>API Signature</label><br />
                            <textarea rows="10" type="text" className="form-control" name="apiSignature" value={this.state.tempApiSignature} onChange={this.setSignatureValues} />
                        </div>
                    </div>

                    <hr />
                    <div className="form-row my-2">
                        <div className="form-group col-12">
                            <input type="submit" name="submitForm" value="Add Config" className="btn btn-primary" style={{ width: "100%" }} />
                        </div>
                    </div>
                </form>
            </div>
        )
    }

    render() {
        console.log(this.state)
        var cardData = this.state.apiConfig
        if(cardData !== null){
            cardData = JSON.parse(cardData)
        }
        return (
            <div className="container my-5">
                <h3 align="center">API Configuration</h3>
                <div style={{ border: "3px solid #b11254" }}>
                    <form className="mx-3 py-3 px-3">
                        <h4 style={{ color: "#b11254" }} align="center">View Config</h4>
                        <div className="form-row mb-3">
                            <div className="form-group col-12">
                                <select className="form-control" name="selectedProduct" value={this.state.productConfig.productID} onChange={this.handleInputs} required>
                                    <option value={null}>Select Product :</option>
                                    {
                                        this.state.productConfig.map(product => {
                                            return (
                                                <option value={product.productID}>{product.title}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="form-row mb-3">
                            <div className="form-group col-12">
                                <select className="form-control" name="selectedPartner" value={this.state.partnerConfig.partnerID} onChange={this.handleInputs} required>
                                    <option value={null}>Select Partner :</option>
                                    {
                                        this.state.partnerConfig.map(partner => {
                                            return (
                                                <option value={partner.partnerID}>{partner.partnerName}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="form-row mb-3">
                            <div className="form-group col-12">
                                <button type="button" className="btn btn-primary" style={{width : '100%'}} onClick={(e)=>{
                                var config = getEndPointsConfig(this.state.selectedProduct,this.state.selectedPartner)
                                if(config !== ""){
                                    alert("Please wait...")
                                    this.setState(() => ({
                                        ...this.state,
                                        apiConfig : config
                                }));
                                }else{
                                    alert("Not Found")
                                    this.setState(() => ({
                                        ...this.state,
                                        apiConfig : null,
                                        addConfigFlag : true
                                }));
                                }
                                }}>Fetch Config</button>
                            </div>
                        </div>
                    </form>
                </div>
                { 
                   ( cardData!== null) ?
                    <ApiConfigCardComponent config={cardData} 
                                    deleteApiConfig={this.deleteApiConfig} 
                                    editApiConfig={this.editApiConfig} 
                                    history={this.props.history} 
                    />
                   : <>
                   {this.state.addConfigFlag ? 
                   <>
                   <hr />
                    <PopupComponent style={{ width: "100%" }} 
                        config={
                            {
                                title: "Add Config",
                                body: this.addConfigBody
                            }
                        } 
                    />
                    <hr />
                   </> 
                   :<></>
                   }
                   </> 
                }
            </div>
        );
    }
}

export default ApiConfigComponent;