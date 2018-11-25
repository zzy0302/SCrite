
import {Drawer, Icon, ListView, NavBar, PullToRefresh} from 'antd-mobile';
import React from 'react'
import * as ReactDOM from "react-dom";

import { List } from 'antd-mobile';
import nervos from "../../nervos";
import {simpleStoreContract, transaction} from "../../simpleStore";
import SearchBarWrapper from "../../Components/SearchBar/SearchBarWrapper";
import {category, dict} from "../../Data/Category";
// import {hashHistory} from 'react-router'

const Item = List.Item;
const Brief = Item.Brief;

class World extends React.Component {

    // constructor(props){
    //     super(props);
    //     this.state = {
    //         refresh: true
    //     };
    //     this.getData();
    // }
    constructor(props){
        super(props)
        const data = this.props.query;
        if(typeof data === 'undefined' || typeof data['status'] === 'undefined' || !data['status']){
            this.state = {open: false,refreshing: false,
                down: true,
                height: document.documentElement.clientHeight,}
        }
        else{
            this.state = {open: true,refreshing: false,
                down: true,
                height: document.documentElement.clientHeight,}
        }
    }
    onOpenChange = () => {
        this.setState({ open: !this.state.open });
    };


    componentDidMount(){
        this.getData();
    }

    data = [];


    getData(){
        const from = window.neuron.getAccount();
        simpleStoreContract.methods
            .getWorldWideLength()
            .call({
                from,
            })
            .then(length => {
                var indexes = [];
                var i;
                for(i = length - 1; i >=0; i--){
                    indexes.push(i);
                }
                // alert(JSON.stringify(times, null, 2))
                console.log('list account' + window.neuron.getAccount())
                return Promise.all(indexes.map(index => simpleStoreContract.methods.getWorldWideOneByOne(index).call({ from })))
            })
            .then((pack) => {
                this.data = pack;
                // alert(JSON.stringify(this.data, null, 2))
                this.forceUpdate();
                // alert(this.data[0]['title']);
            })
            .catch(err => {
                // this.setState({ loading: false })
                console.error(err)
            })
    }
    //
    // rendersmall(e){
    //     alert(JSON.stringify(e, null, 2));
    //     return (
    //         <Item>{e}</Item>
    //     );
    // }

    render() {

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
        if(this.state.loading === true){
            return(
                <List></List>
            );
        }
        else{
            return(
                <div>
                    <PullToRefresh
                        damping={60}
                        ref={el => this.ptr = el}
                        style={{
                            height: this.state.height,
                            overflow: 'auto',
                        }}
                        indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
                        direction={this.state.down ? 'down' : 'up'}
                        refreshing={this.state.refreshing}
                        onRefresh={() => {
                            this.setState({ refreshing: true });
                            setTimeout(() => {
                                this.setState({ refreshing: false });
                            }, 1000);
                        }}
                    >
                <Drawer
                    className="category-drawer"
                    style={{ minHeight: document.documentElement.clientHeight }}
                    contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
                    sidebar={sidebar}
                    open={this.state.open}
                    onOpenChange={this.onOpenChange}
                >
                </Drawer>
                <NavBar icon={<Icon type="ellipsis"/>} onLeftClick={this.onOpenChange}>查看世界</NavBar>
            {/*TODO: backend exchange*/}
            <SearchBarWrapper submit={(value)=>{alert(value)}} style={{zindex: 1}}/>
                <List>
                    {this.data.map((e)=><Item arrow="horizontal"
                                              multipleLine
                                              onClick={() => {this.props.history.push({
                                                      pathname: '/follow',
                                                      query: {
                                                          title: e['title'],
                                                          contents: e['contents'],
                                                          address: [
                                                              e['province'],
                                                              e['district'],
                                                              e['street'] ],
                                                          category: e['category']

                                                      }
                                                  }
                                              )}}
                                              platform="android">{e['title']}
                        <Brief>
                            {e['contents']}
                        </Brief></Item>)}
                </List>
                    </PullToRefresh>
                </div>
            );
        }
    }
}

