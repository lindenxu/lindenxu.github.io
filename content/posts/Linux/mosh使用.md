---
title: mosh使用
slug: mosh-use
categories: [Linux]
tags:
  - Linux
date: 2020-11-22 15:00:00
draft: false

---

当使用 ssh 连接远程服务器时，遇到网络延时高或者客户端丢失网络变更 ip 后，ssh 连接就会自动断开。网络恢复后并不会重连，需要重新 ssh。
使用 mosh 的话，就会解决该问题。

<!--more-->

### 概述

mosh 是一个用于从客户端跨互联网连接远程服务器的命令行工具。它是一个类似于 SSH 而带有更多功能的应用。

mosh 提供的一些特性：

- mosh 会自动在连接的网络环境中进行切换，而不会中断连接。尤其当在移动设备上使用 Wi-Fi，3/4G 移动连接时，可以保持连接状态
- 当笔记本进入睡眠状态，然后再被唤醒，网络连接会中断，使用 mosh ，但网络中断时会提醒，而当网络恢复时会自动重连
- SSH 会等待服务端的回应然后再回显终端上的输入。这就导致了如果连接延迟过高，用户所见内容会有延迟。mosh 则是会立即显示输入内容，包括输入，删除，行编辑等等。mosh 会自适应，即使是全屏的应用比如 emacs 或者 vim 也可以得益。在连接不好的时候，提前输入的内容会标记下划线以告诉用户区别
- mosh 没有需要特殊权限运行的内容，客户端和服务端都是单独的可执行文件
- mosh 不会监听网络端口或者需要创建授权用户。mosh 客户端通过 SSH 登录服务端，使用 SSH 相同的用户名。然后 mosh 在远端运行 mosh-server，通过 UDP 进行数据传输
- mosh 是一个命令行程序，和 ssh 一样。可以在 xterm, gnome-terminal, urxvt, Terminal.app, iTerm, emacs, screen, 或者 tmux 中运行。mosh 支持 UTF-8 编码，可以修复其他终端可能产生的 Unicode 错误
- 支持 Ctrl-C，mosh 不会填满网络缓冲，Ctrl-C 可以用来终止一个正在运行的程序

### 安装

服务端和客户端都需要安装

1. ubuntu

```linux
sudo apt-get install mosh
```

2. homebrew 命令安装

```linux
brew install mosh
```

3. centos7

```linux
yum install mosh
```

4. 更多安装方式请参考官网

### 使用

假设服务器地址为 172.143.1.1
ssh 私钥存放在 ～/xx/.ssh/id_rsa

- ssh 端口为 22

```linux
mosh root@172.143.1.1
```

- ssh 端口为 22，但是 mosh 想用某个特殊的端口

```linux
mosh -p 60010 root@172.143.1.1
```

- ssh 端口为 60522

```linux
mosh --ssh=“ssh -p 60522” root@172.143.1.1
```

- 不用密码使用的秘钥登录

```linux
mosh --ssh="ssh -i ～/xx/.ssh/id_rsa" root@172.143.1.1
```

> 官网：https://mosh.org
