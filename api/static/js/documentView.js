import React, {Component} from 'react';
import{store} from './store';

export default class DocumentView extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div id="document-view">
                <p>{store.data.fileText}</p>
            </div>
        )
    }
}
