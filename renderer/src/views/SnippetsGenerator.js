import React, {Component} from 'react';
import {AutoComplete,Button} from "antd"
import BaseComponent from "../components/Base/BaseComponent";
import store from "../store"

export default class TemporaryTemplate extends BaseComponent {
    render() {
        const {notifyDir='选择通知地址'} = this.state;
        return <div>
            <AutoComplete>

            </AutoComplete>
            <p className='tac'><Button>{notifyDir}</Button></p>
        </div>
    }
};
