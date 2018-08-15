# react-admin-template

> react管理后台开发模板

## 优雅的使用 icon

> 主要参考 [手摸手，带你优雅的使用 icon](https://juejin.im/post/59bb864b5188257e7a427c09)

### 使用

* 在阿里爸爸的开源图库[iconfont](http://iconfont.cn)找到需要的图标，下载svg
* 拷贝至[src/icons/svg](./src/icons/svg)目录下
* 在项目中引用[SvgIcon](./src/components/SvgIcon)组件，指定属性`icon`

### 图标命名规范

语义化命名，规则如下

* 实心和描线图标保持同名，用`-o`来区分，比如`question-circle`（实心）和`question-circle-o`（描线）；
* 命名顺序：`[图标名-[形状?]-[描线?]-[方向?]]`

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

* [react-typescript-备忘录（英文）](https://github.com/sw-yx/react-typescript-cheatsheet)
* [react-typescript-备忘录（中文）](https://github.com/fi3ework/blog/tree/master/react-typescript-cheatsheet-cn)
* [react-redux-typescript-指南（英文）](https://github.com/piotrwitek/react-redux-typescript-guide)

