import  React from 'React';
import { Tree } from 'antd';
const TreeNode = Tree.TreeNode;

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
export class AsyncTree extends React.Component {
    state = {
        treeData: [],
    }



    onLoadData = (treeNode) => {
        const {onLoad=Promise.resolve} = this.props;
        return new Promise((resolve) => {
            if (treeNode.props.children) {
                return resolve();
            }
            let item = treeNode.props.dataRef;
            onLoad(item).then((data=[])=>{
                item.children = data;
                this.setState({
                    treeData: [...this.state.treeData],
                });
                resolve();
            });
        });
    }
    renderTreeNodes = (data,path="") => {
        return data.map((item,index) => {
            // 将这段放在  if (item.children) { 里就会报错。
            // ===
            let path2 = path.split("-");
            path2.push(index);
            path2 = path2.filter(i=>i===0||i);
            item.key = path2.join("-");
            // ===

            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children,item.key)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} dataRef={item} />;
        });
    }
    render() {
        // 因为 children 的赋值是直接对对象操作的，所以可以直接读取props里的内容。
        const {data=[]} = this.props;
        return (
            <Tree showLine loadData={this.onLoadData}>
                {this.renderTreeNodes(data)}
            </Tree>
        );
    }
}