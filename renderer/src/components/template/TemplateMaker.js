import React, {Component} from 'react';
import {Form, Button, Input, Select} from 'antd'
import 'antd/dist/antd.css';
import BaseComponent from "../Base/BaseComponent";
import DynamicList from "../DynamicList/DynamicList";
import ShortcutSelects from "../selects/ShortcutSelects";
import store from "../../store"
import "./css/template-maker.scss"

const {clipboard} = window.require('electron');

export default class TemplateMaker extends BaseComponent {

    state = {
        params: [],
        notifyParams:[]
    }

    componentWillMount() {
    }


    render() {
        let {params,notifyParams, template, viewTemplate,compiledTemplate} = this.state;
        return (
            <div className='template-maker'>
                <div className="maker">
                    <Form onSubmit={e => {
                        e.preventDefault();
                    }}>
                        <Form.Item label='notify-params'>
                            <DynamicList
                                defaultList={notifyParams}
                                renderItem={(item, index) => <div>
                                    <Input placeholder='请输入字段名' onInput={this.$onInput(v => item.key = v)}/>
                                    <Input placeholder='请输入字段值' onInput={this.$onInput(v => item.value = v)}/>
                                </div>}
                            />
                        </Form.Item>
                        <Form.Item label='参数'>
                            <DynamicList
                                defaultList={params}
                                renderItem={(item, index) => <div>
                                    <Input placeholder='请输入参数名字' onInput={this.$onInput(v => item.name = v)}/>
                                    <Select style={{width: 220}} onSelect={v=>item.type = v}>
                                        <Select.Option value="Object">对象:{"{a:1,b:2,c:3}"}</Select.Option>
                                        <Select.Option value="Array">数组:[1,2,3,4,5]</Select.Option>
                                        <Select.Option value="String">字符串:12345</Select.Option>
                                        <Select.Option value="Number">数字:123</Select.Option>
                                    </Select>
                                </div>}
                            />
                        </Form.Item>
                        <Form.Item label='模板内容'><Input.TextArea onInput={this.$onInput(v => {

                            let defaultValues = {
                                    Object: '{a:1,b:2,c:3}',
                                    Array: '[1,2,3,4,5]',
                                    Number: '123',
                                    String: '"12345"'
                                },
                                result,
                                viewTemplate,
                                compiledTemplate;
                            result = `
                function template() {

return {
    parameters:{
        ${params.map(i => `${i.name}:${i.type}`)}
    },
    requestLib:{

    },
    //放在文件夹里时有用
    events:{
    },
    compile(params,context) {
        const {${params.map(i => `${i.name}=${defaultValues[i.type]}`)}} = params;
        return \`
            ${v}
        \`
    }
}
}`;
                            try {
                                compiledTemplate = eval(`(${result})`)().compile({});
                            } catch (e) {
                                compiledTemplate = e.message;
                            }
                            viewTemplate = compiledTemplate;
                            this.setState({
                                template: result,
                                compiledTemplate,
                                viewTemplate
                            })
                        })}/></Form.Item>
                        <Form.Item className='tac'><Button onClick={() => {
                            const {onSubmit} = this.props;
                            const {shortcuts} = store.getState();
                            // if (shortcuts.find(i => i.key === this.$getInputValue('key'))) {
                            //
                            // }
                            onSubmit && onSubmit({template, paramsDefined: params});
                        }} htmlType='submit' type='primary'>生成</Button></Form.Item>
                    </Form>
                </div>

                <pre onClick={()=>{
                    this.isShowCompiledTemplate = !this.isShowCompiledTemplate;
                    this.setState({
                        viewTemplate:this.isShowCompiledTemplate ? compiledTemplate : template
                    })
                }}>
                    {viewTemplate}
                </pre>
            </div>
        );
    }
};
