import React, { Component } from 'react';
import CardComponent from './CardComponent';
import { getCardConfig } from '../Configs/cardConfig'
import { getPartnerConfig, getallPartners } from '../Configs/PartnerConfig'
import PopupComponent from './PopupComponent';
import FormFieldCardComponent from './FormFieldCardComponent';
import { getFormConfig } from '../Configs/FormConfig';
import AddFormFieldCardComponent from './AddFormFieldCardComponent';
var request = require('sync-request');


var selectedProduct = "null"
class FormFieldComponent extends Component {

    state = {
        productConfig: getCardConfig(),
        formFieldConfig: null
    }

    componentDidMount() {
        /* this.setState({
            partnerConfig: getPartnerConfig(),
            productConfig: getCardConfig()
        }) */
        console.log(this.state)
    }


    toggleMainBody = (e) => {
        var config = getFormConfig(e.target.value)
        //console.log(config.length)
        selectedProduct = e.target.value
        if(config.length !== 0 ){
            this.setState({
                formFieldConfig: config
            })
        }else{
            this.setState({
                formFieldConfig: null
            })
            alert("No configuration Found")
        }
    }

    deleteFormField = (fieldName) =>{
        var newConfig = [];
        this.state.formFieldConfig[0].fields.forEach(item => {
            if(item.name !== fieldName){
               /*  alert(item.name) */
                newConfig = [
                    ...newConfig,
                    item
                ]
            }
        })
        //console.log(newConfig)
        //----------------
        var deleteFormFieldFormData = {
            productID : this.state.formFieldConfig[0].productID,
            fields : newConfig
        }
        console.log(deleteFormFieldFormData)
        var res = request('PUT', 'http://localhost:9000/forms', {
                json: deleteFormFieldFormData,
            });
            if (res.statusCode === 200) {
                console.log(res.getBody());
                alert("Form Field deleted Successfully");
                window.location.reload(false);
            }
    }

    editFormField = (fieldName,editedField) =>{
        var newConfig = [];
        this.state.formFieldConfig[0].fields.forEach(item => {
            if(item.name !== fieldName){
               /*  alert(item.name) */
                newConfig = [
                    ...newConfig,
                    item
                ]
            }
            else{
                newConfig = [
                    ...newConfig,
                    editedField
                ]
            }
        })
        //console.log(newConfig)
        //----------------
        var editFormFieldFormData = {
            productID : this.state.formFieldConfig[0].productID,
            fields : newConfig
        }
        console.log(editFormFieldFormData)
        var res = request('PUT', 'http://localhost:9000/forms', {
                json: editFormFieldFormData,
            });
            if (res.statusCode === 200) {
                console.log(res.getBody());
                alert("Form Field edited Successfully");
                window.location.reload(false);
            }
    }

    addFormField = (formData) =>{
        var newConfig = [];
        if(this.state.formFieldConfig !== null){
            this.state.formFieldConfig[0].fields.map(item => {
                newConfig = [
                    ...newConfig,
                    item
                ]
            })
        }
        newConfig = [
            ...newConfig,
            formData
        ]
        //console.log(newConfig)
        //----------------
        var addFormFieldFormData = {
            productID : selectedProduct,
            fields : newConfig
        }
        console.log(addFormFieldFormData)
        var endPoint , method
        if(this.state.formFieldConfig !== null){
           endPoint = "http://localhost:9000/forms"
           method = "PUT"
        }
        else{
            endPoint = 'http://localhost:9000/formFields'
            method = "POST"
        }
        var res = request(method, endPoint, {
                json: addFormFieldFormData,
            });
            if (res.statusCode === 200) {
                console.log(res.getBody());
                alert("Form Field added Successfully");
                window.location.reload(false);
            }
    }

    render() {
        console.log(selectedProduct)
        return (
            <div className="container my-5">
                <h3 align="center">Form Fields Configuration</h3>
                <div style={{ border: "3px solid #b11254" }}>
                    <form className="mx-3 py-3 px-3">
                        <h4 style={{ color: "#b11254" }} align="center">View Config</h4>
                        <div className="form-row mb-3">
                            <div className="form-group col-12">
                                <label className="float-left font-weight-bold my-2" style={{ color: "#ae275f" }}>Select Product:</label><br />
                                <select className="form-control" name="productID" /* value={this.state.formData.productID} */ onChange={this.toggleMainBody} required>
                                    <option value="null">Select Product :</option>
                                    {
                                        this.state.productConfig.map(product => {
                                            return (
                                                <option value={product.productID}>{product.title} - ({product.productID})</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
                {
                    this.state.formFieldConfig !== null ?
                        <div className="row my-3 py-3 px-3" >
                            <h3 className="my-3">Input fields</h3>
                            {
                                this.state.formFieldConfig[0].fields.map(item => {
                                    console.log(item)
                                    return <FormFieldCardComponent key={item.productID} config={item} deleteFormField={this.deleteFormField} editFormField={this.editFormField} history={this.props.history} />
                                })
                            }
                        </div>
                        :
                        <>
                           {/*  <h4 align="center" className="my-3" style={{ color: "Red" }}>No Configuration Found</h4> */}
                        </>
                }
                {
                    selectedProduct !== "null" ?
                     <AddFormFieldCardComponent selectedProduct={selectedProduct} addFormField={this.addFormField}/>
                    :
                    <></>
                }
            </div >
        );
    }
}

export default FormFieldComponent;