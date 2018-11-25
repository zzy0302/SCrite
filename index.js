import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu, Breadcrumb, Icon , Input,Card, Col, Row,Divider,Progress, Button} from 'antd';
import QueueAnim from 'rc-queue-anim';

// 由于 antd 组件的默认文案是英文，所以需要修改为中文

import moment from 'moment';
import 'moment/locale/zh-cn';


moment.locale('zh-cn');

const Search = Input.Search;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const ButtonGroup = Button.Group;


class App extends React.Component {
    constructor(props) {
        // props的值就是你传给他的变量，比如这里就是 {toChild: 'world'}
        super(props);
        // 必须存在this.state中
        this.state = {
            width: props.width || -1,
            height: props.height || -1,
            location:"",
            city:"",
            longitude:"",
            latitude:"",
            weather:{
                tmp_max:"",
                tmp_min:"",
                cond_txt_d:"",
                cond_txt_n:"",
                wind_sc:"",
                wind_dir:"",
                date:"",
            },
            financial:"",
            enviroment:{
                pub_time:"",
                aqi:"",
                main:"",
                qlty:"",
                pm10:"",
                pm25:"",
                no2:"",
                so2:"",
                co:"",
                o3:"",
            },
            percent: 0,
            baike:"",
            mapimg1:" ",
            mapimg2:" ",
            admin_area:"",
            cnty:"",
            cid:"",
            status:"",
            cstatus:"normal",
            something:"",
        }
    }
    increase = () => {
        let percent = this.state.percent + 10;
        if (percent > 100) {
            percent = 100;
        }
        this.setState({ percent });
    }



    render() {
        return (
            <Layout>
                <Header className="header">
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1">呐喊</Menu.Item>
                        <Menu.Item key="2">圈子</Menu.Item>
                        <Menu.Item key="3">随缘</Menu.Item>
                        <Menu.Item key="4">秘密</Menu.Item>
                    </Menu>
                </Header>
                <Layout>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <QueueAnim delay={500} style={{ height: 150 }}> <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>

                            rButton*/}
                            {/*/>*/}
                            <Divider> <div>
                                <Progress type="circle" status={this.state.cstatus} percent={this.state.percent} />
                                <p >{this.state.status}</p>
                            </div>
                            </Divider>

                            <div k="a" style={{ background: '#66CCFF', padding: '60px' }}>
                                <Row gutter={32}>
                                    <Col span={8}>
                                        <div key="b"><Card title="City Name" bordered={false}><p>{this.state.city}</p></Card></div>
                                    </Col>
                                    <Col span={8}>
                                        <div key="b"><Card title="City Location" bordered={false}><p>{this.state.longitude}</p><p>{this.state.latitude}</p><p>{this.state.admin_area}</p><p>{this.state.cnty}</p></Card></div>
                                    </Col>
                                    <Col span={8}>
                                        <div key="b"><Card title="City Weather" bordered={false}><p>{this.state.weather.cond_txt_d}</p><p>{this.state.weather.cond_txt_n}</p><p>{this.state.weather.tmp_max}</p><p>{this.state.weather.tmp_min}</p><p>{this.state.weather.wind_dir}</p><p>{this.state.weather.wind_sc}</p><p style={{backgroundColor:'#00CC00'}}>{this.state.weather.date}</p></Card></div>
                                    </Col>
                                </Row>
                            </div>
                            <Divider />
                            <div k="c" style={{ background: '#66CCFF', padding: '60px' }}>
                                <Row gutter={32}>
                                    <Col span={8}>
                                        <div key="d"><Card title="City Financial" bordered={false}><p>{this.state.financial}</p><p>{this.state.something}</p></Card></div>
                                    </Col>
                                    <Col span={8}>
                                        <div key="d"><Card title="City Environment" bordered={false}><p>{this.state.enviroment.qlty}</p><p>{this.state.enviroment.aqi}</p><p>{this.state.enviroment.main}</p><p>{this.state.enviroment.pm10}</p><p>{this.state.enviroment.pm25}</p><p>{this.state.enviroment.no2}</p><p>{this.state.enviroment.so2}</p><p>{this.state.enviroment.co}</p><p>{this.state.enviroment.o3}</p><p style={{backgroundColor:'#00CC00'}}>{this.state.enviroment.pub_time}</p></Card></div>
                                    </Col>
                                    <Col span={8}>
                                        <div key="d"><Card title="City Introduction" bordered={false}><p></p><div dangerouslySetInnerHTML={{__html: this.state.baike}} /></Card></div>

                                    </Col>
                                </Row>
                            </div>
                            <div style={{ textAlign: 'center'}}>
                                <Divider />
                            <a href={this.state.mapimg1} target='_blank'> <img style={{margin:'2px',flex:1,justifyContent:'center',alignItems:'center'}} width={this.state.width-100} height={(this.state.width-100)/4*3} src={this.state.mapimg2}/>
                            </a>
                            </div>

                        </Content>
                        </QueueAnim>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));