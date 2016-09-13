import React, {Component} from 'react';
import Login from './login';
import Browse from './browse';

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            page: 'login'
        }
        this.changePage = this.changePage.bind(this);
    }
    changePage(page) {
        this.setState({page: page});
    }
    render() {
        if(this.state.page === 'login') {
            return(<Login goTo={this.changePage}/>);
        } else if(this.state.page === 'browse') {
            return(<Browse goTo={this.changePage}/>);
        }
    }
}
