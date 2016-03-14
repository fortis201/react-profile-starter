import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Profile.scss';
import {Button, Card, Row, Col} from 'react-materialize';

class Profile extends Component {

  constructor() {
    super();
    this.state = {

    }
  }

  componentDidUpdate() {
    // console.log(" ~ ~ ~ In Profile Component! PROPS are: ~ ~ ~");
    // console.log(this.props);
  }

  render() {
    return (
      <div className={s.root} id="profile">
        <div className={s.container}>
        	<h1 className={s.heading}>About Me</h1>
          <Row>
            <Col s={12} m={6} l={4} className={s.photoContainer}>
              <img className={s.profileImg} src="jv.jpg" alt='profile photo'/>
            </Col>

            <Col s={12} m={6} l={8} className={s.profileTextContainer}>
              <h5 className={s.subheading}>One simply does not learn something once without improving.</h5>

              <p>
                <span className={s.bold}>With new technologies come new problems along with different perspectives on past issues. How do you pick one to focus on?</span>
              </p>
              <br></br>
              <p> 
                I&#39;m a full stack web and mobile developer currently focusing on Node.js-based applications and I often ask myself this question when thinking about my next personal project. The answer doesn&#39;t always come right away, but it&#39;s definitely one of the many things I search for everyday. 
              </p>
              <br></br>
              <p>
                I recently worked with a small team of engineers to completely redesign and rebuild a peer-to-peer advertising platform at Spot Knoker. I&#39;m currently looking for more contract and/or full-time work to build up my professional experience and learn as much as I can in the technology field.
              </p>

            </Col>
          </Row>
        </div>
      </div>
    );
  }

}

export default withStyles(Profile, s);