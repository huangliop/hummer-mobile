import UserStore from './UserStore';
import UIStore from './UIStore';

class RootStore {
    constructor() {
        this.UIStore = new UIStore();
        this.userStore = new UserStore();
    }
}
export default new RootStore();
