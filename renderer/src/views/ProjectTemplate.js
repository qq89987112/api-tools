import React, {Component} from 'react';
import {Form, Button, Tree, Input, message, Tag, notification} from 'antd'
import 'antd/dist/antd.css';
import BaseComponent from "../components/Base/BaseComponent";
import {connect} from 'react-redux'
import ModalWrapper from "../components/Base/ModalWrapper";
import JSTemplateGenerator from "../components/template/JSTemplateGenerator";
import preference from "../js/preference";
import {AsyncTree} from "../components/AsyncTree";
import store from "../store";

const {remote} = window.require('electron');
const glob = remote.require("glob");
const fs = remote.require("fs");
const fse = remote.require("fs-extra");
const path = remote.require("path");

// const beautify = remote.require('js-beautify').js

export class Project {
    static jsFileManager = undefined;
    static getJsFileManager(){
        if (!Project.jsFileManager) {
            Project.jsFileManager = new JsFileManager();
        }
        return Project.jsFileManager;
    }
};


// 应该弄成通过 JsFileManager new 的方式。
export class TemplateJSFile {

    constructor(fileAddr) {
        this.fileAddr = fileAddr;
        this.jsFileManager = Project.getJsFileManager();
        this.relativeAddr = path.relative(this.jsFileManager.templateRootDir, fileAddr);
        let tempName = fileAddr.split("\\").slice(-1)[0];
        this.fileName = tempName.split("=")[1] || tempName;
        let template = this.template = fs.readFileSync(fileAddr, 'utf-8');
        this.instance = eval(`(${template})`)();

    }

    /**
     *  js文件模板
     *  function template(){
     *      return {
     *          parameters:{},requestLib:{},events:{}
     *      }
     *  }
     *
     * @param events
     * @param params
     */
    beNotify(events, params,projectAddr) {
        const instanceEvents = this.instance.events || {};
        for (const event in instanceEvents) {
            if (instanceEvents.hasOwnProperty(event)) {
                if (~events.indexOf(event)) {
                    instanceEvents[event](params,{
                        projectAddr,
                        context:this,
                        fse,
                        glob:glob.sync,
                        path
                    });
                }
            }
        }
    }

    notify(path, events, params, options) {
        this.jsFileManager.notify(path, events, params, options);
    }

    error(msg){

    }

    // 可以多选,返回一个 返回数组 的 promise
    showOptionsForResult(list){
        return Promise.resolve([1]);
    }

    compile(params,context = this){
        return this.instance.compile(params,context);
    }

    /**
     * 要求和notify一致。
     */
    compileInUI() {
        let projectAddr = preference.getSetting("projectAddr");
        let promise = Promise.resolve();
        if (!projectAddr) {
            promise = new Promise((resolve, reject) => {
                ModalWrapper.$showNew(({instance}) => <Form layout="inline" onSubmit={e => {
                    e.stopPropagation();
                    if (projectAddr) {
                        preference.setSetting("projectAddr", projectAddr);
                        resolve();
                        instance.close();
                    } else {
                        message.error('您还没有设定目标项目地址!');
                    }
                }}>
                    <Form.Item><Input placeholder='请输入目标项目地址' onInput={e => {
                        projectAddr = e.target.value;
                    }}/></Form.Item>
                    <Form.Item><Button htmlType="submit" type='primary'>确定</Button></Form.Item>
                </Form>, {footer: null})
            })
        }

        let addr;
        promise.then(() => ModalWrapper.$showNew(() => <JSTemplateGenerator
            context={this}
            beforeCompile={({params}) => {
                let promise = Promise.resolve();

                if (projectAddr) {
                    addr = path.join(projectAddr, this.relativeAddr);
                    let className = params.className;
                    if (className) {
                        let splits = addr.split("\\");
                        splits[splits.length - 1] = this.fileName.replace('${className}', className)
                        addr = splits.join("\\");
                        // 判断文件是否存在。
                        if (fse.existsSync(addr)) {
                            promise = new Promise((resolve, reject) => {
                                ModalWrapper.$showNew(({instance}) => <div>
                                    <p>目标路径：{addr}已经存在文件，是否继续？</p>
                                    <p><Button onClick={() => {
                                        instance.close();
                                        resolve();
                                    }}>是</Button><Button onClick={() => {
                                        instance.close();
                                        reject();
                                    }}>否</Button></p>
                                </div>)
                            })
                        }

                    } else {
                        message.error('请指定className!');
                    }

                } else {
                    message.error('您还没有设定目标项目地址!');
                }

                return promise;
            }}
            onSubmit={({result, params}) => {
                // 对jsx不友好
                // fse.outputFileSync(addr,beautify(result));
                fse.outputFileSync(addr, result);
                message.success(<p>已经在<Tag onClick={() => {
                    //    先把js的默认打开方式设置为 webstorm

                    //    使用 opn 打开。
                }}>{addr}</Tag>生成数据！</p>);
            }} template={{template: this.template}}/>, {width: "80%", footer: null}))

    }
}

