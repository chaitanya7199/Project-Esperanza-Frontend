import React, { Component } from 'react';
import '../App.css';
/* import { Switch, Route, Link , Redirect} from "react-router-dom"; */
import {getCardConfig} from '../Configs/cardConfig'
import CardComponent from '../DyanamicComponents/CardComponent';

class HomePage extends Component {

    render() {
        const config = getCardConfig();
        return (
            <div>
                <div className="container my-5">
                  <div className="row" >
                        {
                            config.map(item => {
                                return <CardComponent config={item} history={this.props.history}/>
                            })
                        }
                  </div>
                </div>
            </div>
        );
    }
}

export default HomePage;