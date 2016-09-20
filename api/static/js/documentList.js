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
    handleClick(event, id) {
        $(this.refs.ulist.querySelectorAll('li')).removeClass('selected');
        $(event.target).addClass('selected');
        const url = `/document/${id}/text`;
        $.ajax({
            url: url,
            headers: {
                Authorization : 'username=ssh ' + store.data.auth.token
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
            <div className="document-list">
                <ul ref="ulist">
                    {store.data.files.map((file, index) => {
                        return <li key={index} onClick={(event) => this.handleClick(event, file.id)}>{file.name}</li>
                    })}
                </ul>
            </div>
        );
    }
}
