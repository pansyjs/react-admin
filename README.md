<p align="center">
  <a href="https://github.com/ts-react/react-admin-template">
    <img width="100" src="https://github.com/ts-react/react-admin-template/blob/gh-pages/assets/logo.svg">
  </a>
</p>

<h1 align="center">React Admin Template</h1>

<p align="center">
  <a href="https://github.com/facebook/react">
    <img src="https://img.shields.io/badge/react-16.8.1-brightgreen.svg" alt="react">
  </a>
  <a href="https://github.com/ant-design/ant-design">
    <img src="https://img.shields.io/badge/ant--design-3.16.5-brightgreen.svg" alt="antd">
  </a>
  <a href="https://github.com/umijs/umi">
    <img src="https://img.shields.io/badge/umi-2.6.16-brightgreen.svg" alt="umi">
  </a>
  <a href="https://github.com/Microsoft/TypeScript">
    <img src="https://img.shields.io/badge/typescript-3.4.2-brightgreen.svg" alt="typescript">
  </a>
  <a href="https://github.com/ts-react/react-admin-template/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-Anti%20996-blue.svg" alt="996">
  </a>
  <a href="https://996.icu">
    <img src="https://img.shields.io/badge/link-996.icu-red.svg" alt="996">
  </a>
</p>

# 参与开发

- 🎉🎉🎉 欢迎 PR
- 🌴🌴🌴 钉钉交流群(23355178)

使用钉钉扫描下方二维码

<img height="200" src="https://github.com/ts-react/react-admin-template/blob/gh-pages/assets/dingding.jpeg"></img>

# 使用

1. 安装 NodeJs 推荐安装最新稳定版

2. 全局安装 yarn(可跳过)

```
npm install --global yarn
```

3. 安装依赖

`npm run bootstrap` 或者 `yarn bootstrap`

4. 开发

`npm run start` 或者 `yarn start`

5. 编译

`npm run build` 或者 `yarn build`

# 技术栈

- 框架：React、Umi
- 组件库：ant-design
- 开发语言：TypeScript
- Ajax 库：Axios
- 样式：Less

# 关于 API

[nest-serve-starter](https://github.com/typescript-projects/nest-serve-starter) 正在开发中...

# 项目目录

```
├── config                      # UMI配置相关
│   ├── config.ts               # umi配置文件
│   ├── plugin.config.ts        # umi插件配置
│   ├── router.config.ts        # 路由相关配置
│   ├── server.config.ts        # 后端服务地址配置
│   └── theme.config.ts         # 定制化ant-design
├── docker                      # docker相关配置
│   ├── Dockerfile              # docker配置文件
│   └── nginx.conf              # nginx相关配置
├── mock                        # 后端接口模拟
│   ├── notices.ts              # 通知相关
│   └── users.ts                # 用户相关
├── public                      # 静态资源
│   ├── favicon.png             # favicon
│   └── 
├── src                         # 主目录
│   ├── assets                  # 静态资源
│   ├── components              # 全局公共组件
│   │   ├── authorized          # 面包屑组件
│   │   ├── drawer-wrapper      # 对drawer二次封装
│   │   ├── exception           # 异常组件
│   │   ├── global-footer       # 全局Footer组件
│   │   ├── global-header       # 全局Header组件
│   │   ├── header-dropdown     # 
│   │   ├── header-search       # header搜索组件
│   │   ├── icon-font           # icon组件 具体请参考ant-design自定义图标方案
│   │   ├── notice-icon         # 消息通知组件
│   │   ├── page-header-wrapper # 对page-header二次封装
│   │   ├── page-loading        # loading组件
│   │   ├── screen-full         # 全屏组件
│   │   ├── select-lang         # 选择语言组件
│   │   ├── notice-icon         # 消息通知组件
│   │   ├── send-code           # 发送验证码组件
│   │   ├── side-menu           # 左侧菜单组件
│   │   ├── standard-table      # 对table的二次封装
│   │   ├── tab-pages           # 页面Tab组件
│   │   └──                     #
│   ├── config                  # 项目配置
│   │   ├── index.ts            # 项目主要变量配置
│   │   └── 
│   ├── layouts                 # 项目常用布局
│   ├── locales                 # 多语言目录
│   ├── models                  # 全局model
│   ├── pages                   # 所有页面
│   ├── services                # 后端接口相关
│   ├── styles                  # 样式目录
│   ├── utils                   # 全局工具方法目录
│   ├── global.ts               # 全局TS umi会直接引入
│   └── global.less             # 全局样式 umi会直接引入
├── .editorconfig               # IDE设置文件
├── .gitignore                  # Git忽略文件
├── .huskyrc.js                 # husky配置文件
├── .nvmrc                      # 
├── .prettierignore             # 
├── .prettierrc.js              # 
├── .stylelintrc                # 
├── commitlint.config.js        # 
├── jest.config.js              # 
├── LICENSE                     # 
├── lint-staged.config.js       # 
├── package.json                # package.json
├── README.md                   # 项目描述文件
├── tsconfig.json               # typescript配置文件
└── yarn.lock                   # yarn生成文件
```

# 关于打包

> 提供`build:test`、`build:prod`两个编译命令、可结合CI使用

请在 `config/server.config.ts`中配置各个环境的API地址

# commit-message

> git 提交信息使用[commitlint](https://github.com/marionebl/commitlint) 进行规范

具体配置以及説明请查看[commitlint-config-jiumao](https://github.com/jiumao-fe/commitlint-config-jiumao)

# 自定义图标

> 采用ant-design提供的解决方案，具体请查看[自定义图标](https://ant.design/components/icon-cn/#components-icon-demo-custom)

在 `/src/config/index.ts` 中配置 `SETTING_DEFAULT_CONFIG.iconFontUrl`

# 借鉴项目

- [TypeScript-React-Starter](https://github.com/Microsoft/TypeScript-React-Starter)
- [ant-design-pro](https://github.com/ant-design/ant-design-pro)

# 最佳实践

- [react-typescript-cheatsheet](https://github.com/sw-yx/react-typescript-cheatsheet)
- [react-redux-typescript-guide](https://github.com/piotrwitek/react-redux-typescript-guide)
