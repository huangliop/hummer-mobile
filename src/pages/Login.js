import React, { Component } from 'react';
import styles from './Login.css';
import BasePage from '../base-components/BasePage';

class Login extends Component {
  render() {
    return (
      <BasePage title="登录">
        <div className={styles.main}>
          <h2>这是登录页</h2>
        </div>
      </BasePage>
    );
  }
}

export default Login;
