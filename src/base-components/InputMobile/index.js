import React, { Component } from 'react';
import styles from './index.css';
import PropTypes from 'prop-types';
import closeIcon from './close-circled.png';
/**
 * 电话号码输入组件
 * 可以被其他应用复用，所以放在Base-Compoents下
 */
class InputMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showClose: props.mobile && !this.props.disabled ? true : false
    };
  }

  render() {
    const { className, disabled, defaultValue } = this.props;
    let { mobile } = this.props;
    mobile = mobile || '';
    return (
      <div className={`${className || ''} ${styles.inputItem}`}>
        <span>手机号</span>
        <input
          placeholder="手机号码"
          defaultValue={defaultValue}
          disabled={disabled}
          value={mobile}
          maxLength={11}
          ref={this.inputRef}
          onChange={this.handleChange}
        />
        {this.state.showClose && (
          <img src={closeIcon} alt="Close" onClick={this.handleClick} />
        )}
      </div>
    );
  }
  handleChange = e => {
    const val = e.target.value;
    //正则检测，只能输入数字
    const checker = /^\d{0,11}$/;
    if (!checker.test(val)) return;
    if (val) {
      this.setState({ showClose: true });
    } else {
      this.setState({ showClose: false });
    }
    this.props.onChange(e);
  };
  handleClick = e => {
    this.input.value = '';
    //触发Change事件
    this.handleChange({ target: this.input });
  };
  inputRef = input => {
    this.input = input;
  };
}
InputMobile.propTypes = {
  disabled: PropTypes.bool,
  mobile: PropTypes.string,
  onChange: PropTypes.func,
  /**
   * 样式
   */
  className: PropTypes.string
};
export default InputMobile;
