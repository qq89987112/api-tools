import React, {Component} from 'react';
import 'antd/dist/antd.css';
import BaseComponent from "../../../components/Base/BaseComponent";
import JSTemplateGenerator from "./components/JSTemplateGenerator";
import TemplateShortcut from "../../../remote-main/TemplateShortcut";
const { clipboard,remote } = window.require('electron');

export default class JSTemplate extends BaseComponent {

    componentWillMount() {
        const setState = (template)=> {
            this.setState({
                params:template.params||{},
                template:template.template||''
            })
        }
        TemplateShortcut.onShortcut((shortcut,template)=>{
            setState(template);
        })
        setState(this.props.location.state || {});
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
                        url:result.url,
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
