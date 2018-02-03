import React, {Component} from 'react';
import {Table,Button} from 'antd'
import 'antd/dist/antd.css';
import BaseComponent from "../../components/Base/BaseComponent";
import ModalWrapper from "../../components/Base/ModalWrapper";
import TemplateUpload from "../../components/TemplateUpload";
import TemplateGenerator from "../api-driver/components/JSTemplateGenerator";

export default class Generator extends BaseComponent {

    componentWillMount() {
        this.dataSource = JSON.parse(localStorage.templates||'[]');
        this.$setInputValue('type','post')
        this.$setInputValue('protocol','http://')
    }


    render() {
        return (
            <Table
                title={()=><TemplateUpload  onTemplate={template=>ModalWrapper.$show(<TemplateGenerator template={template}/>)} />}
                dataSource={this.dataSource}
                columns={[
                    {
                        title: '名字',
                        dataIndex: 'url'
                    },
                    {
                        title: '内容',
                        dataIndex: 'method'
                    },
                    {
                        title: '使用记录',
                        dataIndex: 'params'
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
