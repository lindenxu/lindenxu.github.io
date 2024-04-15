---
title: node包管理命令
tags:
  - 前端
  - HTML
date: 2023-10-07 14:00:00
draft: false
hideInList: false
isTop: false
feature:
---

整理 npm，pnpm，yarn 命令对比

<!--more-->

| 命令描述                               | npm | pnpm                                 | yarn |
|----------------------------------------|-----|--------------------------------------|------|
| 安装项目所有依赖                       |     npm install                         | pnpm install                         |   yarn [install]   |
| 运行脚本/项目                          |     npm run <script\>                 | pnpm [run] <script\>                 |   yarn run <script\>    |
| 安装软件包到 dependencies              |     npm install <package\>                  | pnpm add <package\>                  | yarn add <package\>       |
| 安装软件包到 devDependencies           |     npm install <package\>  -D              | pnpm add <package\>  -D              | yarn add <package\>  -D   |
| 安装软件包到 optionalDependencies      |     npm install <package\>  -O              | pnpm add <package\>  -O              | yarn add <package\>  -O   |
| 安装软件包到 global                    |     npm install <package\> -g               | pnpm add <package\> -g               |  |
| 检查软件包更新 | npm outdated [-g --depth 0] | pnpm outdated [-g --depth 0] |yarn upgrade-interactive --latest |
| 更新软件包                             |     npm update <package\>               | pnpm update <package\>               |   yarn upgrade <package\>  |
| 删除软件包                             |     npm uninstall <package\>               | pnpm remove <package\>               |   yarn remove <package\>   |
| 列出所有的已安装包及依赖               |     npm list                            | pnpm list                            |   yarn list   |
| 列出所有的已安装包                     |     npm list --depth 0                  | pnpm list --depth 0                  |   yarn list --depth=0   |
| 创建一个 package.json 文件             |     npm init                            | pnpm init                            |  yarn init    |
| 显示所有config的设置                   |     npm config list [-g]                | pnpm config list [-g]                |   yarn config list   |
| 设置config中提供的key，和相对应的value |     npm config set <key\> <value\> [-g] | pnpm config set <key\> <value\> [-g] | yarn config set <key\> <value\>     |
| 打印config中提供的key对应的value       |     npm config get <key\> [-g]          | pnpm config get <key\> [-g]          | yarn config get <key\>              |
| 从config文件中删除配置过的key          |     npm config delete <key\> [-g]       | pnpm config delete <key\> [-g]       | yarn config delete <key\>          |




