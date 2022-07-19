### 启动服务

```
npm run dev
```

### 发布到测试服

```
npm run build:stage
```

### 发布到正式服

```
npm run build:prod
```

### 自动生成协议相关代码

```
npm run proto
```

### 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```

### 主要目录结构

```
build   //工具脚本
    -proto           //协议配置文件
    -proto_template  //模板
    -gen_proto.js    //自动生成协议文件脚本
public  //静态资源
src     //代码
    -assets          //资源
    -core            //全局核心代码
    -styles          //样式
    -view            //页面模块
        -module1
            -command        //命令，自动成生的协议cmd会放在这里
            -mediator
            -view
            -setting.ts     //配置 自动生成的代码
        -module2
        ...
```

### 如何开始一个新的模块

```
1、在build/proto目录下创建配置文件，模块名即文件名；
2、执行npm run proto2
3、脚本自动在src/views/目录下创建该模块；同时生成新的路由：src/router/layoutRouter
4、参考模块：vendor-managment
```

PS: \_user_detail 执行 npm run proto1

### 语言相关

```
language_dialog：多语言翻译
lang_img_dialog：多语言图片
```
