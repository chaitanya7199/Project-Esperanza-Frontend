import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom'
import "./CardComponent.css";

class CardComponent extends Component {

    componentDidMount = ()=>{
        console.log(this.props.config.title)
    }

    render() {
        return (
                <div key={this.props.config.id} className="card col-md-2 mx-1 productcard">
                    <img className="card-img-top mx-2" style={{"width" : 90 + "%" , "height" :"180px"}} src={this.props.config.imageSrc} alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">{this.props.config.title}</h5>
                        <hr />
                        <div className="row">
                            <div className="col-6">
                            <button className="btn btn-primary">Edit Product</button>
                            </div>
                            <div className="col-6">
                            <button className="btn btn-primary">Delete Product</button>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default CardComponent;