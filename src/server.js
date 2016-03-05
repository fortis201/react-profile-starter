/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import 'babel-polyfill';
import fs from 'fs';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Router from './routes';
import Html from './components/Html';
import assets from './assets';
import { port } from './config';
import nodemailer from 'nodemailer';

const server = global.server = express();

//
// nodemailer
//
 
// create reusable transporter object using the default SMTP transport 
const transporter = nodemailer.createTransport('smtps://fortis201%40gmail.com:pass@smtp.gmail.com');
 
// setup e-mail data with unicode symbols 
// var mailOptions = {
//     from: '"Fred Foo 👥" <foo@blurdybloop.com>', // sender address 
//     to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers 
//     subject: 'Hello ✔', // Subject line 
//     text: 'Hello world 🐴', // plaintext body 
//     html: '<b>Hello world 🐴</b>' // html body 
// };
 
// send mail with defined transport object 
// transporter.sendMail(mailOptions, function(error, info){
//     if(error){
//         return console.log(error);
//     }
//     console.log('Message sent: ' + info.response);
// });
// /nodemailer

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
server.use(express.static(path.join(__dirname, 'public')));

//
// Register API middleware
// -----------------------------------------------------------------------------
server.use('/api/content', require('./api/content').default);

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));
var PROJECTS_FILE = path.join(__dirname, './content/myProjects.json');

server.post('/callToAction', function (req, res) {
  console.log("Pinged server! received the following:");
  console.log(req.body);

  // TODO: 
  // * Create a new gmail account to test this
  // * for reference, look at: http://stackoverflow.com/questions/19877246/nodemailer-with-gmail-and-nodejs
  // point my domain to the ec2 instance

  // setup e-mail data with unicode symbols 
  var mailOptions = {
    from: req.body.email,
    to: 'fortis201@gmail.com',
    subject: 'JVPrime - Email From Portfolio',
    text: req.body.message,
    // html: '<b>Hello world 🐴</b>' // html body 
  };
 
  // send mail with defined transport object 
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          return console.log(error);
      }
      console.log('Message sent: ' + info.response);
  });
  res.json({msg: "response from server after attempting to send email..."})
})

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
server.get('*', async (req, res, next) => {
  try {
    let statusCode = 200;
    const data = { title: '', description: '', css: '', body: '', entry: assets.main.js };
    const css = [];
    const context = {
      insertCss: styles => css.push(styles._getCss()),
      onSetTitle: value => data.title = value,
      onSetMeta: (key, value) => data[key] = value,
      onPageNotFound: () => statusCode = 404,
    };

    await Router.dispatch({ path: req.path, query: req.query, context }, (state, component) => {
      data.body = ReactDOM.renderToString(component);
      data.css = css.join('');
    });

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(statusCode).send(`<!doctype html>\n${html}`);
  } catch (err) {
    next(err);
  }
});

//
// Launch the server
// -----------------------------------------------------------------------------
server.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`The server is running at http://localhost:${port}/`);
});
