import React, {Component} from 'react';
import 'antd/dist/antd.css';
import BaseComponent from "../components/Base/BaseComponent";
import AutoCompleteWrapper from "../components/AutoCompleteWrapper";

const {remote} = window.require('electron');
const glob = remote.require("glob");

export default class Mini extends BaseComponent {

    componentWillMount() {
        this.fileList = glob.sync("D:/crg/github/api-tools/plugins/template/**/*.js");
        this.fileList = this.fileList.map(item => {
            const arr = item.split("/")
            return {
                uri: item,
                fileName:arr.pop()
            }
        })

    }

    render() {
        return (
            <AutoCompleteWrapper dataIndex='fileName' onSelect={item=>Window.open(`/web-views/template-driver/js-template/${encodeURIComponent(item.uri)}`)}  onSearch={input => {
                return new Promise((resolve, reject) => {
                    resolve(this.fileList.filter(item =>~item.fileName.indexOf(input)))
                })
            }}/>
        );
    }
};
