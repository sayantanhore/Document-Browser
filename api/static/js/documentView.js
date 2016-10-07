import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import{store} from './store';
import 'whatwg-fetch';

export default class DocumentView extends Component {
    constructor() {
        super();
        this.search = this.search.bind(this);
    }
    componentWillUpdate() {
        ReactDOM.findDOMNode(this.refs.doctext.querySelector('p')).innerHTML = store.data.activeFile.text;
    }
    search(event) {
        let textElement = ReactDOM.findDOMNode(this.refs.doctext.querySelector('p'));
        let query = event.target.value;
        if(query) {
            fetch(`/document/${store.data.activeFile.id}/text?search=${query}`, {
                method: 'GET',
                headers: {
                    'Authorization' : `username=ssh ${store.data.auth.token}`
                }
            }).then((response) => response.json()).then((data) => {
                let initial = '<span class="highlight">';
                let final = '</span>';
                let enclosureLength = initial.length + final.length;
                let changedTxt = store.data.activeFile.text;
                data.forEach((range, index) => {
                    const first = range[0];
                    const last = range[1];

                    let pick = initial + changedTxt.substring(index * enclosureLength + first, index * enclosureLength + last) + final;
                    changedTxt = changedTxt.substring(0, index * enclosureLength + first) + pick + changedTxt.substring(index * enclosureLength + last);
                });
                textElement.innerHTML = changedTxt;
            });
        } else {
            textElement.innerHTML = store.data.activeFile.text;
        }
    }
    render() {
        return (
            <div className="document-view">
                <div className="search-box"><input type="text" ref="search" placeholder="Search here" onChange={this.search}/></div>
                <div ref="doctext" className="text"><p>{store.data.activeFile.text}</p></div>
            </div>
        )
    }
}
