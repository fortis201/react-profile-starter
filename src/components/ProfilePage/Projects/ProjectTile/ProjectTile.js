import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProjectTile.scss';
import {Button, Row, Col} from 'react-materialize';

// projData below is a placeholder for data coming from 'this.props.data' which is being mapped to projectNodes. It can be named anything. 

// cut out the following.. replace when links are working: 
// <Button><a href={projData.projUrl}>Check it out!<a></Button>

class ProjectTile extends Component {

	componentDidUpdate() {

	}

  scrollToElement(e) {
    var elName = e.target.getAttribute('data-tag');
    var n = $('#' + elName);
    $("html, body").animate({scrollTop: $("#" + elName).offset().top}, 800, 'easeInExpo');
  }

	projectNodes() {
		return this.props.data.map((projData) => {
			return (
				<Col name={projData.projName} key={projData.id} s={12} m={4} l={4}>
					<img className={s.projectThumb} src={projData.projThumbnail} />
					<h1>{projData.projName}</h1>
					<p>{projData.projDescription}</p>
	    			
	    			<Row>
	    				<Col s={3} m={3} l={3}>
			    			<a href={projData.tAuthorLinkedIn}><img className={s.testmonialImg} src={projData.testimonialAuthorImg} /></a>
		    			</Col>
		    			<Col s={9} m={9} l={9}>
			    			<p className={s.testimonialText}>{'"' + projData.testimonial + '"'}</p>
			    			<p> - <a href={projData.tAuthorLinkedIn}>{projData.testimonialAuthor}</a> <br></br> {projData.tAuthorRole}</p>

		    			</Col>
	    			</Row>
				</Col>
			)
		})
	}

	render() {

		return (
			<Row className={s.container}>
				{this.projectNodes()}
			</Row>
		)
	}
}

export default withStyles(ProjectTile, s);