import Agent from '../transport-layer/Agent';
import PersistData from './PersistData';
import ResponseCode from '../transport-layer/ResponseCode';

import UserStore from './UserStore';
import UIStore from './UIStore';

class RootStore {
  constructor() {
    this.agent = new Agent();
    const persistData = new PersistData();
    this.userStore = new UserStore(this, persistData);
    this.UIStore = new UIStore(this, persistData);
  }
  /**
   * 发送POST请求
   * @param {*请求地址} url
   * @param {*参数} params
   * @param {*不显示loading图像} noLoading
   */
  sendPost(url, _params, noLoading) {
    const params = this._buildParams(_params);
    return this.agent
      .post(url, params, noLoading)

      .then(json => this._handleData(json, url, params));
  }
  /**
   * 发生GET请求
   * @param {*请求地址} url
   * @param {*参数} params
   * @param {*不显示loading图像} noLoading
   */
  sendGet(url, _params, noLoading) {
    const params = this._buildParams(_params);
    return this.agent
      .get(url, params, noLoading)
      .then(json => this._handleData(json, url, params));
  }
  /**
   * 显示提示信息，默认3秒
   * @param {*提示内容} msg
   */
  showToast(msg) {
    this.agent.showToast(msg);
  }
  /**
   * 显示加载框，期间不可操作
   * @param {*下面显示的提示内容，默认‘加载中’} msg
   */
  showLoading(msg) {
    this.agent.showLoading(msg);
  }
  hideLoading() {
    this.agent.hideLoading();
  }
  /**
   * 构建参数
   * @param {*参数} par
   */
  _buildParams(par) {
    const params = { ...par };
    //某些接口希望不传token，就需要删除token字段，默认都带token
    if (params.noToken) {
      delete params.noToken;
      delete params.token;
    } else {
      /*如果没有this.UIStore.token就不代token，
            如果有params.token就不将this.UIStore.token覆盖它，
            如果有this.UIStore.token而没有params.token，就将this.UIStore.token付个params.token
            */
      this.UIStore.token &&
        (params.token = params.token ? params.token : this.UIStore.token);
    }
    return params;
  }
  /**
   * 处理获取的结果（主要是为了实现token自动刷新功能）
   * @param {*获取到的结果} json
   */
  _handleData(json, url, params) {
    if (!json || !json.result) return {};
    switch (json.result) {
      //这里可以根据接口实际情况修改
      case '0':
        return json;
      /**
       * 如果需要自动刷新token 请在这里写
       */
      // case '-1':
      // return this.UIStore.refreshToken(url,params);
      default:
        console.log(`Requst is get Error,Code :${json.result}`);
        const msg = ResponseCode.showMsg(json.result);
        msg && this.showToast(msg);
        return json;
    }
  }
}
export default new RootStore();
