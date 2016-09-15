import React, {Component} from 'react';
import $ from 'jquery';
import {store} from './store';
import DocumentList from './documentList';
import DocumentView from './documentView';


export default class Documents extends Component {
    constructor() {
        super();
        this.state = {
            totalDocuments: 0,
            textAvailable: false
        }
        $.ajax({
            url: '/documents',
            headers: {
                Authorization : 'username=ssh ' + store.data.authtoken
            }
        })
        .done((data) => {
            data.forEach((file) => {
                store.data.files.push({id: file.id, name: file.name});
            });
            this.loadList();
        })
        .fail((err) => {
            console.log(err);
        });
        this.loadList = this.loadList.bind(this);
        this.showText = this.showText.bind(this);
    }

    loadList() {
        this.setState({totalDocuments: store.data.files.length});
    }
    showText() {
        $('.search-box input[type="text"]').val('');
        this.setState({textAvailable: true});
    }
    render() {
        return (
            <div className="documents">
                <DocumentList renderText={this.showText}/>
                <DocumentView />
            </div>
        );
    }
}
