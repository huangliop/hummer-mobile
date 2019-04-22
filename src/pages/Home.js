import React, { Component, useState, useEffect } from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';

function Example() {
    const [count, setCount] = useState(0);
    useEffect(() => {
        window.document.title = count;
        return () => {
            console.log('diss');
        };
    });
    return (
        <div>
            <p>你点了{count}下了</p>
            <button onClick={() => setCount(count + 1)}>点我</button>
        </div>
    );
}

class Home extends Component {
    render() {
        return (
            <div className={styles.main}>
                <h1> 这是首页</h1>
                <p />
                <Link to="/login">
                    <div>登录</div>
                </Link>
                <Example />
            </div>
        );
    }
}

export default Home;
