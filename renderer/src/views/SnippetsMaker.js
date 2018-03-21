import React, {Component} from 'react';
import 'antd/dist/antd.css';
import BaseComponent from "../components/Base/BaseComponent";
import TemplateMaker from "../components/template/TemplateMaker";
import store from "../store"

export default class SnippetsEditor extends BaseComponent {
    render() {
        return <div>
                <TemplateMaker onSubmit={({key,template})=>{
                    // store.dispatch({
                    //     type:'SHORTCUT_ADD',
                    //     shortcut:{
                    //         key,
                    //         params:{
                    //             template
                    //         },
                    //         type:'模板跳转'
                    //     }
                    // })
                }
                } />
            </div>

    }
};
