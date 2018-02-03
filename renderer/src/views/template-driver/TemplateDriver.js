import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {Upload} from "antd"
import Template from "../../js/template";
import ModalWrapper from "../../components/Base/ModalWrapper";


export default class TemplateDriver extends Component {

    onFileSelect(file) {
        Template.load(file).then(template => {
            ModalWrapper.$show(() => <p>{JSON.stringify(template.getParameter())}</p>)
        })
    }

    onInput(key){

    }

    render() {
        return (
            <Upload.Dragger showUploadList={false} customRequest={e => this.onFileSelect(e.file)}><p>小伙子</p></Upload.Dragger>
        );
    }
};
