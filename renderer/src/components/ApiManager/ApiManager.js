import React, {Component} from 'react';
import {Table,Button,Form,Input,Select} from 'antd'
import 'antd/dist/antd.css';
import ModalWrapper from "../Base/ModalWrapper";
import QuickPropover from "../QuickPropover";
import BaseComponent from "../Base/BaseComponent";
import axios from "axios"
import FormUtils from "../../js/ant/FormUtils";
import JSONResult from "./JSONResult";

export default class Generator extends BaseComponent {

    componentWillMount() {
        this.dataSource = JSON.parse(localStorage.getItem('apis')||'[]');
        this.$setInputValue('type','post')
        this.$setInputValue('protocol','http://')
    }

    render() {
        return (
            <Table
                title={()=><p className='tar'><Button onClick={()=>ModalWrapper.$show(({instance})=>
                    <Form onSubmit={e=>{
                        e.preventDefault();
                        if (!this.$formCheck(
                                ['url', v => v, '请输入url地址！']
                            )) {

                            let
                                form = this.$getInputValue(['protocol','url', 'type']),
                                url = form.protocol+form.url,
                                parameter = instance.state.parameter,
                                promise = Promise.resolve();
                                instance.$load('submit');


                                if(form.type==='get'){
                                    promise = axios.get(url,{
                                        params:parameter
                                    });
                                }else{
                                    promise = axios.post(url,parameter);
                                }
                                // 写一个全局配置，来管理成功和失败的条件。
                                promise.then(data=>{
                                    ModalWrapper.$showNew(()=><JSONResult json={data}/>)
                                }).catch(()=>{

                                })
                        }


                    }}>
                        <Form.Item label='URL地址' {...FormUtils.formItemLayout(1)}>
                            <Input
                                addonBefore={<Select defaultValue="http://" onChange={v=>this.$setInputValue('protocol',v)} style={{ width: 90 }}>
                                    <Select.Option value="http://">http://</Select.Option>
                                    <Select.Option value="https://">https://</Select.Option>
                                    </Select>}
                                onInput={this.$onInput('url')}/>
                        </Form.Item>
                        <Form.Item label='方式' {...FormUtils.formItemLayout(1)}>
                            <Select defaultValue={this.$getInputValue('type')} onChange={v=>this.$setInputValue('type',v)}>
                                <Select.Option value='post'>POST</Select.Option>
                                <Select.Option value='get'>GET</Select.Option>
                            </Select>
                        </Form.Item>
                        {
                            Object.entries(instance.state.parameter||{}).map(i=><Form.Item {...FormUtils.formItemLayout(1)} label={i[0]}>{i[1]}</Form.Item>)
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
                dataSource={this.dataSource}
                columns={[
                    {
                        title: '姓名',
                        dataIndex: 'name'
                    },
                    {
                        title: '年龄',
                        dataIndex: 'age'
                    },
                    {
                        title: '住址',
                        dataIndex: 'address'
                    }
                ]}
            />
        );
    }
};
