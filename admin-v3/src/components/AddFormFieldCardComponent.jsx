import React, { Component } from 'react';
import "./CardComponent.css";
var request = require('sync-request');


class AddFormFieldCardComponent extends Component {

    state = {
        formData : {
            validation : {},
           /*  options : [] */
        },
        tempOptionData : ""
    }

    setValues = (e) => {
        this.setState((prevState, props) => ({
            formData: {
                ...prevState.formData,
                [e.target.name]: e.target.value
            },
        }));
    }

    setValidationValues = (e) => {
        this.setState((prevState, props) => ({
            formData: {
                ...prevState.formData,
                validation : {
                    ...prevState.formData.validation,
                    [e.target.name]: e.target.value
                }
            },
        }));
    }

    render() {
        console.log(this.state)
        return (
            <div className="card col-12 my-4 mx-1 " style={{ border: "2px solid #b11254" }}>
            <div className="card-body">
                <h5 className="card-title" style={{ color: "#b11254" }} align="center">{this.props.selectedProduct} - ADD FORM FIELD</h5>
                <hr />
                <form>
                    <table className="table">
                    <tbody>
                    <tr>
                        <th style={{ color: "#b11254" }}>fieldID*</th>
                        <td><input type="number" className="form-control" name="fieldID" value={this.state.formData.fieldID} onChange={this.setValues}/></td>
                    {/* </tr>
                    <tr> */}
                        <th style={{ color: "#b11254" }}>fieldPosition*</th>
                        <td><input type="number" className="form-control" name="fieldPosition" value={this.state.formData.fieldPosition} onChange={this.setValues}/></td>
                    </tr>
                    <tr>
                        <th style={{ color: "#b11254" }}>Name*</th>
                        <td><input type="text" className="form-control" name="name" value={this.state.formData.name} onChange={this.setValues}/></td>
                    {/* </tr>
                    <tr> */}
                        <th style={{ color: "#b11254" }}>Class Name*</th>
                        <td><input type="text" className="form-control" name="className" value={this.state.formData.className} onChange={this.setValues}/></td>
                    </tr>
                    <tr>
                        <th style={{ color: "#b11254" }}>id*</th>
                        <td><input type="text" className="form-control" name="id" value={this.state.formData.id} onChange={this.setValues}/></td>
                   {/*  </tr>
                    <tr> */}
                        <th style={{ color: "#b11254" }}>Required Field*</th>
                        <td>
                        <select className="form-control" name="required" value={this.state.formData.required} onChange={this.setValues}>
                            <option value="{true}">Yes</option>
                            <option value="{false}">No</option>
                        </select>
                        </td>
                    </tr>
                    <tr>
                        <th style={{ color: "#b11254" }}>Input type*</th>
                       <td colSpan={3}>
                       <select className="form-control" name="htmlType" value={this.state.formData.htmlType} onChange={this.setValues}>
                            <option value={undefined} style={{ color: "#b11254" }}>Choose :</option>
                            <option value="input">Input Fields</option>
                            <option value="select">Dropdown</option>
                        </select>
                       </td>
                    </tr>
                    {
                        this.state.formData.htmlType === "input" ?
                        <>
                        <tr>
                            <th style={{ color: "#b11254" }}>Type*</th>
                            <td colSpan={3}>
                            <select className="form-control" name="type" value={this.state.formData.type} onChange={this.setValues}>
                                <option value={undefined} style={{ color: "#b11254" }}>Choose :</option>
                                <option value="text">Text</option>
                                <option value="number">Number</option>
                                <option value="date">Date</option>
                                <option value="time">Time</option>
                                <option value="submit">Submit Button</option>
                            </select>
                            </td>
                        </tr>
                        {
                            this.state.formData.type !== "submit" && this.state.formData.type !== undefined?
                            <>
                            <tr>
                            <th style={{ color: "#b11254" }}>Label*</th>
                            <td colSpan={3}>
                                <input type="text" className="form-control" name="label" value={this.state.formData.label} onChange={this.setValues}/>
                            </td>
                            </tr>
                            <tr>
                            <th style={{ color: "#b11254" }}>Validation*</th>
                            {/* <td>
                                <select className="form-control" name="htmlType" value={this.state.formData.htmlType} onChange={this.setValues}>
                                    <option value={undefined}> Select Validation type</option>
                                    <option value="text">Alpha-Numeric</option>
                                    <option value="number">Numerical</option>
                                    <option value="date">Phone Number</option>
                                    <option value="time">E-Mail</option>
                                    <option value="submit">Custom</option>
                                </select>
                            </td> */}
                            <td colSpan={2}>
                                <input type="text" placeholder="Enter Validation Function" className="form-control" name="func" value={this.state.formData.validation.func} onChange={this.setValidationValues}/>
                                <p>{"(val)=>{return val.match(/^[A-Za-z\s]{3,15}$/)}"}</p>
                            </td>
                            <td>
                                <input type="text" placeholder="Enter Validation Message" className="form-control" name="message" value={this.state.formData.validation.message} onChange={this.setValidationValues}/>
                            </td>
                        </tr>
                        </>:<></>
                        }
                    </>
                    :
                    <>
                        {
                         this.state.formData.htmlType === "select" ?
                         <>
                            <tr>
                                 <th colSpan={4} style={{ color: "#b11254" }}>Options*</th>
                            </tr>
                            <tr>
                                <td colSpan={3}>
                                <input type="text" placeholder="Option Value" className="form-control" name="tempOptionData" value={this.state.tempOptionData} onChange={
                                    (e) =>{
                                        this.setState({
                                            tempOptionData : e.target.value
                                        })
                                    }
                                }/>
                                </td>
                                <td>
                                <input type="button" value="Add Option" className="btn btn-primary" style={{ width: "100%" }} onClick={
                                    (e)=>{
                                       if(this.state.formData.options !== undefined){
                                        this.setState({
                                            ...this.state,
                                            formData : {
                                            ...this.state.formData,
                                            options : [
                                                ...this.state.formData.options,
                                                this.state.tempOptionData
                                            ]
                                            },
                                            tempOptionData : ""
                                        })
                                       }
                                       else{
                                        this.setState({
                                            ...this.state,
                                            formData : {
                                            ...this.state.formData,
                                            options : [
                                                this.state.tempOptionData
                                            ]
                                            },
                                            tempOptionData : ""
                                        })
                                       }
                                    }
                                }/>
                                </td>
                            </tr>
                           
                                
                               
                                {
                                    this.state.formData.options !== "" ?
                                    <>
                                    {
                                        this.state.formData.options !== undefined ?
                                        this.state.formData.options.map(option =>{
                                            return (
                                                <tr>
                                                    <td colSpan={3}><span>{option}</span></td>
                                                    <td><input type="button" value="Delete Option" className="btn btn-danger" style={{ width: "100%" }} onClick={
                                                        (e)=>{
                                                            var updated = []
                                                            this.state.formData.options.map(opt =>{
                                                                if(option !== opt){
                                                                    updated = [
                                                                        ...updated,
                                                                        opt
                                                                    ]
                                                                }
                                                            })
                                                            console.log(updated)
                                                            this.setState({
                                                                ...this.state,
                                                                formData : {
                                                                ...this.state.formData,
                                                                options : [
                                                                    updated
                                                                ]
                                                                },
                                                                tempOptionData : ""
                                                            })
                                                        }
                                                    }/></td>
                                               </tr>
                                            )
                                        })
                                        :<></>
                                    }
                                    </>
                                    :
                                    <></>
                                }
                                
                            
                         </>:<></>
                        }
                    </>
                    }
                    
                    </tbody>
                    </table>
                    <input type="button" value="Add Form Field" className="btn btn-primary" style={{ width: "100%" }} onClick={
                        ()=>{
                            this.props.addFormField(this.state.formData)
                        }
                    }/>
                </form>
            </div>
        </div>
        );
    }
}

export default AddFormFieldCardComponent;