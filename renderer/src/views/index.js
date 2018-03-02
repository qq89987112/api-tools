import React, {Component} from 'react';
import 'antd/dist/antd.css';
import RemoteViews from "./remote-views";
import { HashRouter,Route,Link } from 'react-router-dom'
import TemplateShortcut from "../remote-main/TemplateShortcut";
import WebViews from "./web-views";
import { Provider } from 'react-redux'

class App extends Component {

    componentWillMount(){
        TemplateShortcut.reLoad();
    }

    render() {
        return (
            使用 redux 优化 shortcut + template 的管理
            <HashRouter>
                <div>
                    <Route path='/remove-views' component={RemoteViews}/>
                    <Route path='/web-views' component={WebViews}/>
                </div>
            </HashRouter>
        );
    }
}

export default App;
