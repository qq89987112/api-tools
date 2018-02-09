import React, {Component} from 'react';
import {Select} from "antd"
import 'antd/dist/antd.css';
import ApiDriver from "./web-views/api-driver/ApiDriver";
import TemplateDriver from "./web-views/template-driver/TemplateDriver";
import TemplateManager from "./web-views/template-driver/TemplateManager";
import SystemSetting from "./SystemSetting";
import { HashRouter,Route,Link } from 'react-router-dom'
import JSTemplate from "./web-views/template-driver/JSTemplate";
import TemplateShortcut from "../remote-main/TemplateShortcut";


class App extends Component {
    state = {
        type:'api-driver'
    }

    componentWillMount(){
        TemplateShortcut.reLoad();
    }

    render() {
        return (
            <HashRouter>
                <div>
                    <div className='tar'>
                        <Select style={{ width: 120 }} defaultValue='template-driver'>
                            <Select.Option value='template-driver'><Link to='/template-driver'>模板驱动</Link></Select.Option>
                            <Select.Option value='api-driver'><Link to='/api-driver'>接口管理(可自动爬取接口,用于生成接口代码和验证接口参数(定时更新)时使用。)</Link></Select.Option>
                            <Select.Option value='template-manager'><Link to='/template-manager'>模板管理(可设快捷键)</Link></Select.Option>
                            <Select.Option value='system-setting'><Link to='/system-setting'>系统设置</Link></Select.Option>
                        </Select>
                    </div>
                    <Route  exact path="/" component={TemplateDriver}/>
                    <Route  exact path="/template-driver" component={TemplateDriver}/>
                    <Route  exact path="/template-driver/js-template" component={JSTemplate}/>
                    <Route  exact path="/api-driver" component={ApiDriver}/>
                    <Route  exact path="/template-manager" component={TemplateManager}/>
                    <Route  exact path="/system-setting" component={SystemSetting}/>
                </div>
            </HashRouter>
        );
    }
}

export default App;
