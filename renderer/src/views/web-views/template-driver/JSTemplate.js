import React, {Component} from 'react';
import 'antd/dist/antd.css';
import BaseComponent from "../../../components/Base/BaseComponent";
import JSTemplateGenerator from "./components/JSTemplateGenerator";
import TemplateShortcut from "../../../remote-main/TemplateShortcut";
const { clipboard,remote } = window.require('electron');

export default class JSTemplate extends BaseComponent {

    componentWillMount() {
        // 注册全局快捷键监听，避免已打开这个界面时的快捷按键不刷新界面
        const setState = (template)=> {
            this.setState({
                params:template.params||{},
                template:template.template||''
            })
        }
        TemplateShortcut.onShortcut((shortcut,template)=>{
            setState(template);
        })
        //
        let
            {uri} = this.props.match,
            template = this.props.location.state || {};
        if(uri){
            const fs = remote.require("fs");
            template = {
                template :fs.readFileSync(decodeURIComponent(uri))
            };
        }
        setState(template);
    }



    render() {
        const  {params={},template=''} = this.state;
        return (
            <div>
                <p>JSTemplateGenerator</p>
                <JSTemplateGenerator defaultValues={params} onSubmit={result=>{
                    // console.log(jsBeautify(htmlBeautify(result)))
                    clipboard.writeText(result.result);
                    // this.toast("已复制到剪贴板。");
                    alert("已复制到剪贴板。");
                    console.log(result.result);
                    let value = this.state.dataSource;
                    value.push({
                        location:result.location,
                        params:result.params,
                        template:result.template
                    })
                    this.setDataSource(value);
                }
                } template={template}/>
            </div>

        );
    }
};
