import React from "react";
import {message} from "antd";

class BaseComponent extends React.Component {

    state = {}

    wrapLoadingCache = new Map();

    //=========wrap 相关 开始
    // 当api返回的data并不是列表时,应该在api函数里的then中作调整
    wrapLoading(apiFunc, loadingName, stateName) {
        const
            self = this,
            wrapper = (...params) => {
                self.$load(loadingName);
                return apiFunc(...params).then((data) => {
                    stateName&&self.setState({
                        [stateName]: data.list
                    })
                    self.$cancel(loadingName);
                    return data;
                }).catch(data=>{
                    self.$cancel(loadingName);
                    return Promise.reject(data);
                });
            };

        this.wrapLoadingCache.set(apiFunc, wrapper);

        return wrapper
    }

    wrapLoadMore(apiFunc,params = {}){
        let
            _page = 1,
            _isLoaded = false,
            _params = params,
            _rows = params.rows || 10;

        return {
            getParams(){
                return _params;
            },
            reLoadPage() {
                _params.pageNum = _page;
                _params.pageSize = _rows;
                return apiFunc(_params);
            },
            reLoad(params) {
                _page = 1;
                _isLoaded = false;
                _params = params || _params;
                _params.pageNum = _page;
                _params.pageSize = _rows;
                return apiFunc(_params);
            },
            // 这个主要功能是当通过筛选reLoad后,保存筛选条件进行分页
            loadPage(page){
                _params.pageNum = page;
                _params.pageSize = _rows;
                return apiFunc(_params);
            },
            loadNext() {
                _params.pageNum = ++_page;
                _params.pageSize = _rows;
                return _isLoaded && Promise.reject({msg: "全部加载完成"}) ||

                    apiFunc(_params).then((data) => {
                        data = data.data;
                        if (data && data.length === 0) {
                            _isLoaded = true;
                            return Promise.reject({msg: "全部加载完成"});
                        }
                        return data;
                    });
            },
            //  并不需要,直接loadNext拿到报错即可
            // isLoaded(){
            //   return _isLoaded;
            // }
        }
    }

    wrapLoadMoreEx(api,name,params){
            const
                context = this,
                loadingWrapper = this.wrapLoading(api, name, name),
                loadingMoreWrapper = this.wrapLoadMore(loadingWrapper, params);
            return loadingMoreWrapper.reLoad().then((data) => {
                    context[name+"LoadMore"] = loadingMoreWrapper;
                    context.setState({
                        [`${name}Pagi`]: {
                            total: data.totalCount,
                            onChange: (page, pageSize) => setTimeout(() => loadingMoreWrapper.loadPage(page), 0)
                        },
                        [`${name}Reload`]: loadingMoreWrapper.reLoad
                    })
                    return data;
                }
            )
    }


    // 不推荐使用。当需要用到 getWrapedWidthLoading 时,应将函数集中初始化,如
    // const borrowList = apiUtils.wrapWidthLoading(borrow.borrowList, 'borrowList', 'borrowList');
    // borrowList().then(() => this.setState({
    //       borrowPagi: {
    //           total: 50,
    //           onChange: (page, pageSize) => setTimeout(() => borrowList(page, pageSize), 0)
    //       },
    //         borrowQuery:(...params2)=>{
    //             const _borrowList = borrowList;
    //             borrowList = (...params1)=>_borrowList(...params1,...params2);
    //             borrowList(1,this.page);
    //         }
    //     })
    // )
    getWidthLoading(apiFunc){
        return this.wrapLoadingCache.get(apiFunc);
    }

    //=========wrap 相关 结束

    // 多语言的语言库制作思路：先分词，然后可能出现频率高的放在前面，然后用 . 拼接分词，然后排序。如 请输入邮箱 = email.placeholder 。这样的好处是结构清晰，想词容易。
    $f = (id, defaultMessage = '') => {
        // import PropTypes from "prop-types"
        // import { injectIntl } from 'react-intl';
        //  static propTypes = {
        //     intl: PropTypes.object.isRequired,
        // }
        // export default injectIntl(ProjectManager);

        //BaseAntPage.$f2 = this.props.intl.formatMessage;
        return BaseComponent.formatMessage({id, defaultMessage}) || this.props.intl.formatMessage({id, defaultMessage});
    }


    //form表单相关
    $formCheck(...params) {
        return params.find(item => {
            const
                name = item[0],
                //通过时的条件
                test = item[1],
                error = item[2];
            if (test instanceof Function) {
                if (!test(this.__form_value__[name])) {
                    message.error(error);
                    //中断循环
                    return true;
                }
            } else if (test instanceof RegExp) {
                if (!test.test(this.__form_value__[name])) {
                    message.error(error);
                    //中断循环
                    return true;
                }
            } else {
                throw new Error('不支持的语法')
            }
        })
    }

    __form_value__ = {}
    $onInput = (name, realTime) => {
        const type = Object.prototype.toString.call(name);
        switch (type) {
            case "[object String]":
                return (event) => {
                    const target = event.target;
                    const value = target.type === 'checkbox' ? target.checked : target.value;
                    // const name = target.name;
                    this.$setInputValue(name, value, realTime)
                }
            case "[object Function]":
                return (event) => {
                    const target = event.target;
                    const value = target.type === 'checkbox' ? target.checked : target.value;
                    // const name = target.name;
                    name(value)
                }
                break;
            default:
                break;
        }

    }

    $setInputValue = (name, value) => {
        const
            form = this.__form_value__;
        form[name] = value;
    }

    $getInputValue = (names) => {
        const
            form = this.__form_value__;
        if (Array.isArray(names)) {
            return names.reduce((prev, name) => {
                    form[name] !== undefined && (prev[name] = form[name])
                    return prev
                }, {}
            )
        }
        else {
            return form[names];
        }
    }

    $resetAllValue() {
        this.__form_value__ = {};
    }


    // loading相关
    $load = (name) => {
        let
            __loadings__ = this.state.__loadings__ || new Set(),
            __loaded__ = this.__loaded__ = this.__loaded__ || new Set(),
            names = [].concat(name);
        names.forEach(name => __loaded__.add(name) && __loadings__.add(name))

        return this.setState({
            __loadings__: __loadings__
        })
    }

    $isLoaded = (name) => {
        let
            __loaded__ = this.__loaded__ = this.__loaded__ || new Set(),
            names = [].concat(name);

        return names.every(name => __loaded__.has(name))
    }

    $cancel = (name) => {
        let
            __loadings__ = this.state.__loadings__ || new Set(),
            names = [].concat(name);

        names.forEach(name => __loadings__.delete(name));
        return this.setState({
            __loadings__: __loadings__
        })
    }

    // 可以用来做 ant button 的 loading 绑定
    // <Button type='primary' loading={this.$isLoading('submitForget')}>{this.$f("submit")}</Button>

    $isLoading(name) {
        let
            __loadings__ = this.state.__loadings__ || new Set(),
            names = [].concat(name);

        return names.every(name => __loadings__.has(name));
    }
}

export default BaseComponent;