import React from 'react';
import {Popover,Form,Input,Button,Select} from 'antd'
import BaseComponent from "../../../components/Base/BaseComponent";


export default class QuickPropover extends BaseComponent {

    render() {
        let { content,title,triggerText,placement='top' } = this.props;

        return (
            <Popover placement={placement}  onVisibleChange={v=> this.setState({popover:v})} visible={this.state.popover} title={title} content={content} trigger="click">
                <Button>{triggerText}</Button>
            </Popover>
        )
    }
}