import React, {Component} from 'react';
import { Layout, Input, Breadcrumb, Button,Tree  } from 'antd';
import BaseComponent from "../../../components/Base/BaseComponent";
import 'antd/dist/antd.css';
import "./css/OverviewBrowser.scss"
import {RouteTabs} from "../../../components/TabSideContainer";
import serverSideJquery from "../../../js/server-side-jquery"
import {MTree} from "../../../components/MTree";
const { Header, Content, Footer, Sider } = Layout;
const TreeNode = Tree.TreeNode;

export default class OverviewBrowser extends BaseComponent {
    componentWillMount(){
    }
    render() {
        const {treeData = []} = this.state;
        const
            bgcw={backgroundColor:'white'},
            regExps = {
                "http://119.29.103.231:38888/index.html":$=>{
                    let $ol = $("ol > li > div");
                    return [].concat($ol.get()).map(item => {
                        let title = $(item).text().split("...");
                        return {
                            title: title[0].replace(/\s/g, ""),
                            url: (title[1] || "").replace(/\s/g, "")
                        };
                    });
                }
            };
        return (
          <Layout className='overview-browser-page'>
              <Header className='header'>
                  <Input className='input'  onInput={this.$onInput('url')} placehoder='请输入URL地址' />
                  <Button className='button' onClick={()=>{
                      let url = this.$getInputValue('url')||"http://119.29.103.231:38888/index.html";
                      serverSideJquery(url).then($=>{(regExps[url]||(()=>{}))($)});
                   }} >跳转</Button>
              </Header>
              <Layout>
                  <Sider style={bgcw}>
                      <MTree
                          data={[{
                              title:'title',
                              key:'key',
                              url:'http://119.29.103.231:38888/index.html'
                          }]}
                          onLoad={item=>{
                              if(item&&item.url){
                                  // return
                                  return serverSideJquery(item.url).then($=>(regExps[item.url]||(()=>{}))($));
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
