import React, {Component} from 'react';
import {Table,Button} from 'antd'
import 'antd/dist/antd.css';
import BaseComponent from "../../components/Base/BaseComponent";
import ModalWrapper from "../../components/Base/ModalWrapper";
import TemplateUpload from "../../components/TemplateUpload";
import JSTemplateGenerator from "../api-driver/components/JSTemplateGenerator";
import UITemplateGenerator from "../api-driver/components/UITemplateGenerator";

export default class Generator extends BaseComponent {

    componentWillMount() {
        this.dataSource = JSON.parse(localStorage.templates||'[]');
        this.$setInputValue('type','post')
        this.$setInputValue('protocol','http://')
    }


    render() {
        const JSTemplate = <TemplateUpload  onTemplate={template=>ModalWrapper.$show(({instance})=><JSTemplateGenerator onSubmit={result=>{
                // console.log(jsBeautify(htmlBeautify(result)))
                // this.toast("已复制到剪贴板。");
                console.log(result);
                let value = this.dataSource;
                value.push({content:result})
                this.setState({
                    dataSource:value
                })
                //暂时注释
                // localStorage.templates = JSON.stringify(value)
                instance.close();
            }
            } template={template}/>)} />;

        const UITemplate = <TemplateUpload  onTemplate={template=>ModalWrapper.$show(({instance})=><UITemplateGenerator onSubmit={result=>{
            // console.log(jsBeautify(htmlBeautify(result)))
            // this.toast("已复制到剪贴板。");
            console.log(result);
            let value = this.dataSource;
            value.push({content:result})
            this.setState({
                dataSource:value
            })
            //暂时注释
            // localStorage.templates = JSON.stringify(value)
            instance.close();
        }
        } template={template}/>)} />;
        return (
            <Table
                title={()=><div>
                    {
                        JSTemplate
                    }
                    {
                        UITemplate
                    }
                </div>}
                dataSource={this.dataSource}
                columns={[
                    {
                        title: '名字',
                        dataIndex: 'name'
                    },
                    {
                        title: '内容',
                        dataIndex: 'content'
                    },
                    {
                        title: '使用记录',
                        dataIndex: 'record'
                    },
                    {
                        title: '编辑',
                        dataIndex: 'result'
                    }
                ]}
            />
        );
    }



};
