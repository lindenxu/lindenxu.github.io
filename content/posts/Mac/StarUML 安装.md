---
title: StarUML 安装
slug: staruml-install
categories: [Mac]
tags:
  - Mac
date: 2023-10-07 15:00:00
draft: false

---

StarUML 是一个精细的软件建模器，旨在支持敏捷和简洁的建模。StarUML 遵循 UML 2.x 标准，支持多种 UML 图形，如用例图、类图、序列图、状态图、实体-关系图（ERD）和数据流图（DFD）等，用于进行各种类型的软件建模。

<!--more-->

# 下载安装

官网：https://staruml.io/ 下载安装包安装

# 破解

## 在 node 环境下安装 asar

1. 前置条件

- 安装 node
- 安装 npm 或者 pnpm 其中一个

没有的话自行搜索安装

2. 安装 asar
   npm 命令安装

```
npm install @electron/asar -g
```

或者 pnpm 命令安装

```
pnpm add @electron/asar -g
```

3. 进入 StartUML 的 resources 文件路径，在终端输入

```
cd /Applications/StarUML.app/Contents/Resources
```

4. 反编译 app.asar 到 app 文件夹，在终端输入

```
asar extract app.asar app
```

5. 打开 license-manager.js 文件，在终端输入

```
open app/src/engine/license-manager.js
```

6. 查找 checkLicenseValidity 函数，并执行如下修改

```
  checkLicenseValidity() {
    if (packageJSON.config.setappBuild) {
      setStatus(this, true);
    } else {
      this.validate().then(
        () => {
          setStatus(this, true);
        },
        () => {
          // 注释掉下面两行
          // setStatus(this, false);
          // UnregisteredDialog.showDialog();

          // 添加如下代码
          setStatus(this, true);
        }
      );
    }
  }
```

保存文件

7. app 文件代码编译成 app.asar

```
asar pack app app.asar

```

8. 打开 StartUML，此时的注册弹窗就没了
