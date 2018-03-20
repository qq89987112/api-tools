import React from 'react';
import {Select,Button,Icon} from 'antd'
import "./DynamicList.scss"

const
    Option = Select.Option;



export default class DynamicList extends React.Component {

    state = {
        list:[]
    }

    componentWillMount(){
        const {defaultList=[]} = this.props;
        this.setState({
            list:[...defaultList]
        })
    }

    add = ()=>{
        const {list} = this.state;
        const {defaultList=[]} = this.props;
        let empty = {};
        defaultList.push(empty);
        this.setState({
            list:list.concat(empty)
        })
    }

    render() {
        let {  renderItem=()=>{},renderAdd=()=>{}} = this.props;
        const {list} = this.state;
        const {defaultList=[]} = this.props;
        return (
            <div className='dynamic-list-component'>
                {
                    list&&list.map((item,index)=><div key={index} className="dynamic-list-item">
                        {renderItem(item,index)}
                        <Icon
                            onClick={()=>{
                                this.setState({
                                    list:undefined
                                })
                                let arr = this.state.list;
                                arr.splice(index,1);
                                defaultList.splice(index,1);
                                setTimeout(()=>this.setState({
                                    list: arr
                                }),0);
                            }} className='icon' type='close-circle-o' style={{marginLeft:10}} /></div>)
                }
                <div class="footer">
                    {
                        renderAdd(this) || <p style={{textAlign:'center'}}><Button type='primary' onClick={this.add}>添加</Button></p>
                    }
                </div>
            </div>
        )
    }
}


