import {Form,Input,Button,DatePicker} from "antd";
import React from "react";
import FormUtils from "./ant-custom/FormUtils";
import BaseComponent from "./BaseComponent";
import AvatarUploader from "./ant-custom/AvatarUploader";




export default class StoryEdit extends BaseComponent {
    render(){
        const onSubmit = this.props.onSubmit;
        return  <Form onSubmit={e=>{
            e.preventDefault();
            this.$load('submit');
            onSubmit&&onSubmit().then(()=>this.$cancel('submit'));
        }}>
            <Form.Item {...FormUtils.formItemLayout(1)} label='设置封面'><AvatarUploader/></Form.Item>
            <Form.Item {...FormUtils.formItemLayout(1)} label='副标题'><Input/></Form.Item>
            <Form.Item {...FormUtils.formItemLayout(1)} label='更新日期'><DatePicker/></Form.Item>
            <Form.Item className='tac'><Button htmlType='submit' type='primary'>保存</Button></Form.Item>
        </Form>
    }
}