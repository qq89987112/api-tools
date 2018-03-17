import React, {Component} from 'react';
import {Form,Button,Tree,Input,message,Tag,notification} from 'antd'
import 'antd/dist/antd.css';
import BaseComponent from "../components/Base/BaseComponent";
import { connect } from 'react-redux'
import ModalWrapper from "../components/Base/ModalWrapper";
import JSTemplateGenerator from "../components/JSTemplateGenerator";
import preference from "../js/preference";
import {AsyncTree} from "../components/AsyncTree";
import store from "../store";
const {remote } = window.require('electron');
const glob = remote.require("glob");
const fs = remote.require("fs");
const fse = remote.require("fs-extra");
const path = remote.require("path");

// const beautify = remote.require('js-beautify').js

export class Project{
    static jsFileManager = undefined;
};

export class JSFile {

    constructor(fileAddr){
        this.fileAddr = fileAddr;
        this.jsFileManager = Project.jsFileManager;
        this.relativeAddr = path.relative(this.jsFileManager.rootDir,fileAddr);
        let tempName = fileAddr.split("\\").slice(-1)[0];
        this.fileName = tempName.split("=")[1]||tempName;
        let template = this.template = fs.readFileSync(fileAddr,'utf-8');
        this.instance = eval(`(${template})`);

        //  根据某个条件查找目录下已经生成好的文件,当事件的notifyDisk为true时,一并通知。
        //  比如新增一个 AddressEdit 后， 在 AddressTable 的  /* <slot name="add"/> */ /* <slot name="update"/> */  中替换相应代码。
        //
        //

    }

    /**
     *  js文件模板
     *  function template(){
     *      return {
     *          parameters:{},requestLib:{},events:{}
     *      }
     *  }
     *
     *  要求 events 里的函数 能获取到：对应项目的：当前的模板路径，已经生成的文件路径，一些常用的操作，发送文件夹事件，对应项目的root地址。
     * @param events
     * @param params
     */
    beNotify(events,params){
        const instanceEvents = this.instance.events || {};
        for(const event in instanceEvents){
            if (instanceEvents.hasOwnProperty(event)) {
                if(~events.indexOf(event)){
                    instanceEvents[event](params,this);
                }
            }
        }
    }

    notify(path,events,params,options){
        this.jsFileManager.notify(path,events,params,options);
    }


    /**
     * 要求和notify一致。
     */
    compile(){
        let projectAddr = preference.getSetting("projectAddr");
        let promise = Promise.resolve();
        if (!projectAddr) {
            promise = new Promise((resolve,reject)=>{
                ModalWrapper.$showNew(({instance})=> <Form layout="inline" onSubmit={e=>{
                    e.stopPropagation();
                    if (projectAddr) {
                        preference.setSetting("projectAddr",projectAddr);
                        resolve();
                        instance.close();
                    }else{
                        message.error('您还没有设定目标项目地址!');
                    }
                }}>
                    <Form.Item><Input placeholder='请输入目标项目地址' onInput={e=>{
                        projectAddr = e.target.value;
                    }} /></Form.Item>
                    <Form.Item><Button htmlType="submit"  type='primary'>确定</Button></Form.Item>
                </Form>,{footer:null})
            })
        }
        promise.then(()=>ModalWrapper.$showNew(()=><JSTemplateGenerator
            context={this}
            onSubmit={({result,params})=>{
                if (projectAddr) {
                    // 判断文件是否存在。

                    // 需要替换名字。
                    let addr = path.join(projectAddr,this.relativeAddr);
                    let className = params.className;
                    if (className) {
                        let splits = addr.split("\\");
                        splits[splits.length-1] = this.fileName.replace('${className}',className)
                        addr =  splits.join("\\");
                        // 对jsx不友好
                        // fse.outputFileSync(addr,beautify(result));
                        fse.outputFileSync(addr,result);
                        message.success(<p>已经在<Tag onClick={()=>{
                        //    先把js的默认打开方式设置为 webstorm

                        //    使用 opn 打开。
                        }} >{addr}</Tag>生成数据！</p>);
                    }else{
                        message.error('请指定className!');
                    }

                }else{
                    message.error('您还没有设定目标项目地址!');
                }
            }} template={{template:this.template}} />,{width:"80%",footer:null}))

    }
}

