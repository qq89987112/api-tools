module.exports = [
    {
        "name": "movie",
        "prefix": "https://api.douban.com/v2/movie",
        "value": [
            {
                "store": "movieTheaters",
                "name": "fetchTheaters",
                "url": "/in_theaters",
                "method": "GET",
                "page": "main"
            },
            {
                "name": "fetchSubject",
                // 这里需要将${id}转为模版字符串,可以使用动态函数解决。
                "url": "/subject/${id}",
                "method": "get",
                "params": [
                    "title"
                ],
                // 分别有对象和字符串写法。对象写法信息更多提供给ui生成，字符串写法主要给test-api
                "paramsFrom": {
                    "id": {
                        from:'route',
                        get:"movieTheaters.subjects[0].id"
                    },
//          从input表单中生成并使用正则(可以用来生成fromcheck)
//          plugin 使用
                    "title": {
                        from:'input',
                        type:'text',
                        reg:'/\s+/g',
                        //name:'',
                        failMsg:'请输入正确的用户名!'
                    }
                },
                "page": "details"
            }
        ]
    }
]