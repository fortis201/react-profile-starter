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
import xoauth2 from 'xoauth2';

// ===========================
// xoauth2 getting tokens and other auth info:
// ===========================

// xoauth2.getToken( (e) => {
//   console.log("Attempted to acquire token for xoauth2. Result is: ");
//   consoel.log(e);
// })

// TODO: 
// create new gmail account to test nodemailer and auth

// const xoauth2Tokens = xoauth2.createXOAuth2Generator({
//   user: 'jvprime201@gmail.com',
//   clientId: '408446552338-4i882hkm1nflajvma74sfgrgq8j6bmag.apps.googleusercontent.com',
//   clientSecret: 'LWThtkfyt46ZtNV7G-j1ELcx',
//   refreshToken: '1/dvW7LtgJ8javUynv1Q1Y3uHyOp-EiSHQMKvVgDKmbgs', 
// })

const server = global.server = express();

//
// nodemailer
//
 
// create reusable transporter object using the default SMTP transport 
// const transporter = nodemailer.createTransport('smtps://fortis201%40gmail.com:pass@smtp.gmail.com');

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
  console.log("# # # # # # # Pinged server! received the following: # # # # # # #");
  console.log(req.body);

  // ===========================
  // TODO: 
  // * Create a new gmail account to test this
  // * for reference, look at: http://stackoverflow.com/questions/19877246/nodemailer-with-gmail-and-nodejs
  // * point my domain to the ec2 instance
  // ===========================

  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      xoauth2: xoauth2.createXOAuth2Generator({
        user: 'jvprime201@gmail.com',
        clientId: '408446552338-4i882hkm1nflajvma74sfgrgq8j6bmag.apps.googleusercontent.com',
        clientSecret: 'LWThtkfyt46ZtNV7G-j1ELcx',
        refreshToken: '1/xi4JuOHJqBfQ9PrgY4Bmg0BixnPzWqUZ2YJ_IAVv3r0'
      }, function (e) {
        console.log("attempted to authorize using xoauth2. response:");
        console.log(e);
      })
    }
  })

  // setup e-mail data with unicode symbols 
  var mailOptions = {
    from: req.body.email,
    to: 'jvprime201@gmail.com', 
    envelope: {
      from: '"' + req.body.name + '" ' + req.body.email,
      to: 'jvprime201@gmail.com'
    },
    subject: 'JVPrime - Email From: ' + req.body.name,
    text: req.body.message,
    // html: '<b>Hello world 🐴</b>' // html body 
  };
 
  // send mail with defined transport object 
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
        console.log("error...");
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
