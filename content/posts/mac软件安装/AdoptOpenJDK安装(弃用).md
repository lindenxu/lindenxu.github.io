---
title: AdoptOpenJDK安装(弃用)
tags:
  - Mac
  - brew
  - Java
date: 2020-11-26 15:00:00
draft: false
hideInList: false
isTop: false
feature:
---

AdoptOpenJDK 已变更为 Temurin JDK

<!--more-->

### JDK 概述
2019年之后, Oracle 对 Java 的商业模式进行了一系列改革, 因此多种版本的 JDK 出现在开发者的视野中。
整体来看, 存在三个版本的 JDK, 分别是：
- Oracle JDK
Oracle 规定在一个 Oracle JDK 的生命周期内 (指的是下一个版本的 JDK 推出之前) 可以免费商用, 而生命周期之外继续在生产环境中使用, 想要继续商用 Oracle 对该版本的后续更新就需要付费。
所以说如果想要使用Oracle JDK 又不想付费, 只要一直使用最新版本的JDK就可以了。

- Oracle 编译的 OpenJDK 
Oracle 还提供其编译的 OpenJDK, 事实上这个 OpenJDK 与其他 OpenJDK 几乎没有区别。但是 OpenJDK 在 Oracle 不再维护后会转交给 RedHat 维护。

- 第三方厂商编译的 OpenJDK
这些厂商编译版本中，常用的是 [AdoptOpenJDK](https://github.com/AdoptOpenJDK/homebrew-openjdk)，[Zulu](https://www.azul.com/downloads/zulu-community/?package=jdk)

其实三者在功能上并没有明显的差异, 主要在一些版权相关的 API 上有一些差别(如 OpenJDK 就无法使用 Oracle 版本中所使用的字体渲染 API)。

### 安装
1. 安装最新版
```linux
brew install --cask adoptopenjdk
```

2. 想安装特定的版本，先要添加AdoptOpenJDK的仓库，再安装特定的版本
```linux
brew tap AdoptOpenJDK/openjdk
brew install --cask <version>
```
通过这种指定版本的方式可以同时安装多个版本的 JDK 。
以下列出部分版本的名称，更多版本名称见官方文档。

| Java Version | JDK | JRE
|------|----|----|
| OpenJDK8 with Hotspot JVM | `adoptopenjdk8` | `adoptopenjdk8-jre` |
| OpenJDK9 with Hotspot JVM | `adoptopenjdk9` | n/a |
| OpenJDK10 with Hotspot JVM | `adoptopenjdk10` | n/a |
| OpenJDK11 with Hotspot JVM | `adoptopenjdk11` | `adoptopenjdk11-jre` |
| OpenJDK12 with Hotspot JVM | `adoptopenjdk12` | `adoptopenjdk12-jre` |
| OpenJDK13 with Hotspot JVM | `adoptopenjdk13` | `adoptopenjdk13-jre` |
| OpenJDK14 with Hotspot JVM | `adoptopenjdk14` | `adoptopenjdk14-jre` |
| OpenJDK15 with Hotspot JVM | `adoptopenjdk15` | `adoptopenjdk15-jre` |


### 在不同 JDK 版本之间切换
首先在 ~/.bashrc 或者 ~/.zshrc 中添加如下脚本：
```linux
jdk() {
        version=$1
        export JAVA_HOME=$(/usr/libexec/java_home -v"$version");
        java -version
 }
```

重启终端后，使用如下命令切换不同的版本
```linux
jdk 8
jdk 9
jdk 11
jdk 13
...
```

> 官网：https://github.com/AdoptOpenJDK/homebrew-openjdk
