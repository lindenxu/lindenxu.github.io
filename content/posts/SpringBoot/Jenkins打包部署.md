---
title: Jenkins打包部署
slug: jenkins-build-deploy
categories: [SpringBoot]
tags:
  - Jenkins
  - Linux
  - 运维
date: 2023-06-19 15:00:00
draft: true

---



### Jenkins执行脚本
```
echo "收到分支 [${GIT_BRANCH}] Event消息..."

DIR=$PWD
#进入项目所在位置获取版本号等信息
cd ${DIR}/target/maven-archiver

#版本号
VERSION=`sed '/^version=/!d;s/.*=//' pom.properties`  
ARTIFACTID=`sed '/^artifactId=/!d;s/.*=//' pom.properties`
T=`date +%s`
#包名称
PACKAGENAME=$ARTIFACTID-$VERSION.jar

#正式环境
if [ $branch == 'origin/prod' ]; then 
#移动后包名称
MOVE_PACKAGENAME=$ARTIFACTID-$VERSION-$T.jar

#获取输出路径
OSS=/mnt/oss/project
OUT=${OSS}/${JOB_NAME}/prod
mkdir -p $OUT

#移到OSS中
mv ${DIR}/target/$PACKAGENAME ${OUT}/$MOVE_PACKAGENAME
md5=`md5sum $OUT/$MOVE_PACKAGENAME`
md5=${md5:0:8}
URL="https://nplus-front.oss-cn-shanghai.aliyuncs.com/project/${JOB_NAME}/prod/$MOVE_PACKAGENAME"

#发送钉钉通知
content="项目：${JOB_NAME}\n环境：正式环境\n版本：${VERSION}\n指纹：${md5}\n地址：${URL}"
curl 'https://oapi.dingtalk.com/robot/send?access_token=xxx' \
   -H 'Content-Type: application/json' \
   -d '{"msgtype": "text", "text": {"content": "尼尔森'${content}'"}}'

#uat环境
elif [ $branch == 'origin/uat' ]; then 
#移动后包名称
MOVE_PACKAGENAME=$ARTIFACTID-$VERSION-$T.jar

#获取输出路径
OSS=/mnt/oss/project
OUT=${OSS}/${JOB_NAME}/uat
mkdir -p $OUT

#移到OSS中
mv ${DIR}/target/$PACKAGENAME ${OUT}/$MOVE_PACKAGENAME
md5=`md5sum $OUT/$MOVE_PACKAGENAME`
md5=${md5:0:8}
URL="https://nplus-front.oss-cn-shanghai.aliyuncs.com/project/${JOB_NAME}/uat/$MOVE_PACKAGENAME"

#发送钉钉通知
content="项目：${JOB_NAME}\n环境：UAT环境\n版本：${VERSION}\n指纹：${md5}\n地址：${URL}"
curl 'https://oapi.dingtalk.com/robot/send?access_token=xxx' \
   -H 'Content-Type: application/json' \
   -d '{"msgtype": "text", "text": {"content": "尼尔森'${content}'"}}'



#elif [ $branch == 'origin/test' ]; then 
else

#测试环境

#删除测试环境旧包
ssh -p 22 root@nielsen-os.np "find /opt/nplus/nielsen/service/ -name 'service-project-*' |xargs rm -rf"

#把jar包传到服务器上
scp -r -P 22 ${DIR}/target/$PACKAGENAME root@nielsen-os.np:/opt/nplus/nielsen/service/
#执行服务器上的启动脚本
ssh -p 22 root@nielsen-os.np sh /opt/nplus/nielsen/sh/project.sh  

#发送钉钉通知
res=`curl -X POST \https://v2.alapi.cn/api/shici \-H 'Content-Type: application/x-www-form-urlencoded' \-d 'token=V23RvAc7Ai8uJY4v&format=json&type=all' > index.json   && cat index.json |awk -F ':' '{print $5}' |awk -F "," '{print $1}' |tr -d '\"'` 
res=${res##*:}    
res=${res/\"/ }
res=${res/\"/ }
res=${res/,/ }


curl 'https://oapi.dingtalk.com/robot/send?access_token=xxx' \
   -H 'Content-Type: application/json' \
   -d '{"msgtype": "text", "text": {"content": "【service-project重启】'${res}'"}}'

#else

echo "该分支无需处理"

fi
```


### 服务器

