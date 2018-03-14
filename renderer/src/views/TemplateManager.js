import React, {Component} from 'react';
import {Table,Button,Input} from 'antd'
import 'antd/dist/antd.css';
import BaseComponent from "../components/Base/BaseComponent";
import ModalWrapper from "../components/Base/ModalWrapper";
import PopoverWrapper from "../components/Base/PopoverWrapper";
import JSTemplateGenerator from "../components/JSTemplateGenerator";
import { connect } from 'react-redux'
import TemplateUploadBox from "../components/TemplateUploadBox";
const { clipboard } = window.require('electron');


class TemplateManager extends BaseComponent {

    componentWillMount() {
    }

    render() {
        const {templates,dispatch} = this.props;
        return (
            <div>
                <Table
                    title={()=><div className='tar'>
                        <Button onClick={()=>{}}>导入模板</Button>
                        <Button onClick={()=>{}}>导出模板</Button>
                        <Button onClick={()=>ModalWrapper.$show(({instance})=><TemplateUploadBox onSubmit={()=>instance.close()} />)}>新增</Button>
                    </div>}
                    dataSource={templates}
                    columns={[
                        {
                            title: 'location',
                            dataIndex: 'location'
                        },
                        {
                            title: 'shortcut',
                            dataIndex: 'shortcut',
                            render:(text,record)=><PopoverWrapper content={({instance})=><p>
                                <Input onInput={this.$onInput(v=>instance.shortcut=v)} placeholder='请输入快捷键'/>
                                <Button onClick={()=>{
                                    record.shortcut = instance.shortcut;
                                    dispatch({
                                        type:"TEMPLATE_UPDATE",
                                        template:record
                                    });
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
                                    return <JSTemplateGenerator  template={record} dispatch={dispatch} onSubmit={template=>{
                                        // console.log(jsBeautify(htmlBeautify(result)))
                                        instance.close();
                                    }
                                    }/>
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
export default connect(state=>{
    return {templates:state.templates};
})(TemplateManager);
