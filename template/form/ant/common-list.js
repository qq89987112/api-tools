function a() {
    return {
        parameters:
            {
                className: String,
                labels: Array,
                fields: Array,
                fieldValids: Array,
            },
        compile(params) {
            const {fields, className, fieldValids, labels} = params;
            const className2 = className.replace(/^\S/,s=>s.toLowerCase());
            return `
import React from 'react';
import { Button, Popover, Spin, List,Form,Input} from 'antd';
import BaseAntPage from "../../../../components/ant-custom/BaseAntPage";
import sample from "../../../../js/api/sample";
import common from "../../../../js/api/common";


export default class ${className} extends BaseAntPage {

    componentWillMount() {
        this.wrapLoadMoreEx(sample.queryStage,'${className2}');
    }


    render() {
        return (
            <div>
                <List
                    dataSource={this.state.${className2}}
                    loading={this.$isLoading('${className2}')}
                    pagination={this.state.${className2}Pagi}
                    header="${className}" itemLayout='horizontal'
                    renderItem={(item, index) => {
                        return <List.Item actions={
                            [
                                <Button onClick={() => {}} loading={this.$isLoading("operation")}>操作</Button>,
                                <Popover placement='top' trigger="click" content={<Form layout='inline'>
                                    <Form.Item><Input/></Form.Item>
                                    <Form.Item><Button type='primary'>保存</Button></Form.Item>
                                </Form>}><Button>操作2</Button></Popover>
                            ]}>
                            {JSON.stringify(item)}
                        </List.Item>
                    }}
                >
                    Footer
                </List>
            </div>
        );
    }
};

            `
        }
    }
}