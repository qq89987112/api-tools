import React, {Component} from 'react';
import {Table, Button, Form, Input, Select} from 'antd'
import 'antd/dist/antd.css';
import BaseComponent from "../../components/Base/BaseComponent";
import Requestor from "./components/Requestor";

export default class Generator extends BaseComponent {
    state = {
        dataSource: JSON.parse(localStorage.apis || '[]')
    }


    render() {

        const buttonAddApi = <Requestor onResult={options => {
            // ModalWrapper.$showNew(({instance})=>{
            //         const {template} = this.state;
            //         return <div>
            //             {
            //                 template ?
            //                     <div  className="template-fill-panel">
            //                         <TemplateGenerator template={template}/>
            //                         <JSONResult className='json-result' json={data}/>
            //                     </div> : <TemplateUpload onTemplate={t=>instance.setState({template:t})} />
            //             }
            //         </div>
            //     }
            // )
            let dataSource = this.state.dataSource;
            dataSource.push(options);
            this.setState({
                dataSource
            })
            localStorage.apis = JSON.stringify(dataSource)
        }
        }/>

        return (
            <Table
                title={() => <p className='tar'>{buttonAddApi}</p>}
                dataSource={this.state. dataSource}
                columns={[
                    {
                        title: '地址',
                        dataIndex: 'url'
                    },
                    {
                        title: '方法',
                        dataIndex: 'method'
                    },
                    {
                        title: '参数',
                        dataIndex: 'params'
                    },
                    {
                        title: '最近请求结果',
                        dataIndex: 'data',
                        render:(text)=>JSON.stringify(text)
                    },
                    {
                        title: '生成代码',
                        dataIndex: 'generate'
                    },
                ]}
            />
        );
    }


};
