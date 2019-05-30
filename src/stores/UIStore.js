import { observable, action } from 'mobx';
import ResponseCode from '../api/ResponseCode';
import Store from './Store';

/**
 * 保存token等信息和其他UI相关，但是与业务无关的状态。
 */
class UIStore extends Store {
    //是否展示loading图标
    @observable
    loading;

    /**
     * @description 需要展示的错误信息
     */
    @observable
    toastMsg;

    constructor() {
        super();
        //拿到所有请求的是否展示loading的回调
        Store.handleShowLoading = this.handleShowLoading.bind(this);
        //监控错误的回调
        Store.handleErrorCode = this.handleRequestError.bind(this);
    }
    @action
    setLoading(boolean) {
        this.loading = boolean;
    }
    @action
    setToastMsg(msg) {
        this.toastMsg = msg;
    }
    /**
     * @description loading图标的展示状态回调
     * @author Huang Li
     * @date 2019-05-30
     * @param {*} boolean ture=展示，false=不展示
     */
    handleShowLoading(boolean) {
        this.setLoading(boolean);
    }
    /**
     * @description 请求发送错误码的回调
     * @author Huang Li
     * @date 2019-05-30
     * @param {*} code 错误码
     */
    handleRequestError(code) {
        this.setToastMsg(ResponseCode.getMsg(code));
    }
}
export default UIStore;
