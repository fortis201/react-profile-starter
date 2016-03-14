/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.scss';
import Link from '../Link';

class Navigation extends Component {

  static propTypes = {
    className: PropTypes.string,
  };

  scrollToElement(e) {
    // console.log("scrolling to target:");
    // console.log(e.target);
    var elName = e.target.getAttribute('data-tag');
    // console.log("elName is: ");
    // console.log(elName);
    var n = $('#' + elName);
    // console.log("n is: ");
    // console.log(n);
    // console.log("n.offset() returns: ");
    // console.log(n);

    $("html, body").animate({scrollTop: $("#" + elName).offset().top}, 800, 'easeInExpo');
  }

  render() {
    return (
      <div className={cx(s.root, this.props.className)} role="navigation">
        <a className={s.link} onClick={this.scrollToElement} data-tag="profile">Profile</a>
        <span className={s.spacer}> | </span>
        <a className={s.link} onClick={this.scrollToElement} data-tag="projects">Projects</a>
        <span className={s.spacer}> | </span>        
        <a className={s.link} onClick={this.scrollToElement} data-tag="contact">Contact</a>
      </div>
    );
  }

}
        // <Link className={cx(s.link, s.highlight)} to="/register">Sign up</Link>

export default withStyles(Navigation, s);
