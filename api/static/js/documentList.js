import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {store} from './store';
import 'whatwg-fetch';

export default class DocumentList extends Component {
    constructor() {
        super();
        this.state = {
            textAvailable: false
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(event, id) {
        Array.from(this.refs.ulist.querySelectorAll('li')).forEach((node) => {
          ReactDOM.findDOMNode(node).classList.remove('selected');
        });
        ReactDOM.findDOMNode(event.target).classList.add('selected');
        fetch(`/document/${id}/text`, {
            method: 'GET',
            headers: {
                'Authorization' : `username=ssh ${store.data.auth.token}`
            }
        }).then((response) => response.json()).then((data) => {
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
