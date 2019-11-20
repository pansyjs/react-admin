<p align="center">
  <a href="https://github.com/ts-react/react-admin-template">
    <img width="100" src="https://github.com/ts-react/react-admin-template/blob/gh-pages/assets/logo.svg">
  </a>
</p>

<h1 align="center">React Admin Template</h1>

<p align="center">
  <a href="http://umijs.org">
    <img src="https://img.shields.io/badge/build%20with-umi-028fe4.svg" alt="react">
  </a>
  <a href="https://github.com/facebook/react">
    <img src="https://img.shields.io/badge/react-16.8.1-brightgreen.svg" alt="react">
  </a>
  <a href="https://github.com/ant-design/ant-design">
    <img src="https://img.shields.io/badge/ant--design-3.19.2-brightgreen.svg" alt="antd">
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

## 特性

- 💡 TypeScript: 应用程序级 JavaScript 的语言
- 💎 优雅美观：基于 Ant Design 体系精心设计
- 📐 常见设计模式：提炼自中后台应用的典型页面和场景
- 🚀 最新技术栈：使用 React/umi/dva/ant-design 等前端前沿技术开发
- 🌐 国际化：内建业界通用的国际化方案
- ⚙️ 最佳实践：良好的工程实践助您持续产出高质量代码
- 🔢 Mock 数据：实用的本地数据调试方案
- 🔒 优秀的权限设计：目前能找到的最好的权限实现方案

## 使用

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

**本地开发后端接口配置**

使用`local-server.config.ts`配置文件

内容如下:

```
export default {
  baseURL: 'https://api.jiumao.com'
};
```

## 技术栈

- 框架：React、Umi
- 组件库：ant-design
- 开发语言：TypeScript
- Ajax 库：Axios
- 样式：Less

## 部署相关

- 代码上 CDN 请使用以下 umi 插件

> 解决资源访问路径问题以及 API 地址配置问题

[umi-plugin-deploy-config](https://github.com/alitajs/umi-plugin-packages/tree/master/packages/umi-plugin-deploy-config)

## 路由配置

> 系统采用手动配置路由的形式

**相关字典**

### icon

> 配合[iconfont](https://www.iconfont.cn)使用

- 参数类型: `string`
- 参数描述: 左侧菜单的 Icon
- 默认值: 无

### name

- 参数类型: `string`
- 参数描述: 参数名称 配合多言插件使用 添加路由请在 locals 目录下的 menu.ts 添加对应项
- 默认值: 无
- examples:

```
// router.config.ts
{
  path: '/module1',
  name: 'module1',
  component: 'component path',
  routes: [
    path: '/module1/page1',
    name: 'page1',
    component: 'component path',
  ]
}

// menu.ts 添加下面几行配置
'module1': '***',
'module1.page1': '***'
```

### authority

> 配合[Policy](https://github.com/ts-react/policy)使用

- 参数类型: `string` | `string[]`
- 参数描述: 权限 控制是否显示左侧菜单 以及路由拦截
- 默认值: 无

### hideBreadcrumb

- 参数类型: `boolean`
- 参数描述: 是否显示面包屑
- 默认值: true

### hideInMenu

- 参数类型: `boolean`
- 参数描述: 可以在菜单中不展示这个路由，包括子路由
- 默认值: false

### hideChildrenInMenu

- 参数类型: `boolean`
- 参数描述: 用于隐藏不需要在菜单中展示的子路由
- 默认值: false

## API

[nest-serve-starter](https://github.com/typescript-projects/nest-serve-starter) 正在开发中...

## 关于权限

请查看 [ant-design-plus authorized](https://antd-plus.alitajs.com/components/authorized)

## 项目目录

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

## 项目规范

具体请查看[walrus](https://walrus-plus.now.sh)

## 自定义图标

> 采用 ant-design 提供的解决方案，具体请查看[自定义图标](https://ant.design/components/icon-cn/#components-icon-demo-custom)

在 `/src/config/index.ts` 中配置 `SETTING_DEFAULT_CONFIG.iconFontUrl`

## 借鉴项目

- [TypeScript-React-Starter](https://github.com/Microsoft/TypeScript-React-Starter)
- [ant-design-pro](https://github.com/ant-design/ant-design-pro)

## 最佳实践

- [react-typescript-cheatsheet](https://github.com/sw-yx/react-typescript-cheatsheet)
- [react-redux-typescript-guide](https://github.com/piotrwitek/react-redux-typescript-guide)

## 友情推荐

[awesome-frontend](https://github.com/wangxingkang/awesome-frontend) 整理前端相关的博客、教程、库... 欢迎查阅

## 🌟 社区互助

| Github Issue                                      | 钉钉群                                                                                     | 微信群                                                                                   |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| [issues](https://github.com/pansyjs/utils/issues) | <img src="https://github.com/alitajs/alita/blob/master/public/dingding.png" width="100" /> | <img src="https://github.com/alitajs/alita/blob/master/public/wechat.png" width="100" /> |
