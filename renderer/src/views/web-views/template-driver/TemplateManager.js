import React, {Component} from 'react';
import {Table,Button} from 'antd'
import 'antd/dist/antd.css';
import BaseComponent from "../../../components/Base/BaseComponent";
import ModalWrapper from "../../../components/Base/ModalWrapper";
import PopoverWrapper from "../../../components/Base/PopoverWrapper";

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

    setShortcut(shortcut,index){
        const template = this.state.dataSource[index];
        template.shortcut = shortcut;
        this.setDataSource(this.state.dataSource);
        shortcutkey.reLoad();
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
                            render:text=><PopoverWrapper content={({instance})=><p><Input placeholder='请输入快捷键'/><Button>确定</Button></p>)}>{text}</PopoverWrapper>
                        },
                        {
                            title: 'operation',
                            render:(text,record,index)=><p>
                                <Button onClick={()=>ModalWrapper.$show(({instance})=>{
                                    record.params=record.params||{};
                                    record.params.url = record.url;
                                    return this.getTemplateGenerator({instance,template:record.template,defaultValues:record.params})
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
