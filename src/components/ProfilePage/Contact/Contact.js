import React, { Component, PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Contact.scss';
import {Button, Modal, Row, Input, Icon, Toast} from 'react-materialize';


class Contact extends Component {

	constructor() {
		super();
		this.state = {
			sName: null,
			sEmail: null,
			sPhone: null,
			sWebsite: null,
			sMessage: null,			
		}
	}

	componentDidUpdate() {
		// console.log("Contact component has been udpated... States: ");
		// console.log(this.state);
	}


  	handleInputChange(e) {
	    // console.log("clicked handleInputChange");
	    var inputField = e.target.getAttribute("data-tag");
	    var iValue = $("#" + inputField).val();

	    switch (inputField) {
	      case "name":
	        // console.log("name field value:");
	        // console.log(iValue);
	        this.setState({
	        	sName: iValue,
	        });
	        break;
	      case "email":
	        // console.log("email field value:");
	        // console.log(iValue);
	        this.setState({
	        	sEmail: iValue,
	        });
	        break;
	      case "phone":
	        // console.log("phone field value:");
	        // console.log(iValue);
	        this.setState({
	        	sPhone: iValue,
	        });
	        break;
	      case "website":
	        // console.log("website field value:");
	        // console.log(iValue);
	        this.setState({
	        	sWebsite: iValue,
	        });
	        break;
	      case "message":
	        // console.log("message field value:");
	        // console.log(iValue);
	        this.setState({
	        	sMessage: iValue,
	        });
	        break;
	      default: 
	        console.log("I cannot understand what you just typed");
	        break;
	    }
	}

	handleSubmit() {
		// console.log("clicked Submit, sending the following");
		// console.log(this.state);
		$.ajax({
			type: "POST",
			dataType: "json",
			url: "/callToAction",
			data: {
				name: this.state.sName,
				email: this.state.sEmail,
				phone: this.state.sPhone,
				website: this.state.sWebsite,
				message: this.state.sMessage,
			},
			success: (e) => {
				this.setState({
					sName: null,
					sEmail: null,
					sPhone: null,
					sWebsite: null,
					sMessage: null,			
				})
				$('#message').val('');
				alert("Message Sent!");
			}
		})
	}

	render() {
    return (
		<div className={s.root} id="contact">
		    <div className={s.container}>
				<h1 className={s.heading}>Want to work together?</h1>
				<h2 className={s.tagline}>I build your dreams in code.</h2>

				<Modal
				  header="Thanks for coming this far! I'll get back to you as soon as I am able."
				  trigger={
				    <Button waves='light'>Get Started</Button>
				}>
				  
				  
				<p className={s.explanation}>What are you looking for and how can I help? I build websites and mobile apps, front-to-back.</p>
				<Row>
					<Input value={this.state.sName} s={6} id="name" type="text" label="Name" data-tag="name" onChange={this.handleInputChange.bind(this)}><Icon>account_circle</Icon></Input>
					<Input value={this.state.sEmail} s={6} id="email" type="email" label="Email Address" data-tag="email" onChange={this.handleInputChange.bind(this)}><Icon>email</Icon></Input>
					<Input value={this.state.sPhone} s={6} id="phone" type="number"label="Phone number" data-tag="phone" onChange={this.handleInputChange.bind(this)}><Icon>phone</Icon></Input>
					<Input value={this.state.sWebsite} s={6} id="website" type="url" label="Website" data-tag="website" onChange={this.handleInputChange.bind(this)}><Icon>website</Icon></Input>

					<label>Textarea</label>
					<textarea id="message" className={s.txtarea1} data-tag="message" className='materialize-textarea' length="120" onChange={this.handleInputChange.bind(this)}
						placeholder='Tell me about your project idea: &#13;&#10;
							1) What is it about? &#13;&#10;
							2) How can I help? &#13;&#10;
							3) What is your timeline? &#13;&#10;
							4) What is your budget?'
					>
					</textarea>
				<Button onClick={this.handleSubmit.bind(this)}>Send Message</Button>
				</Row>
				</Modal>
			</div>
		</div>
		);
	}
  

}

export default withStyles(Contact, s);
