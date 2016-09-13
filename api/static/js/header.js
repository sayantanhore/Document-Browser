import React, {Component} from 'react';

export default class Header extends Component {
    constructor() {
        super();
        this.logoutHandler = this.logoutHandler.bind(this);
    }
    logoutHandler() {
        console.log('Logout');
        this.props.goTo('login');
    }
    render() {
        return(
            <div id="header">
                <a href="#" onClick={this.logoutHandler}>Logout</a>
            </div>
        );
    }
}