class JsFileManager {

    files = []
    pathShortcuts = {}
    templateRootDir = '';


    /**
     *
     * @param notifyPath  这个地址是模板项目的地址，用于触发模板项目里的监听器。
     * @param events 要求 events 里的函数 能获取到：
     *              1、模板项目：当前文件夹相对路径 （不需要，肉眼都能看。）
     *              2、对应项目：项目根目录 （可以通过模板的当前文件夹整合出对应的路径）
     *              3、fse、glob
     *              4、beNotify之前，需要保存一下文件内容，以便于恢复
     *              5、真正的替换过程应该在模板JS文件的events函数中。
     *                 比如新增一个 AddressEdit 后， 在 AddressTable 的  <slot name="add"/><slot name="update"/> 中替换相应代码。
     * @param params
     * @param deep
     */
    notify(notifyPath, events, params, {deep = true} = {}) {
        const addr = path.join(this.templateRootDir, notifyPath);
        const list = glob.sync(addr);
        if (list.length === 0) {
            notification.error({
                message: "编译尾段出错",
                description: <div>
                    找不到事件${events}的模板JS文件通知对象${addr}
                    {/*如果接收消息的对象是固定类型可以显示出来*/}
                    {/*<Button>立即生成</Button>*/}
                    </div>,
                duration: null
            });
        }else{
            list.forEach(item=>{
                (new TemplateJSFile(item)).beNotify(events,params,preference.getSetting('projectAddr'));
            })
        }
        // debugger
    }


    getChildren(dir) {
        if (fs.statSync(dir).isDirectory()) {
            const files = fs.readdirSync(dir);
            return files.map(item => {
                let fileName = item;
                let address = path.join(dir, item);
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
                        [shortcut, name, group = 'default'] = split;
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
                return Object.assign(isDir ? {children} : {}, {
                    name: fileName,
                    title: fileName,
                    path: address
                })
            });
        } else {
            return dir;
        }
    }

    parse(path) {
        this.templateRootDir = path;
        return {
            tree: this.getChildren(path),
            pathShortcuts: this.pathShortcuts
        };
    }
}


/**
 * 通过主页设置跳转参数来获取打开的文件夹地址
 */
class ProjectTemplate extends BaseComponent {

    project = {};

    componentWillMount() {
        const {path, dispatch} = this.props;
        let {tree, pathShortcuts} = Project.getJsFileManager().parse(path);
        this.pathShortcuts = pathShortcuts;
        let project = {
            path,
            pathShortcuts
        };
        dispatch({
            type: "PROJECT_UPDATE",
            project
        });
        this.setState({
            tree
        })
    }

    renderTreeNodes = (data, path = "") => {
        return data.map((item, index) => {
            item = {...item};
            let path2 = path.split("-");
            path2.push(index);
            path2 = path2.filter(i => i === 0 || i);
            item.key = path2.join("-");
            if (item.children) {
                return (
                    <Tree.TreeNode title={item.title} key={item.key} className='folder' dataRef={item}>
                        {this.renderTreeNodes(item.children, item.key)}
                    </Tree.TreeNode>
                );
            }

            return <Tree.TreeNode {...item} dataRef={item} className='file'/>;
        });
    }

    updateProject(project) {
        const {dispatch} = this.props;
        dispatch({
            type: "PROJECT_UPDATE",
            project
        })
    }

    render() {
        const {tree} = this.state;
        const {project} = this.props;
        return (
            <div>
                {
                    project && <Tree showLine
                                     showIcon
                                     defaultSelectedKeys={[project.selectedKey].filter(i => i)}
                                     defaultExpandedKeys={project.expandedKeys || []}
                                     onExpand={(expandedKeys, node) => {
                                         project.expandedKeys = expandedKeys;
                                         this.updateProject(project);
                                     }}
                                     loadData={this.onLoadData}
                                     onSelect={(key, e) => {
                                         if (e.selected) {
                                             project.activePath = e.node.props.dataRef.path;
                                             project.selectedKey = key[0];
                                         } else {
                                             project.activePath = "";
                                             project.selectedKey = "";
                                         }
                                         this.updateProject(project);
                                     }}
                    >
                        {this.renderTreeNodes(tree)}
                    </Tree>
                }
            </div>
        );
    }


    componentWillUnmount() {
        const {dispatch} = this.props;
        dispatch({
            type: "SHORTCUT_RELOAD"
        })
    }
};
export default connect((state, props) => {
    let projects = state.projects;
    return {projects, project: projects[props.path]};
})(ProjectTemplate);
