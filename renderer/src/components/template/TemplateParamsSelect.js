import  React from 'React';
import { Select } from 'antd';

/*
*
*   <MTree data={[{
*       title:'title',
*       key:'key',
*       children:[]
*   }]} onLoad={(item)=>{
*
*   }} />
* */
export class TemplateParamsSelect extends React.Component {

    render() {
        return (
            <Select style={{width:120}} {...this.props}>
                <Select.Option value="Object">对象</Select.Option>
                <Select.Option value="Array">数组</Select.Option>
                <Select.Option value="String">字符串</Select.Option>
                <Select.Option value="Number">数字</Select.Option>
            </Select>
        );
    }
}