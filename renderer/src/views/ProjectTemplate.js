import React, {Component} from 'react';
import {Table,Button,Tree} from 'antd'
import 'antd/dist/antd.css';
import BaseComponent from "../components/Base/BaseComponent";
import { connect } from 'react-redux'
import ModalWrapper from "../components/Base/ModalWrapper";
import JSTemplateGenerator from "../components/JSTemplateGenerator";
import preference from "../js/preference";
import {AsyncTree} from "../components/AsyncTree";
const {remote } = window.require('electron');
const glob = remote.require("glob");
const fs = remote.require("fs");
const path = remote.require("path");


export class Project{
    static jsFileManager = undefined;
};

export class JSFile {

    constructor(fileAddr){
        this.fileAddr = fileAddr;
        this.jsFileManager = Project.jsFileManager;
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
        ModalWrapper.$show(()=><JSTemplateGenerator
            context={this}
            onSubmit={({result})=>{
                let projectAddr = preference.getSetting("projectAddr");
                if (projectAddr) {
                    // 判断文件是否存在。

                    // 需要替换名字。
                    fs.writeFileSync(path.join(projectAddr,this.fileAddr),result)
                }
            }} template={{template:this.template}} />)
    }
}

class JsFileManager{

    files = []
    pathShortcuts = {}

    notify(path,events,params,{deep=true}){

    }

    getChildren(dir){
        if (fs.statSync(dir).isDirectory()) {
            const files = fs.readdirSync(dir);
            return files.map(item=>{
                let address = path.join(dir,item);
                let children = this.getChildren(address);
                let
                    isDir = Array.isArray(children),
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

    componentWillMount() {
        const {path,dispatch} = this.props;
        Project.jsFileManager = new JsFileManager();
        let {tree,pathShortcuts} = Project.jsFileManager.parse(path);
        this.pathShortcuts = pathShortcuts;
        let project = this.project =  {
            path,
            pathShortcuts
        };
        dispatch({
            type:"PROJECT_ADD",
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
                    <Tree.TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children,item.key)}
                    </Tree.TreeNode>
                );
            }

            return <Tree.TreeNode {...item} dataRef={item} />;
        });
    }

    render() {
        const {tree} = this.state;
        const {dispatch} = this.props;
        return (
            <Tree showLine
                  loadData={this.onLoadData}
                  onSelect={(key,e)=>{
                        this.project.activePath =  e.node.props.dataRef.path;

                        dispatch({
                            type:"PROJECT_UPDATE",
                            project:this.project
                        })
                  }}
            >
                {this.renderTreeNodes(tree)}
            </Tree>
        );
    }
};
export default connect(state=>{
    return {projects:state.projects};
})(ProjectTemplate);
