import React, { Component , Fragment} from 'react';
import {getFormConfig} from '../Configs/FormConfig';
import {getPartnerConfig} from '../Configs/PartnerConfig';
import DyanamicFormField from '../DyanamicComponents/DyanamicFormField';
import { setForm } from "../actions/FormAction";
import { connect } from 'react-redux';
import QuoteComponent from '../DyanamicComponents/QuoteComponent';
import CardGroup from 'react-bootstrap/CardGroup'

class ProductComponent extends Component {

    /* setValues = (e) => {
        this.props.setForm(e.target.name,e.target.value)
        this.setState((prevState, props) => ({
            userDetails: {
                ...prevState.userDetails,
                [e.target.name] : e.target.value
            },
        }));
    } */

    state = {
        page : "formPage"
    }

    render() {
        /* Dyanamically fetch the form config based on product */
        const formFields = getFormConfig(this.props.config.productID)[0].fields;
        /* console.log(formFields[0].fields) */
        /* Dyanamically fetch the Partner config based on product */
        const partnerFields = getPartnerConfig(this.props.config.productID);
        console.log(partnerFields)
        return (
            (
            this.state.page === 'formPage') ?
            <div className="container my-5 mx-3" /* style={{backgroundImage: `url(${this.props.config.backgroundImage})`}} */>
                <form onSubmit={(e)=>{e.preventDefault();this.setState({page : "QuotePage"})}}>
                    <h3 style={{alignItems : 'center'}}>{this.props.config.title}</h3>
                    <hr />
                    {
                        formFields.map(field =>{
                            return(
                            <DyanamicFormField 
                                key={field.id} 
                                field={field} 
                                formHandleProps = {this.props}
                                />
                            )
                        })
                    }
                </form>
             </div> :
             <div className="container">
                <CardGroup  className="mx-2 my-2">
                 {
                     partnerFields.map(partnerField =>{
                         return(
                             <div style={{ width: "20%" }} className="mx-2 my-2">
                                 <QuoteComponent config={partnerField} productID={this.props.config.productID}/>
                             </div>
                         )
                    })
                 }
                </CardGroup>
             </div>
        )
    }
}

const mapStatetoProps = state => (
    {
        /* fullName: state.form.fullName,
        email: state.form.email,
        phone: state.form.phone */
    }
)

export default connect(mapStatetoProps, { setForm })(ProductComponent);
/* export default ProductComponent; */