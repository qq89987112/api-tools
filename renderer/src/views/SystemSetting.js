import {Form, Input, Button, DatePicker, Switch} from "antd";
import React from "react";
import BaseComponent from "../components/Base/BaseComponent";
import FormUtils from "../js/ant/FormUtils";
import preference from "../js/preference";

export default class SystemSetting extends BaseComponent {

    componentWillMount() {
        this.$setInputValue('baseURL', preference.getSetting('baseURL'))
    }

    render() {

        return <Form onSubmit={e => {
            e.preventDefault();
            // if (!this.$formCheck()) {
            preference.setSetting('baseURL',this.$getInputValue('baseURL'))
            this.toast('保存成功');
            // }
        }}>
            <Form.Item {...FormUtils.formItemLayout(1)} label='接口前缀'><Input defaultValue={this.$getInputValue('baseURL')} onInput={this.$onInput('baseURL')}/></Form.Item>
            <Form.Item className='tac'><Button loading={this.$isLoading('submit')} htmlType='submit'
                                               type='primary'>保存</Button></Form.Item>
        </Form>;
    }
}