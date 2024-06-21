---
title: Docker 镜像下载加速
slug: docker-pull-image-proxy
tags: [docker]
categories: [Docker]
series: []
date: 2024-06-05 16:18:37
draft: true
description: ""
image: ""
---

<!--more-->

## 通过代理网站拉取

以 memos 为例，DaoCloud 的代理镜像站：m.daocloud.io
**第一步：** 原始镜像地址

```
ghcr.io/usememos/memos:latest
```

**第二步：** 通过代理网站拉取镜像

```
docker pull m.daocloud.io/ghcr.io/usememos/memos:latest
```

**第三步：** 重命名镜像

```
docker tag m.daocloud.io/ghcr.io/usememos/memos:latest ghcr.io/usememos/memos:latest
```

**第四步：** 删除代理镜像

```
docker rmi m.daocloud.io/ghcr.io/usememos/memos:latest
```

## 致谢

- [Docker Hub 镜像加速器](https://gist.github.com/y0ngb1n/7e8f16af3242c7815e7ca2f0833d3ea6)
- [public-image-mirror](https://github.com/DaoCloud/public-image-mirror)
- [image-mirror](https://github.com/imdingtalk/image-mirror)
