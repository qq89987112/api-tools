import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {HashRouter, Route, Link} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from '../store'
import SystemSetting from "./SystemSetting";
import OverviewBrowser from "./OverviewBrowser";
import {Shortcut} from "../store/reducers/shortcuts";
import ProjectTemplate from "./ProjectTemplate";
import TemporaryTemplate from "./SnippetsMaker";
import SnippetsGenerator from "./SnippetsGenerator";
import SnippetsMaker from "./SnippetsMaker";


/**
 * 传参都通过location.state传
 */
export const Views = [
    // {
    //     path: '/overview-browser',
    //     component: OverviewBrowser
    // },
    {
        path: '项目模板',
        component: ProjectTemplate
    },
    {
        path: '临时模板',
        component: TemporaryTemplate
    },
    {
        path: 'snippets生成',
        component: SnippetsGenerator
    },
    {
        path: 'snippets制作',
        component: SnippetsMaker
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
