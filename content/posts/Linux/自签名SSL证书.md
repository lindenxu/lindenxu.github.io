# 自签名SSL证书


## 一 证书生成
### 1. 生成私钥
命令：
```
openssl genrsa -des3 -out server_pass1.key 2048
```
运行后提示输入密码，例子中密码为：123456

输出：
```
~/Desktop/tmp » openssl genrsa -des3 -out server_pass1.key 2048                                                                           lin@lin-mac
Generating RSA private key, 2048 bit long modulus
................................................................................................+++++
..................................+++++
e is 65537 (0x10001)
Enter pass phrase for server_pass1.key:
Verifying - Enter pass phrase for server_pass1.key:
```

### 2. 去除私钥中的密码
命令：
```
openssl rsa -in server_pass1.key -out server2.key
```

为何需要去除密码：
每次Apache启动Web服务器时，都会要求输入密码，这显然非常不方便。所以要删除私钥中的密码。

### 3. 生成证书签名请求csr
```
openssl req -new -key server2.key -out server3.csr -subj "/C=CN/ST=Jiangsu/L=Wuxi/O=MOT/OU=web/CN=xulinfeng.com"
```

subj参数说明：
| 字段 | 含义                    | 示例          |
|------|-------------------------|:--------------|
| /C=  | Country 国家            | CN            |
| /ST= | State or Province 省    | Jiangsu       |
| /L=  | Location or City 城市   | Wuxi          |
| /O=  | Organization 组织或企业 | cetc          |
| /OU= | Organization Unit 部门  | dev           |
| /CN= | Common Name 域名或IP    | xulinfeng.com |
|      |                         |               |  

其他可以随便填，但CN必须为你网站的域名



### 4. 生成自签名SSL证书
```
openssl x509 -req -days 365 -in server3.csr -signkey server2.key -out server4.crt
```

## 二 证书生成一条龙
>参考：https://www.liaoxuefeng.com/article/990311924891552

想一步到位的童鞋，可以使用如下脚本一键生成
```
#!/bin/sh

# create self-signed server certificate:

read -p "Enter your domain [www.example.com]: " DOMAIN

echo "Create server key..."

openssl genrsa -des3 -out $DOMAIN.key 1024

echo "Create server certificate signing request..."

SUBJECT="/C=US/ST=Mars/L=iTranswarp/O=iTranswarp/OU=iTranswarp/CN=$DOMAIN"

openssl req -new -subj $SUBJECT -key $DOMAIN.key -out $DOMAIN.csr

echo "Remove password..."

mv $DOMAIN.key $DOMAIN.origin.key
openssl rsa -in $DOMAIN.origin.key -out $DOMAIN.key

echo "Sign SSL certificate..."

openssl x509 -req -days 3650 -in $DOMAIN.csr -signkey $DOMAIN.key -out $DOMAIN.crt

echo "TODO:"
echo "Copy $DOMAIN.crt to /etc/nginx/ssl/$DOMAIN.crt"
echo "Copy $DOMAIN.key to /etc/nginx/ssl/$DOMAIN.key"
echo "Add configuration in nginx:"
echo "server {"
echo "    ..."
echo "    listen 443 ssl;"
echo "    ssl_certificate     /etc/nginx/ssl/$DOMAIN.crt;"
echo "    ssl_certificate_key /etc/nginx/ssl/$DOMAIN.key;"
echo "}"
```

将脚本保存为 sh 文件，本地运行。遇到需要输入密码的地方使用一样的密码




## 二 根据不同的使用场景生成各自的证书

### 1. pfx格式（Tomcat）
使用 openssl 工具将 crt 和 key 格式的证书转还成 pfx:
```
openssl pkcs12 -export -out server5.pfx -inkey server2.key -in server4.crt
```

运行后提示输入2次密码，例子中pfx的密码为：12345678
输出：
```
~/Desktop/tmp » openssl pkcs12 -export -out server5.pfx -inkey server2.key -in server4.crt                                                lin@lin-mac
Enter Export Password:
Verifying - Enter Export Password:
```

### 2. jks格式（Tomcat）

#### 使用jdk自带的keytool查看证书信息（非必需）
```
keytool -list -v -keystore server5.pfx
```

输入密码后，输出：
```
~/Desktop/tmp » keytool -list -v -keystore server5.pfx                                                                                    lin@lin-mac
输入密钥库口令:
密钥库类型: PKCS12
密钥库提供方: SUN

您的密钥库包含 1 个条目

别名: 1
创建日期: 2023年10月24日
条目类型: PrivateKeyEntry
证书链长度: 1
证书[1]:
所有者: CN=xulinfeng.com, OU=web, O=MOT, L=Wuxi, ST=Jiangsu, C=CN
发布者: CN=xulinfeng.com, OU=web, O=MOT, L=Wuxi, ST=Jiangsu, C=CN
序列号: c5310224ab7651c4
生效时间: Tue Oct 24 10:03:59 CST 2023, 失效时间: Wed Oct 23 10:03:59 CST 2024
证书指纹:
	 SHA1: 74:55:A0:DA:54:30:8F:60:97:1D:6B:15:3F:9B:AC:4E:06:1E:EE:4A
	 SHA256: 14:C0:C8:6E:93:9F:C8:03:2C:BE:0D:C8:8E:C8:58:EB:A1:5C:14:48:5F:C1:53:43:8D:E7:48:CC:B6:79:2D:9B
签名算法名称: SHA256withRSA
主体公共密钥算法: 2048 位 RSA 密钥
版本: 1


*******************************************
*******************************************
```


#### 将pfx格式文件转为jks
```
keytool -importkeystore -srckeystore  server5.pfx -srcstoretype pkcs12 -destkeystore server6.jks -deststoretype pkcs12
```

输入3次密码（前2次是将来访问jks的密码，后1次是pfx的密码）后，输出：
```
~/Desktop/tmp » keytool -importkeystore -srckeystore  server5.pfx -srcstoretype pkcs12 -destkeystore server6.jks -deststoretype pkcs12    lin@lin-mac
正在将密钥库 server5.pfx 导入到 server6.jks...
输入目标密钥库口令:
再次输入新口令:
输入源密钥库口令:
已成功导入别名 1 的条目。
已完成导入命令: 1 个条目成功导入, 0 个条目失败或取消
```
例子中jks的密码为：qazwsx