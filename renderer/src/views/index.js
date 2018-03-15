import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {HashRouter, Route, Link} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from '../store'
import SystemSetting from "./SystemSetting";
import TemplateManager from "./TemplateManager";
import RealTimeCompiler from "./RealTimeCompiler";
import ApiDriver from "./ApiDriver";
import Mini from "./Mini";
import OverviewBrowser from "./OverviewBrowser";
import {Shortcut} from "../store/reducers/shortcuts";
import ProjectTemplate from "./ProjectTemplate";


/**
 * 传参都通过location.state传
 */
export const Views = [
    {
        path: "/template-manager",
        component: TemplateManager
    },
    {
        path: "/real-time-compiler",
        component: RealTimeCompiler
    },
    {
        path: "/api-driver",
        component: ApiDriver
    },
    {
        path: "/system-setting",
        component: SystemSetting
    },
    {
        path: '/overview-browser',
        component: OverviewBrowser
    },
    {
        path: '/project-template',
        component: ProjectTemplate
    },
    {
        path: '/mini',
        component: Mini
    },
]

export default class App extends Component {

    componentWillMount() {
        Shortcut.reLoad();
    }

    render() {
        return (
            <Provider store={store}>
                <SystemSetting/>
                {/*<HashRouter>*/}
                    {/*<div>*/}
                        {/*<Route exact path="/" component={SystemSetting}/>*/}
                        {/*{*/}
                            {/*Views.map((item,index)=><Route exact key={index} path={item.path} component={item.component}/>)*/}
                        {/*}*/}
                    {/*</div>*/}
                {/*</HashRouter>*/}
            </Provider>
        );
    }
};
