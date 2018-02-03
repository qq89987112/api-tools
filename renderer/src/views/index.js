import React, {Component} from 'react';
import {Select} from "antd"
import 'antd/dist/antd.css';
import ApiManager from "./api-driver/ApiDriver";
import TemplateDriver from "./template-driver/TemplateDriver";


class App extends Component {
    state = {
        type:'api-driver'
    }


    render() {
        const {type} = this.state;
        return (
            <div>
                <div className='tar'>
                    <Select style={{ width: 120 }} defaultValue='api-driver' onChange={v=>this.setState({type:v})}>
                        <Select.Option value='api-driver'>API驱动</Select.Option>
                        <Select.Option value='template-driver'>模板驱动</Select.Option>
                    </Select>
                </div>
                {
                    (type==='template-driver'&&<TemplateDriver/>) ||
                    (type ==='api-driver'&&<ApiManager/>)
                }

            </div>
        );
    }
}

export default App;
