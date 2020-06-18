## Nodejs 开发防知乎服务端

技术栈: (koa 框架 + MongoDB 数据库 + JWT 认证)

### 深入理解 RESTful API

### 错误处理

- 运行时错误, 如:500
- 逻辑错误, 如: 404, 412, 422

- 使用 koa-json-error 第三方中间件

  - 安装: koa-json-error
  - 使用 koa-json-error 的默认配置处理错误
  - 修改配置使其在生产环境下禁用错误堆栈的返回

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

### session

#### session 概念

- session： 主要是放在服务器端的，相对安全
- cookie： 主要放在客户端，并且不安全
- sessionStorage： 仅在当前会话下有效，关闭页面或关闭浏览器后会被清除
- localStorage：除非手动清除，否则会永久保存

#### 工作原理：

- 浏览器（客户端）携带用户名和密码 请求服务端；
- 服务端接收到请求， 就会生成身份认证的 `session` 数据；
- 服务端就会保存在内存里，或者内存数据里（redis）;
- 将 `session` 数据的 `sessionId` 返回给客户端;
- 客户端接收到 `sessionId` 就会保存在 `cookie` 中;
- 此后的所有请求，客户端都会携带 `cookie` 中的 `sessionId` 发送给服务端；
- 服务端拿 `sessionId` 来寻找 `session`数据, 并解析 `session`数据，就知道该用户有没有登录或权限等；
- 前端只需要在退出登录的时候，手动清理掉浏览器里的 `cookie` 就可以了;
- 服务端也可以强制清除 `session`数据，使用户强制退出，重新认证。

#### session 的优势

- 相比 JWT, 最大的优势在于可以主动清除 session
- session 保存在服务端，相对比较安全
- 结合 cookie 使用，较为灵活，兼容性较好

#### session 的劣势

- cookie + session 在跨域场景下表现并不好
- 如果是分布式部署，需要做多机共享 session 机制
- 基于 cookie 的机制很容易被 CSRF
- 查询 session 信息可能会有数据库查询操作，需要时间和计算

### JWT

#### 什么 JWT?

- json web token 缩写，是一个开放标准
- 定义了一种紧凑且独立的方式，可以将各方信息作为 json 对象进行安全传输
- 该信息可以被验证和信息，因为是经过数字签名的

#### JWT 构成 (使用了 base64url 进行了编码)

- Header 头部
  - Header = {
    typ: token 的类型，
    alg: 使用的 hash 算法（例如：HMAC SHA256）
    }
- Payload 有效载荷

  - 存储需要传递的信息， 比如：用户名，用户 ID
  - 还包含了元数据，如 过期时间，发布人
  - 与 Header 不同，payload 可以加密

- Signature 签名
  - 对 Header 和 Payload 部分进行签名
  - 保证 Token 在传输的过程中没有被篡改或损坏

#### JWT 的工作原理

- 客户端发送一个 post 请求，将用户名和密码发送给服务端；
- 服务端验证用户名和密码，验证成功，则将用户信息生成 JWT 的 Payload（有效载荷）加密，并与 Header 一起 base64URL 编码；
- 服务端将 JWT 和返回结果一起发送给客户端；
- 客户端拿到 JWT 将其保存在 sessionStorage 或者 localStorage 中；
- 每次客户端发送请求，将其 JWT 放在请求头的 Authorization: Bearer JWT 中；
- 服务端拿到 JWT 后解密，拿到用户信息，可进行相应操作；
- 退出登录时，客户端手动清除保存的 JWT 即可

### JWT VS Session

- 可拓展性
  JWT 是无状态的，可以在多台服务器

- 安全性
  必要的 CSRF 保护措施

- RESTful API
  REST 架构要求程序是无状态的

- 性能
  JWT 性能不好，JWT 可能有大量的信息
  session 需要数据库查询

- 时效性
  JWT 要等待时间过期才被销毁
  session 可手动被清除销毁

#### jsontoken

- 安装: npm i jsonwebtoken
- 签名
- 验证

#### 实现登录并获取 token

操作步骤：

- 登录接口设计
- 使用 `jsonewebtoken` 生成 `token`

#### 授权

建立在认证的基础上

### 上传图片

##### 上传图片的需求场景

- 用户头像
- 封面图片
- 问题和回答中的图片
- 话题图片

##### 上传图片的功能点

- 基础功能： 上传图片、生成图片链接
- 附加功能： 限制上传图片的大小与类型、生成高中低三种分辨率的图片链接、生成 CDN

##### 上传图片的技术方案

- 阿里云 OSS 等云服务，推荐生产环境下使用
- 直接上传到自己的服务器，不稳定，不推荐在生产环境下使用

### 使用 koa-body 中间件获取上传的文件

操作步骤：

- 安装 koa-body， 替换 koa-bodyparser

  - koa-bodyparser 只支持 json 和 form 两种格式的请求体，不支持文件
  - koa-body 支持 json、form、文件请求

- 设置图片上传目录

- 使用 Postman 测试上传文件

### 使用 koa-static 中间件生成图片链接

操作步骤：

- 安装 koa-static
  - koa-static 生成一个静态服务
  - 它指定了一个文件夹，文件夹下的所有文件都可以通过 http 服务访问
- 设置静态文件目录
- 生成图片链接

### 前端页面上传文件

- 编写上传文件的前端页面
- 与后端接口联调测试


### 分析个人资料功能点
- 不同类型（如字符串、数组）属性
- 字段过滤
  
#### 个人资料的 schema 设计
操作步骤：
  - 分析个人资料的数据结构
  - 设计个人资料的schema
  
#### 个人资料的参数校验
操作步骤：
  - 分析个人资料的数据结构
  - 编写代码校验个人资料参数

#### RESTful API 字段过滤
  - 设计 schema 默认隐藏部分字段
  - 通过查询字符串显示隐藏字段
  - 使用 postman 测试