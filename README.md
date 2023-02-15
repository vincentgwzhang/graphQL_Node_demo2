```bash
$ mkdir localgraph
$ cd localgraph
$ npm init -y
$ npm install express express-graphql graphql
$ npm install -D nodemon
$ nano app.js
...
$ npx nodemon app.js
# 浏览器测试
>http://127.0.0.1:3000/
# 命令行测试
$ curl --request POST \
  --header 'content-type: application/json' \
  --url 'http://127.0.0.1:3000/' \
  --data '{"query":"query { hello ping }"}'
```


打开浏览器网站后输入：

query MyQuery {
    hello
    ping
}


query MyQuery {
    hello
    site(siteId: 2) {
        title
    }
}

query MyQuery {
    hello
    category(category: "aws") {
        title
    }
}