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
                "url": "/subject/${id}",
                "method": "get",
                "params": [
                    "title"
                ],
                "paramsFrom": {
                    "id": "movieTheaters.subjects[0].id",
//          从input表单中生成并使用正则(可以用来生成fromcheck)
//          plugin 使用
                    "other": {
                        type:'text',
                        reg:''
                    }
                },
                "page": "details"
            }
        ]
    }
]