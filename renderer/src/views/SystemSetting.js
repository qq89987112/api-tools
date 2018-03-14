import {Form, Input, Button, Select, Table} from "antd";
import React from "react";
import BaseComponent from "../components/Base/BaseComponent";
import FormUtils from "../js/ant/FormUtils";
import preference from "../js/preference";
import ModalWrapper from "../components/Base/ModalWrapper";
import { connect } from 'react-redux'

 class SystemSetting extends BaseComponent {

    componentWillMount() {
        this.settings = preference.getSetting();
    }

    loadPage(page,pageSize){

    }

    render() {
        const settings = this.settings;
        const {dataSource} = this.state;
        return <Form onSubmit={e => {
            e.preventDefault();
            preference.setSetting(this.settings)
            this.toast('保存成功');
        }}>
            <Form.Item {...FormUtils.formItemLayout(1)} label='接口前缀'><Input defaultValue={settings.baseURL} onInput={this.$onInput(v=>settings.baseURL = v)}/></Form.Item>
            <Form.Item {...FormUtils.formItemLayout(1)} label='生成策略'>
                <Select style={{ width: 120 }} defaultValue='clipboard' onChange={this.$onInput(v=>settings.generation = v)}>
                    <Select.Option value='clipboard'>复制到剪切板</Select.Option>
                    <Select.Option value='copy-file'>复制文件</Select.Option>
                    <Select.Option value='open-file'>打开文件</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item {...FormUtils.formItemLayout(1)} label='模板文件夹'><Input  defaultValue={settings.templateDir} onInput={this.$onInput(v=>settings.templateDir = v)}/></Form.Item>
            <Form.Item {...FormUtils.formItemLayout(1)} label='查看'><Button onClick={()=>{
                ModalWrapper.$show(()=><Table
                    dataSource={dataSource}
                    columns={[
                        {title:'快捷键',key:'key'},
                        {title:'类型',key:'type'},
                        {title:'数据',key:'data'},
                    ]} />)
            }}>快捷键</Button></Form.Item>
            <Form.Item className='tac'><Button loading={this.$isLoading('submit')} htmlType='submit' type='primary'>保存</Button></Form.Item>
        </Form>;
    }
}


export default connect(state=>{
    return {shortcuts:state.shortcuts};
})(SystemSetting);
