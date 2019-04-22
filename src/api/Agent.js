/**
 * @description 网络请求的基础类，功能包含，发起请求、提示错误
 * @class Agent
 */
export default class Agent {
    /**
     * @description 接受接口的返回
     * @param {*} response 返回的response
     * @returns 返回的response
     */
    handleResponse(response) {
        if (!response) {
            return undefined;
        }
        return response.json();
    }

    /**
     * @description 发生错误的回调
     * @param {*} error 错误内容
     * @returns undefined
     */
    handleCatch(error) {
        console.error(error);
        return undefined;
    }

    /**
     * @description POST请求，params参数里面可以用noToken:true设置不带token
     * @param {*} url 请求的url
     * @param {*} params 参数
     * @returns Promise
     */
    post(url, params) {
        return this.sendRequest(url, params, 'POST', false);
    }

    /**
     * @description GET请求，params参数里面可以用noToken:true设置不带token
     * @param {*} url 请求的url
     * @param {*} params 参数
     * @returns Promise
     */
    get(url, params) {
        return this.sendRequest(url, params, 'GET', false);
    }

    /**
     * @description POST请求，params参数里面可以用noToken:true设置不带token
     * @param {*} url 请求的url
     * @param {*} param 参数
     * @param {*} headers 自定义的header
     * @returns Promise
     */
    postWithHeader(url, param, headers) {
        return this.sendRequstWithHeader(url, param, 'POST', headers);
    }

    /**
     * @description GET请求，params参数里面可以用noToken:true设置不带token
     * @param {*} url 请求的url
     * @param {*} param 参数
     * @param {*} headers 自定义的header
     * @returns Promise
     */
    getWithHeader(url, param, headers) {
        return this.sendRequstWithHeader(url, param, 'GET', headers);
    }

    /**
     * @description 上传文件
     * @param {*} url 请求的url
     * @param {*} params 参数
     * @returns Promise
     */
    postFile(url, params) {
        return this.sendRequest(url, params, 'POST', true);
    }

    /**
     * @description 统一请求 isFile判断是否是文件上传
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
        // type不传就默认为GET
        type = type || 'GET';
        // 组装参数
        params = params || {};
        let form = [];
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            Accept: 'application/json, text/javascript, */*; q=0.01'
        };
        if (isFile) {
            // 上传文件是删除Content-Type,使用浏览器自动生成的
            headers.delete('Content-Type');
            form = new FormData();
            Object.keys(params).forEach(key => {
                const value = params[key];
                if (value !== undefined) {
                    form.append(key, typeof value === 'string' ? value.trim() : value);
                }
            });
        } else {
            Object.keys(params).forEach(key => {
                const value = params[key];
                if (params[key] !== undefined) {
                    form.push(`${key}=${encodeURIComponent(typeof value === 'string' ? value.trim() : value)}`);
                }
            });
            form = form.join('&');
        }

        const rq = {
            method: type,
            headers: headers,
            // 提交cookie
            credentials: 'include'
        };
        // 如果是GET请求，就拼接URL
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

    /**
     * @description 统一发起请求，自定义header
     * @param {*} url url
     * @param {*} _params 参数
     * @param {string} [type="GET"] 请求类型
     * @param {*} headers 自定义的header
     * @returns  Promise
     */
    sendRequstWithHeader(url, _params, type = 'GET', headers) {
        let fullUrl = url;
        let params = _params;
        // 组装参数
        params = params || {};
        let form = [];
        Object.keys(params).forEach(key => {
            const value = params[key];
            if (params[key] !== undefined) {
                form.push(`${key}=${encodeURIComponent(typeof value === 'string' ? value.trim() : value)}`);
            }
        });
        form = form.join('&');

        const rq = {
            method: type,
            headers,
            // 提交cookie
            credentials: 'include'
        };
        // 如果是GET请求，就拼接URL
        if (type === 'GET') {
            if (fullUrl.search(/\?/) === -1) {
                if (form.length !== 0) fullUrl = `${fullUrl}?${form}`;
            } else {
                fullUrl = `${fullUrl}&${form}`;
            }
        } else if (headers && headers.get('Content-Type').indexOf('application/json') >= 0) {
            rq.body = JSON.stringify(params);
        } else {
            rq.body = form;
        }

        return fetch(fullUrl, rq)
            .then(this.handleResponse)
            .then(json => json)
            .catch(this.handleCatch);
    }
}
