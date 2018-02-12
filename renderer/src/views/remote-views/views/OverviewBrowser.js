import React, {Component} from 'react';
import { Layout, Input, Breadcrumb, Icon } from 'antd';
import 'antd/dist/antd.css';
import BaseComponent from "../../../components/Base/BaseComponent";
import JSONResult from "../../../components/JSONResult";
const { Header, Content, Footer, Sider } = Layout;

export default class OverviewBrowser extends BaseComponent {

    render() {
        const {fileContent} = this.state;
        return (
          <Layout>
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