class JsFileManager{

    files = []
    pathShortcuts = {}
    rootDir = '';
    notify(notifyPath,events,params,{deep=true}={}){
        const addr = path.join(preference.getSetting('projectAddr'),notifyPath);
        const list = glob.sync(addr);
        if (list.length===0) {
            notification.error({
                message:"编译尾段出错",
                description:`找不到事件${events}的通知对象${addr}`,
                duration:null
            });
        }
        debugger
    }

    getChildren(dir){
        if (fs.statSync(dir).isDirectory()) {
            const files = fs.readdirSync(dir);
            return files.map(item=>{
                let address = path.join(dir,item);
                let children = this.getChildren(address);
                let
                    isDir = Array.isArray(children),
                    // 这里不能用 jsFile ，因为最后会被持久化到 localStorage 中。
                    jsFile;
                if (!isDir) {
                    item = item.split("=");
                    item = item[0];
                    const
                        split = item.split("-"),
                        [shortcut,group='default'] = split;
                    if (shortcut) {
                        /**
                         *  F1-quick=${name}
                         *  {
                         *      default:{
                         *          F1:jsFile
                         *      }
                         *  }
                         *
                         */
                        const groups = this.pathShortcuts[dir] || {};
                        const shortcuts = groups[group] || {};
                        shortcuts[shortcut] = address;
                        groups[group] = shortcuts;
                        this.pathShortcuts[dir] = groups;
                    }
                }
                return Object.assign(isDir ? {children} : {},{
                    name:item,
                    title:item,
                    path: address
                })
            });
        }else{
            return dir;
        }
    }

    parse(path){
        this.rootDir = path;
        return {
            tree:this.getChildren(path),
            pathShortcuts:this.pathShortcuts
        };
    }
}



/**
 * 通过主页设置跳转参数来获取打开的文件夹地址
 */
class ProjectTemplate extends BaseComponent {

    project = {};

    componentWillMount() {
        const {path,dispatch} = this.props;
        Project.jsFileManager = new JsFileManager();
        let {tree,pathShortcuts} = Project.jsFileManager.parse(path);
        this.pathShortcuts = pathShortcuts;
        let project =  {
            path,
            pathShortcuts
        };
        dispatch({
            type:"PROJECT_UPDATE",
            project
        });
        this.setState({
            tree
        })
    }

    renderTreeNodes = (data,path="") => {
        return data.map((item,index) => {
            item = {...item};
            let path2 = path.split("-");
            path2.push(index);
            path2 = path2.filter(i=>i===0||i);
            item.key = path2.join("-");
            if (item.children) {
                return (
                    <Tree.TreeNode title={item.title} key={item.key} className='folder' dataRef={item}>
                        {this.renderTreeNodes(item.children,item.key)}
                    </Tree.TreeNode>
                );
            }

            return <Tree.TreeNode {...item} dataRef={item} className='file' />;
        });
    }

    updateProject(project){
        const {dispatch} = this.props;
        dispatch({
            type:"PROJECT_UPDATE",
            project
        })
    }

    render() {
        const {tree} = this.state;
        const {project} = this.props;
        return (
            <div>
                {
                    project&&<Tree showLine
                                   showIcon
                          defaultExpandedKeys={project.expandedKeys||[]}
                          onExpand={(expandedKeys,node)=>{
                              project.expandedKeys = expandedKeys;
                              this.updateProject(project);
                          }}
                          loadData={this.onLoadData}
                          onSelect={(key,e)=>{
                              project.activePath =  e.node.props.dataRef.path;
                              this.updateProject(project);
                          }}
                    >
                        {this.renderTreeNodes(tree)}
                    </Tree>
                }
            </div>
        );
    }
};
export default connect((state,props)=>{
    let projects = state.projects;
    return {projects,project:projects[props.path]};
})(ProjectTemplate);
