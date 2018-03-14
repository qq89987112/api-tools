import React, {Component} from 'react';
import {Table,Button} from 'antd'
import 'antd/dist/antd.css';
import BaseComponent from "./Base/BaseComponent";
import ModalWrapper from "./Base/ModalWrapper";
import JSTemplateGenerator from "./JSTemplateGenerator";
import {Upload} from "antd"
const { clipboard } = window.require('electron');

export default class TemplateUploadBox extends BaseComponent {

    componentWillMount() {
    }

    onFileSelect(file) {
        // Template.load(file).then(()=>onTemplate)
        const { onSubmit = ()=>{} } = this.props;
        let fr = new FileReader();
        fr.readAsText(file);
        fr.onload = () =>{
            let template = fr.result;
            ModalWrapper.$showNew(({instance})=><JSTemplateGenerator onSubmit={template=>{
                onSubmit(template);
                instance.close();
            }
            } template={template}/>,{footer:null,width:'80%'})
        }
    }
    render() {
        return (
            <Upload.Dragger showUploadList={false} customRequest={e => this.onFileSelect(e.file)}><p style={{lineHeight:"2em"}}>请拖入JS模板</p></Upload.Dragger>
        );
    }
};
