import { observable, action, decorate } from 'mobx';
import ApiUrls from '../api/ApiUrl';
import PersistData from './PersistData';
/**
 * 用户登录  示例代码，可以删除
 */
class UserStore {
    mobile;
    nickName;
    constructor(rootStore) {
        this.rootStore = rootStore;
        // 添加需要持久化的监听
        PersistData.set('nickName', this);
        // 持久化到SeesionStorage，不传最后一个参数
        PersistData.set('mobile', this, true);
        //从持久层初始化数据
        this.mobile = PersistData.get('mobile', this);
    }

    setMobile(mobile) {
        this.mobile = mobile;
    }

    /**
     * @description 登陆
     * @author Huang Li
     * @date 2018-06-22
     * @param {*} password 密码
     * @returns Promise
     */
    login(password) {
        if (!this.mobile || !password) {
            this.rootStore.showToast('用户名或密码不能为空');
            return;
        }
        if (this.mobile.length !== 11) {
            this.rootStore.showToast('电话号码格式不正确');
            return;
        }
        return this.rootStore.sendGet(ApiUrls.LOGIN).then(json => {
            if (!json.data) return;
            console.log('Login Success');
        });
    }
}
decorate(UserStore, {
    mobile: observable,
    nickName: observable,
    setMobile: action
});
export default UserStore;
