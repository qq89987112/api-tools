import React, { Component } from 'react';
import {Form,Input} from 'antd'
import 'antd/dist/antd.css';


export default class Generator extends Component {

    onInput(key){

    }

    render() {
        const {parameter = {}} = this.props;
        const fields = Object.entries(parameter).filter(item=>!~item.indexOf('-type')).reduce((prev,cur)=>{
            prev[cur[0]] = parameter[`${cur[0]}-type`];
            return prev;
        },{})
        return (
            <Form layout='inline' onSubmit={e=>{
                e.preventDefault();
            }}>
                {
                    Object.entries(fields).map(item=>{
                        const type = (item[1]||"").toLowerCase();
                        return <Form.Item label={item[0]}>
                            {
                                type ==='string'&&<Input/>
                            }
                        </Form.Item>
                    })
                }
            </Form>
        );
    }
};
