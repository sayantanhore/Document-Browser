import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {store} from './store';
import 'whatwg-fetch';
import DocumentList from './documentList';
import DocumentView from './documentView';


export default class Documents extends Component {
    constructor() {
        super();
        this.state = {
            totalDocuments: 0,
            textAvailable: false
        }
        fetch('/documents', {
            method: 'GET',
            headers: {
                'Authorization': `username=ssh ${store.data.auth.token}`
            }
        }).then((response) => {
            return response.json();
        }).then((data) => {
            data.forEach((file) => {
                store.data.files.push({id: file.id, name: file.name});
            });
            this.loadList();
        }).catch((error) => {
            console.log(error);
        });
        this.loadList = this.loadList.bind(this);
        this.showText = this.showText.bind(this);
    }

    loadList() {
        this.setState({totalDocuments: store.data.files.length});
    }
    showText() {
        ReactDOM.findDOMNode(this.refs.docList.refs.search).value = '';
        this.setState({textAvailable: true});
    }
    render() {
        return (
            <div className="documents">
                <DocumentList renderText={this.showText}/>
                <DocumentView ref="docList" />
            </div>
        );
    }
}
