import React, {Component} from 'react';
import 'antd/dist/antd.css';
import BaseComponent from "../../components/Base/BaseComponent";
import JSTemplateGenerator from "../web-views/template-driver/components/JSTemplateGenerator";
const { clipboard,remote } = window.require('electron');

export default class JSTemplate extends BaseComponent {

    componentWillMount() {
    }



    render() {
        const {template='',defaults} = remote.getGlobal("JSTEmplateParams") ||{};
        return (
            <JSTemplateGenerator defaultValues={defaults} onSubmit={result=>{
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
            }
            } template={template}/>
        );
    }
};
