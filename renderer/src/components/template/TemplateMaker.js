import React, {Component} from 'react';
import {Form,Button,Input} from 'antd'
import 'antd/dist/antd.css';
import BaseComponent from "../Base/BaseComponent";
import DynamicList from "../DynamicList/DynamicList";
import {TemplateParamsSelect} from "./TemplateParamsSelect";
import ShortcutSelects from "../selects/ShortcutSelects";
import store from "../../store"
import ModalWrapper from "../Base/ModalWrapper";

const { clipboard } = window.require('electron');

export default class TemplateMaker extends BaseComponent {

    state = {
        params:[]
    }

    componentWillMount() {
    }


    render() {
        let {params} = this.state;
        return (
            <Form onSubmit={e=>{
                e.preventDefault();
            }}>
                <Form.Item label='快捷键'><ShortcutSelects  onChange={v=>{
                        this.$setInputValue('key',v)
                    }}/></Form.Item>
                <Form.Item label='参数'>
                    <DynamicList
                        defaultList={params}
                        renderItem={(item,index)=><div>
                          <Input placeholder='请输入参数名字' onInput={this.$onInput(v=>item.name=v)} />
                          <TemplateParamsSelect placeholder='请选择参数类型' onSelect={v=>item.type=v} />
                        </div>}
                    />
                </Form.Item>
                <Form.Item label='模板内容'><Input.TextArea onInput={this.$onInput('template')} /></Form.Item>
                <Form.Item className='tac'><Button onClick={()=>{
                    const {onSubmit} = this.props;
                    const {shortcuts} = store.getState();
                    // if (shortcuts.find(i => i.key === this.$getInputValue('key'))) {
                    //
                    // }
                    let defaultValues = {
                        Object:'{}',
                        Array:'[]',
                        Number:'0',
                        String:''
                    };
                    let result = `
                    function template() {

    return {
        parameters:{
            ${params.map(i=>`${i.name}=${i.type}`)}
        },
        requestLib:{

        },
        //放在文件夹里时有用
        events:{
        },
        compile(params,context) {
            const {${params.map(i=>`${i.name}=${defaultValues[i.type]}`)}} = params;
            return \`
                ${this.$getInputValue('template')}
            \`
        }
    }
}`;
                    onSubmit&&onSubmit({template:result,key:this.$getInputValue('key'),paramsDefined:params});
                }} htmlType='submit' type='primary'>生成</Button></Form.Item>
            </Form>
        );
    }
};
