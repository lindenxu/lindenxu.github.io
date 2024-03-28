# Homebrew 安装使用

### 概述
Homebrew 简称：brew。
是Mac/Linux上的软件包管理工具，能狗方便的安装软件或者卸载软件，使用命令，非常方便。
笔者主要用来安装在终端环境下使用的软件/工具。

### 安装
1. 按照官网的命令安装（由于被墙的原因，速度很慢）
```linux
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

2. 使用国内镜像加速访问，比如：
```linux
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
脚本中默认内置中科大镜像。

### 使用
#### 1. 基本用法
- 搜索软件包
```linux
brew search <package>
```

- 查看软件包信息
```linux
brew info <package>
```

- 安装软件包，及依赖
```linux
brew install <package>
```

- 安装软件包，忽略依赖
```linux
brew install <package> --ignore-dependencies
```

- 卸载软件包
```linux
brew uninstall <package>
```

- 卸载软件包安装的依赖
```linux
brew autoremove
```

- 查看brew版本
```linux
brew -v
```

- 显示已经安装的所有软件包
```linux
brew list
```

- 更新brew
```linux
brew update
```

- 查看已安装的哪些软件包需要更新
```linux
brew outdated
```

- 更新单个软件包
```linux
brew upgrade xx
```

- 查看可清理的旧版本包，不执行实际操作
```linux
brew cleanup -n
```

- 清理单个已安装软件包的历史版本
```linux
brew cleanup xx
```

- 清理所有已安装软件包的历史老版本
```linux
brew cleanup
```

- 控制某个包保持版本，取消包保持版本
```linux
brew pin xx
brew unpin xx
```


#### 2. 其他命令
- 使用代理(前提是你要有socks代理)，比如安装时使用代理
```linux
ALL_PROXY=socks5://127.0.0.1:代理端口 brew install xx
```

- 查看更多命令请使用
```linux
man brew
```


#### 3. 切换源
比如想切换到腾讯的源

在 ~/.zshrc 或者 ~/.bash_profile 文件下添加如下设置
```
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.cloud.tencent.com/homebrew/brew.git"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.cloud.tencent.com/homebrew/homebrew-core.git"
export HOMEBREW_API_DOMAIN="https://mirrors.cloud.tencent.com/homebrew-bottles/api/"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.cloud.tencent.com/homebrew-bottles/bottles"
```

添加后，重新加载下终端
```
source ~/.zshrc
```
或者
```
source ~/.bash_profile
```

修改完仓库地址后，更新一下，加上 -v参数可以看到当前的进度
```
brew update -v
```

> 官网：https://brew.sh
> 国内安装推荐：https://brew.idayer.com/
