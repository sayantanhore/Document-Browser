import React, {Component} from 'react';
import {store} from './store';

export default class Header extends Component {
    constructor() {
        super();
        this.logoutHandler = this.logoutHandler.bind(this);
    }
    logoutHandler() {
        console.log('Logout');
        this.props.goTo('login');
        store.data.reset();
    }
    render() {
        return(
            <div id="header">
                <a href="#" onClick={this.logoutHandler}>Logout</a>
            </div>
        );
    }
}
