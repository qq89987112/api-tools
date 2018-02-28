import React from 'react';
import createReactClass from 'create-react-class';
import {Layout, Menu, Button, Dropdown, Tabs} from 'antd'
import './css/SideContainer.scss'
import {Link, Route} from 'react-router-dom'
import PropTypes from 'prop-types'
import BaseComponent from "./Base/BaseComponent";

const {Header, Content, Sider} = Layout,
    MenuItem = Menu.Item,
    SubMenu = Menu.SubMenu;


/*
*  <RouteTabs routes={[
*   {path:'',component:component,title:'',key=''}
*  ]} />
* */
// eslint-disable-next-line no-undef
export class RouteTabs extends BaseComponent {

    // static contextTypes ={
    //     router:PropTypes.object.isRequired,
    // }


    _add = (title, component, key, props) => {
        console.log(key);
        const
            panes = this.state.panes || []
        panes.push({title, component, key, props});
        this.setState({panes, activeKey: key});
    }

    _change = (activeKey) => {
        if (this.state.activeKey !== activeKey) {
            this.setState({activeKey});
        }
    }

    _remove = (targetKey) => {
        let
            activeKey = this.state.activeKey,
            panes = this.state.panes,
            lastIndex = panes.findIndex(pane => pane.key === targetKey) - 1;

        panes = panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.setState({panes, activeKey});
    }

    add = (options, props = {}) => {
        let
            panes = this.state.panes || [],
            {title, component, key} = options;
        // 不能使用外部变量储存，必须即时计算。
        // added = this.added = this.added || {},

        //现在的key算法是根据前面一个key的number来+1的，所以必须要全部都有key才行，不然NaN

        // title = typeof title === 'string' ? title : key;
        // if (!title) {
        //     console.error("请指定key！");
        //     return;
        // }
        const pane = panes.find(pane => pane.title === title);

        // 后面的代码setState了，从而刷新Route，而Route会触发 Hook组件的componentDidMount
        if (pane) {
            return this.change(pane.key);
        }
        this._add(title, component, "" + ((+(panes[panes.length - 1] || {}).key || 0) + 1), props)
    }

    change = (activeKey) => {
        this._change(activeKey);
    }


    // 应该是一个通过key remove的方法，key默认为index应该是该方法的语法糖。
    remove = (targetKey) => {
        // this.context.router.history.goBack();
        this.stopAdd = true;
        this._remove(targetKey);
    }

    render() {
        const
            self = this,
            hookRoutes = [],
            routes = this.props.routes || [];
        routes.forEach((child, index) => {
            const Hook = createReactClass({
                componentDidMount() {
                    if (self.stopAdd) {
                        self.stopAdd = false;
                    } else {
                        setTimeout(() => {
                            //this.props 这里的props是当前Hook实例的props
                            self.add(child, this.props);
                        }, 0)
                    }
                },
                render() {
                    //占坑用的。
                    return <span/>
                }
            })
            hookRoutes.push(<Route exact path={child.path} component={Hook}/>);
        })
        return <div>
            {<Tabs
                hideAdd
                onTabClick={() => this.stopAdd = true}
                onChange={(activeKey) => this.setState({activeKey})}
                activeKey={this.state.activeKey}
                type="editable-card"
                onEdit={(targetKey, action) => this[action](targetKey)}
            >
                {(this.state.panes || []).map((pane, index) => <Tabs.TabPane className='tab-panel' tab={pane.title}
                                                                             key={pane.key}>{
                    <pane.component {...pane.props}  />}</Tabs.TabPane>)}
            </Tabs>}
            {/*用于存放路由钩子*/}
            <div style={{display: 'none'}}>{hookRoutes}</div>
        </div>
    }
}

// 注意父路由不能写 exact
export default class TabSideContainer extends BaseComponent {


    render() {
        let
            {side, type} = this.props;

        const
            renderMenuChildren = (children) => {
                return children.map((child, index) => {
                    if (child.children) {
                        return <SubMenu title={child.title}>
                            {renderMenuChildren(child.children)}
                        </SubMenu>
                    } else {
                        // 当 child.visibility =  false 时不显示。
                        return child.visibility !== false &&
                            <MenuItem item={child}><Link to={child.path}>{child.title}</Link></MenuItem>
                    }
                }).filter(i => i)
            },
            menus = renderMenuChildren(side);
        // 哪里一直在触发刷新
        // debugger

        return (
            <Layout className={['side-container', type]}>
                <Sider className='sider-menu-box' collapsible>
                    <div className="logo"/>
                    <Menu theme='dark' className='side-menu' mode="inline" onClick={({item}) => {
                        // item = item.props.item;
                        // this.add(item.title,item.component)
                    }}>
                        {
                            menus
                        }
                    </Menu>
                </Sider>
                <Layout>
                    <div className='side-content-wrapper'>
                        <Content className="side-content">
                            <RouteTabs {...this.props} />
                        </Content>
                    </div>
                </Layout>
            </Layout>
        )
    }
}