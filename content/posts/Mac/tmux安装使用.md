---
title: tmux 安装使用
slug: tmux-install
categories:
  - Mac
tags:
  - Mac
  - brew
date: 2024-04-18 16:42:39
draft: false
Toc: true
---

tmux  是一款终端复用器，它为用户提供了创建、管理并切换多个终端会话的能力，所有这些操作都可在单一终端窗口或远程连接中完成。tmux 特别适合系统管理员、在远程服务器上工作的开发者，以及任何需要同时处理多个命令行界面的用户。

<!--more-->

### 1. 功能介绍

以下是关于 tmux 的主要功能和使用方法概述：

- **会话管理**：tmux 允许用户创建命名会话，每个会话可包含一个或多个窗格或窗口。这些会话在与当前终端分离后仍能保持运行状态，即使网络中断、系统重启或关闭终端模拟器，也能确保工作环境不受影响。
- **窗口和窗格分割**：在一个会话内，tmux 支持创建多个窗口，每个窗口又可以水平或垂直分割成多个窗格。这样，您就能在一个终端窗口中并排查看和操作多个命令行应用程序或 Shell 实例。
- **键盘快捷键与命令模式**：tmux 拥有一套丰富的键盘快捷键（前缀键加命令）用于管理会话、窗口和窗格，同时还提供了一个命令模式（`:` ）直接输入 tmux 命令。自定义前缀键并熟悉基本快捷键将极大地提升工作效率。
- **持久化会话**：当从 tmux 会话中分离时，该会话会在后台继续运行。您可以在之后重新连接到同一会话，从离开的地方无缝接续工作，即便使用的是不同的计算机或终端模拟器。
- **会话共享与协作**：tmux 支持其他用户连接到同一会话，实现协作工作。这一特性特别适用于配对编程、远程故障排查或实时演示。
- **配置与个性化**：tmux 使用配置文件  `~/.tmux.conf`，用户可在其中定义自定义键绑定、设置默认选项，并自定义状态栏、窗格边框等视觉元素的外观。围绕 tmux 存在一个活跃的社区，提供了众多预配置设置和插件来进一步增强其功能。

### 2. 安装

```html
brew install tmux
```

### 3. 使用

**基本概念**
一个 tmux `session`（会话）可以包含多个`window`（窗口），窗口默认充满会话界面，因此这些窗口中可以运行相关性不大的任务。

一个`window`又可以包含多个`pane`（面板），窗口下的面板，都处于同一界面下，这些面板适合运行相关性高的任务，以便同时观察到它们的运行情况。

**新建会话**

```
# 新建默认会话
tmux

# 新建一个名称为demo的会话
tmux new -s demo
```

**断开会话**
使用快捷键：

```
Ctrl+b + d
```

断开当前会话，会话在后台运行

**查看所有会话**

```
tmux ls
```

**进入之前的会话**

```
# 默认进入第一个会话
tmux a

# 进入到名称为demo的会话
tmux a -t demo
```

**会话之间切换**
使用快捷键显示会话列表：

```
Ctrl+b + s
```

此时 tmux 将打开一个会话列表，按上下键可选中目标会话，按左右键可收起或展开会话的窗口，选中目标会话或窗口后，按回车键即可完成切换。

**关闭会话**

```
# 关闭demo会话
tmux kill-session -t demo

# 关闭 tmux 服务
tmux kill-server
```

### 4. 快捷键

tmux 的所有指令，都包含同一个前缀，默认为`Ctrl+b`，输入完前缀过后，控制台激活，命令按键才能生效。

新建窗口
`Ctrl+b + c`

关闭当前窗口
`Ctrl+b + &`

打开窗口列表，用于且切换窗口
`Ctrl+b + w`

新建面板，当前面板右侧
`Ctrl+b + %`

新建面板，当前面板下方
`Ctrl+b + "`

关闭当前面板
`Ctrl+b + x`

面板切换
`Ctrl+b + 方向键`

### 5. 自定义配置

在用户目录创建 **.tmux.conf** 文件：

```
vi ~/.tmux.conf
```

输入以下内容：

```
# 绑定重载 settings 的热键

bind r source-file ~/.tmux.conf \; display-message "Config reloaded.."



# split panes using | and -

unbind '"'

bind - splitw -v -c '#{pane_current_path}' # 垂直方向新增面板，默认进入当前目录

unbind %

bind | splitw -h -c '#{pane_current_path}' # 水平方向新增面板，默认进入当前目录



# 绑定hjkl键为面板切换的上下左右键

bind -r k select-pane -U # 绑定k为↑

bind -r j select-pane -D # 绑定j为↓

bind -r h select-pane -L # 绑定h为←

bind -r l select-pane -R # 绑定l为→
```

### 参考

- [tmux gitHub](https://github.com/tmux/tmux)
- [Tmux 使用手册](https://louiszhai.github.io/2017/09/30/tmux/)
