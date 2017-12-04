/**
 * 网络请求的基础类，功能包含，发起请求、提示错误
 */
import 'isomorphic-fetch';

class Agent {
  constructor() {
    this.headers = new Headers();
    this.headers.append(
      'Content-Type',
      'application/x-www-form-urlencoded; charset=UTF-8'
    );
    this.headers.append(
      'Accept',
      'application/json, text/javascript, */*; q=0.01'
    );
  }
  handleResponse = response => {
    if (!response || response.status >= 400) {
      return {};
    } else {
      return response.json();
    }
  };

  handleCatch = error => {
    console.log(error);
    return {};
  };
  /**
   * POST请求，params参数里面可以用noToken:true设置不带token
   */
  post = (url, params) => {
    return this.sendRequest(url, params, 'POST', false);
  };
  /**
   * GET请求，params参数里面可以用noToken:true设置不带token
   */
  get = (url, params) => {
    return this.sendRequest(url, params, 'GET', false);
  };
  /**
   * 上传文件
   */
  postFile = (url, params) => {
    return this.sendRequest(url, params, 'POST', true);
  };

  ////统一请求 isFile判断是否是文件上传
  sendRequest(url, params, type, isFile) {
    let fullUrl = url;
    //type不传就默认为GET
    type = type ? type : 'GET';
    //组装参数
    params = params ? params : {};
    let form = [];
    if (isFile) {
      //上传文件是删除Content-Type,使用浏览器自动生成的
      this.headers.delete('Content-Type');
      form = new FormData();
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined) {
          form.append(key, params[key]);
        }
      });
    } else {
      this.headers.set(
        'Content-Type',
        'application/x-www-form-urlencoded; charset=UTF-8'
      );
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined) {
          form.push(key + '=' + encodeURIComponent(params[key]));
        }
      });
      form = form.join('&');
    }

    let rq = {
      method: type,
      headers: this.headers,
      //提交cookie
      credentials: 'include',
      //允许跨域
      mode: 'cors'
    };
    //如果是GET请求，就拼接URL
    if (type === 'GET') {
      if (fullUrl.search(/\?/) === -1) {
        fullUrl = `${fullUrl}?${form}`;
      } else {
        fullUrl = `${fullUrl}&${form}`;
      }
    } else {
      rq.body = form;
    }

    return fetch(fullUrl, rq)
      .then(this.handleResponse)
      .then(json => json)
      .catch(this.handleCatch);
  }
}

export default Agent;
