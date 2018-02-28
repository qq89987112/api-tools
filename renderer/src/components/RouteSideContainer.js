import React from 'react';
import {Layout, Menu, Button, Dropdown,Tabs} from 'antd'
import './css/SideContainer.scss'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import BaseComponent from "./Base/BaseComponent";

const {Header, Content, Sider} = Layout,
    MenuItem = Menu.Item,
    SubMenu  = Menu.SubMenu ;

export default class RouteSideContainer extends BaseComponent {
    state = {
        activeIndex: 0,
    }

    render() {
        let
            {side, content = []} = this.props;
        content = content.map(item => () =>item);

        const renderMenuChildren = (children)=>{
            return children.map((child, index) => child.children ? <SubMenu title={child.title}>
                {renderMenuChildren(child.children)}
            </SubMenu> : <MenuItem item={child}><span>{child.title}</span></MenuItem>)
        }
        return (
            <Layout className={['side-container']}>
                <Sider collapsible>
                    <div className="logo"/>
                    <Menu theme='dark' className='side-menu' mode="inline" onClick={({item})=>{
                        item = item.props.item;
                        this.add(item.title,item.component)
                    }}>
                        {
                            renderMenuChildren(side)
                        }
                    </Menu>
                </Sider>
                <Layout>
                    <div className='side-content-wrapper'>
                        <Content className="side-content">
                            {
                                content.map((Item, index) => <Item key={index}/>)
                            }
                        </Content>
                    </div>
                </Layout>
            </Layout>
        )
    }
}