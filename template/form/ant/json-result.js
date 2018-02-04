function a() {
    return {
        parameters:
            {
                className: String,
                fields: Array,
                labels: Array,
                params:Array,
                valides:Array
            },
        compile(p) {
            const {fields, className, labels,params,valides} = p;
            const className2 = className.replace(/^\S/,s=>s.toLowerCase());

            return `
                                import {Form,Input,Button,DatePicker,Switch} from "antd";
                                import React from "react";
                                import BaseComponent from "./BaseComponent";
                                
                                export default class ${className} extends BaseComponent {
                                
                                    componentWillMount() {
                                    }
                                
                                    render(){
                                          const
                                                value = {
                                                    width:'5em',
                                                    display:'inline-block',
                                                    marginRight:'10px'
                                            },
                                             ${className2} = this.state.${className2} || {};
                                
                                        return  <div>
                                            <Form layout='inline' onSubmit={e => {
                                                e.preventDefault();
                                                if (!this.$formCheck(
                                                        ${params.map((i, index) => `['${i}',v=>v,'${valides[index]}'],`).join("\r\n")}
                                            )) {
                                                    this.$load('submit');
                                                    get(this.$getInputValue([${params.map(i=>`"${i}"`)}])).then((data)=>{
                                                        this.$cancel("submit");
                                                        this.setState({${className2}:data})
                                                    });
                                                }
                                            }}>
                                                ${
                                                    params.map(i=>`<Form.Item><Input onChange={this.$onInput('${i}')}/></Form.Item>`).join('\r\n')
                                                }
                                                <Form.Item> <Button loading={this.$isLoading('submit')} htmlType='submit' type='primary'>查询</Button></Form.Item>
                                            </Form>
                                            <div style={{
                                                margin:'20px 10px'
                                            }}>
                                                 ${fields.map((i,index)=>`<p><span style={value}>${labels[index]}:</span>{${className2}.${i}}</p>`).join('\r\n')}
                                            </div>
                                            </div>;
                                    }
                                }
            `
        }
    }
}

