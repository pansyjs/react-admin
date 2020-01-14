---
title: 介绍
order: 10
---

<h1 align="center">@pansy/admin-layout</h1>

<h4 align="center">
此仓库是 @pansy/admin-template 的 layout, 为了方便快速的使用 layout 而开发。
</h4>

[![NPM version](https://img.shields.io/npm/v/@pansy/admin-layout.svg?style=flat)](https://npmjs.org/package/@pansy/admin-layout)
[![NPM downloads](http://img.shields.io/npm/dm/@pansy/admin-layout.svg?style=flat)](https://npmjs.org/package/@pansy/admin-layout)

## 安装

```
// npm
npm install --save @pansy/admin-layout

// yarn
yarn add @pansy/admin-layout
```

## 使用

```jsx | pure
import BasicLayout from '@pansy/admin-layout';

render(<BasicLayout />, document.getElementById('root'));
```

## API

| 参数    | 说明                         | 类型                             | 默认值             |
| ------- | ---------------------------- | -------------------------------- | ------------------ |
| title   | layout 的 左上角 的 title    | `ReactNode` \| `string`          | `'Admin Template'` |
| logo    | layout 的 左上角 logo 的 url | `ReactNode` \| `() => ReactNode` | -                  |
| loading | layout 的加载状态            | `boolean`                        | -                  |
