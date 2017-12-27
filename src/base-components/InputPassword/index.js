import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import closeIcon from './close-circled.png';

/**
 * 密码输入组件
 * 可以被其他应用复用，所以放在Base-Compoents下
 */
class InputPassword extends Component {
  constructor(props) {
    super(props);
    this.state = { showClose: false, pwd: '' };
  }
  render() {
    const placeholder = this.props.placeholder || '密码';
    const { inputRef, className } = this.props;
    const lable = this.props.lable || '密码';
    return (
      <form className={`${className || ''} ${styles.inputItem}`}>
        <span>{lable}</span>
        <input
          autoComplete="off"
          placeholder={placeholder}
          value={this.state.pwd}
          type="password"
          ref={inputRef}
          maxLength={16}
          onChange={this.handleChange}
        />
        {this.state.showClose && (
          <img src={closeIcon} alt="Close" onClick={this.handleClick} />
        )}
      </form>
    );
  }
  handleChange = e => {
    if (e.target.value) {
      this.setState({ showClose: true, pwd: e.target.value });
    } else {
      this.setState({ showClose: false, pwd: '' });
    }
  };
  handleClick = e => {
    this.setState({ showClose: false, pwd: '' });
  };
}

InputPassword.propTypes = {
  /**
   * 让外部组件拿到input 的DOM节点
   */
  inputRef: PropTypes.func,
  /**
   * placeholder,默认“密码”
   */
  placeholder: PropTypes.string,
  /**
   * 样式
   */
  className: PropTypes.string,
  /**
   * 密码lable
   */
  lable: PropTypes.string
};

export default InputPassword;
