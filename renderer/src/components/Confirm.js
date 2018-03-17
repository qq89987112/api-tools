import {Popconfirm} from "antd";
import React from "react";
import BaseComponent from "./BaseComponent";



export default class Confirm extends BaseComponent {
    render(){
        //onConfirm onCancel
        const {title="确定要删除？",children,jump=false,...rest} = this.props;
        return  <Popconfirm
            visible={this.state.visible}
            onVisibleChange={v=>{
                if (jump&&v) {
                    let onConfirm = rest.onConfirm;
                    onConfirm&&onConfirm();
                }else{
                    this.setState({ visible:v });
                }
            }}
            title={title}
            okText="是"
            cancelText="否" {...rest}>
            {children||"删除"}
        </Popconfirm>
    }
};