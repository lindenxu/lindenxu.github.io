---
title: ImmortalWrt Image Builder 构建自定义固件
slug: immortalwrt-image-builder
categories: [docker]
tags:
  - docker
  - OpenWRT
  - ImmortalWrt
  - 旁路由
date: 2024-03-26 15:00:00
draft: false

---

使用 ImmortalWrt Image Builder 构建自定义固件
<!--more-->


## 1. 安装ubuntu
```
docker run -itd --name ubuntu -v /volume1/docker/ubuntu/data:/data ubuntu:latest
```

## 2. 进入ubuntu
```
docker exec -it ubuntu bash
```

## 3. 安装sudo
```
apt update
apt install sudo
```

## 4. 创建用户
```
sudo useradd -r -m -s /bin/bash userName

#出现新用户的目录说明创建成功
ls /home
```
-r：建立系统账号；
-m：自动建立用户的登入目录；
-s：指定用户的默认使用shell

设置密码
```
sudo passwd userName 
```
根据提示输入新用户的密码即可

将新用户添加到 sudo 组
```
usermod -aG sudo userName
```

## 5. 安装编译依赖
```
sudo apt update
sudo apt install build-essential clang flex bison g++ gawk \
gcc-multilib g++-multilib gettext git libncurses-dev libssl-dev \
python3-distutils rsync unzip zlib1g-dev file wget
```

## 6. 安装imagebuilder
> 下载地址：
https://downloads.immortalwrt.org/releases/23.05.1/targets/x86/64/

```
cd ~ && wget https://downloads.immortalwrt.org/releases/23.05.1/targets/x86/64/immortalwrt-imagebuilder-23.05.1-x86-64.Linux-x86_64.tar.xz

tar -Jxvf immortalwrt-imagebuilder-23.05.1-x86-64.Linux-x86_64.tar.xz
cd immortalwrt-imagebuilder-23.05.1-x86-64.Linux-x86_64/
```

## 7. 查看构建信息
```
make info
```

## 8. 构建固件

> 软件包列表:
https://downloads.immortalwrt.org/releases/23.05.1/packages/x86_64/luci/Packages

```
make image PROFILE="generic" PACKAGES="luci-theme-argon luci-app-openclash luci-app-nps"
```

> 参考：https://openwrt.org/docs/guide-user/additional-software/imagebuilder




