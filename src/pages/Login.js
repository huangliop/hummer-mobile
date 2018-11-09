import React, { Component } from 'react';
import styles from './Login.module.css';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';

const Login = inject('UIStore')(
    withRouter(
        observer(
            class Login extends Component {
                render() {
                    return (
                        <div className={styles.main}>
                            <h2>这是登录页</h2>
                            <h3>{this.props.UIStore.example}</h3>
                            <button onClick={this.handleClick}>点我修改</button>
                            <button onClick={this.handleBackClick}>返回首页</button>
                        </div>
                    );
                }
                handleClick = () => {
                    this.props.UIStore.setExample('你修改成功了');
                };
                handleBackClick = () => {
                    this.props.history.replace('/');
                };
            }
        )
    )
);

export default Login;
