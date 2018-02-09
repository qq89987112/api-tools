import React from 'react';
import {Popover,Form,Input,Button,Select} from 'antd'
import BaseComponent from "./BaseComponent";


export default class PopoverWrapper extends BaseComponent {

    close(){
        this.setState({
            popover:false
        })
    }

    render() {
        let { title,children,content} = this.props;

        content = content({instance:this});

        return (
            <Popover placement="top"  onVisibleChange={v=> this.setState({popover:v})} visible={this.state.popover} title={title} content={content} trigger="click">
                <Button>{children}</Button>
            </Popover>
        )
    }
}