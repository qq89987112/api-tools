import React, { Component } from 'react';
import {Form,Input} from 'antd'
import 'antd/dist/antd.css';
import BaseComponent from "../../../components/Base/BaseComponent";


export default class JSTemplateGenerator extends BaseComponent {

    render() {
        const {parameter = {},onSubmit} = this.props;
        const fields = Object.entries(parameter).filter(item=>!~item.indexOf('-type')).reduce((prev,cur)=>{
            prev[cur[0]] = parameter[`${cur[0]}-type`];
            return prev;
        },{})
        return (
            <div>
                <Form layout='inline' onSubmit={e=>{
                    e.preventDefault();
                    onSubmit&&onSubmit(this.$getInputValue( Object.entries(fields).map(i=>i[0])));
                }}>
                    {
                        Object.entries(fields).map(item=>{
                            const type = (item[1]||"").toLowerCase();
                            return <Form.Item label={item[0]}>
                                {
                                    type ==='string'&&<Input onInput={this.$onInput(item[0])}/>
                                }
                            </Form.Item>
                        })
                    }

                </Form>
            </div>

        );
    }
};
