import React, {Component} from 'react';
import $ from 'jquery';
import {store} from './store';
import DocumentList from './documentList';
import DocumentView from './documentView';


export default class Documents extends Component {
    constructor() {
        super();
        this.state = {
            totalDocuments: 0
        }
        $.ajax({
            url: '/documents',
            headers: {
                Authorization : 'username=ssh ' + store.data.authtoken
            }
        })
        .done((data) => {
            data.forEach((file) => {
                store.data.fileNames.push(file.name);
            });
            this.loadList();
            /*
            if(data.token) {
                this.props.goTo('browse');
            }*/
        })
        .fail((err) => {
            console.log(err);
        });
        this.loadList = this.loadList.bind(this);
    }

    loadList() {
        this.setState({totalDocuments: store.data.fileNames.length});
    }
    render() {
        return (
            <div id="documents">
                <DocumentList/>
                <DocumentView/>
            </div>
        );
    }
}
