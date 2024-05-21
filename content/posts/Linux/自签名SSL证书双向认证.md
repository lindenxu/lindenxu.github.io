---
title: 自签名SSL证书双向认证
slug: self-signed-certificate-double-authentication
categories: [Linux]
tags:
  - Linux
date: 2023-10-24 15:00:00
draft: false

---

自签名双向认证证书

<!--more-->

## 一 根证书生成

### 1. 生成 root 私钥 key

命令：

```
openssl genrsa -des3 -out root_pass.key 2048
```

运行后提示输入密码，例子中密码为：123456

输出：

```
~/Desktop/tmp » openssl genrsa -des3 -out root_pass.key 2048                                                                              lin@lin-mac

Generating RSA private key, 2048 bit long modulus
.........................+++++
..............................................................+++++
e is 65537 (0x10001)
Enter pass phrase for root_pass.key:
Verifying - Enter pass phrase for root_pass.key:
```

### 2. 去除 root 私钥中的密码（可选）

命令：

```
openssl rsa -in root_pass.key -out root.key
```

这一步是可选的，要是不去除密码的话，下面用到的地方就需要输入密码了

### 3. 生成 root 证书签名请求 csr

```
openssl req -new -key root.key -out root.csr -subj "/C=CN/ST=Jiangsu/L=Wuxi/O=MOT/OU=web/CN=xulinfeng.com"
```

subj 参数说明：
| 字段 | 含义 | 示例 |
|------|-------------------------|:--------------|
| /C= | Country 国家 | CN |
| /ST= | State or Province 省 | Jiangsu |
| /L= | Location or City 城市 | Wuxi |
| /O= | Organization 组织或企业 | cetc |
| /OU= | Organization Unit 部门 | dev |
| /CN= | Common Name 域名或 IP | xulinfeng.com |
| | | |

其他可以随便填，但 CN 必须为你网站的域名

### 4. 生成 root 证书 crt

```
openssl x509 -req -in root.csr -out root.crt -signkey root.key -CAcreateserial -days 3650

```

## 二 服务端证书生成

### 1. 创建服务端私钥 key

```
openssl genrsa -des3 -out server_pass.key 2048
```

运行后提示输入密码，例子中密码为：qweqwe

### 2. 去除服务端私钥中的密码（可选）

命令：

```
openssl rsa -in server_pass.key -out server.key
```

这一步是可选的，要是不去除密码的话，下面用到的地方就需要输入密码了

### 3. 生成服务端证书签名请求 csr

```
openssl req -new -key server.key -out server.csr -subj "/C=CN/ST=Jiangsu/L=Wuxi/O=MOT/OU=web/CN=xulinfeng.com"
```

### 4. 生成服务端证书 crt

```
openssl x509 -req -in server.csr -out server.crt -signkey server.key -CA root.crt -CAkey root.key -CAcreateserial -days 3650
```

如果需要只需要部署服务端证书端话，就可以结束了。拿着 server.crt 公钥和 server.key 私钥部署在服务器上，然后解析域名到改服务器指向到 IP，证书就部署成功了。

## 三 客户端证书生成

如果需要做双向验证的，也就是服务端要验证客户端证书的情况。那么需要在同一个根证书下再生成一个客户端证书

### 1. 创建客户端私钥 key

```
openssl genrsa -des3 -out client_pass.key 2048
```

运行后提示输入密码，例子中密码为：clientclient

### 2. 去除客户端私钥中的密码（可选）

命令：

```
openssl rsa -in client_pass.key -out client.key
```

这一步是可选的，要是不去除密码的话，下面用到的地方就需要输入密码了

### 3. 生成客户端证书签名请求 csr

```
openssl req -new -key client.key -out client.csr -subj "/C=CN/ST=Jiangsu/L=Wuxi/O=MOT/OU=web/CN=xulinfeng.com"
```

### 4. 生成客户端证书 crt

```
openssl x509 -req -in client.csr -out client.crt -signkey client.key -CA root.crt -CAkey root.key -CAcreateserial -days 3650
```

### 5. 生成客户端集成证书 pkcs12

方便浏览器或者 http 客户端访问

```
openssl pkcs12 -export -clcerts -in client.crt -inkey client.key -out client.p12

```

运行后提示输入密码，例子中密码为：clientclient
