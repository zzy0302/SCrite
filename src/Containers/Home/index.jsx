import React,{Component} from 'react'
import './home.css';
import {Button} from "antd-mobile";
import {Router, Route, Link} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
import Publish from '../Publish'

class Home extends Component{
    render() {

        return (
            <div>
                <p id="HomeTitle" align="center">BooHub</p>
                <div align="center">
                    <Button type="primary" id="PublishPageButton" size="large" onClick={() => {
                        this.props.history.push({
                                pathname: '/publish',
                                query: {
                                    status: false
                                }
                            }
                        )
                    }}>
                        发表评论
                    </Button>
                </div>
                <div align="center">
                    <Button type="primary" id="ViewPageButton" size="large" onClick={() => {
                        this.props.history.push({
                                pathname: '/view',
                                query: {
                                    status: false
                                }
                            }
                        )
                    }}>
                        查看评论
                    </Button>
                </div>
                <div align="center">
                    <Button type="primary" id="ViewPageButton" size="large" onClick={() => {
                        this.props.history.push({
                                pathname: '/world',
                                query: {
                                    status: false
                                }
                            }
                        )
                    }}>
                        查看世界
                    </Button>
                </div>
            </div>
        );
    }
}

export default Home