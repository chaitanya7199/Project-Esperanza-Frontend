import React, { Component , Fragment} from 'react';
import {getFormConfig} from '../Configs/FormConfig'
import InputField from '../DyanamicComponents/InputField'

class ProductComponent extends Component {
    render() {

        /* Dyanamically fetch the form config based on product */
        const formFields = getFormConfig();

        return (
            <div className="container my-5 mx-3">
                <form>
                    <h3 style={{alignItems : 'center'}}>{this.props.config.title}</h3>
                    <hr />
                    {
                        formFields.map(field =>{
                            {
                                
                                const { Component, ...props } = field;
                                /* console.log(component)
                                console.log(props) */
                                return (
                                    <Fragment key={props.name}>
                                        <Component {...props} />
                                    </Fragment>
                                );
                            }
                            /* return (
                                <div className="form-field">
                                    <label>{field.label}</label>
                                    <input className="form-control" type={field.type} name={field.name}  id={field.id} placeholder={field.placeholder}/>
                                    <input className="form-control" {...field}/>
                                </div>
                            ) */
                        })
                    }
                    <hr />
                    <button type="submit" className="myButton">View Prices</button>

                </form>
             </div>
        );
    }
}

export default ProductComponent;