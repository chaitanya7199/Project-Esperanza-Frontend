import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import Button from 'react-bootstrap/Button'
import store from '../store'
var request = require('sync-request');

class QuoteComponent extends Component {

  state = {
    quoteData : {},
    renderData : true
  }

  componentDidMount() {
    this.setState({
      quoteData : this.getQuote(),
      renderData : false
    })
  }

  /* Data From Mock API/MountBank by hitting the end point at {this.props.config.apiEndpoint} with partnerID*/
  getQuote = ()=>{
    /* return (
        {
            price : "5000.00",
            description : "Accidental Damage Cover"
        }
    ) */

    
    var endPoint = request('GET',`http://localhost:9000/endPoint/${this.props.productID}/${this.props.config.partnerID}`).getBody();
    var quoteBody = JSON.parse(request('GET',endPoint).getBody());
    console.log(endPoint , quoteBody);
    /* return JSON.parse(res.getBody()); */
    return quoteBody
  }

  render() {
    /* console.log(store.getState()) */
    /* console.log(this.state.quoteData[0]) */
    return (
       
            <div>
              {
                this.state.renderData ? 
                <h3>Loading...</h3>
                :
                <Card border="dark">
                <Card.Img variant="top" src={this.props.config.logoSrc} style={{"height" : "200px" , "border-bottom" : "2px solid black"}}/>
                <Card.Body>
                    {/* <Card.Title>TATA AIG</Card.Title> */}
                    <Card.Title>IDV: {this.state.quoteData[0]["IDV"]}</Card.Title>
                    <Card.Text>
                    Premium: {this.state.quoteData[0]["Premium"]}
                    </Card.Text>
                    <Button style={{"background-color" : "#ae275f" , width : "100%"}}>Buy Now</Button>
                </Card.Body>
                </Card>
              }
            </div>
    );
  }
}
 
export default QuoteComponent