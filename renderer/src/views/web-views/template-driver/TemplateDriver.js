import React, {Component} from 'react';
import {Table,Button} from 'antd'
import 'antd/dist/antd.css';
import BaseComponent from "../../../components/Base/BaseComponent";
import ModalWrapper from "../../../components/Base/ModalWrapper";
import TemplateUpload from "../../../components/TemplateUpload";
import JSTemplateGenerator from "./components/JSTemplateGenerator";
import UITemplateGenerator from "./components/UITemplateGenerator";
import TemplateManager from "./TemplateManager";


const { clipboard } = window.require('electron');

export default class Generator extends BaseComponent {

    componentWillMount() {
    }

    getTemplateGenerator= ({defaultValues={},template,instance})=>{
        return <JSTemplateGenerator defaultValues={defaultValues} onSubmit={result=>{
            // console.log(jsBeautify(htmlBeautify(result)))
            clipboard.writeText(result.result);
            this.toast("已复制到剪贴板。");
            console.log(result.result);
            let value = this.state.dataSource ||[];
            let newTemplate = {
                url:result.url,
                params:result.params,
                template:result.template
            };
            value.push(newTemplate)
            this.setState({
                dataSource:value
            })
            this.refs.templateManager.addTemplate(newTemplate);
            instance.close();
        }
        } template={template}/>
    }


    render() {
        const JSTemplate =<TemplateUpload  onTemplate={template=>ModalWrapper.$show(({instance})=>this.getTemplateGenerator({instance,template}),{footer:null,width:'80%'})} />;

        const UITemplate = <TemplateUpload  onTemplate={template=>ModalWrapper.$show(({instance})=><div>
            <UITemplateGenerator template={template}/>
        </div>,{width:'80%',footer:null})} />;
        return (
            <div>
                {
                    JSTemplate
                }
                {
                    UITemplate
                }
                <TemplateManager ref='templateManager'/>
            </div>
        );
    }



};
