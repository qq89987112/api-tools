import React, { Component } from 'react';
import {Upload} from "antd"
import 'antd'
import 'antd/dist/antd.css';

class App extends Component {
  beforeUpload(file){
    let fr = new FileReader();
    fr.readAsText(file);
    fr.onload = function() {
        console.log(this.result);
        debugger
    }
  }

  render() {
    return (
        <Upload.Dragger beforeUpload={this.beforeUpload}>
          小伙子
        </Upload.Dragger>
    );
  }
}

export default App;
