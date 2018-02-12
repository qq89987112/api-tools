import React, {Component} from 'react';
import {Form, Input, Tree,Button} from 'antd'
import 'antd/dist/antd.css';
import ModalWrapper from "./Base/ModalWrapper";

const TreeNode = Tree.TreeNode;

// axios.interceptors.request.use(function (config) {
//     return RequestHook.onRequest(config);
// }, function (error) {
//     // 对请求错误做些什么
//     return Promise.reject(error);
// });
//
// axios.interceptors.response.use(data => {
//     let config = data.config;
//     if(/\.json$/.test(config.url)){
//         return data.data;
//     }
//     data = data.data.data;
//     // if (data.pageError || !data.status) {
//     //     return Promise.reject(data);
//     // }
//     return RequestHook.onResponce(data,config);
// }, error => {
//     console.table(error);
//     return Promise.reject(error)
// });
export class RequestHook{

    static interceptResponce = new Map();

    static onRequest(config){
        return new Promise((resolve,reject)=>{
            if(process.env.NODE_ENV!=='development'){
                return resolve(config);
            }
            let data = config.data;
            if(!data || JSON.stringify(data) === '{}'){
                return resolve(config);
            }
            ModalWrapper.$showNew(({instance})=><div>
                <div>
                    <p>url地址：{config.url}</p>
                    <div>参数内容({Object.keys(data).length})：<JSONResult json={data}/></div>
                </div>
                <p><Button onClick={()=>{
                    resolve(config);
                    instance.close();
                }}>不拦截</Button><Button onClick={()=>{
                    reject("接口被拦截");
                    instance.close();
                }}>拦截</Button><Button onClick={()=>{
                    RequestHook.interceptResponce.set(config.url,true)
                    resolve(config);
                    instance.close();
                    //    页面上能看到返回是否正常就不需要拦截
                }}>拦截返回</Button></p>
            </div>,{footer:null,zIndex:1001})
        })
    }

    static onResponce(obj,config){
        return new Promise((resolve,reject)=>{
            if(RequestHook.interceptResponce.get(config.url)){
                return new Promise((resolve,reject)=>{
                    if(process.env.NODE_ENV!=='development'){
                        return resolve(obj);
                    }
                    ModalWrapper.$showNew(({instance})=><div style={{position:'relative',zIndex:'1999'}}>
                        <div>
                            <p>url地址：{config.url}</p>
                            <div>返回内容：<JSONResult json={obj}/></div>
                        </div>
                        <p><Button onClick={()=>{
                            resolve(obj)
                            instance.close();
                        }}>不拦截</Button><Button onClick={()=>{
                            reject("接口被拦截");
                            instance.close();
                        }}>拦截</Button></p>
                    </div>,{footer:null,zIndex:1001})
                })
            }else{
                resolve(obj);
            }
        })
    }
}

// 左键名字，右键路径。
//props: title,json,name
export default class JSONResult extends Component {


    loop(path,key,value) {
        let {node} = this.props;
        function isParent(obj) {
            let type = Object.prototype.toString.call(obj);
            return type === "[object Object]" || type === "[object Array]";
        }
        path = `${path}.${key}`;

        let
            title = isParent(value) ? key : node ? node(key,value):`${key}:${value}`,
            content = isParent(value)&&Object.entries(value).map(item => this.loop(path,item[0],item[1]));

        if(content&&content.length===0){
            //空对象和数组
            title = `${title}:${JSON.stringify(value)}`
            //去除箭头
            content = undefined;
        }
        return <TreeNode title={title} key={path}>{content}</TreeNode>
    }

    onSelect = (selectedKeys,e)=>{
        const {onLeftClick = ()=>{}} = this.props;
        onLeftClick(e.node.props.title.split(":")[0]);
    }

    onRightClick = (e)=>{
        const {onRightClick = ()=>{}} = this.props;
        onRightClick(e.node.props.eventKey);
    }

    render() {
        const {json = {},name="data"} = this.props;
        return (
            <Tree
                onSelect={this.onSelect}
                onRightClick={this.onRightClick}
            >
                {Object.entries(json).map(item => this.loop(name,item[0],item[1]))}
            </Tree>
        );
    }
};
