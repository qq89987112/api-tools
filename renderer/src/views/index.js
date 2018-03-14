import React, {Component} from 'react';
import 'antd/dist/antd.css';
import { HashRouter,Route,Link } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../store'
import SystemSetting from "./SystemSetting";
import TemplateManager from "./TemplateManager";
import RealTimeCompiler from "./RealTimeCompiler";
import JSTemplate from "./JSTemplate";
import ApiDriver from "./ApiDriver";
import Mini from "./Mini";
import OverviewBrowser from "./OverviewBrowser";
import {Shortcut} from "../store/reducers/shortcut";

class App extends Component {

    componentWillMount(){
        Shortcut.reLoad();
    }

    render() {
        return (
            <Provider store={store}>
                <HashRouter>
                    <div>
                        <Route exact path="/" component={SystemSetting}/>
                        <Route exact path="/template-manager" component={TemplateManager}/>
                        <Route exact path="/real-time-compiler" component={RealTimeCompiler}/>
                        <Route exact path="/template-driver/js-template" component={JSTemplate}/>
                        <Route exact path="/template-driver/js-template/:uri" component={JSTemplate}/>
                        <Route exact path="/api-driver" component={ApiDriver}/>
                        <Route exact path="/system-setting" component={SystemSetting}/>
                        <Route exact path='/overview-browser' component={OverviewBrowser}/>
                        <Route exact path='/mini' component={Mini}/>
                    </div>
                </HashRouter>
            </Provider>
        );
    }
}

export default App;
