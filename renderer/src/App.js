import React, { Component } from 'react';
import {Upload} from "antd"
import 'antd/dist/antd.css';
import Template from "./js/template";
import ModalWrapper from "./components/ModalWrapper";


class App extends Component {
    onFileSelect(file){
        Template.load(file).then(template=>{
            ModalWrapper.$show(()=><p>{JSON.stringify(template.getParameter())}</p>)
        })
  }

  render() {
    return (
        <Upload.Dragger showUploadList={false} customRequest={e=>this.onFileSelect(e.file)}>
          <p>小伙子</p>
        </Upload.Dragger>
    );
  }
}

export default App;
