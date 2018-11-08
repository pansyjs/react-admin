# [react-video-player](https://github.com/jiumao-fe/react-admin-template)

[![GitHub license](https://img.shields.io/github/license/jiumao-fe/react-admin-template.svg)](https://github.com/jiumao-fe/react-admin-template/blob/master/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/jiumao-fe/react-admin-template.svg)](https://github.com/jiumao-fe/react-admin-template/issues)
[![GitHub forks](https://img.shields.io/github/forks/jiumao-fe/react-admin-template.svg)](https://github.com/jiumao-fe/react-admin-template/network)
[![GitHub stars](https://img.shields.io/github/stars/jiumao-fe/react-admin-template.svg)](https://github.com/jiumao-fe/react-admin-template/stargazers)

> react 管理后台开发模板

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
├── mock                        # 模拟后端接口
│   ├── login.js                # 登陆相关
│   ├──
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

## 优雅的使用 icon

> 主要参考 [手摸手，带你优雅的使用 icon](https://juejin.im/post/59bb864b5188257e7a427c09)

### 使用

- 在阿里爸爸的开源图库[iconfont](http://iconfont.cn)找到需要的图标，下载 svg
- 拷贝至[src/icons/svg](./src/icons/svg)目录下
- 在项目中引用[SvgIcon](./src/components/SvgIcon)组件，指定属性`icon`

### 图标命名规范

语义化命名，规则如下

- 实心和描线图标保持同名，用`-o`来区分，比如`question-circle`（实心）和`question-circle-o`（描线）；
- 命名顺序：`[图标名-[形状?]-[描线?]-[方向?]]`

> `?`可选

### 示例

```
import React, { Component } from 'react';
import SvgIcon from '@components/SvgIcon';

class Test from Component {
  render() {
    return (
      <div>
        <SvgIcon icon="lock"></SvgIcon>
      </div>
    )
  }
}
```

## 参考资料

- [react-typescript-备忘录（英文）](https://github.com/sw-yx/react-typescript-cheatsheet)
- [react-typescript-备忘录（中文）](https://github.com/fi3ework/blog/tree/master/react-typescript-cheatsheet-cn)
- [react-redux-typescript-指南（英文）](https://github.com/piotrwitek/react-redux-typescript-guide)
