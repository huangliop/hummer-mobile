/**
 *
 */
import { reaction } from 'mobx';

/**
 * @description 用于将需要的数据保存到本地存储如，LocalStorage
 * @author Huang Li
 * @date 2018-06-22
 * @class PersistData
 */
class PersistData {
    /**
     * @description 设置对某个Store下的某个字段进行监听，如果该字段有变化就存储到LocalStorage
     * 注:尽量不要使用Object对象来进行持久化，因为对象中的某个值改变不会触发反应函数。
     * 如果必须使用对象，那请使用深拷贝对对象赋值
     * @author Huang Li
     * @date 2018-06-22
     * @param {*} name 需要存储的字段名称
     * @param {*} store 字段所在的Store的名称
     * @param {*} session 是否用session保存
     */
    set(name, store, session) {
        reaction(
            () => store[name],
            data => {
                const storeage = session ? window.sessionStorage : window.localStorage;
                if (typeof data !== 'undefined') {
                    storeage.setItem(`${store.constructor.name}_${name}`, data);
                } else {
                    window.localStorage.removeItem(`${store.constructor.name}_${name}`, data);
                }
            }
        );
    }
    /**
     * @description 获取转换被存储的字段，如果能转换为对象，则会自动转换为对象
     * @author Huang Li
     * @date 2018-06-22
     * @param {*} name 字段名
     * @param {*} store Store名
     * @param {*} session 是否用session保存
     * @returns 读取到的数据
     */
    get(name, store, session) {
        const storeage = session ? window.sessionStorage : window.localStorage;
        const str = storeage.getItem(`${store.constructor.name}_${name}`);
        return str;
    }
}
export default PersistData;
