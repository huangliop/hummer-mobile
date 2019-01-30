import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styles from './App.module.css';
import { Provider } from 'mobx-react';
import rootStore from './stores/RootStore';
import loadable from 'react-loadable';
//加载新页面的过度loader
const MyLoadingComponent = ({ isLoading, error }) => {
    if (isLoading) {
        return <div className={styles.loaderContainer}>请自己添加loading</div>;
    } else if (error) {
        return <div>加载页面出错，请刷新</div>;
    } else {
        return null;
    }
};
// 页面导入组件
const pageLoader = importFuction => {
    return loadable({ loader: () => importFuction, loading: MyLoadingComponent });
};
/**
 * 如果要移除切换动画，请删除组件 AnimatedSwitch
 */
export default class App extends Component {
    render() {
        return (
            <Provider {...rootStore}>
                <Router basename={process.env.PUBLIC_URL}>
                    <div>
                        <Route path="/" exact component={pageLoader(import('./pages/Home'))} />
                        <Route path="/login" exact component={pageLoader(import('./pages/Login'))} />
                    </div>
                </Router>
            </Provider>
        );
    }
}
