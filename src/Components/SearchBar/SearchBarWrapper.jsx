import { SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import React, {Component} from 'react'

// TODO:Note 1
//must create submit & defaultvalue
class SearchBarWrapper extends Component{


    render(){
        return(
            <SearchBar
                // value = ''
                placeholder=""
                onSubmit={this.props.submit}
                onClear={value => console.log(value, 'onClear')}
                // onCancel={value => }
                // onChange={this.onChange}
            />
        );
    }
}

export default SearchBarWrapper;