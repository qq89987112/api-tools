import React, { Component } from 'react';
import {Form,Input,Button,message} from 'antd'
import 'antd/dist/antd.css';
import BaseComponent from "../../../components/Base/BaseComponent";
import Requestor from "./Requestor";

// 左键匹配名字，右键匹配路径。
export default class UITemplateGenerator extends BaseComponent {

    render() {
        let {template ="",json={}} = this.props;
        // "_a_ddddd_a_cccc".split(/_[^\s]+?_/g)
        //     ["", "ddddd", "cccc"]
        // "_a_ddddd_a_cccc".match(/_[^\s]+?_/g)
        //     ["_a_", "_a_"]
        let
            regExp = /_[^\s]+?_/g,
            splits = template.split(regExp) || [],
            matchs = template.match(regExp) ||[],
            result = [];

            matchs.forEach((item,index)=>{
                result.push(splits[index]);
                result.push(<Button>{matchs[index]}</Button>);
            })
            result.push(splits[splits.length-1]);


        return (
            <pre>
                {
                    result
                }
            </pre>

        );
    }
};
