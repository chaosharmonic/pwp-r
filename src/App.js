import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';

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
  handlePwChange(e) {
    this.setState({pw: e.target.value});
  }
  handleDaysChange(e) {
    this.setState({days: e.target.value});
  }
  handleViewsChange(e) {
    this.setState({views: e.target.value});
  }
  //
  getToken() {
    // not currently functional due to the endpoint blocking CORS requests. If we're looking to host an instance of it ourselves anyway, it should be a moot point.
  //   $.post('https://pwpush.com/p.json', {
  //     'password[payload]': this.state.pw,
  //     'password[expire_after_days]': this.state.days,
  //     'password[expire_after_views]': this.state.views
  //   },
  //   (data) => { this.setstate ({token: data.url_token})}
  // );
    // toggles state in the meantime for demo purposes. Will eventually be removed.
    this.setState ({token: 'testinput'})
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
      let link = `https://pwpush.com/p/${this.state.token}`;
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
