### 压缩图片

- [image-webpack-loader](https://www.npmjs.com/package/image-webpack-loader)

- [img-loader](https://www.npmjs.com/package/img-loader)

> 以上两个 `loader` 都可以, 这里使用 `image-webpack-loader` 为例配置

- 安装, 有些依赖需要翻墙(注意网络环境)

```sh
npm i image-webpack-loader -D
```

- 配置使用

```js
// 处理图片
{
    test: /\.(gif|png|jpe?g|svg)$/i,
    use: [{
            loader: "url-loader",
            options: {
                limit: 1024 * 100 // 100k
            }
        },
        {
            loader: 'image-webpack-loader',
            options: {
                mozjpeg: {
                    progressive: true,
                    quality: 65
                },
                // optipng.enabled: false will disable optipng
                optipng: {
                    enabled: false,
                },
                pngquant: {
                    quality: [0.65, 0.90],
                    speed: 4
                },
                gifsicle: {
                    interlaced: false,
                },
                // the webp option will enable WEBP
                webp: {
                    quality: 75
                }
            }
        },
    ]
},
```

### 合并图片

- 注意是合并成精灵图(只能在 css 的 background 的 position 属性中使用)

- 安装

```sh
npm i postcss postcss-sprites -D
```

- 使用修改 `postcss.config.js`

```js
module.exports = {
  plugins: {
    "postcss-sprites": {
      // 合并的图片的保存位置
      spritePath: "./dist/images",

      // 分组打包(根据文件夹分组)
      // img 是一个对象, img.url 是图片的路径
      groupBy: function (img) {
        const path = img.url.substr(0, img.url.lastIndexOf("/"));
        const dir = path.substr(path.lastIndexOf("/") + 1);
        return Promise.resolve(dir);
      },

      // 过滤不需要被合并的图片(如果是jpg就不合并)
      filterBy: function (img) {
        if (/\.jpg$/i.test(img.url)) {
          return Promise.reject();
        } else {
          return Promise.resolve();
        }
      },
    },
  },
};
```
