import { observable, decorate, action } from 'mobx';
import PersistData from './PersistData';

/**
 * 保存token等信息和其他UI相关，但是与业务无关的状态。
 */
class UIStore {
    token;
    example = '这是UIStore里面的测试值数据，可以删除';
    constructor(rootStore) {
        this.rootStore = rootStore;
        PersistData.set('example', this);
    }

    setToken(token) {
        this.token = token;
    }
    setExample(str) {
        this.example = str;
    }
}
decorate(UIStore, {
    token: observable,
    example: observable,
    setToken: action,
    setExample: action
});
export default UIStore;
