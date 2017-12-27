本模板工程为快速开发适配手机屏幕的网页而设计。
整合了React、antd-mobile、mobx等框架，能让开发者从搭建工程到发布做到开箱即用。

本文档大多内容来自官方文档，如需查看原版请[点击这里](https://github.com/facebookincubator/create-react-app/blob/master/README.md)
## 推荐编辑器
[Visual Studio Code](https://code.visualstudio.com/)

## 目录

- [文件结构](#文件结构)
- [可用的脚本](#可用的脚本)
- [自定义WebPack配置](#自定义配置)
- [提交代码自动格式化](#提交代码自动格式化)
- [修改标题](#修改标题)
- [异步加载组件](#异步加载组件)
- [CSS样式编写](#样式编写)
- [引入图片、文件等资源](#引入图片等资源)
- [添加自定义的环境变量](#添加自定义的环境变量)
- [调用接口](#调用接口)
- [在开发中使用https](#在开发中使用https) 
- [应用第三方JS](#应用第三方JS)

## 文件结构

创建之后你会看到如下目录:

```
my-app/
  README.md
  node_modules/
  package.json
  server.js 
  public/
    index.html
    favicon.ico
  src/
    base-compoents/
    stores/
    transport-layer/
    pages/
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
```

你可以在 `src` 下创建子目录. 当这个目录下内容用更改时，如果正在运行状态下，会触发快速自动构建。<br>
JS和CSS就反正这个目录下。

`public` 目录存放入口文件 `public/index.html`,如果要引入第三方JS可以放在这个目录<br>

`server.js` 发布时的服务器使用，主要用来代理跨域的接口。<br>
 
## 可用的脚本

In the project directory, you can run:

### `yarn start` 或者 `npm start`

App会以开发模式运行<br>
会自动在浏览器打开 [http://localhost:3000](http://localhost:3000) 

每次你编辑文件后，这个页面都会自动重新加载<br> 

### `yarn test` 或者 `npm test`

运行测试模式<br>
See the section about [running tests](#running-tests) for more information.

### `yarn build` 或者 `npm run build`

App构建出发布的文件到 `build` 目录.<br> 
现在你就可以将build目录下的文件发布到服务器上去了。

关于 [发布](#deployment) .

## 自定义配置
如果你先自定义webpack的配置，请编辑config-overrides.js。因为使用了react-app-rewired插件所以不需要执行 eject命令。
具体使用方法请常见 [https://github.com/timarney/react-app-rewired](https://github.com/timarney/react-app-rewired)

## 提交代码自动格式化

>只有使用Git作为代码服务器时有效

使用以下插件 husky lint-staged prettier 实现在提交代码时，自动进行格式化
To format our code whenever we make a commit in git, we need to install the following dependencies:

## 修改标题

如果要修改网页标题，请在到public下的html中的<title>标签修改。
还可替换favicon.ico为自己的ico。
manifest.json中的信息也一并修改。

## 异步加载组件

因为默认情况下，webpack会将引用到的包都打包到同一个JS文件中，所以可能入口js文件可能会很大。
为了使用之变小，在使用react-router打开组件时，请使用如下方法引入

```js
const Login =()=><Async load={import('./Login')}/>

<Route  path='/Login' component={Login}/> 
```

## CSS样式编写

为了实现CSS样式的模块化。请在编写模块样式时在前面添加':local'

### `index.css`

```css
:local .Button {
  padding: 20px;
}
```

### `index.js`

```js
import React, { Component } from 'react';
import styles from './index.js';  

class Button extends Component {
  render() {
    // You can use them as regular CSS styles
    return <div className={styles.Button} />;
  }
}
```
 
## 引入图片等资源

为了减小Http的请求数目，在打包时webpack会将小于10k的图片直接转换成base64字符串放在html中。
**目前只支持bmp,gif,jpg,jpeg,png**

写法如下:

```js
import React from 'react';
import logo from './logo.png'; // Tell Webpack this JS file uses this image

console.log(logo); // /logo.84287d09.png

function Header() {
  // Import result is the URL of your image
  return <img src={logo} alt="Logo" />;
}

export default Header;
```
  

```css
:local .Logo {
  background-image: url(./logo.png);
}
```
## 使用VSCode调试

本工程可以使用VSCode进行调试。但需要先安装这个[Debugger for Chrome](#https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)

## 添加自定义的环境变量

你可以在工程设置环境变量，好在JS、Html、CSS中使用，比如测试环境和正式环境需要不同的AppKey之类的。
默认的环境变量有 `NODE_ENV` ，它的值有`development` `production` `test` 分别对应运行的命令行`yarn start` `yarn build` `yarn test`。

**环境变量的值会在打包阶段被动态的替换掉**

### 设置环境变量

>注意: 自定义的环境变量必须以 `REACT_APP_` 开头. 
#### 1.文件内定义

可以在项目根目录下新建如下的文件（不同命令，会读取不同的文件）

* `.env： 默认使用`
* `.env.local：用于本地变量覆盖，这个文件会在除了test环境的所有环境加载`
* `.env.development,.env.test,.env.production：在对应的环境加载`
* `.env.development.local,.env.test.local,.env.production.local：在对应的环境加载，最高优先级，会覆盖.env.*的配置`
加载的优先级从高到低，依次为：

* `npm start`: `.env.development.local`, `.env.development`, `.env.local`, `.env`
* `npm run build`: `.env.production.local`, `.env.production`, `.env.local`, `.env`
* `npm test`: `.env.test.local`, `.env.test`, `.env` (注意没有 `.env.local`)

#### 2.命令行直接设置

环境变量还可以在运行命令行的时候直接设置

* Windows(cmd.ext): `set REACT_APP_SECRET_CODE=123&&npm start`
* Mac: `REACT_APP_SECRET_CODE=123 npm start`

### 使用环境变量

```jsx
render() {
  return (
    <div>
      <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
      <form>
        <input type="hidden" defaultValue={process.env.REACT_APP_SECRET_CODE} />
      </form>
    </div>
  );
}
```

```js
if (process.env.NODE_ENV !== 'production') {
  analytics.disable();
}
```

```html
<title>%REACT_APP_WEBSITE_NAME%</title>
```

## 调用接口

由于现在都是前后的分离的，前端调用的接口都是跨域的，所以需要进行代理

在本地开发的时候，你只需要将相对路径配到./src/transport-layer/ApiUrl.js中即可。
例如：`LOGIN: '/login'`

然后修改`package.json`中的 `proxy`的值。
例如：
```js
  "proxy": "http://localhost:4000",
```
这样配置后所有XHR请求都会被代理到本地的4000端口。

或者这样配置两种不同的代理。
```js
  "proxy":{
    "/api/a":{ 
      "target": "http://localhost:4000"
    },
    "/api/b":{ 
      "target": "http://localhost:4001",
      "ws": true //开启WebSocket代理
    }
  }
```

## 在开发中使用https

#### Windows (cmd.exe)

```cmd
set HTTPS=true&&npm start
```

(Note: the lack of whitespace is intentional.)

#### Linux, macOS (Bash)

```bash
HTTPS=true npm start
```
## 应用第三方JS

### node模块引用

使用npm安装后，直接在js文件中import即可。

### 单个JS文件应用

如果文件符合AMD/CMD规范可以直接import，如果不符合请在public/index.html中引入