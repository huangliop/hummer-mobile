import Agent from '../api/Agent';
import { autorun } from 'mobx';

/**
 * @description Store公共基类，集成了发送请求，持久化字段等功能.
 *   用handleShowLoading handleErrorToast配合UIStore，实现展示loading和错误提示，
 *   用commonRequestData 配合UserStore，实现请求中挂全局参数，比如token
 * @author Huang Li
 * @date 2019-05-30
 * @export
 * @class Store
 */
export default class Store {
    /**
     * @description 发送POST请求
     * @param {string} url 请求地址
     * @param {object} _params 参数
     * @param {object} opts 其他操作参数 如 {
     *          noCommonData:false //不挂在公共参数，比如token
     *          loading:false   //不展示loading图标
     *          noErrorToast:false //不展示接口错误信息
     *      }
     * @returns Promise
     */
    sendPost(url = '', _params = {}, opts = { noCommonData: false, loading: false, noErrorToast: false }) {
        //是否开启loading图标
        opts.loading && Store.handleShowLoading && Store.handleShowLoading(true);
        //是否挂上公共参数
        !opts.noCommonData && Object.assign(_params, Store.commonRequestData);
        return Agent.post(url, _params).then(json => _handleData(json, opts));
    }
    /**
     * @description 发送GET请求
     * @param {string} url 请求地址
     * @param {object} _params 参数
     * @param {object} opts 其他操作参数 如 {
     *          noCommonData:false //不挂在公共参数
     *          loading:false   //不展示loading图标
     *          noErrorToast:false //不展示接口错误信息
     *      }
     * @returns Promise
     */
    sendGet(url = '', _params = {}, opts = { noCommonData: false, loading: false, noErrorToast: false }) {
        //是否开启loading图标
        opts.loading && Store.handleShowLoading && Store.handleShowLoading(true);
        //是否挂上公共参数
        !opts.noCommonData && Object.assign(_params, Store.commonRequestData);
        return Agent.get(url, _params).then(json => _handleData(json, opts));
    }

    /**
     * @description 设置需要持久化数据(localstorage或者sessionstorage)
     * @author Huang Li
     * @date 2019-05-29
     * @param {string|array} paramNames 需要持久化的参数的名称
     * @param {boolean} [inSessionStorage=false] 是否持久化到sessionStorage
     */
    persistParam(paramNames, inSessionStorage) {
        if (typeof paramNames === 'string') {
            _setAutorun(this, paramNames, inSessionStorage);
        } else {
            paramNames.forEach(i => _setAutorun(this, i, inSessionStorage));
        }
    }
}

/**
 * @description 设置autorun
 * @author Huang Li
 * @date 2019-05-30
 * @param {objct} store store的引用
 * @param {string} name 字段名称
 * @param {boolean} inSessionStorage 是否存放到session
 */
const _setAutorun = (store, name, inSessionStorage) => {
    const storageName = `${store.constructor.name}_${name}`; //使用mobx的name，避免应用之间冲突
    const storeage = inSessionStorage ? window.sessionStorage : window.localStorage;
    const persistedData = storeage.getItem(storageName);
    //如果本地已经存在数据，就是将这个数据初始化到store变量上
    if (persistedData !== null) {
        try {
            store[name] = JSON.parse(persistedData);
        } catch (error) {
            store[name] = persistedData;
        }
    }

    autorun(() => {
        let data = store[name];
        if (typeof data !== 'undefined' && typeof data !== 'function' && data !== null) {
            if (typeof data !== 'string') data = JSON.stringify(data);
            storeage.setItem(storageName, data);
        } else {
            storeage.removeItem(storageName);
        }
    });
};
/**
 * @description 处理获取的结果，
 * 1.为了实现token自动刷新功能
 * 2.实现自动根据api/ResponseCode中的错误信息显示
 * @author Huang Li
 * @date 2018-06-22
 * @param {*} json 获取到的结果
 * @param {*} opts 操作
 * @returns 获取的数据
 */
const _handleData = (json, opts) => {
    opts.loading && Store.handleShowLoading && Store.handleShowLoading(false);
    if (!json || json.result === undefined) return {};
    switch (json.result) {
        //获取数据成功
        case '0':
            return json;
        //自动显示错误信息
        default: {
            console.log(`Requst is get Error,Code :${json.result}`);
            !opts.noErrorToast && Store.handleErrorCode && Store.handleErrorCode(json.result);
            return json;
        }
    }
};
