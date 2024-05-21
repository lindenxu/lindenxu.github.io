---
title: ssh 免密登陆
slug: sshpass-install
categories: [Mac]
tags:
  - Mac
date: 2020-05-31 15:00:00
draft: false

---

ssh 登陆不能在命令行中指定密码，sshpass 的出现则解决了这一问题。它允许你用 -p 参数指定明文密码，然后直接登录远程服务器。

<!--more-->

### 1. 安装 sshpass

安装命令：

```linux
brew install https://raw.githubusercontent.com/kadwanev/bigboybrew/master/Library/Formula/sshpass.rb
```

或者

```linux
brew install http://git.io/sshpass.rb
```

使用

```linux
$ sshpass -h
Usage: sshpass [-f|-d|-p|-e] [-hV] command parameters
   -f filename   Take password to use from file
   -d number     Use number as file descriptor for getting password
   -p password   Provide password as argument (security unwise)
   -e            Password is passed as env-var "SSHPASS"
   With no parameters - password will be taken from stdin

   -P prompt     Which string should sshpass search for to detect a password prompt
   -v            Be verbose about what you're doing
   -h            Show help (this screen)
   -V            Print version information
At most one of -f, -d, -p or -e should be used
```

登陆命令：

```linux
sshpass -p '服务器密码' ssh -p 端口号 用户名@IP地址
```

### 2. iTerm2 集成 sshpass 实现快速 SSH 连接

- 设置 iterm2 的 Profiles

![-w726](https://r.xulinfeng.xyz/linden/2020/05/15909282569457.jpg)

添加新的 Profiles，设置 Name，Send text at start 中填入连接远程服务器的命令（见上方 sshpass 使用）

![-w918](https://r.xulinfeng.xyz/linden/2020/05/15909284730517.jpg)

注意：
如果第一次使用 sshpass 链接失败，需要先使用一下 ssh 命令连接一次。

或者参考[ssh 连接时提示 THE AUTHENTICITY OF HOST XX CAN'T BE ESTABLISHED](https://www.cnblogs.com/beginner-boy/p/8078837.html)，在 ssh 命令后面添加-o StrictHostKeyChecking=no

### 参考

> [开发效率神器之 alfred 集成 ssh+iTerm2 实现一步登录服务器](https://juejin.im/post/5d4d4ce55188255d803f9479) > [iTerm 2 打造 ssh 完美连接 Linux 服务器快捷方法
> ](https://www.cnblogs.com/chongdongxiaoyu/p/11390127.html)
