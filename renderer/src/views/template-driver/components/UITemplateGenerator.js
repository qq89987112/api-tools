import React, {Component} from 'react';
import {Form, Input, Button, message} from 'antd'
import 'antd/dist/antd.css';
import BaseComponent from "../../../components/Base/BaseComponent";
import Requestor from "../../api-driver/components/Requestor";
import QuickPropover from "../../api-driver/components/QuickPropover";
import JSONResult from "../../api-driver/components/JSONResult";


export default class UITemplateGenerator extends BaseComponent {

    state = {
        selects: {}
    }

    reLoadJsonResult = (json) => {
        this.setState({
            json: json.data,
            selects: {}
        })
    }

    onSelect = (index, result) => {
        const selects = this.state.selects || {};
        this.setState({
            selects: Object.assign(selects, {[index]: result})
        })
    }

    onExport = () => {
        let
            result = [];
        this.matchs.forEach((item, index) => {
            result.push(this.splits[index]);
            result.push(this.state.selects[index] || this.matchs[index]);
        })
        console.log(result.join(""));
        //====================还要将接口请求复制到粘贴板中。===============
        this.toast("导出成功！");
    }

    render() {
        let {template = ""} = this.props;
        let {json = {}} = this.state;
        // "_a_ddddd_a_cccc".split(/_[^\s]+?_/g)
        //     ["", "ddddd", "cccc"]
        // "_a_ddddd_a_cccc".match(/_[^\s]+?_/g)
        //     ["_a_", "_a_"]
        let
            regExp = /_[^\s]+?_/g,
            splits = this.splits = template.split(regExp) || [],
            matchs = this.matchs = template.match(regExp) || [],
            result = [];

        matchs.forEach((item, index) => {
            result.push(splits[index]);
            result.push(<QuickPropover content={<JSONResult onLeftClick={r => this.onSelect(index, r)}
                                                            onRightClick={r => this.onSelect(index, r)} json={json}/>}
                                       triggerText={this.state.selects[index] || matchs[index]}/>);
        })
        result.push(splits[splits.length - 1]);


        return (
            <div>
                <p className='tar'><Requestor onResult={this.reLoadJsonResult} triggerText='发送请求'/> <Button
                    onClick={this.onExport}>导出</Button></p>
                <pre>
                {
                    result
                }
            </pre>
            </div>

        );
    }
};
