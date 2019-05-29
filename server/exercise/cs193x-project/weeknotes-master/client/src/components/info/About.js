/* @flow */

import React, { Component } from 'react';

class About extends Component {
  // Override
  render() {
    return (
      <div id="main">
        <h1 className="static-header">about week&middot;notes</h1>
        <p>
          <strong>What is this thing?</strong><br/>
          This is a tiny web app that lets you write, save, and edit personal notes for the week.<br/>
          All notes are <strong>private</strong> and can only be seen by you.
        </p>

        <p>
          <strong>Weeknotes is a personal side project.</strong><br/>
          If you can't tell already, this is not a company, this is not a business, this is not a professional app: this is something that I built for myself partly because a) I like storing weekly notes for myself and b) I wanted to play around with React and Node.
        </p>
        <p>
          So like for real though: Don't store things here that are SUPER IMPORTANT or things that you would be embarrassed if I incidentally saw them. I'm not going to delete your stuff or look at your notes on purpose, but there's a chance I'll do something stupid by mistake!
        </p>

        <p>
          <strong>Weeknotes is open source!</strong><br/>
          This is an open source web app distributed under the <a href="http://choosealicense.com/licenses/mit/">MIT License</a>.<br/>
          I find it useful, but I made it mostly for educational purposes. No guarantees on speed, reliability, etc.<br/>
          <a href="https://github.com/vrk/weeknotes">View the source code on Github</a>!
        </p>

        <p>
          <strong>Q: How do I delete my account?</strong><br/>
          A: Lolz haven't implemented that yet (<a href="https://github.com/vrk/weeknotes/issues/35">issue</a>). If you really want to delete your account, <a href="https://github.com/vrk/weeknotes/issues">create an issue on the tracker</a> and I'll delete it manually you.
        </p>
      </div>
    );
  }
}

export default About;

