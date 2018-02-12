import React, {Component} from 'react';
import 'antd/dist/antd.css';
import { HashRouter,Route,Link } from 'react-router-dom'
import OverviewBrowser from "./views/OverviewBrowser";




export default class RemoteView extends Component {

    render() {
        const { match } = this.props;
        return (
            <div>
                <Route  exact path={match.url + '/overview-browser'} component={OverviewBrowser}/>
            </div>
        );
    }
};
