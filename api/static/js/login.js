import React, {Component} from 'react';
import {store} from './store';
import 'whatwg-fetch';

export default class Login extends Component {
    constructor() {
        super();
        this.loginHandler = this.loginHandler.bind(this);
        this.state = {
            loginFailed: false
        }
    }

    loginHandler() {
        fetch('/login', {
          method: 'post',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.refs.username.value,
            password: this.refs.password.value
          })
        }).then((response) => {
          return response.json();
        }).then((data) => {
            if(data.token) {
                store.data.auth.token = data.token;
                this.props.goTo('browse');
            }
            if(data.message === 'Login failed') {
                store.data.auth.errorMessage = 'Invalid Username or Password';
                this.setState({loginFailed: true});
            }
        }).catch((error) => {
            if(error.statusText === 'BAD REQUEST') {
                store.data.auth.errorMessage = 'Invalid Username or Password';
                this.setState({loginFailed: true});
            }
        });
    }

    render() {
        return (
            <div id="login-container">
                <div className="login-title">
                    <span>Login</span>
                </div>
                <div className="login">
                    <div className="error-message">
                        <span>{store.data.auth.errorMessage}</span>
                    </div>
                    <div>
                        <input ref="username" type="text" placeholder="Username"/>
                    </div>
                    <div>
                        <input ref="password" type="password" placeholder="Password"/>
                    </div>
                    <div className="submit" onClick={this.loginHandler}>
                        <a href='#'>Login</a>
                    </div>
                </div>
            </div>
        )
    }
}
