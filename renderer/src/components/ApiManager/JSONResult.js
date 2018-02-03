import React, {Component} from 'react';
import {Form, Input, Tree} from 'antd'
import 'antd/dist/antd.css';

const TreeNode = Tree.TreeNode;


export default class JSONResult extends Component {

    // loop(obj, path = "") {
    //
    //     function isValid(obj) {
    //         let type = Object.prototype.toString.call(obj);
    //         return type === "[object Object]" || type === "[object Array]";
    //     }
    //
    //
    //
    //     if (isValid(obj)) {
    //         return Object.entries(obj).map(item => {
    //                 if (isValid(item[1])) {
    //                     return <TreeNode title={item[0]} key={`${path}.${item[0]}`}>
    //                         {this.loop(item[1], `${path}.${item[0]}`)}
    //                     </TreeNode>
    //                 } else {
    //                     return <TreeNode title={`${path}：${obj}`} key={`${path}`}/>
    //                 }
    //             }
    //         )
    //     } else {
    //         return <TreeNode title={`${path}：${obj}`} key={`${path}`}/>
    //     }
    //
    // }


    loop(title,key, path = "") {

        function isValid(obj) {
            let type = Object.prototype.toString.call(obj);
            return type === "[object Object]" || type === "[object Array]";
        }

        return <TreeNode title={title} key={key}></TreeNode>

        if (isValid(value)) {
            return Object.entries(obj).map(item => {
                    if (isValid(item[1])) {
                        return <TreeNode title={item[0]} key={`${path}.${item[0]}`}>
                            {this.loop(item[1], `${path}.${item[0]}`)}
                        </TreeNode>
                    } else {
                        return <TreeNode title={`${path}：${obj}`} key={`${path}`}/>
                    }
                }
            )
        } else {
            return <TreeNode title={`${path}：${obj}`} key={`${path}`}/>
        }
    }

    render() {
        const {json = {}} = this.props;
        return (
            <Tree>
                {this.loop(json)}
            </Tree>
        );
    }
};
