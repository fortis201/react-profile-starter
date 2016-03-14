import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Projects.scss';
import {Row, Col} from 'react-materialize';
import ProjectTile from './ProjectTile';

class Projects extends Component {
	constructor() {
		super();
		this.state = {data: []}
	}
	
    render() {
	    return (	
	    	<div className={s.container} id="projects">
				<Row>
					<Col s={12} m={4} l={4} className="offset-l4">
						<h1>My Projects</h1>	        	
					</Col>
				</Row>
				<Row>
				    <ProjectTile data={this.props.data} />
			    </Row>
			    <Row>
				    <h6 className={s.center}>You can find more of the projects I&#39;ve worked on via my <a href="https://github.com/fortis201">Github profile</a></h6>
			    </Row>
	    	</div>
	    );
	};
}

export default withStyles(Projects, s);
