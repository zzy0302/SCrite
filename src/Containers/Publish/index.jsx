import React, {Component} from 'react'
import {Route} from "react-router-dom";
import {Drawer, Icon, List, NavBar, TextareaItem} from 'antd-mobile';
import { Button, WhiteSpace, WingBlank } from 'antd-mobile';
import { createForm } from 'rc-form';
import {category,dict} from '../../Data/Category'
import testMap from '../../Map.png'
import './publish.css'

import { transaction, simpleStoreContract } from '../../simpleStore'


class Publish extends Component{
    constructor(props){
        super(props);
        var data = this.props.location.query;
        if(typeof data === 'undefined' || typeof data['status'] === 'undefined' || !data['status']){
            this.state = {open: false,pictureOnClick: false,
                text: ''}
        }
        else{
            this.state = {open: true,pictureOnClick: false,
                text: ''}
        }
    }




    handleSubmit = () => {

        const { getFieldProps } = this.props.form;
        const title = getFieldProps('note4')['value'];
        const contents = getFieldProps('note6')['value'];
        const category = "吃";
        const province = '上海';
        const district = '杨浦';
        const street = '四平路';
        const time = new Date();


    };

    onOpenChange = () => {
        this.setState({ open: !this.state.open });
    };

    //TODO: 防止提交空

    render(){
        // const {title, contents, category, province, district, street, time} = this.state;
        const { getFieldProps } = this.props.form;
        const sidebar = (<List style={{zindex: 3}}>
            {category.map((i, index) => {

                return (
                    <List.Item key={i} onClick={() => {this.props.history.push({
                            pathname: i,
                            query: {
                                status: true
                            }
                        }
                    )}}>
                        <p>{dict[i]}</p>
                    </List.Item>
                    );

            })
            }
        </List>);
        return(
            <Route>
                <div>
                    <Drawer
                        className="category-drawer-publish"
                        style={{ minHeight: document.documentElement.clientHeight }}
                        contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
                        sidebar={sidebar}
                        open={this.state.open}
                        onOpenChange={this.onOpenChange}
                    >
                    </Drawer>
                    <NavBar icon={<Icon type="ellipsis"/>} onLeftClick={this.onOpenChange}>发表评论</NavBar>
                        <List renderHeader={() => ''}>

                            <TextareaItem
                                {...getFieldProps('note1')}
                                editable={false}
                                title="地址"
                                autoHeight
                                labelNumber={2}
                            />
                            <div id='mapImage' align="center">
                            <img id='map' src={testMap} alt="map" onClick={()=>{this.setState({pictureOnClick: true, text:'上海杨浦四平路'})}}/>
                            </div>
                            <TextareaItem
                                id = "address"
                                {...getFieldProps('note2')}
                                rows={1}
                                placeholder="请点击上方图片进行定位"
                                value={this.state.text}
                                // value = {time}
                                // onChange={this.handleInput}
                            />
                        </List>

                        <List renderHeader={() => ''}>
                            <TextareaItem
                                {...getFieldProps('note3')}
                                editable={false}
                                title="标题"
                                autoHeight
                                labelNumber={2}
                            />
                            <TextareaItem
                                {...getFieldProps('note4')}
                                rows={1}
                                placeholder="请输入标题"
                                // id = "title"
                                // value = {title}
                                // onChange={this.handleInput}
                            />
                        </List>

                        <List renderHeader={() => ''}>
                            <TextareaItem
                                {...getFieldProps('note5')}
                                editable={false}
                                title="评论内容"
                                autoHeight
                                labelNumber={2}
                            />
                            <TextareaItem
                                {...getFieldProps('note6')}
                                // id = 'contents'
                                autoHeight
                                // value = {contents}
                                // onChange={this.handleInput}
                                placeholder="请输入评论内容"
                            />
                        </List>

                        <WingBlank size="lg">
                            <WhiteSpace size="lg" />
                            <Button type="primary" onClick={this.handleSubmit}>发布评论</Button><WhiteSpace />
                        </WingBlank>
                </div>
            </Route>
        );
    }
}

const PublishItemWrapper = createForm()(Publish);

export default PublishItemWrapper