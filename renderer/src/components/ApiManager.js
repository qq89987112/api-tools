import React, {Component} from 'react';
import {Table,Button,Form,Input} from 'antd'
import 'antd/dist/antd.css';
import ModalWrapper from "./ModalWrapper";
import QuickPropover from "./QuickPropover";
import BaseComponent from "./BaseComponent";


export default class Generator extends BaseComponent {

    componentWillMount() {
        this.dataSource = [{
            key: '1',
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号'
        }, {
            key: '2',
            name: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号'
        }];

    }

    render() {
        return (
            <Table
                title={()=><p className='tar'><Button onClick={()=>ModalWrapper.$show(({instance})=>
                    <Form onSubmit={e=>{
                        e.preventDefault();
                        // let params =
                        instance.$load('submit');

                    }}>
                        <Form.Item label='URL地址'><Input onInput={this.$onInput('url')}/></Form.Item>
                        {
                            Object.entries(instance.state.parameter||{}).map(i=><Form.Item labelCol='3' label={i[0]}>{i[1]}</Form.Item>)
                        }
                        <Form.Item className='tac'>
                            <QuickPropover onSubmit={params=>{
                                let parameter = (instance.state.parameter||{});
                                parameter[params.name] = params.value;
                                instance.setState({
                                    parameter
                                })
                            }} title='请填写参数信息！' triggerText='新增' />
                            <Button htmlType='submit' loading={instance.$isLoading('submit')}>请求</Button>
                        </Form.Item>
                    </Form>)} type='primary'>新增</Button></p>}
                dataSource={this.dataSource} columns={[{
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
            }, {
                title: '住址',
                dataIndex: 'address',
                key: 'address',
            }]}
            />
        );
    }
};
