/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component, PropTypes } from 'react';
import emptyFunction from 'fbjs/lib/emptyFunction';
import s from './App.scss';
import Header from '../Header';
import Footer from '../Footer';
import {Row, Col} from 'react-materialize';

// const title = 'J.V. Estolas';

class App extends Component {

  static propTypes = {
    context: PropTypes.shape({
      insertCss: PropTypes.func,
      onSetTitle: PropTypes.func,
      onSetMeta: PropTypes.func,
      onPageNotFound: PropTypes.func,
    }),
    children: PropTypes.element.isRequired,
    error: PropTypes.object,
  };

  static childContextTypes = {
    insertCss: PropTypes.func.isRequired,
    onSetTitle: PropTypes.func.isRequired,
    onSetMeta: PropTypes.func.isRequired,
    onPageNotFound: PropTypes.func.isRequired,
  };

  getChildContext() {
    const context = this.props.context;
    return {
      insertCss: context.insertCss || emptyFunction,
      onSetTitle: context.onSetTitle || emptyFunction,
      onSetMeta: context.onSetMeta || emptyFunction,
      onPageNotFound: context.onPageNotFound || emptyFunction,
    };
  }

  constructor() {
    super();
    this.state = {
      myProjects: [
        {
          "id": 101,
          "projName": "SpotKnocker",
          "projUrl": "http://www.spotknocker.com/",
          "projThumbnail": "spotknocker-screenie.png",
          "projDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sollicitudin sagittis augue, ac pharetra enim convallis ac. Donec cursus libero tortor, eget pretium elit aliquet ut.",
          "testimonialAuthorImg": "http://stanlemmens.nl/wp/wp-content/uploads/2014/07/bill-gates-wealthiest-person.jpg",
          "testimonialAuthor": "Author Name",
          "tAuthorRole": "It works",
          "testimonial": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
          "id": 102,
          "projName": "Figma & Comics E-shop",
          "projUrl": "https://github.com/fortis201/codingdojo_LAMP_ecommerce",
          "projThumbnail": "jns-figma-screenie.png",
          "projDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sollicitudin sagittis augue, ac pharetra enim convallis ac. Donec cursus libero tortor, eget pretium elit aliquet ut.",
          "testimonialAuthorImg": "http://stanlemmens.nl/wp/wp-content/uploads/2014/07/bill-gates-wealthiest-person.jpg",
          "testimonialAuthor": "Author Name",
          "tAuthorRole": "It works",
          "testimonial": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
          "id": 103,
          "projName": "Dollar Bank Club",
          "projUrl": "https://github.com/fortis201/LaunchHackathon2016TeamProject",
          "projThumbnail": "dbc-screenie.png",
          "projDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sollicitudin sagittis augue, ac pharetra enim convallis ac. Donec cursus libero tortor, eget pretium elit aliquet ut.",
          "testimonialAuthorImg": "http://stanlemmens.nl/wp/wp-content/uploads/2014/07/bill-gates-wealthiest-person.jpg",
          "testimonialAuthor": "Author Name",
          "tAuthorRole": "It works",
          "testimonial": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        }
      ],
    }
  }

  componentWillMount() {
    this.removeCss = this.props.context.insertCss(s);
  }

  componentDidMount() {
    // this.setState({
    //   myProjects: []
    // })
    // console.log("App succesfully mounted.. state has updated..?");
    // console.log(this.state);
  }

  componentDidUpdate() {
    // console.log("App has updated! State looks like:");
    // console.log(this.state);
  }

  componentWillUnmount() {
    console.log("App is about to be UNMOUTNED!");
    this.removeCss();
  }

  loadChildrenWithProps () {
    console.log("in function loadChildrenWithAppProps from App, the mother of all!");
    var childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement (child, 
      { 
        myProjects: this.state.myProjects,
      })
    )
    return childrenWithProps
  }

  render() {
    return !this.props.error ? (
      <div>
        <Header myProjects={this.state.myProjects} />
        {this.loadChildrenWithProps()}
        <Footer />
      </div>
    ) : <div>{this.props.children}</div>;
  }

}

export default App;
