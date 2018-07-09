import React, { Component } from 'react';
import './App.css';
// import $ from 'jquery';
import axios from 'axios';

// Change this variable to that of your hosted instance. If left as is, the API call will throw CORS errors.
const endpoint = 'https://pwpush.com'

class Form extends Component {
  constructor(props){
    super(props);
    this.state = {
      pw: '',
      days: '5',
      views: '5',
      token: ''
    }
    this.handlePwChange = this.handlePwChange.bind(this);
    this.handleDaysChange = this.handleDaysChange.bind(this);
    this.handleViewsChange = this.handleViewsChange.bind(this);
    this.getToken = this.getToken.bind(this);
    this.clearToken = this.clearToken.bind(this);
  }

  // Event listeners
  handlePwChange(e) {
    this.setState({pw: e.target.value});
  }
  handleDaysChange(e) {
    this.setState({days: e.target.value});
  }
  handleViewsChange(e) {
    this.setState({views: e.target.value});
  }

  // API call. Gets a unique token from which to construct a shareable link.
  getToken() {
    // Axios post request rewritten from the jQuery one in pwpush's API doc
    axios.post(`${endpoint}/p.json`, {
      'password[payload]': this.state.pw,
      'password[expire_after_days]': this.state.days,
      'password[expire_after_views]': this.state.views
    })
    .then(
      (data) => { this.setstate ({token: data.url_token}) }
    )
    .catch(
      (error) => {console.log(error)}
    );

    // jQuery function from pwpush's API doc, slightly modified to pull values from state. Left here as a fallback, as I'm still testing the use of Axios.
    //   $.post(`${endpoint}/p.json`, {
    //     'password[payload]': this.state.pw,
    //     'password[expire_after_days]': this.state.days,
    //     'password[expire_after_views]': this.state.views
    //   },
    //   (data) => { this.setstate ({token: data.url_token}) }
    // );

    // Toggles state purely for demo purposes. If you don't have your own hosted instance, you can still use this in place of the above function to view how the UI will change.
    // this.setState ({token: 'testinput'})
  }

  // reset state to original values/toggle page between input prompts and shareable link
  clearToken() {
    this.setState({
      pw: '',
      days: '5',
      views: '5',
      token: ''
    });
  }

  render() {
    if (this.state.token === '') {
      return (
        <div>
          <h3>Password to share:</h3>
          <input className="text" value={this.state.pw} onChange={this.handlePwChange} />

          <h3>Days before link expires:</h3>
          <input className="numbers" value={this.state.days} onChange={this.handleDaysChange} />

          <h3>Views before link expires:</h3>
          <input className="numbers" value={this.state.views} onChange={this.handleViewsChange} />

          <br /> <br />

          <button onClick={this.getToken}>Generate your link!</button>
        </div>
      );
    }
    else {
      let link = `${endpoint}/${this.state.token}`;
      return(
        <div>
          <h2>Your shareable password link is:</h2>
          <h1><a href={link}>{link}</a></h1>
          <h2>It will expire after {this.state.days} day(s) or {this.state.views} view(s) - whichever comes first.</h2>
          <button onClick={this.clearToken}>Need to get another link?</button>
        </div>
      );
    }

  }
}

export default Form;
