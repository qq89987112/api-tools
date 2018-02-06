function a() {

    return {
        parameters:{
                className: String,
                labels: Array,
                fields: Array,
                fieldValids: Array,
        },
        requestLib:{

        },
        compile(params) {
            const {fields =[], className="", fieldValids=[], labels=[]} = params;
            const
                className2 = className.replace(/^\S/,s=>s.toLowerCase()),
                fieldsTypeMap = fields.reduce((prev,cur)=>{
                    cur = cur.split(".");
                    prev[cur[0]] = cur.slice(-1)[0];
                    return prev;
                },{});

            return `
                                import {Form,Input,Button,DatePicker,Switch} from "antd";
                                import React from "react";
                                import FormUtils from "./ant-custom/FormUtils";
                                import BaseComponent from "./BaseComponent";
                                
                                // 新增 <Button onClick={()=>ModalWrapper.$show(({instance})=><${className} onSubmit={params=>add(params).then(()=>instance.close()).then(()=>reLoad())} />)} type='primary'>新增</Button>
                                // 更新 <Button onClick={()=>ModalWrapper.$show(({instance})=><${className} ${className2}={record} onSubmit={params=>update(Object.assign({id:record.id},params)).then(()=>instance.close()).then(()=>reLoad())} />)} type='primary'>更新</Button>
                                // defaultValue.+?} 
                                export default class ${className} extends BaseComponent {
                                
                                    componentWillMount(){
                                        const {${className2}={}} = this.props;
                                        ${
                fields.map(i => `this.$setInputValue('${i}',${className2}.${i})`).join("\r\n")
                }
                                    }
                                
                                    render(){
                                        const {onSubmit} = this.props;
                                
                                        return  <Form onSubmit={e=>{
                                            e.preventDefault();
                                            if (!this.$formCheck(
                                                    ${fields.map((i, index) => `['${i}',v=>v,'${fieldValids[index]}'],`).join("\r\n")}
                                                )) {
                                                this.$load('submit');
                                                onSubmit&&onSubmit(this.$getInputValue([${fields.map(i => `'${i}'`)}]),{
                                                    load:()=>{this.$load('submit'); },
                                                    cancel:()=>{this.$cancel('submit'); }
                                                })
                                            }
                                        }}>
                                        ${
                                                labels.map((i, index) =>{
                                                                            const type = fieldsTypeMap[i];
                                                                            return  `<Form.Item {...FormUtils.formItemLayout(1)} label='${i}'>${
                                                                                    type==='textarea'&&`<Input.TextArea defaultValue={this.$getInputValue('${fields[index]}')} onInput={this.$onInput('${fields[index]}')}/>`||
                                                                                    `<Input defaultValue={this.$getInputValue('${fields[index]}')} onInput={this.$onInput('${fields[index]}')}/>`
                                                                            }</Form.Item>`
                                                                }).join("\r\n")
                                        }
                                            <Form.Item className='tac'><Button loading={this.$isLoading('submit')} htmlType='submit' type='primary'>保存</Button></Form.Item>
                                        </Form>;
                                    }
                                }
            `
        }
    }
}