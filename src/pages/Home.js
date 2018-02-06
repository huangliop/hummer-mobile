import React, { Component } from 'react';
import styles from './Home.css';
import { Link } from 'react-router-dom';
import { Button } from 'antd-mobile';

class Home extends Component {
  render() {
    return (
      <div className={styles.main}>
        <h1> 这是首页</h1>
        <p />
        <Link to="/login">
          <div>登录</div>
        </Link>
        <Button type="primary">Antd-mobile 按钮</Button>
      </div>
    );
  }
}

export default Home;
