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
            <div id="login">
                <div>
                    <label>Username</label>
                    <input type="text" onChange={this.getUsername}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" onChange={this.getPassword}/>
                </div>
                <div>
                    <a href='#' onClick={this.loginHandler}>Go</a>
                </div>
            </div>
        )
    }
}
