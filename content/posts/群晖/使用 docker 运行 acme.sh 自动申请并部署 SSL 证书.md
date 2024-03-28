# 使用 docker 运行 acme.sh 自动申请并部署 SSL 证书


# 1. 前言
群晖自带 Let’s Encrypt 证书申请功能，但是需要开放 80 或 443 端口来验证域名所属权，悲剧的是运营商禁掉了家庭网络相关的端口，这个方案并不可行。

后来通过其他云服务商的面版申请证书，通过群晖面板导入证书。这个方案的不便之处在于：
- 证书有效期太短，有的服务商把证书的有效期从1年降为3个月
- 申请的域名多了，操作起来麻烦，尤其是各个证书的续期时间还不一样

经过几番搜索之后找到了一劳永逸的方式：[acme.sh](https://github.com/acmesh-official/acme.sh)

# 2. 获取 DNS API 调用密钥
根据域名 DNS 服务商的不同，获取密钥的方式也不同。
> 获取方式参考：https://github.com/acmesh-official/acme.sh/wiki/dnsapi

本文使用的是Cloudflare，需要获取的参数：**CF_Token**，**CF_Zone_ID**

# 3. 确认 SSL 服务商
acme.sh 默认使用 ZeroSSL
> 切换其他服务商参考：https://github.com/acmesh-official/acme.sh/wiki/Server

# 4. 注册 ACME 账号
使用 `sudo -i` 切换到root用户，执行：
```
docker run --rm \
  -v /volume1/docker/acme_sh:/acme.sh \
  --net=host \
  neilpang/acme.sh:latest \
  --register-account \
  -m <YOUR_EMAIL> \
  --eab-kid <eab-kid> \
  --eab-hmac-key <eab-hmac-key>
```
其中：
`/volume1/docker/acme_sh` 可以替换为你想要加载 acme 输出的本地目录，并确保文件夹已存在。
`<YOUR_EMAIL>` 应替换为你的邮箱。

可选参数：`<eab-kid>`，`<eab-hmac-key>`
要是你在 [ZeroSSL](https://app.zerossl.com) 注册过账号的话，可以使用外部帐户绑定 (EAB) 凭据引导 acme.sh 。拥有 ZeroSSL 帐户的用户可以从开发者控制台管理颁发的证书。
> 参考：https://github.com/acmesh-official/acme.sh/wiki/ZeroSSL.com-CA

# 5. 签发证书

```
export CF_Token=<CF_Token>
export CF_Zone_ID=<CF_Zone_ID>
export DOMAIN=<DOMAIN>

docker run --rm \
  -v /volume1/docker/acme_sh:/acme.sh \
  -e CF_Token="${CF_Token}" \
  -e CF_Zone_ID="${CF_Zone_ID}" \
  --net=host \
  neilpang/acme.sh:latest \
  --issue --dns dns_cf --ocsp \
  --keylength ec-256 \
  -d "${DOMAIN}" -d "*.${DOMAIN}"
```
其中：
`<CF_Token>`，`<CF_Zone_ID>` 是在 Cloudflare 申请的 DNS API 调用密钥。
`<DOMAIN>` 填需要申请证书的域名
`--keylength` 指定证书的长度，可选值：2048, 3072, 4096, 8192 或者 ec-256, ec-384, ec-521。本文选择的是 ec-256

命令执行完后，证书会输出在 /volume1/docker/acme_sh/<DOMAIN> 目录下。

# 6. 部署证书
证书生成后，不建议手动复制和导入生成的证书。acme.sh 的 deploy 命令提供了群晖 NAS 的部署方式。
> 参考：https://github.com/acmesh-official/acme.sh/wiki/deployhooks
具体命令如下：
```
export SYNO_Username=<SYNO_Username>
export SYNO_Password=<SYNO_Password>
export DOMAIN=<DOMAIN>

docker run --rm \
  -v /volume1/docker/acme_sh:/acme.sh \
  -e SYNO_Username="${SYNO_Username}" \
  -e SYNO_Password="${SYNO_Password}" \
  -e SYNO_Certificate="<SYNO_Certificate>" \
  -e SYNO_Scheme="<SYNO_Scheme>" \
  -e SYNO_Port="<SYNO_Port>" \
  -e SYNO_Create="1" \
  --net=host \
  neilpang/acme.sh:latest \
  --deploy --ecc --insecure --deploy-hook synology_dsm \
  -d "${DOMAIN}" -d "*.${DOMAIN}"
```
其中：
`<SYNO_Username>`，`<SYNO_Password>` 能登录群晖的用户名，密码（具有管理员权限）
`<DOMAIN>` 需要部署的域名证书
`<SYNO_Certificate>` 证书的描述，以后通过他替换已有证书
`<SYNO_Scheme>`，`<SYNO_Port>` 访问群晖的地址，比如你在局域网内是通过 https://192.168.1.5000 访问的，那么 SYNO_Scheme 填 http，SYNO_Port 填 5000
`SYNO_Create` 第一次导入证书时需要填此参数
`--ecc` 签发证书时 keylength 选的 ec-256，因此需要这个参数
`--insecure` 不需要校验服务端证书，部署证书是通过群晖的 API 实现的，比如：https://localhost:5000/webapi/entry.cgi?api=SYNO.Core.Certificate&method=import&version=1&SynoToken=

