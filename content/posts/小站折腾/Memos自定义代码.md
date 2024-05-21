---
title: Memos自定义代码
slug: memos-custom-code
tags:
  - coding
  - Memos
categories:
  - 小站折腾
series: 
date: 2024-05-21 10:19:37
draft: false
description: ""
image: ""
---

Memos 中可以使用自定义 CSS 和 JavaScript 来自定义页面的样式和功能。在此记录一些常用的脚本。

<!--more-->

## twikoo 评论

CSS:

```
/* twikoo评论样式 */
#twikoo{padding: 1rem;background-color: rgb(63,63,70);margin: 1rem 0;border-radius: .5rem;color: #fff !important;}
.twicon{position: absolute;right: 1rem;}
.btns-container.space-x-2{margin-right:1.5rem;}
.action-button-container{color: #e5e7eb;}
.action-button-container a{display:none !important;}

```

JavaScript:

```
/* twikoo评论脚本 */
var twikooENV = '<你自己的 twikoo 环境 Id >'
function addTwikooJS() {
  if (document.getElementById('twikooScript')) {
    return;
  }
  var memosTwikoo = document.createElement("script");
  memosTwikoo.src = "https://cdn.staticfile.net/twikoo/1.6.32/twikoo.all.min.js";
  memosTwikoo.setAttribute('id', 'twikooScript')
  var tws = document.getElementsByTagName("script")[0];
  tws.parentNode.insertBefore(memosTwikoo, tws);
};
function startTwikoo() {
  startTW = setInterval(function(){
    var nowHref = window.location.href;
    var twikooDom = document.querySelector('#twikoo') || '';
    if( nowHref.replace(/^.*\/(m)\/.*$/,'$1') == "m"){
      if(!twikooDom){
        addTwikooJS()
        setTimeout(function() {
          var memoTw = document.querySelector('.gap-2') || '';
          memoTw.insertAdjacentHTML('afterend', '<div id="mtcomment"></div>');
          twikoo.init({
            envId: twikooENV,
            el: '#mtcomment',
            path: nowHref.replace(/^.*=?(http.*\/m\/[0-9]+).*$/,'$1'),
            onCommentLoaded: function () {
              startTwikoo();
            }
          })
        }, 1500)
      }else{
        clearInterval(startTW)
      }
    }
  }, 2000)
}
startTwikoo();

```

## Umami 统计

JavaScript：

```
/* umami 统计 */
const websiteId = '<你自己的网站的 websiteId >';
function loadUmami() {
  const script = document.createElement('script');
  script.async = true;
  script.defer = true;
  script.setAttribute("data-website-id",websiteId);
  script.src = "https://<你自己的 umami 访问地址>/script.js";
  document.body.append(script);
};

loadUmami();
```

## 字体

CSS：

```
/* 字体样式 */
body{font-family: "LXGW WenKai Screen", sans-serif !important;}
```

JavaScript：

```
/* 字体脚本 */
function changeFont() {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = "https://cdn.staticfile.net/lxgw-wenkai-screen-webfont/1.7.0/style.min.css";
  document.head.append(link);
};
changeFont()

```