// function MyBody(props) {
//     return (
//         <div className="am-list-body my-body">
//             <span style={{ display: 'none' }}>you can custom body wrap element</span>
//             {props.children}
//         </div>
//     );
// }
//
// const data = [
//     {
//         img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
//         title: 'Meet hotel',
//         des: '不是所有的兼职汪都需要风吹日晒',
//     },
//     {
//         img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
//         title: 'McDonald\'s invites you',
//         des: '不是所有的兼职汪都需要风吹日晒',
//     },
//     {
//         img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
//         title: 'Eat the week',
//         des: '不是所有的兼职汪都需要风吹日晒',
//     },
// ];
// const NUM_SECTIONS = 5;
// const NUM_ROWS_PER_SECTION = 5;
// let pageIndex = 0;
//
// const dataBlobs = {};
// let sectionIDs = [];
// let rowIDs = [];
// function genData(pIndex = 0) {
//     for (let i = 0; i < NUM_SECTIONS; i++) {
//         const ii = (pIndex * NUM_SECTIONS) + i;
//         const sectionName = `Section ${ii}`;
//         sectionIDs.push(sectionName);
//         dataBlobs[sectionName] = sectionName;
//         rowIDs[ii] = [];
//
//         for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
//             const rowName = `S${ii}, R${jj}`;
//             rowIDs[ii].push(rowName);
//             dataBlobs[rowName] = rowName;
//         }
//     }
//     sectionIDs = [...sectionIDs];
//     rowIDs = [...rowIDs];
// }
//
// class Demo extends React.Component {
//     constructor(props) {
//         super(props);
//         const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
//         const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];
//
//         const dataSource = new ListView.DataSource({
//             getRowData,
//             getSectionHeaderData: getSectionData,
//             rowHasChanged: (row1, row2) => row1 !== row2,
//             sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
//         });
//
//         this.state = {
//             dataSource,
//             isLoading: true,
//             height: document.documentElement.clientHeight * 3 / 4,
//         };
//     }
//
//     componentDidMount() {
//         // you can scroll to the specified position
//         // setTimeout(() => this.lv.scrollTo(0, 120), 800);
//
//         const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
//         // simulate initial Ajax
//         setTimeout(() => {
//             genData();
//             this.setState({
//                 dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
//                 isLoading: false,
//                 height: hei,
//             });
//         }, 600);
//     }
//
//     // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
//     // componentWillReceiveProps(nextProps) {
//     //   if (nextProps.dataSource !== this.props.dataSource) {
//     //     this.setState({
//     //       dataSource: this.state.dataSource.cloneWithRowsAndSections(nextProps.dataSource),
//     //     });
//     //   }
//     // }
//
//     onEndReached = (event) => {
//         // load new data
//         // hasMore: from backend data, indicates whether it is the last page, here is false
//         if (this.state.isLoading && !this.state.hasMore) {
//             return;
//         }
//         console.log('reach end', event);
//         this.setState({ isLoading: true });
//         setTimeout(() => {
//             genData(++pageIndex);
//             this.setState({
//                 dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
//                 isLoading: false,
//             });
//         }, 1000);
//     }
//
//     render() {
//         const separator = (sectionID, rowID) => (
//             <div
//                 key={`${sectionID}-${rowID}`}
//                 style={{
//                     backgroundColor: '#F5F5F9',
//                     height: 8,
//                     borderTop: '1px solid #ECECED',
//                     borderBottom: '1px solid #ECECED',
//                 }}
//             />
//         );
//         let index = data.length - 1;
//         let circle =  4;
//         const row = (rowData, sectionID, rowID) => {
//             if (index < 0) {
//                 index = data.length - 1;
//             }
//             if (circle < 0){
//                 circle = 4;
//             }
//             const obj = data[index--];
//             if (circle === 0 ){
//                 circle--;
//                 return (
//                     <div>
//                         <div key={rowID} style={{ padding: '0 15px' }}>
//                             <div
//                                 style={{
//                                     lineHeight: '50px',
//                                     color: '#888',
//                                     fontSize: 18,
//                                     borderBottom: '1px solid #F6F6F6',
//                                 }}
//                             >{obj.title}</div>
//                             <div style={{ display: '-webkit-box', display: 'flex', padding: '15px 0' }}>
//                                 <img style={{ height: '64px', marginRight: '15px' }} src={obj.img} alt="" />
//                                 <div style={{ lineHeight: 1 }}>
//                                     <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{obj.des}</div>
//                                     <div><span style={{ fontSize: '30px', color: '#FF6E27' }}>35</span>¥ {rowID}</div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div
//                             style={{
//                                 backgroundColor: '#F5F5F9',
//                                 height: 8,
//                                 borderTop: '1px solid #ECECED',
//                                 borderBottom: '1px solid #ECECED'
//                             }}
//                         />
//                     </div>
//                 );
//             }
//             else{
//                 circle--;
//                 return (
//                     <div key={rowID} style={{ padding: '0 15px' }}>
//                         <div
//                             style={{
//                                 lineHeight: '50px',
//                                 color: '#888',
//                                 fontSize: 18,
//                                 borderBottom: '1px solid #F6F6F6',
//                             }}
//                         >{obj.title}</div>
//                         <div style={{ display: '-webkit-box', display: 'flex', padding: '15px 0' }}>
//                             <img style={{ height: '64px', marginRight: '15px' }} src={obj.img} alt="" />
//                             <div style={{ lineHeight: 1 }}>
//                                 <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{obj.des}</div>
//                                 <div><span style={{ fontSize: '30px', color: '#FF6E27' }}>35</span>¥ {rowID}</div>
//                             </div>
//                         </div>
//                     </div>
//                 );
//             }
//         };
//
//         return (
//             <ListView
//                 ref={el => this.lv = el}
//                 dataSource={this.state.dataSource}
//                 // renderHeader={() => <span>header</span>}
//                 renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
//                     {this.state.isLoading ? 'Loading...' : 'Loaded'}
//                 </div>)}
//                 // renderSectionHeader={(sectionData) => (
//                 //     <div
//                 //         key={`${sectionData}`}
//                 //         style={{
//                 //             backgroundColor: '#F5F5F9',
//                 //             height: 8,
//                 //             borderTop: '1px solid #ECECED',
//                 //             borderBottom: '1px solid #ECECED',
//                 //         }}
//                 //     />
//                 // )}
//                 renderBodyComponent={() => <MyBody />}
//                 renderRow={row}
//                 renderSeparator={separator}
//                 style={{
//                     height: this.state.height,
//                     overflow: 'auto',
//                 }}
//                 pageSize={4}
//                 onScroll={() => { console.log('scroll'); }}
//                 scrollRenderAheadDistance={500}
//                 onEndReached={this.onEndReached}
//                 onEndReachedThreshold={10}
//             />
//         );
//     }
// }

export default World;