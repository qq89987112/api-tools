import React, {Component} from 'react';
import { Layout, Input, Breadcrumb, Button } from 'antd';
import BaseComponent from "../../../components/Base/BaseComponent";
import JSONResult from "../../../components/JSONResult";
import 'antd/dist/antd.css';
import "./css/OverviewBrowser.scss"

const { Header, Content, Footer, Sider } = Layout;

export default class OverviewBrowser extends BaseComponent {

    render() {
        const {fileContent} = this.state;
        return (
          <Layout className='overview-browser-page'>
              <Header><div className='header'><Input className='input' placehoder='请输入URL地址' /><Button>跳转</Button></div></Header>
              <Sider>
                <JSONResult/>
              </Sider>
              <Layout>
                  <Header><Input/></Header>
                  {fileContent&&<Content>{fileContent}</Content>}
              </Layout>
          </Layout>
        );
    }
};
