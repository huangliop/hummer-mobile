import React, { Component } from 'react';
import styles from './index.css';
import PropTypes from 'prop-types';
import Header from '../Header';
import { withRouter } from 'react-router';

/**
 * 基础页面，所有二级页面都应该用这个页面包裹
 */
@withRouter
class BasePage extends Component {
  render() {
    let header = this.props.hasHeader ? (
      <Header
        onLeftClick={this.props.history.goBack}
        title={this.props.title}
        rightContent={this.props.headerRightContent}
      />
    ) : (
      ''
    );
    return (
      <div className={styles.basePage}>
        {header}
        {this.props.children}
      </div>
    );
  }
}
BasePage.defaultProps = {
  hasHeader: true
};
BasePage.propTypes = {
  /**
   * 是否显示顶部栏，默认true
   */
  hasHeader: PropTypes.bool,
  /**
   * 在顶部栏中显示的标题
   */
  title: PropTypes.string,
  /**
   * 右边的内容
   */
  headerRightContent: PropTypes.node
};
export default BasePage;
