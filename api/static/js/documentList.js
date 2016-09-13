import React, {Component} from 'react';
import {store} from './store';
export default class DocumentList extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div id="document-list">
                <ul>
                    {store.data.fileNames.map((fileName, index) => {
                        return <li key={index}>{fileName}</li>
                    })}
                </ul>
            </div>
        );
    }
}
