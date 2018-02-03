import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {Upload} from "antd"
import Template from "../js/template";


export default class TemplateUpload extends Component {

    onFileSelect(file) {
        const {onTemplate = ()=>{}} = this.props;
        // Template.load(file).then(()=>onTemplate)
        let fr = new FileReader();
        fr.readAsText(file);
        fr.onload = () =>{
            onTemplate(fr.result);
        }
    }
    render() {
        return (
            <Upload.Dragger showUploadList={false} customRequest={e => this.onFileSelect(e.file)}><p style={{lineHeight:"2em"}}>小伙子</p></Upload.Dragger>
        );
    }
};
