import React from 'react';
import {
    Form
    , Input
    , Button
    , List
    , Avatar,
    Switch,
    Select
} from "antd"
import BaseComponent from "../components/BaseComponent";
import user from "../js/api/user";

class UserManage extends BaseComponent {
    componentDidMount() {
        this.wrapLoadMoreEx(user.query,"list",{
            keywords:'',
            gender:0
        }).then(data=>{
            // debugger
        })
        this.$setInputValue('keywords','');
        this.$setInputValue('gender','0');
    }

    render() {
        return (
            <div className="App">
                <List
                    header={<Form layout='inline' onSubmit={e => {
                        e.preventDefault();
                        this.listLoadMore.reLoad(this.$getInputValue(['keywords','gender']));
                    }
                    }>
                        <Form.Item><Input onInput={this.$onInput('keywords')} placeholder="请输入用户ID/昵称"/></Form.Item>
                        <Form.Item><Select onChange={v=>this.$setInputValue('gender',v)} style={{width:120}} placeholder="请选择性别">
                            <Select.Option value='0'>未设置</Select.Option>
                            <Select.Option value='1'>男</Select.Option>
                            <Select.Option value='2'>女</Select.Option>
                            <Select.Option value='3'>中性</Select.Option>
                        </Select></Form.Item>
                        <Form.Item><Button htmlType='submit' type='primary'>查询</Button></Form.Item>
                    </Form>}
                    itemLayout="horizontal"
                    size="large"
                    pagination={this.state.listPagi}
                    dataSource={this.state.list}
                    loading={this.$isLoading('list')}
                    renderItem={(item, index) => <List.Item
                        actions={
                            [
                                <span>禁言<Switch/></span>,
                                <span>黑名单<Switch/></span>,
                            ]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.profileportraitUrl}/>}
                            title={<a href={item.href}>{item.accountuid}</a>}
                            description={item.profilenickname}
                        />
                    </List.Item>}
                >
                </List>
            </div>
        );
    }
}

export default UserManage;
