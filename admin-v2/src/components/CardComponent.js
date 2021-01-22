import React, { Component } from 'react';
/* import { Redirect } from 'react-router-dom' */
import "./CardComponent.css";
import PopupComponent from './PopupComponent';
var request = require('sync-request');


class CardComponent extends Component {

    state = {
        editProduct: {}
    }

    componentDidMount = () => {
        console.log(this.props.config.title)
        /* var res = request('GET', `http://localhost:9000/products/${this.props.config.productID}`);
        if (res.statusCode === 200) {
            this.setState({
                editProduct: res.getBody()
            })
        } */
        this.setState({
            editProduct: {
                "productID": "PROD_03",
                "id": "travel-insurance",
                "title": "Travel Insurance",
                "text": "Travel Insurance",
                "imageSrc": "https://cdn2.iconfinder.com/data/icons/insurance-glyph-1/64/Flight_Insurance-512.png",
                "navigationPath": "/travel-insurance",
                "backgroundImage": "https://wallpaperaccess.com/full/185289.jpg"
            }
        })
    }

    /* EDIT PRODUCT */
    setEditProductValues = (e) => {
        this.setState((prevState, props) => ({
            editProduct: {
                ...prevState.editProduct,
                [e.target.name]: e.target.value
            },
        }));
    }

    editProductBody = () => {
        return (
            <div className="container">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    var res = request('PUT', 'http://localhost:9000/products', {
                        json: this.state.editProduct,
                    });
                    if (res.statusCode === 200) {
                        console.log(res.getBody());
                        alert("Product edited Successfully");
                        /* this.props.history.push("/products"); */
                        window.location.reload(false);
                    }
                }}>
                    <div className="form-row">
                        <div className="form-group col-12">
                            <label className="float-left font-weight-bold" style={{ color: "#ae275f" }}>Product ID:</label><br />
                            <input type="text" name="productID" value={this.state.editProduct.productID} onChange={this.setEditProductValues} className="form-control" placeholder="Ex : PROD_03" required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-12">
                            <label className="float-left font-weight-bold" style={{ color: "#ae275f" }}>Component Identifier:</label><br />
                            <input type="text" name="id" value={this.state.editProduct.id} onChange={this.setEditProductValues} className="form-control" placeholder="Ex :travel-insurance" required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-12">
                            <label className="float-left font-weight-bold" style={{ color: "#ae275f" }}>Product Name:</label><br />
                            <input type="text" name="title" value={this.state.editProduct.title} onChange={this.setEditProductValues} className="form-control" placeholder="Ex :Travel Insurance" required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-12">
                            <label className="float-left font-weight-bold" style={{ color: "#ae275f" }}>Product Image:</label><br />
                            <input type="text" name="imageSrc" value={this.state.editProduct.imageSrc} onChange={this.setEditProductValues} className="form-control" placeholder="Ex :https://example.com/image.jpeg" required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-12">
                            <label className="float-left font-weight-bold" style={{ color: "#ae275f" }}>Navigation Path:</label><br />
                            <input type="text" name="navigationPath" value={this.state.editProduct.navigationPath} onChange={this.setEditProductValues} className="form-control" placeholder="Ex : /travel-insurance" required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-12">
                            <label className="float-left font-weight-bold" style={{ color: "#ae275f" }}>Product Theme Background:</label><br />
                            <input type="text" name="backgroundImage" value={this.state.editProduct.backgroundImage} onChange={this.setEditProductValues} className="form-control" placeholder="Ex :https://example.com/image.jpeg" required />
                        </div>
                    </div><hr />
                    <div className="form-row">
                        <div className="form-group col-12">
                            <input type="submit" name="submitForm" value="Edit Product" className="btn btn-primary" style={{ width: "100%" }} />
                        </div>
                    </div>
                </form>
            </div>
        )
    }

    render() {
        return (
            <div key={this.props.config.id} className="card col-md-2 mx-1 productcard">
                <img className="card-img-top mx-2" style={{ "width": 90 + "%", "height": "180px" }} src={this.props.config.imageSrc} alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">{this.props.config.title}</h5>
                    <hr />
                    <div className="row">
                        <div className="col-6">
                            {/* <button className="btn btn-primary" onClick={() => { this.props.toggleEditProductBody(this.props.config.productID) }}>Edit Product</button> */}
                            <PopupComponent config={
                                {
                                    title: "Edit Product",
                                    body: this.editProductBody
                                }
                            } />
                        </div>
                        <div className="col-6">
                            <button className="btn btn-primary" onClick={() => {
                                var res = request('DELETE', "http://localhost:9000/products", {
                                    json: {
                                        "productID": this.props.config.productID
                                    }
                                });
                                if (res.statusCode === 200) {
                                    console.log(res.getBody());
                                    alert("Product Deleted Successfully");
                                    /* this.props.history.push("/products"); */
                                    window.location.reload(false);
                                }
                            }}>Delete Product</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CardComponent;