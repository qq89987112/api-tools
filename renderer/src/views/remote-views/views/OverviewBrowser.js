import React, {Component} from 'react';
import { Layout, Input, Breadcrumb, Button } from 'antd';
import BaseComponent from "../../../components/Base/BaseComponent";
import JSONResult from "../../../components/JSONResult";
import 'antd/dist/antd.css';
import "./css/OverviewBrowser.scss"
import {RouteTabs} from "../../../components/TabSideContainer";
import serverSideJquery from "../../../js/server-side-jquery"
const { Header, Content, Footer, Sider } = Layout;

export default class OverviewBrowser extends BaseComponent {
    componentWillMount(){
        serverSideJquery("http://119.29.103.231:38888/index.html").then($=>{
            console.log($("ol > li > div"));

            debugger
        });
    }
    render() {
        const
            regExps = {

            };
        return (
          <Layout className='overview-browser-page'>
              <Header className='header'>
                  <Input className='input' placehoder='请输入URL地址' />
                  <Button onClick={()=>{
                   }} >跳转</Button>
              </Header>
              <Layout>
                  <Sider>
                      <JSONResult/>
                  </Sider>
                  <Content class='content'>
                      <RouteTabs/>
                  </Content>
              </Layout>
          </Layout>
        );
    }
};
