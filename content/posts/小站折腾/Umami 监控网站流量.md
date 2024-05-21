---
title: Umami 监控网站流量
slug: umami
categories:
  - 小站折腾
tags:
  - 流量
  - 数据
series: 
date: 2024-05-11 09:12:41
draft: false
description: ""
image: ""
---

Umami 是一个开源的、注重隐私保护的网络分析工具。它提供了一种简单、快速且隐私友好的方式来追踪网站访问者的行为，而无需依赖第三方服务。

<!--more-->

## 主要特性

- 简单分析：Umami 只测量重要的指标，如网页浏览量、使用的设备以及访问者的来源，并将这些数据显示在一个易于浏览的界面上。

- 不限网站数量：通过一次安装，Umami 可以跟踪无限数量的网站，包括子域名和单个 URL。

- 绕过广告拦截器：由于是自托管，Umami 可以有效避免广告拦截器的干扰。

- 轻量级：追踪脚本体积小（仅 2KB），支持包括 IE 在内的旧版浏览器。

- 多账户支持：可以为朋友或客户托管数据，每个账户可以有自己的仪表板。

- 共享数据：提供通过唯一 URL 共享统计数据的功能。

- 移动端友好：优化了移动设备的界面，方便用户随时随地查看统计数据。

- 数据所有权：作为自托管解决方案，用户拥有所有数据，无需将数据交给第三方。

- 注重隐私：不收集个人身份信息，对所有数据进行匿名处理。

## 安装

### 1. docker-compose 方式

```
version: "3"
services:
  umami:
    image: ghcr.io/umami-software/umami:mysql-latest
    container_name: umami
    ports:
      - 3000:3000
    environment:
      TZ: Asia/Shanghai
      DATABASE_URL: mysql://root:root@mysql:3306/umami
      DATABASE_TYPE: mysql
      APP_SECRET: DecCP5xpbzT3uc8K
    restart: always
    healthcheck:
      test: ["CMD-SHELL", "curl http://localhost:3000/api/heartbeat"]
      interval: 5s
      timeout: 5s
      retries: 5
networks:
  default:
    external: true
    name: default_network

```

### 2. Vercel 云部署

自行创建 [Vercel](https://vercel.com/)、[ Supabase](https://supabase.com/) 账号

- Vercel：用来托管 umami 管理端
- Supabase：用来创建 PostgreSQL 数据库，存储 umami 数据

#### 创建数据库

![](https://r.xulinfeng.xyz/linden/2024/05/0be73db1e97f2621e9d646dfd4576be3.png)

![](https://r.xulinfeng.xyz/linden/2024/05/7676b47c95a4768dac8f4d633f6c3b3f.png)

等待数据库创建完成。点击左下角小齿轮 Database，记录数据库访问地址
![](https://r.xulinfeng.xyz/linden/2024/05/4ab2d4440ea5ce815567db5e72806739.png)

#### umami 页面部署

> github 上先 fork 一下 [umami](https://github.com/umami-software/umami) 项目。

Vercel 上新建项目，选择从 github 导入
![](https://r.xulinfeng.xyz/linden/2024/05/bb934c45e4d40db40db6babcc02f1ed5.png)

![](https://r.xulinfeng.xyz/linden/2024/05/fd0f1efde293f790c758f7b2c9e277e9.png)

环境变量里添加**DATABASE_URL**，数据库访问地址。(记得点击 Add 😂)
接着点击 Deploy，等待部署完成。
![](https://r.xulinfeng.xyz/linden/2024/05/5c1e7c2e19e711898a40240172a76cc0.png)

可选。建议绑定一下自己的域名
![](https://r.xulinfeng.xyz/linden/2024/05/b51a99df9cdb1c119178e405e067db28.png)

## 使用

访问 umami，默认的登录名：admin，密码：umami

右上角的地球图标切换语音为中文。

设置页面中添加网站后，点击编辑按钮，获取跟踪代码。
![](https://r.xulinfeng.xyz/linden/2024/05/1bfd8a6b076340bdfc7c5ebb1bd9f949.png)

## 致谢

- [umami 官网](https://umami.is/)
- [使用 Vercel + Supabase 零成本部署 Umami](https://yinji.org/5018.html)
