import React, { Component } from 'react';
import CardComponent from './CardComponent';
import { getCardConfig } from '../Configs/cardConfig'
import PopupComponent from './PopupComponent';
var request = require('sync-request');

class ProductComponent extends Component {

    state = {
        addProduct: {}
    }

    /* ADD PRODUCT */
    setAddProductValues = (e) => {
        this.setState((prevState, props) => ({
            addProduct: {
                ...prevState.addProduct,
                [e.target.name]: e.target.value
            },
        }));
    }

    addProductBody = () => {
        return (
            <div className="container">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    var res = request('POST', 'http://localhost:9000/products', {
                        json: this.state.addProduct,
                    });
                    if (res.statusCode === 200) {
                        console.log(res.getBody());
                        alert("Product added Successfully");
                        /* this.props.history.push("/products"); */
                        window.location.reload(false);
                    }

                }}>
                    <div className="form-row">
                        <div className="form-group col-12">
                            <label className="float-left font-weight-bold" style={{ color: "#ae275f" }}>Product ID:</label><br />
                            <input type="text" name="productID" value={this.state.addProduct.productID} onChange={this.setAddProductValues} className="form-control" placeholder="Ex : PROD_03" required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-12">
                            <label className="float-left font-weight-bold" style={{ color: "#ae275f" }}>Component Identifier:</label><br />
                            <input type="text" name="id" value={this.state.addProduct.id} onChange={this.setAddProductValues} className="form-control" placeholder="Ex :travel-insurance" required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-12">
                            <label className="float-left font-weight-bold" style={{ color: "#ae275f" }}>Product Name:</label><br />
                            <input type="text" name="title" value={this.state.addProduct.title} onChange={this.setAddProductValues} className="form-control" placeholder="Ex :Travel Insurance" required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-12">
                            <label className="float-left font-weight-bold" style={{ color: "#ae275f" }}>Product Image:</label><br />
                            <input type="text" name="imageSrc" value={this.state.addProduct.imageSrc} onChange={this.setAddProductValues} className="form-control" placeholder="Ex :https://example.com/image.jpeg" required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-12">
                            <label className="float-left font-weight-bold" style={{ color: "#ae275f" }}>Navigation Path:</label><br />
                            <input type="text" name="navigationPath" value={this.state.addProduct.navigationPath} onChange={this.setAddProductValues} className="form-control" placeholder="Ex : /travel-insurance" required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-12">
                            <label className="float-left font-weight-bold" style={{ color: "#ae275f" }}>Product Theme Background:</label><br />
                            <input type="text" name="backgroundImage" value={this.state.addProduct.backgroundImage} onChange={this.setAddProductValues} className="form-control" placeholder="Ex :https://example.com/image.jpeg" required />
                        </div>
                    </div><hr />
                    <div className="form-row">
                        <div className="form-group col-12">
                            <input type="submit" name="submitForm" value="Add Product" className="btn btn-primary" style={{ width: "100%" }} />
                        </div>
                    </div>
                </form>
            </div>
        )
    }

    render() {

        const config = getCardConfig();

        return (
            <div className="container my-5">
                <h3 align="center">Product Configuration</h3>
                <hr /><PopupComponent style={{ width: "100%" }} config={
                    {
                        title: "Add Product",
                        body: this.addProductBody
                    }
                } /><hr />
                <div className="row" >
                    {
                        config.map(item => {
                            return <CardComponent key={item.productID} config={item} history={this.props.history} />
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

export default ProductComponent;