function template() {

    return {
        parameters: {

        },
        requestLib: {

        },
        //放在文件夹里时有用
        events: {},
        compile(params, context) {
            const {} = params;

            context && context.notify(undefined, undefined, {

            });
            return `
            <el-popover
      placement="top-start"
      title="标题"
      width="200"
      trigger="click">
      <p>这是内容</p>
      <el-button slot="reference">click 激活</el-button>
    </el-popover>
        `
        }
    }
}