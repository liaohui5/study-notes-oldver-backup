## XSS

Cross site scripting: 跨域脚本

为了和 `CSS` 区分开, 所以用 `XSS`, 利用 img 等使用外部资源标签, 加载失败执行其他脚本的特性

比如: 现在有个可以让用户输入带格式的内容的富文本编辑器, 用户输入这样的内容

```html
<img src="not_found_url" onerror="alert(1)" />
<script>
  alert(1);
</script>
```

1. 过滤用户输入的内容, 避免直接渲染到 html DOM 中

## CSRF/XSRF

Cross site request forgery: 跨域请求伪造

1. HTTP request header 添加 `referer` 字段并且检查
2. 在 header 头中增加自定义验证字段(字段的值为:请求参数加密后的值,最好使用非 RSA 对称加密) 在服务端对所有请求都要验证
3. 给每个请求

## SSRF

Server-side Request forgery: 服务端请求伪造

一些内部的 oa 系统部不允许公网直接访问, 但是又需要对外开放一些 API 接口, 此时就可以伪造一些参数来请求这些开放的 API 接口来访问内部 OA 系统

1. 在 API 服务端判断,拦截

## 视觉欺骗

在 A 网站页面中, 利用 iframe 引用 B 网站的内容, 然后在 A 网站中用一个按钮(带有诱导性, 比如:领取奖励)去和 B 网站的按钮重合

用户以为点击的 A 网站中的内容(领取奖励), 但是其实点击的是 B 网站中的内容

此时就会 B 网站中的内容就会执行

1. 在服务端添加响应头 `X-Frame-Options` 值为 `DENY` 就可以

## SQL 注入

在拼接存储用户数据的时候, 没有做预处理的操作导致参数被当做 SQL 的一部分执行

1. 在服务端做预处理操作
