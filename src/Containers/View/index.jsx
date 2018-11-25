
import React, {Component} from 'react'
import { Drawer, List, NavBar, Icon, Button} from 'antd-mobile';
import {Link} from 'react-router-dom'
import {category, dict} from '../../Data/Category'
import "./view.css"
import SearchBarWrapper from '../../Components/SearchBar/SearchBarWrapper'
import Demo from "../ListView";
import {PullToRefresh} from 'antd-mobile'
import ReactDOM from 'react'

class View extends Component{

    render() {
        // fix in codepen

        return (<div>
            <Demo history={this.props.history} query={this.props.location.query}/>
            </div>);
    }
}


export default View;