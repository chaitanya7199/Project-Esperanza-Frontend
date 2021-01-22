import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom'

class CardComponent extends Component {

    componentDidMount = ()=>{
        console.log(this.props.config.title)
    }

    render() {
        
        return (
                <div key={this.props.config.id} className="card col-md-2 mx-3 productcard" onClick={()=>{ this.props.history.push(this.props.config.navigationPath);}}>
                            <img className="card-img-top mx-2" style={{"width" : 90 + "%"}} src={this.props.config.imageSrc} alt="Card image cap" />
                            <div className="card-body">
                                <h5 className="card-title">{this.props.config.title}</h5>
                            </div>
                </div>
        );
    }
}

export default CardComponent;