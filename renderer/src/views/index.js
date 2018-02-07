import React, {Component} from 'react';
import {Select} from "antd"
import 'antd/dist/antd.css';
import ApiDriver from "./api-driver/ApiDriver";
import TemplateDriver from "./template-driver/TemplateDriver";
import SystemSetting from "./SystemSetting";
import { HashRouter,Route,Link } from 'react-router-dom'
import JSTemplate from "./remote-views/JSTemplate";


class App extends Component {
    state = {
        type:'api-driver'
    }


    render() {
        return (
            <HashRouter>
                <div>
                    <div className='tar'>
                        <Select style={{ width: 120 }} defaultValue='template-driver'>
                            <Select.Option value='api-driver'><Link to='/api-driver'>API驱动</Link></Select.Option>
                            <Select.Option value='template-driver'><Link to='/template-driver'>模板驱动</Link></Select.Option>
                            <Select.Option value='system-setting'><Link to='/system-setting'>系统设置</Link></Select.Option>
                        </Select>
                    </div>
                    <Route  exact path="/" component={TemplateDriver}/>
                    <Route  exact path="/template-driver" component={TemplateDriver}/>
                    <Route  exact path="/template-driver/js-template" component={JSTemplate}/>
                    <Route  exact path="/api-driver" component={ApiDriver}/>
                    <Route  exact path="/system-setting" component={SystemSetting}/>
                </div>
            </HashRouter>
        );
    }
}

export default App;
