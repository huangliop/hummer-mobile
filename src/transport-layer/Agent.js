/**
 * @description 网络请求的基础类，功能包含，发起请求、提示错误
 * @author Huang Li
 * @class Agent
 */
export default class Agent {
    constructor() {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        this.headers.append('Accept', 'application/json, text/javascript, */*; q=0.01');
    }
    /**
     * @description 接受接口的返回
     * @author Huang Li
     * @date 2018-06-22
     * @param {*} response 返回的response
     * @returns 返回的response
     */
    handleResponse(response) {
        if (!response || response.status >= 400) {
            return undefined;
        } else {
            return response.json();
        }
    }

    /**
     * @description 发生错误的回调
     * @author Huang Li
     * @date 2018-06-22
     * @param {*} error 错误内容
     * @returns undefined
     */
    handleCatch(error) {
        console.error(error);
        return undefined;
    }
    /**
     * @description POST请求，params参数里面可以用noToken:true设置不带token
     * @author Huang Li
     * @date 2018-06-22
     * @param {*} url 请求的url
     * @param {*} params 参数
     * @returns Promise
     */
    post(url, params) {
        return this.sendRequest(url, params, 'POST', false);
    }
    /**
     * @description GET请求，params参数里面可以用noToken:true设置不带token
     * @author Huang Li
     * @date 2018-06-22
     * @param {*} url 请求的url
     * @param {*} params 参数
     * @returns Promise
     */
    get(url, params) {
        return this.sendRequest(url, params, 'GET', false);
    }
    /**
     * @description 上传文件
     * @author Huang Li
     * @date 2018-06-22
     * @param {*} url 请求的url
     * @param {*} params 参数
     * @returns Promise
     */
    postFile(url, params) {
        return this.sendRequest(url, params, 'POST', true);
    }

    /**
     * @description 统一请求 isFile判断是否是文件上传
     * @author Huang Li
     * @date 2018-06-22
     * @param {*} url 请求的url
     * @param {*} _params 请求的参数
     * @param {*} _type 请求的类型 ‘POST’，‘GET’等
     * @param {boolean} isFile 是否为上传文件
     * @returns Promise
     */
    sendRequest(url, _params, _type, isFile) {
        let fullUrl = url;
        let type = _type;
        let params = _params;
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
            this.headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8;');
            Object.keys(params).forEach(key => {
                if (params[key] !== undefined) {
                    form.push(`${key}=${encodeURIComponent(params[key])}`);
                }
            });
            form = form.join('&');
        }

        let rq = {
            method: type,
            headers: this.headers,
            //提交cookie
            credentials: 'include'
        };
        //如果是GET请求，就拼接URL
        if (type === 'GET') {
            if (fullUrl.search(/\?/) === -1) {
                if (form.length !== 0) fullUrl = `${fullUrl}?${form}`;
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
