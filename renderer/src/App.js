import React, {Component} from 'react';
import {Upload, Select} from "antd"
import 'antd/dist/antd.css';
import Template from "./js/template";
import ModalWrapper from "./components/Base/ModalWrapper";
import ApiManager from "./components/ApiManager/ApiManager";


class App extends Component {
    state = {
        type:'template-driver'
    }

    onFileSelect(file) {
        Template.load(file).then(template => {
            ModalWrapper.$show(() => <p>{JSON.stringify(template.getParameter())}</p>)
        })
    }

    render() {
        const {type} = this.state;
        return (
            <div>
                <div className='tar'>
                    <Select style={{ width: 120 }} defaultValue='template-driver' onChange={v=>this.setState({type:v})}>
                        <Select.Option value='template-driver'>模板驱动</Select.Option>
                        <Select.Option value='api-driver'>API驱动</Select.Option>
                    </Select>
                </div>
                {
                    (type==='template-driver'&&<Upload.Dragger showUploadList={false} customRequest={e => this.onFileSelect(e.file)}><p>小伙子</p></Upload.Dragger>) ||
                    (type ==='api-driver'&&<ApiManager/>)
                }

            </div>
        );
    }
}

export default App;
