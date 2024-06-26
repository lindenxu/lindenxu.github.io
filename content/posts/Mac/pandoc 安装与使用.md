---
title: pandoc 安装与使用
slug: pandoc-install
categories: [Mac]
tags:
  - Mac
date: 2023-10-07 15:00:00
draft: false

---

Pandoc 是一个通用的文档转换工具，可以支持多种标记语言之间的格式转换，例如 Markdown、Microsoft Word、PowerPoint、HTML、PDF、LaTeX 等。它可以将一种格式的文档转换成另一种格式，使得不同文档之间的兼容性和可读性得到了极大的提高。

<!--more-->

# 安装

下载地址：

> https://github.com/jgm/pandoc/releases

下载名为 pandoc-xxxx-x86_64-macOS.zip 的文件

解压到/opt/pandoc

添加环境变量

```
export PANDOC_HOME="/opt/pandoc"
export PATH=${PATH}:${PANDOC_HOME}/bin
```

检测是否安装成功

```
pandoc --version
```

# 使用

md 转 world

```
pandoc demo.md -o demo.docx
```

## 修改 world 导出模版

导出默认模版

```
pandoc -o custom.docx --print-default-data-file reference.docx
```

拷贝一份默认的参考文件模板，取名为 custom.docx

修改模板样式

再次转换文件

```
pandoc demo.md -o demo.docx --reference-doc=custom.docx
```

> 官网：https://pandoc.org/index.html
> 参考：https://www.cnblogs.com/kofyou/p/14932700.html
