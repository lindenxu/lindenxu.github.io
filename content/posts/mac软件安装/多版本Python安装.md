---
title: 多版本Python安装
tags:
  - Mac
  - Python
date: 2024-04-17 16:06:38
draft: true
hideInList: false
isTop: false
feature:
---

pyenv 是一款用于在同一台机器上管理多个 Python 版本的工具。它使您能够轻松安装、切换和管理各种 Python 版本，而不必修改系统的默认安装。这对于那些需要不同 Python 版本的项目或需要针对多种 Python 环境测试代码的开发者尤为有用。

<!--more-->

### 1. 安装/更新

#### 安装
 安装命令
```
curl https://pyenv.run | bash
```

检查 ~/.zshrc 或者 ~/.bash_profile 中是否有如下命令，没有的话添加

```
export PYENV_ROOT="$HOME/.pyenv"
[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"
```

重启终端，或者运行如下命令重新加载配置
```
source ~/.zshrc
```

#### 更新
```
pyenv update
```

#### 卸载
```
rm -rf $(pyenv root)
```

从 ~/.zshrc 或者 ~/.bash_profile 中移除安装时添加的命令

### 2. 使用

- 
- 安装指定版本的 Python
```
pyenv install <version>
```

比如安装 3.12.3 版本
```
pyenv install 3.12.3
```

- 切换 Python 版本
```
pyenv 
```
- 移除指定版本的 Python
```
pyenv uninstall <version>
```

### 参考
- [pyenv github](https://github.com/pyenv/pyenv)