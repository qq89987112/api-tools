import React, {Component} from 'react';
import {Form,Button,Input} from 'antd'
import 'antd/dist/antd.css';
import BaseComponent from "./Base/BaseComponent";
import ModalWrapper from "./Base/ModalWrapper";
import JSTemplateGenerator from "./JSTemplateGenerator";
import {Upload} from "antd"
import DynamicList from "./DynamicList/DynamicList";
const { clipboard } = window.require('electron');

export default class TemplateMaker extends BaseComponent {

    state = {
        params:[]
    }

    componentWillMount() {
    }


    render() {
        return (
            <Form onSubmit={e=>{
                e.preventDefault();
            }}>
                <Form.Item label='参数'>
                    <DynamicList
                        defaultList={this.state.params}
                        renderItem={(item,index)=><div>

                        </div>}
                    />
                </Form.Item>
                <Form.Item label='模板'><Input.TextArea onInput={this.$onInput('subTitle')} /></Form.Item>
                <Form.Item className='tac'><Button htmlType='submit' type='primary'>保存</Button></Form.Item>
            </Form>
        );
    }
};
