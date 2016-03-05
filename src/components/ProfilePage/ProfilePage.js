
import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProfilePage.scss';
import Splash from './Splash';
import Profile from './Profile';
import Projects from './Projects';
import Contact from './Contact';
import {Parallax, Background} from 'react-parallax';


const title = 'J.V. Estolas';

class ProfilePage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.state={
    }
  }

  componentWillMount() {
    this.context.onSetTitle(title);
  }

  componentDidUdpate() {

  }

  render() {

    return (
      <div className={s.root}>
        <div className={s.container}>
          <Parallax strength={300} className={s.parallax} bgImage={"dummy_bg_0.jpg"}>
            <Splash />
          </Parallax>
          <Profile myProjects={this.props.myProjects} />
          <Projects data={this.props.myProjects} />
          <Contact />

        </div>
      </div>
    );
  }

}

export default withStyles(ProfilePage, s);
