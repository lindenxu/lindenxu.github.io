---
title: 多版本 node 安装
slug: multi-node-install
categories:
  - Mac
tags:
  - Mac
  - node
  - 前端
date: 2020-06-11 15:00:00
draft: false
---

nvm（Node Version Manager）是一个命令行工具，允许开发者在同一台机器上快速安装和使用不同版本的 Node.js。这对于测试和管理不同项目所需的 Node.js 环境非常有用，因为不同的项目可能需要不同的 Node.js 版本。

<!--more-->

## 1. 安装/更新

- 运行如下命令

```linux
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```

更新的话，重新运行上面的脚本即可（注意版本号改成最新的）

- 检查 ~/.zshrc 或者 ~/.bash_profile 中是否有如下命令，没有的话添加

```linux
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

```

- 重启终端，或者运行如下命令重新加载配置

```
source ~/.zshrc
```

或者

```
source ~/.bash_profile
```

- 检查是否安装成功

```linux
nvm --version
```

- 切换 nvm 源为国内源

编辑~/.bash_profile，设置 nvm 的

```linux
export NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node

```

## 2. 使用

- 安装指定版本的 node

```linux
nvm install <version>
```

比如安装 12 版本的 node 执行

```linux
nvm install 12
```

- 安装指定版本的 node，并且从特定的 node 版本导入 npm 安装过的包

```linux
nvm install <version> --reinstall-packages-from=<other_version>
```

比如，已经安装了 12 版本的 node，现在想安装 10 版本的，并且从 12 版本导入 npm 安装过的包（比如 vue...）

```linux
nvm install 10 --reinstall-packages-from=12

```

- 不同版本之前切换

```linux
nvm use <version>
```

- 查看已安装的版本

```linux
nvm ls
```

- 查看可用的 node 版本

```
nvm ls-remote
```

- 设置 node 的某个版本为默认

```
nvm alias default <version>
```

- 卸载

不要卸载当前正在使用的版本，想卸载的话，请先切换到其它版本

```linux
nvm uninstall <version>
```

## 3. 使用 cnpm 代替 npm（可选）

> 参考：https://npmmirror.com/

安装 cnpm

```linux
npm install -g cnpm --registry=https://registry.npmmirror.com
```

## 安装参考

- [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)
