import React, {Component} from 'react';
import Header from './header';

export default class Browse extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div id="browse">
                <Header goTo={this.props.goTo}/>
            </div>
        );
    }
}
