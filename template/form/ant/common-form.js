function a() {
    return {
        parameters:
            {
                className: String,
                fields: Array,
                fieldValids: Array,
                labels: Array
            },
        compile(params) {
            const {fields, className, fieldValids, labels} = params;
            return `
                                import {Form,Input,Button,DatePicker,Switch} from "antd";
                                import React from "react";
                                import FormUtils from "./ant-custom/FormUtils";
                                import BaseComponent from "./BaseComponent";
                                
                                export default class ${className} extends BaseComponent {
                                
                                    componentWillMount(){
                                        const {${className}={}} = this.props;
                                        ${
                fields.map(i => `this.$setInputValue('${i}',${className}.${i})`).join("\r\n")
                }
                                    }
                                
                                    render(){
                                        const {onSubmit,${className.toLowerCase()}={}} = this.props;
                                
                                        return  <Form onSubmit={e=>{
                                            e.preventDefault();
                                            if (!this.$formCheck(
                                                    ${fields.map((i, index) => `['${i}',v=>v,'${fieldValids[index]}'],`)}
                                                )) {
                                                this.$load('submit');
                                                onSubmit&&onSubmit(this.$getInputValue([${fields.map(i => `'${i}',`)}])).then(()=>{
                                                    this.$cancel('submit')
                                                });
                                            }
                                        }}>
                                        ${
                labels.map((i, index) => `<Form.Item {...FormUtils.formItemLayout(1)} label='${i}'><Input defaultValue={this.$getInputValue('${fields[index]}')} onInput={this.$onInput('${fields[index]}')}/></Form.Item>`)
                }
                                            <Form.Item className='tac'><Button loading={this.$isLoading('submit')} htmlType='submit' type='primary'>保存</Button></Form.Item>
                                        </Form>;
                                    }
                                }
            `
        }
    }
}