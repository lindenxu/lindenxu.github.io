# docker 安装 ImmortalWrt

#开启网卡混杂模式
ifconfig ovs_eth1 promisc

#关闭网卡混杂模式
ifconfig ovs_eth1 -promisc

#查看网卡混杂模式
ifconfig ovs_eth1


gunzip immortalwrt-23.05.1-x86-64-generic-rootfs.tar.gz

docker import immortalwrt-23.05.1-x86-64-generic-rootfs.tar immortalwrt:23.05.1

```
docker run -d \
   --restart always \
   --name openwrt \
   --privileged \
   --network macnet \
   --ip 192.168.3.100 \
   immortalwrt:23.05.1 \
   /sbin/init
```

```
config interface 'loopback'
    option proto 'static'
    option ipaddr '127.0.0.1'
    option netmask '255.0.0.0'
    option device 'lo'

config interface 'wan'
    option proto 'dhcp'
    option device 'eth0'

config interface 'wan6'
    option proto 'dhcp6'
    option device 'eth0'
```



> 参考：
> https://blog.simpdog.me/posts/using-docker-to-deploy-openwrt-as-a-home-router/