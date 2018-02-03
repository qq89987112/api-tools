function a() {
    return {
        parameters:
            {
                className: String,
                columns: Array,
                headers:Array,
            },
        compile(params) {
            const {columns, className,headers} = params;
            return `
import React from "react";
import {Table,Form,Button,Input,Select,Popover,Icon} from "antd";
import BaseComponent from "../../../../components/ant-custom/BaseAntPage";
import project from "../../../../js/api/project";
import ModalWrapper from "../../../../components/ant-custom/ModalWrapper";
import Uploader from "../../../../components/ant-custom/Uploader";
import options from "../../../../js/options";

export default class ${className} extends BaseComponent{

    componentWillMount() {
        this.wrapLoadMoreEx(project.query,'${className}');
    }


    render(){
        return (
            <div>
                <Table
                    title={() => <div>
                        <Form layout='inline' onSubmit={e => {
                            e.preventDefault();
                            this.state.projectInfoLoadMore.reLoad(this.$getInputValue([${headers.map(i=>`"${i}"`,).join("")}]));
                        }}>
                            ${
                                headers.map(i=>`<Form.Item><Input onChange={this.$onInput('${i}')}/></Form.Item>`).join('\r\n')
                            }
                            <Form.Item> <Button htmlType='submit' type='primary'>查询</Button></Form.Item>
                        </Form>
                    </div>}
                    columns={[
                        ${
                            columns.map(i=>`{title: "${i}", dataIndex: '_dataIndex_',},`).join("\r\n")
                        }
                    ]}
                    dataSource={this.state.projectInfo}
                    loading={this.$isLoading("projectInfo")}
                    pagination={this.state.projectInfoPagi}
                />
            </div>
        )
    }
};
            `
        }
    }
}