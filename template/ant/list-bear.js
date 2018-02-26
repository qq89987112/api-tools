function template() {

    return {
        parameters:{
            className: String,
            actions: Array,
            fields: Array,
            fieldValids: Array,
        },
        requestLib:{

        },
        compile(params) {
            const {fields =[], className="", fieldValids=[], labels=[]} = params;
            const
                className2 = className.replace(/^\S/,s=>s.toLowerCase()),
                fieldsTypeMap = fields.reduce((prev,cur)=>{
                    cur = cur.split(".");
                    prev[cur[0]] = cur.slice(-1)[0];
                    return prev;
                },{});

            return `
            import React from 'react';
            import {List,Form,Button,Input,Checkbox} from "antd";
            import BaseComponent from "../../components/BaseComponent";
            import company from "../../js/api/company";



            export default class Company extends BaseComponent {

                componentDidMount() {
                    this.wrapLoadMoreEx(company.queryCompany, "list")
                }

                render() {
                    return (
                        <List
                            header={<Form layout='inline' onSubmit={e => {
                                e.preventDefault();
                                this.listLoadMore.reLoad(this.$getInputValue('filter-condition'));
                            }
                            }>
                                <Form.Item><Input onChange={this.$onInput('filter-condition')} placeholder="请输入筛选条件"/></Form.Item>
                                <Form.Item><Button htmlType='submit' type='primary'>提交</Button></Form.Item>
                            </Form>}
                            itemLayout="vertical"
                            size="large"
                            pagination={this.state.listPagi}
                            dataSource={this.state.list}
                            loading={this.$isLoading('list')}
                            renderItem={(item,index)=> <List.Item
                                extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                                actions={
                                    [
                                        <span>浏览量</span>
                                    ]}
                            >
                                <List.Item.Meta
                                    title={<a href="http://www.baidu.com">title</a>}
                                    description='description'
                                />
                            </List.Item>}
                        >
                        </List>
                    );
                }
            };
            `
        }
    }
}