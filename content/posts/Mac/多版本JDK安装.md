---
title: 多版本 JDK 安装
slug: multiple-jdk-install
categories: [Mac]
tags:
  - Mac
  - brew
  - Java
date: 2023-10-23 15:00:00
draft: false

---

本文使用的是 brew 的方式安装 Zulu JDK

<!--more-->

## 介绍

JDK（Java Development Kit）是 Java 语言的软件开发工具包，主要用于移动设备、嵌入式设备上的 Java 应用程序开发。它包含了 Java 的运行环境（JRE）和一组 Java 开发工具。JDK 是整个 Java 开发的核心，没有它，无法编译和运行 Java 程序。其中的开发工具包括编译工具(javac.exe)，打包工具(jar.exe)等。

## 添加 tap

```
brew tap mdogan/zulu
```

## 安装指定版本 jdk

```
brew install <caskName>
```

## 建议安装的版本，因为它们是 LTS 版本

| Cask Name  | JDK        |
| ---------- | ---------- |
| zulu-jdk8  | OpenJDK 8  |
| zulu-jdk11 | OpenJDK 11 |
| zulu-jdk17 | OpenJDK 17 |
| zulu-jdk21 | OpenJDK 21 |

## 查询已安装的 JDK：

```
/usr/libexec/java_home -V
```

## 在不同 JDK 版本之间切换

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
jdk 11
jdk 17
...
```

> 参考地址：https://github.com/mdogan/homebrew-zulu
