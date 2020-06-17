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

### 使用 koa-parameter 校验参数

- 安装
  npm i koa-parameter --save

### 使用 MongoDB 数据库

- 什么是 NoSQL?
  对不用于传统关系型数据库的统称

- NoSQL 数据库的分类

  - 列存储 （HBase）
  - 文档存储（MongoDB）
  - Key-value 存储（Redis）
  - 图存储 （FlockDB） 【不常用的高级存储】
  - 对象存储 （db4o） 【不常用的高级存储】
  - XML 存储 （BaseX） 【不常用的高级存储】

- 为什么要用 NoSQL?

  - 简单，没有复杂的规范
  - 便于横拓展
  - 适合超大规模数据存储
  - 很灵活的存储复杂结构的数据（Schema Free）

- 什么是 MongoDB?

  - 面向文档存储的开源数据库
  - 由 C++ 编写

- 为什么要使用 MongoDB?

  - 性能好（内存计算）
  - 大规模数据存储 （扩展性好）
  - 安全可靠 （本地复制， 自动故障转移）
  - 方便存储复杂数据结构

- MongoDB 下载
  官网下载

- 使用云 MongoDB

  - MongoDB 官方的 MongoDB Atlas (免费 + 收费)

- 使用 Mongoose 连接 MongoDB
- 安装： npm i mongoose --save

### 设计用户模块的 Schema

操作步骤：

- 分析用户模块的属性
- 编写用户模块的 Schema
- 使用 Schema 生成用户 Model

### 使用 MongoDB 实现用户的增删改查

- 使用 Mongoose 实现增删改查
- 使用 Postman 测试增删改查
