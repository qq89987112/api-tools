import React from "react";
import {Table, Form, Button, Input, Select, Popover, Icon} from "antd";

export default class TodayGames extends React.Component {

    componentWillMount() {
        this.todayGamesLoadMore = {
            reLoad(){
                
            }
        }
    }


    render() {
        return (
            <div>
                <Table
                    title={() => <div>
                        <Form layout='inline' onSubmit={e => {
                            e.preventDefault();
                            this.todayGamesLoadMore.reLoad(this.$getInputValue([]));
                        }}>
                            <Form.Item> <Button htmlType='submit' type='primary'>刷新</Button></Form.Item>
                        </Form>
                    </div>}
                    columns={[
                        {title: "网站", dataIndex: 'site',},
                        {title: "总数", dataIndex: 'total',},
                    ]}
                    dataSource={this.state.todayGames}
                    loading={this.$isLoading("todayGames")}
                />
            </div>
        )
    }
};
