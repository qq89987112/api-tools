import React, {Component} from 'react';
import {Table,Button,Input} from 'antd'
import 'antd/dist/antd.css';
import BaseComponent from "../../../components/Base/BaseComponent";
import ModalWrapper from "../../../components/Base/ModalWrapper";
import PopoverWrapper from "../../../components/Base/PopoverWrapper";
import TemplateShortcut from "../../../remote-main/TemplateShortcut";
import JSTemplateGenerator from "./components/JSTemplateGenerator";
const { clipboard } = window.require('electron');


export default class TemplateManager extends BaseComponent {

    componentWillMount() {
        this.state.dataSource = JSON.parse(localStorage.templates||'[]');
    }

    setDataSource(dataSource){
        this.setState({
            dataSource
        })
        //暂时注释
        localStorage.templates = JSON.stringify(dataSource)
    }

    // url
    // params
    // template
    addTemplate(template){
        this.setDataSource(this.state.dataSource.concat(template))
    }


    render() {
        return (
            <div>
                <Table
                    title={()=><div className='tar'>
                        <Button onClick={()=>{}}>导入模板</Button>

                        <Button onClick={()=>{}}>导出模板</Button>
                    </div>}
                    dataSource={this.state.dataSource}
                    columns={[
                        {
                            title: 'url',
                            dataIndex: 'url'
                        },
                        {
                            title: 'shortcut',
                            dataIndex: 'shortcut',
                            render:(text,record)=><PopoverWrapper content={({instance})=><p>
                                <Input onInput={this.$onInput(v=>instance.shortcut=v)} placeholder='请输入快捷键'/>
                                <Button onClick={()=>{
                                    record.shortcut = instance.shortcut;
                                    this.setDataSource(this.state.dataSource);
                                    TemplateShortcut.reLoad();
                                    instance.close();
                                }}>确定</Button>
                            </p>}>{text}</PopoverWrapper>
                        },
                        {
                            title: 'operation',
                            render:(text,record,index)=><p>
                                <Button onClick={()=>ModalWrapper.$show(({instance})=>{
                                    record.params=record.params||{};
                                    record.params.url = record.url;
                                    return <JSTemplateGenerator defaultValues={record.params} onSubmit={result=>{
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
                                        value.push(newTemplate);
                                        this.setDataSource(value);
                                        instance.close();
                                    }
                                    } template={record.template}/>
                                })}>修改</Button>
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
