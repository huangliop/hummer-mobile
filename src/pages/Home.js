import React, { Component } from 'react';
import styles from './Home.css';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div className={styles.main}>
        <h1> 这是首页</h1>
        <p />
        <Link to="/login">
          <div>登录</div>
        </Link>
      </div>
    );
  }
}

export default Home;
