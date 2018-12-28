# [react-admin-template](https://github.com/typescript-projects/react-admin-template)

![](https://img.shields.io/github/stars/typescript-projects/react-admin-template.svg)
![](https://img.shields.io/github/license/typescript-projects/react-admin-template.svg)
![](https://img.shields.io/github/issues/typescript-projects/react-admin-template.svg)
![](https://img.shields.io/github/forks/typescript-projects/react-admin-template.svg)

> react 管理后台开发模板

> 接口请移步[nest-serve-starter](https://github.com/typescript-projects/nest-serve-starter) 正在开发中...

# Usage

1. 安装依赖

```
npm run bootstrap
```

2. 开发

```
npm run dev || yarn dev
```

3. 编译

```
npm run build || yarn build
```

## 项目目录

```
├── config                      # 项目相关配置
│   ├── config.js               # umi相关配置
│   └── router.config.js        #
├── mock                        # 后端接口模拟
│   ├── login.js                # 登录相关
│   └──
├── public                      # 静态资源
├── src                         # 代码主目录
│   ├── assets                  # 静态资源
│   ├── components              # 全局公共组件
│   │   ├── Breadcrumb          # 面包屑组件
│   │   ├── CountDown           # 倒计时组件
│   │   ├── Exception           # 异常组件
│   │   ├── GlobalFooter        # 全局Footer组件
│   │   ├── GlobalHeader        # 全局Header组件
│   │   └──                     #
│   ├── config                  # 项目配置
│   │   ├── interceptors        #
│   │   ├── index.ts            # 项目配置主文件
│   │   └── menu.ts             # 项目左侧菜单配置
│   ├── icons                   # 字体图标
│   │   ├── svg                 # 存放svg
│   │   └── index.js            # 统一处理svg引入
│   ├── layouts                 # 布局
│   ├── styles                  # 样式目录
│   ├── utils                   # 全局工具方法目录
│   │   └──                     #
│   ├── global.js               # 全局JS umi会直接引入
│   └── global.less             # 全局样式 umi会直接引入
├── .editorconfig               # IDE设置文件
├── .stylelintrc                # stylelint配置文件
├── .umirc.js                   # umi配置文件
└── yarn.lock                   # yarn生成文件
```

# commit-message

> git 提交信息使用[commitlint](https://github.com/marionebl/commitlint) 进行规范

具体配置以及説明请查看[commitlint-config-jiumao](https://github.com/jiumao-fe/commitlint-config-jiumao)

# Icon 解决方案

## 如何在 umi 环境在添加

- 安装依赖

```
yarn add -D @types/webpack-env svg-sprite-loader
```

- 添加配置

```
// umi配置文件
// 添加以下配置
urlLoaderExcludes: [resolve(__dirname, '../src/icons/svg')],
chainWebpack(config) {
  config.module
    .rule('svg')
    .test(/\.svg$/i)
    .include.add(resolve(__dirname, '../src/icons/svg'))
    .end()
    .use('svg-sprite-loader')
    .loader(require.resolve('svg-sprite-loader'));
```

- 新增以下目录

```
// src目录下 具体代码请直接参考项目

├── icons
│   ├── svg                     # 存放icon的svg文件
│   └── index.ts                #
```

- 新建 icon 组件

具体代码请参考 [Icon](https://github.com/typescript-projects/react-admin-template/blob/master/src/common/Icon/index.tsx)

## 如何使用

```
import React from 'react';
import Icon from '@/common/Icon';

class Example extends React.Component {
  render() {
    return (
      <div>
        // type为svg文件名称
        Analysis <Icon type="upload" />
      </div>
    );
  }
}

export default Example;
```

# 借鉴项目

- [TypeScript-React-Starter](https://github.com/Microsoft/TypeScript-React-Starter)
- [ant-design-pro](https://github.com/ant-design/ant-design-pro)

# 最佳实践

- [react-typescript-cheatsheet](https://github.com/sw-yx/react-typescript-cheatsheet)
- [react-redux-typescript-guide](https://github.com/piotrwitek/react-redux-typescript-guide)
