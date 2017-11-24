import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './index.css';
import backIcon from './back.png';
/**
 * 顶部栏
 */
class Header extends Component { 
    render() {
        const {title,onLeftClick,rightContent}=this.props;
        return (
            <div className={styles.header}>
                <div className={styles.leftContent} onClick={onLeftClick}> 
                    <img  src={backIcon} alt='' />
                 </div>
                <span className={styles.title} >{title}</span>
                <div className={styles.rightContent} >{rightContent}</div>
            </div>
        );
    }
}
Header.propTypes = { 
    /**
     * Header中间的标题
     */
    title:PropTypes.string.isRequired,
    /**
     * 返回箭头的事件
     */
    onLeftClick:PropTypes.func,
    /**
     * 右边的内容区域
     */
    rightContent:PropTypes.node
};
export default Header;