import React from 'react';
import {Popover,Form,Input,Button,Select} from 'antd'
import BaseComponent from "./BaseComponent";


export default class QuickPropover extends BaseComponent {

    render() {
        let { onSubmit,title,triggerText } = this.props;

        return (
            <Popover placement="top"  onVisibleChange={v=> this.setState({popover:v})} visible={this.state.popover} title={title} content={
                <Form layout='inline' onSubmit={e => {
                    e.preventDefault();
                    this.$load('submit');
                    let
                        form = this.$getInputValue(['name','value']),
                        type = form.type;

                    switch (type){
                        case 'string':
                            break;
                        case 'number':
                            form.value = +form.value;
                            break;
                        case 'array':
                            form.value = form.split(",")
                            break;
                        case 'object':
                            form.value = JSON.parse(form.value);
                            break;
                    }

                    onSubmit&&onSubmit(form).then(()=>{
                        this.$cancel('submit');
                        this.setState({
                            popover:false
                        })
                    })
                }
                }>
                    <Form.Item label='参数名'><Input onInput={this.$onInput('name')} /></Form.Item>
                    <Form.Item label='参数值'><Input onInput={this.$onInput('value')} /></Form.Item>
                    <Form.Item label='类型'>
                        <Select defaultValue='string' onChange={v=>this.$setInputValue('type',v)} >
                            <Select.Option value='string'>string</Select.Option>
                            <Select.Option value='number'>number</Select.Option>
                            <Select.Option value='array'>array</Select.Option>
                            <Select.Option value='object'>object</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item><Button htmlType='submit' type='primary' loading={this.$isLoading('submit')}>确定</Button>
                    </Form.Item>
                </Form>} trigger="click">
                <Button>{triggerText}</Button>
            </Popover>
        )
    }
}