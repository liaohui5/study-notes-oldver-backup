### 优化 webpack 配置

开发环境有开发环境的配置, 生产环境有生产环境的配置, 但是两种环境都有共同的配置, 为了便于维护, 可以将配置文件根据环境需要抽离, 使用 `webpack-merge` 插件

- 安装

```sh
npm i webpack-merge -D
```

> 抽离共同配置文件 `webpack.base.js`

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },

  module: {
    rules: [
      // 处理 js
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除 node_modules 目录
        include: path.resolve(__dirname, "src"),
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: {
                      chrome: "50",
                    },
                  },
                ],
              ],

              // babel 插件
              plugins: [
                [
                  "@babel/plugin-transform-runtime",
                  {
                    absoluteRuntime: false,
                    corejs: 2, // 不污染全局作用域
                    helpers: true,
                    regenerator: true,
                    useESModules: false,
                  },
                ],
              ],
            },
          },
          {
            loader: "eslint-loader",
            options: {
              enforce: "pre",
              fix: true,
            },
          },
        ],
      },

      // 处理字体
      {
        test: /\.(eot|json|svg|ttf|woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              filename: "[name].[ext]",
              outputPath: "fonts",
            },
          },
        ],
      },

      // 处理图片
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[hash].[ext]",
              outputPath: "images/",
              limit: 1024 * 100, // 100k
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },

      // 处理样式
      {
        test: /\.(c|le)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, // 将css代码抽离为为单独的文件, 然后使用 link 标签导入
          },
          "css-loader",
          "less-loader",
          "postcss-loader",
        ],
      },
    ],
  },

  plugins: [
    // 将打包内容插入到html模板插件
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true, // 删除空格和换行
        removeComments: true, // 删除注释
        useShortDoctype: true, // 使用 html5 的的 doctype
      },
      template: "./index.html",
    }),

    // 抽离 css 插件
    new MiniCssExtractPlugin(),

    // 清除上一次打包结果插件
    new CleanWebpackPlugin(),

    // 复制静态文件插件
    new CopyWebpackPlugin([
      {
        from: "./docs",
        to: "docs",
      },
    ]),
  ],
};
```

> 开发环境 `webpack.dev.js`

```js
const Merge = require("webpack-merge");
const baseConfig = require("./webpack.base.js");

module.exports = Merge(baseConfig, {
  mode: "development",
  devtool: "cheap-module-eval-source-map",

  devServer: {
    port: 8888, // 服务端监听端口
    compress: true, // 压缩
    contentBase: "./dist", // 指定提供内容的目录
    proxy: {
      // 请求代理设置
      "^/api": {
        // 域名后以
        target: "http://localhost:3000/api",
        secure: false,
      },
    },
  },

  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        include: `${__dirname}/src`,
        loader: "eslint-loader",
        options: {
          fix: true,
        },
      },
    ],
  },
});
```

> 生产环境 `webpack.prod.js`

```js
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const baseConfig = require("./webpack.base.js");
const Merge = require("webpack-merge");

module.exports = Merge(baseConfig, {
  mode: "production",
  devtool: "cheap-module-source-map",

  // 优化压缩选项
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
});
```

### 在 `package.json` 中配置打包命令

```js
"scripts": {
    "build": "webpack --config webpack.prod.js",
    "dev": "webpack-dev-server --config webpack.dev.js"
},
```

### 其他配置文件

- `postcss.config.js`

```js
module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        "ie >= 8", // 兼容 ie7 以上浏览器
        "Firefox >= 3.5", // 兼容火狐版本大于 3.5 以上浏览器
        "chrome >= 35", // 兼容谷歌版本大于 35 以上浏览器
        "opera >= 11.5", // 兼容欧朋大于 11.5 以上浏览器
      ],
    },

    "postcss-sprites": {
      // 合并的图片的保存位置
      spritePath: "./dist/images",

      // 分组打包(根据文件夹分组)
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

- `eslintrc.js` 配置

```js
module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ["airbnb-base"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    // override rules
  },
};
```
