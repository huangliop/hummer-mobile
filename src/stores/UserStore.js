import { observable, action } from 'mobx';
import ApiUrls from '../transport-layer/ApiUrl';
/**
 * 用户登录  示例代码，可以删除
 */
class UserStore {
    constructor(rootStore, persistData) {
        this.rootStore = rootStore;
        this.persistData = persistData;
        /**
         * 需要存储到LocalStorage里面的数据，配置并初始化
         */
        this.persistData.set('nickName', this);
        this.persistData.set('mobile', this);
    }
    @observable mobile = this.persistData.get('mobile', this);
    @observable nickName = this.persistData.get('nickName', this);

    @action
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
export default UserStore;
