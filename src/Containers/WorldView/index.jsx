
import React, {Component} from 'react'
import { Drawer, List, NavBar, Icon, Button} from 'antd-mobile';
import {Link} from 'react-router-dom'
import {category, dict} from '../../Data/Category'
import "./worldview.css"
import SearchBarWrapper from '../../Components/SearchBar/SearchBarWrapper'
import World from '../WorldList/index'

class WorldView extends Component{

    render() {
        // fix in codepen

        return (<div>
            <World history={this.props.history} query={this.props.location.query}/>
        </div>);
    }
}


export default WorldView;