import { observable, action, decorate } from 'mobx';
import ApiUrls from '../api/ApiUrl';
import Store from './Store';
/**
 * 用户登录  示例代码，可以删除
 */
class UserStore extends Store {
    token = 2;
    constructor() {
        super();
        super.persistParam('token');
        Store.commonRequestData = { token: this.token };
        this.sendGet('/log', {}, { loading: true }).then(json => {
            console.log(json);
        });
    }
}
export default UserStore;
