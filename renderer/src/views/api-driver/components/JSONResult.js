import React, {Component} from 'react';
import {Form, Input, Tree} from 'antd'
import 'antd/dist/antd.css';

const TreeNode = Tree.TreeNode;


export default class JSONResult extends Component {


    loop(path,key,value) {
        function isParent(obj) {
            let type = Object.prototype.toString.call(obj);
            return type === "[object Object]" || type === "[object Array]";
        }
        path = `${path}.${key}`;
        let
            title = isParent(value) ? key : `${key}:${value}`,
            content = isParent(value)&&Object.entries(value).map(item => this.loop(path,item[0],item[1]));

            if(content&&content.length===0){
                //空对象和数组
                title = `${title}:${JSON.stringify(value)}`
                //去除箭头
                content = undefined;
            }
        return <TreeNode title={title} key={path}>{content}</TreeNode>
    }

    render() {
        const {json = {},name="data"} = this.props;
        return (
            <Tree>
                {Object.entries(json).map(item => this.loop(name,item[0],item[1]))}
            </Tree>
        );
    }
};
