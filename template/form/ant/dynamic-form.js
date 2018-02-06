function template() {

    return {
        parameters:{
            className: String,
            labels: Array,
            fields: Array,
            fieldValids: Array,
        },
        requestLib:{

        },
        compile(params) {
            const {fields =[], className="", fieldValids=[], labels=[]} = params;
            const
                className2 = className.replace(/^\S/,s=>s.toLowerCase()),
                fieldsTypeMap = fields.reduce((prev,cur)=>{
                    cur = cur.split(".");
                    prev[cur[0]] = cur.slice(-1)[0];
                    return prev;
                },{});

            return `
                <div>
                    {(this.state.list||[]).map(item=><Input defaultValue={item.value} onInput={this.$onInput(value=>item.value=value)} />)}
                    <Button onClick={()=>{
                        const list = (this.state.list||[]);
                        list.push({value:"new"});
                        this.setState({list})
                    }}>add</Button>
                    <Button onClick={()=>console.log(JSON.stringify(this.state.list))}>get</Button>
                </div>

            `
        }
    }
}