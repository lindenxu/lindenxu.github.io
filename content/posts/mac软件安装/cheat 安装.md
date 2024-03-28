# cheat 安装

## 1. 介绍
cheat命令通过简单的实例告诉你一个命令的具体使用方法


## 2. 安装

#### 查看cheat信息
```
brew info cheat
```


```
~ » brew info cheat                                                                                                                  lin@lin-mac
==> cheat: stable 4.4.0 (bottled)
Create and view interactive cheat sheets for *nix commands
https://github.com/cheat/cheat
Conflicts with:
  bash-snippets (because both install a `cheat` executable)
Not installed
From: https://mirrors.ustc.edu.cn/homebrew-core.git/Formula/c/cheat.rb
License: MIT
==> Dependencies
Build: go ✘
```

可以看到 cheat 依赖 go


#### 安装 cheat 
```
brew install cheat
```

```
~ » brew install cheat                                                                                                               lin@lin-mac
==> Fetching cheat
==> Downloading https://mirrors.ustc.edu.cn/homebrew-bottles/cheat-4.4.0.sonoma.bottle.tar.gz
############################################################################################################################################### 100.0%
==> Pouring cheat-4.4.0.sonoma.bottle.tar.gz
==> Caveats
zsh functions have been installed to:
  /usr/local/share/zsh/site-functions
==> Summary
🍺  /usr/local/Cellar/cheat/4.4.0: 8 files, 18.3MB
==> Running `brew cleanup cheat`...
Disable this behaviour by setting HOMEBREW_NO_INSTALL_CLEANUP.
Hide these hints with HOMEBREW_NO_ENV_HINTS (see `man brew`).
```


## 3. 配置
在使用 cheat 这个工具之前，确实需要完成一些配置工作。以下是针对您提到的三个必要的步骤的详细说明：

- 生成配置文件：在使用 cheat 之前，通常需要生成一个配置文件。这个配置文件包含了 cheat 的一些基本设置，以便让它知道从哪里查找 cheatsheets，以及如何格式化输出等内容。可以通过运行以下命令来生成配置文件：
- 配置 cheatpaths：cheatpaths 是 cheat 用来查找 cheatsheets 的目录列表。您需要确保这些路径已经正确配置，以便 cheat 能够找到您需要的 cheatsheets。可以通过编辑配置文件来设置这些路径。
- 下载社区 cheatsheets：cheat 有一个活跃的社区，提供了很多有用的 cheatsheets。在使用 cheat 之前，您可能需要下载这些社区的 cheatsheets，以便能够访问其中的内容。

首次运行 cheat 命令将运行一个安装程序，该安装程序将自动执行上述所有操作。
```
cheat
```


```
~ » cheat                                                                                                                                 lin@lin-mac
A config file was not found. Would you like to create one now? [Y/n]: y
Would you like to download the community cheatsheets? [Y/n]: y
Cloning community cheatsheets to /Users/lin/.config/cheat/cheatsheets/community.
Enumerating objects: 335, done.
Counting objects: 100% (335/335), done.
Compressing objects: 100% (310/310), done.
Total 335 (delta 43), reused 213 (delta 23), pack-reused 0
Cloning personal cheatsheets to /Users/lin/.config/cheat/cheatsheets/personal.
Created config file: /Users/lin/.config/cheat/conf.yml
Please read this file for advanced configuration information.
```

cheat 的配置以及 cheatsheets 保存在~/.config/cheat 下


## 4. 使用介绍

```
# 列出cheat的帮助信息
cheat

# 列出所有支持查询的命令
cheat -l


# 查询tail命令的使用
cheat tail

```


> 参考：https://github.com/cheat/cheat