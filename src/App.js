import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styles from './App.module.css';
import { Provider } from 'mobx-react';
import rootStore from './stores/RootStore';
import loadable from 'react-loadable';
import Loader from 'react-loader-spinner';
// import { AnimatedSwitch } from 'react-router-transition';

// configure({
//     enforceActions: true
// });
//加载新页面的过度loader
const MyLoadingComponent = ({ isLoading, error }) => {
    if (isLoading) {
        return (
            <div className={styles.loaderContainer}>
                {' '}
                <Loader type="Watch" color="#03a9f4" height="50" width="50" />{' '}
            </div>
        );
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
                <Router>
                    {/* <AnimatedSwitch
                            className={styles.switchWrapper}
                            atEnter={{ opacity: 0 }}
                            atLeave={{ opacity: 0 }}
                            atActive={{ opacity: 1 }}> */}
                    <div>
                        <Route path="/" exact component={pageLoader(import('./pages/Home'))} />
                        <Route
                            path="/login"
                            exact
                            component={loadable({ loader: () => import('./pages/Login'), loading: MyLoadingComponent })}
                        />
                    </div>
                    {/* </AnimatedSwitch> */}
                </Router>
            </Provider>
        );
    }
}
