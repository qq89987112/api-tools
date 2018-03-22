import React, {Component} from 'react';
import { Layout, Input, Breadcrumb, Button,Tree  } from 'antd';
import BaseComponent from "../components/Base/BaseComponent";
import 'antd/dist/antd.css';
import "./css/OverviewBrowser.scss"
import {RouteTabs} from "../components/TabSideContainer";
import serverSideJquery from "../js/server-side-jquery"
import {AsyncTree} from "../components/AsyncTree";
import Utils from "../js/Utils";
const { Header, Content, Footer, Sider } = Layout;
const TreeNode = Tree.TreeNode;

export default class ClipboardMan extends BaseComponent {

    componentWillMount(){
    }
    render() {
        const {treeData = [],plugin={}} = this.state;
        const
            bgcw={backgroundColor:'white'},
            match = this.urlMatcher.match;

        return (
          <Layout className='overview-browser-page'>
              <Header className='header'>
                  <Input className='input'  onInput={this.$onInput('url')} placehoder='请输入URL地址' />
                  <Button className='button' onClick={()=>{
                      let url = this.$getInputValue('url')||"http://119.29.103.231:38888/index.html";
                      serverSideJquery(url).then(match(url)||Promise.resolve);
                   }} >跳转</Button>
                  <Button>导入解析插件{plugin.name||""}</Button>
                  <Button>查找内容</Button>
              </Header>
              <Layout>
                  <Sider className="slider">
                      <AsyncTree
                          data={[{
                              title:'title',
                              key:'key',
                              url:'http://119.29.103.231:38888/index.html'
                          }]}
                          onLoad={item=>{
                              if(item&&item.url){
                                  // return
                                  return serverSideJquery(item.url).then(match(item.url)||Promise.resolve);
                              }
                              return Promise.resolve;
                          }}
                      />
                      这里使用异步加载的tree
                  </Sider>
                  <Content class='content'>
                      <RouteTabs/>
                  </Content>
              </Layout>
          </Layout>
        );
    }
};
