<p align="center">
  <a href="https://github.com/ts-react/react-admin-template">
    <img width="100" src="https://github.com/ts-react/react-admin-template/blob/gh-pages/assets/logo.svg">
  </a>
</p>

<h1 align="center">React Admin Template</h1>

<div align="center">
开箱即用的中台前端/设计解决方案。
</div>

## ✨ 特性

- 🛡 **TypeScript**: 应用程序级 JavaScript 的语言
- 💎 **优雅美观**：基于 Ant Design 体系精心设计
- 🚀 **最新技术栈**：使用 React/umi/antd 等前端前沿技术开发
- 🌐 **国际化**：内建业界通用的国际化方案
- 🔢 **Mock 数据**：实用的本地数据调试方案
- ⚙️  **最佳实践**：良好的工程实践助您持续产出高质量代码
- 🔐 **优秀的权限设计**：目前能找到的最好的权限实现方案

## 🎉 推荐

- 微前端版本 [micro-frontends-template](https://github.com/pansyjs/micro-frontends-template) 正在同步开发中...
- 好用的水印组件 [watermark](https://github.com/pansyjs/watermark)


## 📜 目录

```
├── config                     # umi 相关配置
├── docker                     # docker 相关配置
├── mock                       # 本地模拟数据
├── public                     # 静态资源
├── src                        # 源代码
│   ├── assets                 # 本地静态资源
│   ├── common                 # 类型定义、常量
│   ├── components             # 全局公用组件
│   ├── config                 # 全局配置
│   ├── layouts                # 布局文件
│   ├── locales                # 国际化资源
│   ├── models                 # 路由
│   ├── pages                  # 业务页面入口和常用模板
│   ├── services               # 所有请求
│   ├── utils                  # 全局公用方法
│   ├── app.tsx                # 运行时配置文件
│   ├── authority.ts           # 权限定义文件
│   ├── global.less            # 全局样式
│   └── typings.d.ts           # 补充类型定义
├── package.json               # package.json
└── tsconfig.json              # tsconfig.json
```

## 🔐  关于权限

基于 [umi-plugin-authority](https://github.com/alitajs/umi-plugins/tree/master/packages/umi-plugin-authority) 提供权限功能，暴露 `useAuthority` hooks 和 `Authority` 组件实现权限控制的能力

使用示例如下

```tsx
import React from 'react';
import { useAuthority, Authority } from 'umi';

const PageA = props => {
  const { foo } = props;
  const { combinationVerify } = useAuthority();
 
  // 使用 hooks 提供的能力  
  if (combinationVerify('module1/action1')) {
    // 存在 module1/action1 权限，则...
  }
  
  return (
    <div>
      {/** 指定需要验证的权限 */}
      <Authority
        access="module1/action1"
        fallback={<div>Can not read foo content.</div>}
      >
        Foo content.
      </Authority>
      {/** 直接指定权限 */}
      <Authority
        accessible={combinationVerify('module1/action1')}
        fallback={<div>Can not update foo.</div>}
      >
        Update foo.
      </Access>
      {/** 复杂的校验 */}
      <Authority
        accessible={combinationVerify('(module1/action1 || module1/action2) && module1/action3')}
        fallback={<div>Can not update foo.</div>}
      >
        Update foo.
      </Access>
      {/** children 为function */}
      <Authority
        accessible={combinationVerify('module3/action1')}
        fallback={<div>Can not delete foo.</div>}
      >
        {(isMatch) => <span>权限校验结果: {isMatch}</span>}
      </Authority>
    </div>
  );
};
```

## ⌨️ 本地开发

```sh
# 克隆项目到本地
git clone git@github.com:ts-react/react-admin-template.git

# 切换到项目目录
cd ./react-admin-template

# 安装依赖
yarn

# 启动服务
npm run start
```

## 🖥  支持环境

现代浏览器及 IE11。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --- | --- | --- | --- | --- |
| IE11, Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## 👥 社区互助

| Github Issue                                      | 钉钉群                                                                                     | 微信群                                                                                   |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| [issues](https://github.com/ts-react/react-admin-template/issues) | <img src="https://github.com/alitajs/alita/blob/master/public/dingding.png" width="100" /> | <img src="https://github.com/alitajs/alita/blob/master/public/wechat.png" width="100" /> |
