import React, {Component} from 'react';
import 'antd/dist/antd.css';
import BaseComponent from "../../components/Base/BaseComponent";
import RouteSideContainer from "../../components/RouteSideContainer";
import {HashRouter, Route, Link} from 'react-router-dom'
import ApiDriver from "./api-driver/ApiDriver";
import SystemSetting from "../SystemSetting";
import TemplateDriver from "./template-driver/TemplateDriver";
import JSTemplate from "./template-driver/JSTemplate";
import TemplateManager from "./template-driver/TemplateManager";
import RealTimeCompiler from "./RealTimeCompiler";

export default class WebViews extends BaseComponent {

    componentWillMount() {

    }


    render() {
        const {url} = this.props.match;
        return (
            <RouteSideContainer
                side={[
                    <Link to={url+'/real-time-compiler'}>实时编译</Link>,
                    <Link to={url+'/template-driver'}>模板驱动</Link>,
                    <Link to={url+'/api-driver'}>接口管理</Link>,
                    <Link to={url+'/template-manager'}>模板管理</Link>,
                    <Link to={url+'/system-setting'}>系统设置</Link>,
                ]}
                content={
                    [
                        <Route exact path={url + "/"} component={TemplateDriver}/>,
                        <Route exact path={url + "/real-time-compiler"} component={RealTimeCompiler}/>,
                        <Route exact path={url + "/remote-view"} component={TemplateDriver}/>,
                        <Route exact path={url + "/template-driver"} component={TemplateDriver}/>,
                        <Route exact path={url + "/template-driver/js-template"} component={JSTemplate}/>,
                        <Route exact path={url + "/api-driver"} component={ApiDriver}/>,
                        <Route exact path={url + "/template-manager"} component={TemplateManager}/>,
                        <Route exact path={url + "/system-setting"} component={SystemSetting}/>
                    ]
                }
            />
        );
    }
};
