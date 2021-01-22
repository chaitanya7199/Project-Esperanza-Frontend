import React, { Component } from 'react';
import CardComponent from './CardComponent';
import {getCardConfig} from '../Configs/cardConfig'

class ProductComponent extends Component {
    render() {

        const config = getCardConfig();

        return (
            <div className="container my-5">
                  <h3 align="center">Product Configuration</h3>
                  <button className="btn btn-primary my-3 mx-2" style={{width:"100%"}}>+ Add Product</button>
                  <div className="row" >
                        {
                            config.map(item => {
                                return <CardComponent key={item.productID} config={item}/>
                            })
                        }
                <div key="addProduct" className="card col-md-2 mx-1 productcard">
                    <img className="card-img-top mx-2 my-4" style={{"width" : 90 + "%" , "height" :"180px"}} src="https://cdn3.iconfinder.com/data/icons/eightyshades/512/14_Add-512.png" alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">Add Product</h5>
                    </div>
                </div>

                  </div>
            </div>
        );
    }
}

export default ProductComponent;