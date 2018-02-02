import React, { Component } from 'react';
import {Form} from 'antd'
import 'antd/dist/antd.css';


export default class Generator extends Component {

    render() {
        const {parameter = {}} = this.props;

        return (
            <Form layout='inline' onSubmit={e=>{
                e.preventDefault();
            }}>
                {
                    Object.entries(parameter).map(item=>
                        <Form.Item label={item[0]}>
                            {
                                item[1]
                            }
                        </Form.Item>)
                }

            </Form>
        );
    }
};
