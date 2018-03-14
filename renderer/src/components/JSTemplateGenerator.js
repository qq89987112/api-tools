import React, { Component } from 'react';
import {Form,Input,Button,message} from 'antd'
import 'antd/dist/antd.css';
import BaseComponent from "./Base/BaseComponent";
import Requestor from "./Requestor";
import { connect } from 'react-redux'
const { clipboard } = window.require('electron');

class JSTemplateGenerator extends BaseComponent {

    render() {
        let {template,onSubmit,dispatch} = this.props,
            parameters = {},
            defaultValues = template.params||{},
            orginTemplate = template,
            compileResult;

        if(!template.template) return <div>模板为空！</div>

        if(!defaultValues.location){
            defaultValues.location = clipboard.readText();
        }

        Object.entries(defaultValues).forEach(item=>{
            this.$setInputValue(item[0],item[1]);
        })
        try{
            compileResult = eval(`(${template.template})`)();
            parameters = compileResult.parameters;
        }catch(e){
            console.error(e);
            return <div/>
        }
        let parametersKey = Object.keys(parameters);

        return (
            <div>
                <p className='tar'><Requestor onResult={res=>{
                    debugger
                }}/></p>
                <Form onSubmit={e=>{
                    e.preventDefault();

                    let
                        form = this.$getInputValue(parametersKey),
                        originForm = form;
                    form = parametersKey.reduce((prev,cur,index)=>{
                        let
                            type = Object.prototype.toString.call(new parameters[cur]),
                            value = form[cur]||"";
                        // value = value.replace(/，/g,",");
                        switch (type){
                            case "[object Array]":
                                value = value ?value.split(/\s+/).filter(i=>i) : [];
                                break;
                            case "[object String]":
                                value = value ||"";
                                break;
                            case "[object Number]":
                                value = +value || undefined;
                                break;
                            case "[object Object]":
                                try{
                                    value = value ? JSON.parse(value) : {};
                                }catch (e){
                                    value = {};
                                }
                                break;
                            default:
                                break;
                        }
                        prev[cur] = value;
                        return prev;
                    },{})
                    try{
                        let result = compileResult.compile(form);
                        //
                        debugger
                        clipboard.writeText(result);

                        this.toast("已复制到剪贴板。");


                        let template = {
                            location:this.$getInputValue("location"),
                            params:originForm,
                            template:orginTemplate
                        };
                        onSubmit&&onSubmit(template);
                    }catch (e){
                        message.error("编译出错！");
                        // 在此处，进行控制台调试
                        console.error(e);
                        console.error(form);
                    }

                }}>
                    <Form.Item label="location"><Input  defaultValue={this.$getInputValue("location")} onInput={this.$onInput("location")}/></Form.Item>
                    {
                        parametersKey.map((item,i)=>{
                            return <Form.Item key={i} label={item}>
                                {
                                    <Input.TextArea autosize defaultValue={this.$getInputValue(item)} onInput={this.$onInput(item)}/>
                                }
                            </Form.Item>
                        })
                    }
                    <Form.Item><Button htmlType='submit' type='primary'>确定</Button></Form.Item>
                </Form>
            </div>

        );
    }
};

// export default connect(state=>{
//     return {templates:state.templates};
// })(JSTemplateGenerator);

export default JSTemplateGenerator;
