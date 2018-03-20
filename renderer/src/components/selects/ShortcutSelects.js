import {Select} from "antd";
import React from "react";
import BaseComponent from "../Base/BaseComponent";



export default class ShortcutSelects extends BaseComponent {

    render(){
        const shortcuts = Array(11).fill(0).map((item,index)=>`F${index+1}`);
        return <Select style={{width:120}} {...this.props}>
            {
                shortcuts.map((item,index)=><Select.Option value={item}>{item}</Select.Option>)
            }
        </Select>
    }
};