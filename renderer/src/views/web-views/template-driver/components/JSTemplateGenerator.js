import React, { Component } from 'react';
import {Form,Input,Button,message} from 'antd'
import 'antd/dist/antd.css';
import BaseComponent from "../../../../components/Base/BaseComponent";
import Requestor from "../../api-driver/components/Requestor";


export default class JSTemplateGenerator extends BaseComponent {



    render() {
        let {template,onSubmit,defaultValues = {}} = this.props,
            parameters = {},
            orginTemplate = template;

        if(!template) return <div>模板为空！</div>

        Object.entries(defaultValues).forEach(item=>{
            this.$setInputValue(item[0],item[1]);
        })

        try{
            template = eval(`(${template})`)();
            parameters = template.parameters;
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
                        let result = template.compile(form);
                        onSubmit&&onSubmit({
                            url:this.$getInputValue("url"),
                            result,
                            params:originForm,
                            template:orginTemplate
                        });
                    }catch (e){
                        message.error(e,"编译出错！");
                        // 在此处，进行控制台调试
                        console.error(form);
                    }

                }}>
                    <Form.Item label="url"><Input  defaultValue={this.$getInputValue("url")} onInput={this.$onInput("url")}/></Form.Item>
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
