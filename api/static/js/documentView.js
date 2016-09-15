import React, {Component} from 'react';
import $ from 'jquery';
import{store} from './store';

export default class DocumentView extends Component {
    constructor() {
        super();
        this.search = this.search.bind(this);
    }
    componentWillUpdate() {
        $(this.refs.doctext.querySelector('p')).text(store.data.activeFile.text);
    }
    search(event) {
        let textElement = $(this.refs.doctext.querySelector('p'));
        let query = event.target.value;
        if(query) {
            const url = `/document/${store.data.activeFile.id}/text?search=${query}`;
            $.ajax({
                url: url,
                headers: {
                    Authorization : 'username=ssh ' + store.data.authtoken
                }
            })
            .done((data) => {
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
                textElement.html(changedTxt);
            });
        } else {
            textElement .text(store.data.activeFile.text);
        }
    }
    render() {
        return (
            <div className="document-view">
                <div className="search-box"><input type="text" placeholder="Search here" onChange={this.search}/></div>
                <div ref="doctext" className="text"><p>{store.data.activeFile.text}</p></div>
            </div>
        )
    }
}
