import React, {Component} from 'react';
import $ from 'jquery';
import {store} from './store';
export default class Login extends Component {
    constructor() {
        super();
        this.username = '';
        this.password = '';
        this.loginHandler = this.loginHandler.bind(this);
        this.getUsername = this.getUsername.bind(this);
        this.getPassword = this.getPassword.bind(this);
        this.state = {
            loginFailed: false
        }
    }
    getUsername(event) {
        this.username = event.target.value;
    }
    getPassword(event) {
        this.password = event.target.value;
    }
    loginHandler() {
        console.log("Login");
        let params = {
            username: this.username,
            password: this.password
        };
        $.post('/login', params)
        .done((data) => {
            console.log('data', data.statusText)
            if(data.token) {
                store.data.auth.token = data.token;
                this.props.goTo('browse');
            }
        })
        .fail((error) => {
            console.log(error);
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
                        <input type="text" placeholder="Username" onChange={this.getUsername}/>
                    </div>
                    <div>
                        <input type="password" placeholder="Password" onChange={this.getPassword}/>
                    </div>
                    <div className="submit" onClick={this.loginHandler}>
                        <a href='#'>Go</a>
                    </div>
                </div>
            </div>
        )
    }
}
