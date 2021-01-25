import React, { Component } from 'react';
import CardComponent from './CardComponent';
import { getCardConfig } from '../Configs/cardConfig'
import { getPartnerConfig, getallPartners } from '../Configs/PartnerConfig'
import PopupComponent from './PopupComponent';
import EndPointsCardComponent from './EndPointsCardComponent';
import { getEndPointsConfig } from '../Configs/endPointsConfig';
var request = require('sync-request');

class EndPointsComponent extends Component {

    state = {
        productConfig: getCardConfig(),
        apiConfig: null
    }

    componentDidMount() {
        /* this.setState({
            partnerConfig: getPartnerConfig(),
            productConfig: getCardConfig()
        }) */
        console.log(this.state)
    }


    toggleMainBody = (e) => {
        var config = getEndPointsConfig(e.target.value)
        //console.log(config.length)
        if (config.length !== 0) {
            this.setState({
                apiConfig: config
            })
        } else {
            this.setState({
                apiConfig: null
            })
            alert("No configuration Found")
        }
    }

    deleteApiConfig = (fieldName) => {
        var newConfig = [];
        this.state.apiConfig[0].fields.forEach(item => {
            if (item.name !== fieldName) {
                /*  alert(item.name) */
                newConfig = [
                    ...newConfig,
                    item
                ]
            }
        })
        //console.log(newConfig)
        //----------------
        var deleteApiConfigData = {
            productID: this.state.apiConfig[0].productID,
            fields: newConfig
        }
        console.log(deleteApiConfigData)
        /* var res = request('PUT', 'http://localhost:9000/forms', {
                json: deleteFormFieldFormData,
            });
            if (res.statusCode === 200) {
                console.log(res.getBody());
                alert("Form Field deleted Successfully");
                window.location.reload(false);
            } */
    }

    editApiConfig = (fieldName, editedField) => {
        var newConfig = [];
        this.state.apiConfig[0].fields.forEach(item => {
            if (item.name !== fieldName) {
                /*  alert(item.name) */
                newConfig = [
                    ...newConfig,
                    item
                ]
            }
            else {
                newConfig = [
                    ...newConfig,
                    editedField
                ]
            }
        })
        //console.log(newConfig)
        //----------------
        var editApiConfigData = {
            productID: this.state.apiConfig[0].productID,
            fields: newConfig
        }
        console.log(editApiConfigData)
        /* var res = request('PUT', 'http://localhost:9000/forms', {
                json: editApiConfigFormData,
            });
            if (res.statusCode === 200) {
                console.log(res.getBody());
                alert("Form Field edited Successfully");
                window.location.reload(false);
            } */
    }

    render() {
        return (
            <div className="container my-5">
                <h3 align="center">API Configuration</h3>
                <div style={{ border: "3px solid #b11254" }}>
                    <form className="mx-3 py-3 px-3">
                        <h4 style={{ color: "#b11254" }} align="center">View Config</h4>
                        <div className="form-row mb-3">
                            <div className="form-group col-12">
                                <label className="float-left font-weight-bold my-2" style={{ color: "#ae275f" }}>Select Product:</label><br />
                                <select className="form-control" name="productID" /* value={this.state.formData.productID} */ onChange={this.toggleMainBody} required>
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
                    </form>
                </div>
                {
                    this.state.apiConfig !== null ?
                        <div className="row my-3 py-3 px-3" >
                            <h3 className="my-3">Input fields</h3>
                            {
                                this.state.apiConfig[0].fields.map(item => {
                                    console.log(item)
                                    return <EndPointsCardComponent key={item.productID} config={item} deleteApiConfig={this.deleteApiConfig} editApiConfig={this.editApiConfig} history={this.props.history} />
                                })
                            }
                        </div>
                        :
                        <>
                            <h4 align="center" className="my-3" style={{ color: "Red" }}>No Configuration Found</h4>
                        </>
                }
            </div >
        );
    }
}

export default EndPointsComponent;