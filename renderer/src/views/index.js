import React, {Component} from 'react';
import 'antd/dist/antd.css';
import RemoteViews from "./remote-views";
import { HashRouter,Route,Link } from 'react-router-dom'
import TemplateShortcut from "../remote-main/TemplateShortcut";
import WebViews from "./web-views";


class App extends Component {

    componentWillMount(){
        TemplateShortcut.reLoad();
    }

    render() {
        return (
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
