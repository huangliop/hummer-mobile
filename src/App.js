import React, { Component } from 'react';
import styles from './App.css';
import Async from 'react-code-splitting';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import rootStore from './stores/RootStore';
import { AnimatedSwitch } from 'react-router-transition';

useStrict(true);
/**
 * 如果要移除切换动画，请删除组件 AnimatedSwitch
 */
class App extends Component {
  render() {
    return (
      <Provider {...rootStore}>
        <Router>
          <AnimatedSwitch
            className={styles.switchWrapper}
            atEnter={{ opacity: 0 }}
            atLeave={{ opacity: 0 }}
            atActive={{ opacity: 1 }}
          >
            <Route
              path="/"
              exact
              component={() => <Async load={import('./pages/Home')} />}
            />
            <Route
              path="/login"
              exact
              component={() => <Async load={import('./pages/Login')} />}
            />
          </AnimatedSwitch>
        </Router>
      </Provider>
    );
  }
}

export default App;
