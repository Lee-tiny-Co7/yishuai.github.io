/* @flow */

import React, { Component } from 'react';

import GoogleLoginLink from '../shared/GoogleLoginLink'

import './SignUp.css';

class SignUp extends Component {
  render() {
    return (
      <div id="main">
        <div id="sign-up-container">
          <h1 className="static-header">sign&middot;up</h1>
          <hr/>
          <p>
            Sign up with your Gmail account! Weeknotes won't share your email, spam you or your contacts, or otherwise do dirtbag things with your email. Promise!
          </p>
          <p className="googleLogin">
            <GoogleLoginLink to="/">Sign up with Google</GoogleLoginLink>
          </p>
          <p>
            But do note that <strong>this is a side project</strong>, soooo while it generally works, I give 0 guarantees! (Your data may get deleted due to my incompetence, etc.)
          </p>
          <hr/>
          <p>
          Or <GoogleLoginLink to="/">log in</GoogleLoginLink> if you already have an account.
          </p>
        </div>
      </div>
    );
  }
}
export default SignUp;


