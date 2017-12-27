import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

class CheckBox extends Component {
  render() {
    const { onChange, inputRef } = this.props;
    return (
      <div className={styles.cb}>
        <input
          type="checkbox"
          value="0"
          id="checkbox"
          style={{ display: 'none' }}
          onChange={onChange}
          ref={inputRef}
        />
        <label htmlFor="checkbox" />
      </div>
    );
  }
}

CheckBox.propTypes = {
  onChange: PropTypes.func,
  inputRef: PropTypes.func
};

export default CheckBox;
