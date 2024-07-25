---
title: 群晖 Video Station 音频格式问题无法播放解决方案
slug: video-station-
tags:
  - 群晖
categories:
  - 群晖
series: 
date: 2024-07-25 09:53:05
draft: false
description: ""
image: ""
---

Video Station 播放视频时可能会遇到：不支持当前所选音频的文件格式，因此无法播放视频。请尝试其它音轨。
<!--more-->

## 操作环境

群晖型号：DS720+  
DMS 版本：DSM 7.2.1-69057 Update 5
Video Station 套件版本：3.1.1-3168

并且已安装好 Advanced Media Extensions ，没安装的可以去套件中心搜索安装。
注意：一定要先安装 Advanced Media Extensions 后在执行下面的操作，不然会出现可以播放EAC3视频但是HEVC编码的视频无法播放的问题。

## 替换 FFmpeg 4

1. 安装社区套件 FFmpeg 4
![](https://r.xulinfeng.xyz/linden/2024/07/e88dc98c7580e51fb84911d6f8b86b1c.png)


> 注：不会添加社区套件的可以参考[[群晖折腾记二常用软件]]一文

2. ssh 命令操作
ssh 登录到群晖，`sudo -i` 切换到 root 用户。执行以下命令
```
#备份 VideoStation's ffmpeg

mv -n /var/packages/VideoStation/target/bin/ffmpeg /var/packages/VideoStation/target/bin/ffmpeg.orig

  

#下载ffmpeg脚本

wget -O - https://gist.githubusercontent.com/BenjaminPoncet/bbef9edc1d0800528813e75c1669e57e/raw/ffmpeg-wrapper > /var/packages/VideoStation/target/bin/ffmpeg

  

#设置脚本相应权限

chown root:VideoStation /var/packages/VideoStation/target/bin/ffmpeg

chmod 750 /var/packages/VideoStation/target/bin/ffmpeg

chmod u+s /var/packages/VideoStation/target/bin/ffmpeg

  

# 备份VideoStation's libsynovte.so

cp -n /var/packages/VideoStation/target/lib/libsynovte.so /var/packages/VideoStation/target/lib/libsynovte.so.orig

chown VideoStation:VideoStation /var/packages/VideoStation/target/lib/libsynovte.so.orig

  

# 为libsynovte.so 添加 DTS, EAC3 and TrueHD支持

sed -i -e 's/eac3/3cae/' -e 's/dts/std/' -e 's/truehd/dheurt/' /var/packages/VideoStation/target/lib/libsynovte.so

  

#备份CodecPack的ffmpeg41

cp /var/packages/CodecPack/target/bin/ffmpeg41 /var/packages/CodecPack/target/bin/ffmpeg41.bak

  

#链接ffmpeg解码模块

cp /var/packages/VideoStation/target/bin/ffmpeg /var/packages/CodecPack/target/bin/ffmpeg41
```

3. 重启 Video Station
可以在套件中心先停用再启用
![](https://r.xulinfeng.xyz/linden/2024/07/d81164c53fb8935a5f8a1bdfb8c32026.png)



## 还原脚本
```
#恢复之前备份的 VideoStation's ffmpeg, libsynovte.so, ffmpeg41文件

mv -f /var/packages/VideoStation/target/bin/ffmpeg.orig /var/packages/VideoStation/target/bin/ffmpeg

mv -f /var/packages/VideoStation/target/lib/libsynovte.so.orig /var/packages/VideoStation/target/lib/libsynovte.so

mv -f /var/packages/CodecPack/target/bin/ffmpeg41.bak /var/packages/CodecPack/target/bin/ffmpeg41

```


## 致谢
- [群晖（一）DSM7系统 Video Station解锁DST、EAC3和HEVC](https://keevinzha.com/article/2023-03-07_Synology-unlock-VS)
