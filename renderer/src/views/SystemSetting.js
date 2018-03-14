import {Form, Input, Button, Select, Table} from "antd";
import React from "react";
import BaseComponent from "../components/Base/BaseComponent";
import FormUtils from "../js/ant/FormUtils";
import preference from "../js/preference";
import ModalWrapper from "../components/Base/ModalWrapper";
import {connect} from 'react-redux'
import { Collapse } from 'antd';
import TemplateUploadBox from "../components/TemplateUploadBox";
const Panel = Collapse.Panel;
class ShortcutEdit extends BaseComponent {
    render() {
        const types = [
            {
                name:'模板跳转',
                params:[{
                    name:'模板',
                    filed:'template',
                    type:"template"
                }]
            },
            {
                name:'页面跳转',
                params:[{
                    name:'地址',
                    filed:"url",
                    type:String
                },{
                    name:'参数',
                    filed:'params',
                    type:String
                }]
            },

        ];
        const {selected} = this.state;
        const {onSubmit=()=>{}} = this.props;
        return <Form layout='inline' onSubmit={e => {
            e.preventDefault();
            if (!this.$formCheck(
                    ["key", v => v, "请输入快捷键"],
                    ["selected", v => v!==undefined, "请选择类型"],
                )) {
                const {selected,key,...rest} = this.$getInputValue();
                onSubmit({key,type:types[selected].name,params:rest});
            }

        }}>
            <Form.Item label='快捷键'><Input onInput={this.$onInput('key')}/></Form.Item>
            <Form.Item label='类型'>
                <Select style={{width:120}} onChange={v=>{
                    this.setState({'selected':v})
                    this.$setInputValue('selected',v)
                }}>
                    {
                        types.map((item,index)=><Select.Option value={index}>{item.name}</Select.Option>)
                    }
                </Select>
            </Form.Item>
            {
                selected!==undefined&&types[selected].params.map(item=><Form.Item label={item.name}>
                    {
                        item.type === String &&<Input onInput={this.$onInput(item.filed)}/> ||
                        item.type === "template" &&<TemplateUploadBox onSubmit={v=>this.$setInputValue(item.filed,v)}/>
                    }
                </Form.Item>)
            }
            <Form.Item><Button htmlType='submit' type='primary' loading={this.$isLoading('submit')}>确定</Button></Form.Item>
        </Form>
    }
}


class SystemSetting extends BaseComponent {

    componentWillMount() {
        this.settings = preference.getSetting();
    }

    loadPage(page, pageSize = 10) {

    }

    render() {
        const settings = this.settings;
        const {dataSource} = this.state;
        const {dispatch} = this.props;
        return <Form onSubmit={e => {
            e.preventDefault();
            preference.setSetting(this.settings)
            this.toast('保存成功');
        }}>
            <Form.Item {...FormUtils.formItemLayout(1)} label='接口前缀'><Input defaultValue={settings.baseURL}
                                                                            onInput={this.$onInput(v => settings.baseURL = v)}/></Form.Item>
            <Form.Item {...FormUtils.formItemLayout(1)} label='生成策略'>
                <Select style={{width: 120}} defaultValue='clipboard'
                        onChange={this.$onInput(v => settings.generation = v)}>
                    <Select.Option value='clipboard'>复制到剪切板</Select.Option>
                    <Select.Option value='copy-file'>复制文件</Select.Option>
                    <Select.Option value='open-file'>打开文件</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item {...FormUtils.formItemLayout(1)} label='模板文件夹'><Input defaultValue={settings.templateDir} onInput={this.$onInput(v => settings.templateDir = v)}/></Form.Item>
            <Form.Item {...FormUtils.formItemLayout(1)} label='查看'>
                <Collapse bordered={false}>
                    <Panel header={<p>快捷键 <Button onClick={() => ModalWrapper.$showNew(({instance}) =>
                        <ShortcutEdit
                            onSubmit={params => {
                                dispatch({
                                    type:"SHORTCUT_ADD",
                                    shortcut:params
                                });
                                instance.close();
                                this.loadPage(1);
                            }}/>)}>新增</Button></p>}>
                        <Table
                            dataSource={dataSource}
                            columns={[
                                {title: '快捷键', key: 'key'},
                                {title: '类型', key: 'type'},
                                {title: '数据', key: 'data'},
                            ]}/>
                    </Panel>
                </Collapse></Form.Item>
            <Form.Item className='tac'><Button loading={this.$isLoading('submit')} htmlType='submit' type='primary'>保存</Button></Form.Item>
        </Form>;
    }
}


export default connect(state => {
    return {shortcuts: state.shortcuts};
})(SystemSetting);
