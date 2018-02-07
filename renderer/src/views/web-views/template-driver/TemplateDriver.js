import React, {Component} from 'react';
import {Table,Button} from 'antd'
import 'antd/dist/antd.css';
import BaseComponent from "../../../components/Base/BaseComponent";
import ModalWrapper from "../../../components/Base/ModalWrapper";
import TemplateUpload from "../../../components/TemplateUpload";
import JSTemplateGenerator from "./components/JSTemplateGenerator";
import UITemplateGenerator from "./components/UITemplateGenerator";
const { clipboard } = window.require('electron');

export default class Generator extends BaseComponent {

    componentWillMount() {
        this.state.dataSource = JSON.parse(localStorage.templates||'[]');
        this.$setInputValue('type','post')
        this.$setInputValue('protocol','http://')
    }

    getTemplateGenerator= ({defaultValues={},template,instance})=>{
        return <JSTemplateGenerator defaultValues={defaultValues} onSubmit={result=>{
            // console.log(jsBeautify(htmlBeautify(result)))
            clipboard.writeText(result.result);
            this.toast("已复制到剪贴板。");
            console.log(result.result);
            let value = this.state.dataSource;
            value.push({
                url:result.url,
                params:result.params,
                template:result.template
            })
            this.setDataSource(value);
            instance.close();
        }
        } template={template}/>
    }

    setDataSource(dataSource){
        this.setState({
            dataSource
        })
        //暂时注释
        localStorage.templates = JSON.stringify(dataSource)
    }

    render() {
        const JSTemplate =<TemplateUpload  onTemplate={template=>ModalWrapper.$show(({instance})=>this.getTemplateGenerator({instance,template}),{footer:null,width:'80%'})} />;

        const UITemplate = <TemplateUpload  onTemplate={template=>ModalWrapper.$show(({instance})=><div>
            <UITemplateGenerator template={template}/>
        </div>,{width:'80%',footer:null})} />;
        return (
            <div>

                <Table
                    title={()=><div>
                        {
                            JSTemplate
                        }
                        {
                            UITemplate
                        }
                    </div>}
                    dataSource={this.state.dataSource}
                    columns={[
                        {
                            title: 'url',
                            dataIndex: 'url'
                        },
                        {
                            title: 'operation',
                            render:(text,record,index)=><p>
                                <Button onClick={()=>ModalWrapper.$show(({instance})=>{
                                    record.params=record.params||{};
                                    record.params.url = record.url;
                                    return this.getTemplateGenerator({instance,template:record.template,defaultValues:record.params})
                                })}>重新生成</Button>
                                <Button onClick={()=>{
                                    let dataSource = this.state.dataSource;
                                    dataSource.splice(index,1)
                                    this.setDataSource(dataSource)
                                }}>删除</Button>
                            </p>
                        }
                    ]}
                />
            </div>
        );
    }



};
