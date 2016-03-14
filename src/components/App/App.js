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
          "projDescription": "A disruptive peer-to-peer advertising platform",
          "testimonialAuthorImg": "slProfile.jpg",
          "testimonialAuthor": "Shain Lafazan",
          "tAuthorRole": "CTO at Forte",
          "testimonial": "J.V. can quickly learn and effectively implement technologies that are new to him.",
          "tAuthorLinkedIn": "https://www.linkedin.com/in/shainlafazan"
        },
        {
          "id": 102,
          "projName": "Figma & Comics E-shop",
          "projUrl": "https://github.com/fortis201/codingdojo_LAMP_ecommerce",
          "projThumbnail": "jns-figma-screenie.png",
          "projDescription": "Mock online store for anime, comic book, and figma collectors!",
          "testimonialAuthorImg": "sphProfile.jpg",
          "testimonialAuthor": "Sonia Hashim",
          "tAuthorRole": "CS Student at Princeton",
          "testimonial": "J.V. is a professional, courteous, effective and efficient programmer who is great to work with!",
          "tAuthorLinkedIn": "https://www.linkedin.com/in/soniahashim"
        },
        {
          "id": 103,
          "projName": "Dollar Bank Club",
          "projUrl": "https://github.com/fortis201/LaunchHackathon2016TeamProject",
          "projThumbnail": "dbc-screenie.png",
          "projDescription": "Accept payments as a business without the need for a bank account.",
          "testimonialAuthorImg": "ct_Profile.png",
          "testimonialAuthor": "Chris Tran",
          "tAuthorRole": "Web Developer at 100% Pure",
          "testimonial": "J.V. would definitely be a crucial asset to any engineering team.",
          "tAuthorLinkedIn": "https://www.linkedin.com/in/ntchristopher"
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
    // console.log("App is about to be UNMOUTNED!");
    this.removeCss();
  }

  loadChildrenWithProps () {
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
