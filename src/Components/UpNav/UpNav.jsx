import React, {Component} from 'react'
import {NavBar, Icon} from 'antd-mobile'
import {Link} from 'react-router-dom'

class UpNav extends Component{
    render(){
        return(
            <NavBar
                mode='dark'
                icon={<Link to="/"><Icon type="left"/></Link>}
            >
                {this.props.navname}
            </NavBar>
        );
    }
}

export default UpNav;