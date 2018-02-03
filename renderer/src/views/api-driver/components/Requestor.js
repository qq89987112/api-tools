import React from 'react';
import {Form, Input, Button, Select} from 'antd'
import BaseComponent from "../../../components/Base/BaseComponent";
import FormUtils from "../../../js/ant/FormUtils";
import axios from "axios"
import QuickPropover from "./QuickPropover";

export default class Requestor extends BaseComponent {

    render() {
        let { onResult,...rest} = this.props;

        return (
            <QuickPropover {...rest} content={<Form onSubmit={e => {
                e.preventDefault();
                if (!this.$formCheck(
                        ['url', v => v, '请输入url地址！']
                    )) {

                    let
                        form = this.$getInputValue(['protocol', 'url', 'type']),
                        url = form.protocol + form.url,
                        parameter = this.state.parameter,
                        promise = Promise.resolve();
                    this.$load('submit');


                    if (form.type === 'get') {
                        promise = axios.get(url, {
                            params: parameter
                        });
                    } else {
                        promise = axios.post(url, parameter);
                    }
                    // 写一个全局配置，来管理成功和失败的条件。
                    promise.then(data => {
                        onResult && onResult(data);
                    }).catch(() => {

                    })
                }
            }}>
                <Form.Item label='URL地址' {...FormUtils.formItemLayout(1)}>
                    <Input
                        addonBefore={<Select defaultValue="http://" onChange={v => this.$setInputValue('protocol', v)}
                                             style={{width: 90}}>
                            <Select.Option value="http://">http://</Select.Option>
                            <Select.Option value="https://">https://</Select.Option>
                        </Select>}
                        onInput={this.$onInput('url')}/>
                </Form.Item>
                <Form.Item label='方式' {...FormUtils.formItemLayout(1)}>
                    <Select defaultValue={this.$getInputValue('type')} onChange={v => this.$setInputValue('type', v)}>
                        <Select.Option value='post'>POST</Select.Option>
                        <Select.Option value='get'>GET</Select.Option>
                    </Select>
                </Form.Item>
                {
                    Object.entries(this.state.parameter || {}).map(i => <Form.Item {...FormUtils.formItemLayout(1)}
                                                                                   label={i[0]}>{i[1]}</Form.Item>)
                }
                <Form.Item className='tac'>
                    <QuickPropover onSubmit={params => {
                        let parameter = (this.state.parameter || {});
                        parameter[params.name] = params.value;
                        this.setState({
                            parameter
                        })
                    }} title='请填写参数信息！' triggerText='新增'/>
                    <Button htmlType='submit' loading={this.$isLoading('submit')}>请求</Button>
                </Form.Item>
            </Form>}/>
        )
    }
}