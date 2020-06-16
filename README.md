## Nodejs 开发防知乎服务端

技术栈: (koa 框架 + MongoDB 数据库 + JWT 认证)

### 深入理解 RESTful API

### 错误处理

- 运行时错误, 如:500
- 逻辑错误, 如: 404, 412, 422

- 使用 koa-json-error 第三方中间件
  安装: koa-json-error
  使用 koa-json-error 的默认配置处理错误
  修改配置使其在生产环境下禁用错误堆栈的返回

- 跨平台设置环境变量: cross-env
  安装: npm i cross-env --save-dev
