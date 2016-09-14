import React, {Component} from 'react';
import {store} from './store';
import $ from 'jquery';

export default class DocumentList extends Component {
    constructor() {
        super();
        this.state = {
            textAvailable: false
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(id) {
        const url = `/document/${id}/text`;
        $.ajax({
            url: url,
            headers: {
                Authorization : 'username=ssh ' + store.data.authtoken
            }
        })
        .done((data) => {
            store.data.activeFile = {
                id: id,
                text: data
            };
            this.props.renderText();
        });
    }
    render() {
        return (
            <div id="document-list">
                <ul>
                    {store.data.files.map((file, index) => {
                        return <li key={index} onClick={() => this.handleClick(file.id)}>{file.name}</li>
                    })}
                </ul>
            </div>
        );
    }
}
