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
            if(data.token) {
                store.data.authtoken = data.token;
                this.props.goTo('browse');
            }
        })
        .fail((err) => {
            console.log(err);
        });
    }
    render() {
        return (
            <div id="login-container">
                <div id="login-title">
                    <span>Login</span>
                </div>
                <div id="login">
                    <div>
                        <input type="text" placeholder="Username" onChange={this.getUsername}/>
                    </div>
                    <div>
                        <input type="password" placeholder="Password" onChange={this.getPassword}/>
                    </div>
                    <div id="submit" onClick={this.loginHandler}>
                        <a href='#'>Go</a>
                    </div>
                </div>
            </div>
        )
    }
}
