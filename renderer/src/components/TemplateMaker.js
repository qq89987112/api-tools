import React, {Component} from 'react';
import {Form,Button,Input} from 'antd'
import 'antd/dist/antd.css';
import BaseComponent from "./Base/BaseComponent";
import DynamicList from "./DynamicList/DynamicList";
import {TemplateParamsSelect} from "./selects/TemplateParamsSelect";
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
                          <Input placeholder='请输入参数名字' />
                          <TemplateParamsSelect/>
                        </div>}
                    />
                </Form.Item>
                <Form.Item label='模板内容'><Input.TextArea onInput={this.$onInput('template')} /></Form.Item>
                <Form.Item className='tac'><Button htmlType='submit' type='primary'>生成</Button></Form.Item>
            </Form>
        );
    }
};
