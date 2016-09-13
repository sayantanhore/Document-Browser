import React, {Component} from 'react';
import Header from './header';
import Documents from './documents';

export default class Browse extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div id="browse">
                <Header goTo={this.props.goTo}/>
                <Documents/>
            </div>
        );
    }
}
