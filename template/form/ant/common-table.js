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
            const className2 = className.replace(/^\S/,s=>s.toLowerCase());
            return `
import React from "react";
import {Table,Form,Button,Input,Select,Popover,Icon} from "antd";
import BaseComponent from "../../../../components/ant-custom/BaseAntPage";

export default class ${className} extends BaseComponent{

    componentWillMount() {
        this.wrapLoadMoreEx(,'${className2}');
    }


    render(){
        return (
            <div>
                <Table
                    title={() => <div>
                        <Form layout='inline' onSubmit={e => {
                            e.preventDefault();
                            this.${className2}LoadMore.reLoad(this.$getInputValue([${headers.map(i=>`"${i}"`)}]));
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
                    dataSource={this.state.${className2}}
                    loading={this.$isLoading("${className2}")}
                    pagination={this.state.${className2}Pagi}
                />
            </div>
        )
    }
};
            `
        }
    }
}