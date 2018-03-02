import React, {Component} from 'react';
import 'antd/dist/antd.css';
import BaseComponent from "../../components/Base/BaseComponent";
import { HashRouter,Route,Link } from 'react-router-dom'
import Mini from "./views/Mini";
import OverviewBrowser from "./views/OverviewBrowser";

export default class RemoteViews extends BaseComponent {

    componentWillMount() {

    }



    render() {
        const {url} = this.props.match;
        return (
            <div>
                <Route exact path={url} component={OverviewBrowser}/>
                <Route exact path={url + '/overview-browser'} component={OverviewBrowser}/>
                <Route exact path={url + '/mini'} component={Mini}/>
            </div>
        );
    }
};
