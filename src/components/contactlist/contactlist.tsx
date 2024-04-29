import React from 'react';
import PropTypes from 'prop-types';
import { Contact, Mode } from '../../models/component.model';
import './contactlist.scss';

export default function ContactList({ contacts, onContactSelection, onDeleteContact, selectedId, mode }: { contacts: Contact[], onContactSelection: any, onDeleteContact: any, selectedId: number, mode: string }) {
   
    const categorizeContacts = (contacts: Contact[]): { key: string, data: Contact[] }[]  => {
        let results: { [keyName: string]: { key: string, data: Contact[] }} = {};
        contacts.forEach(val => {
            let key = val.lastName.split('')[0].toUpperCase();
            results[key] = results[key] || { key, data: []};
            results[key].data = [ ...results[key].data, val ];
            
        });
        let finalResult = Object.values(results);
        finalResult = finalResult.sort((val1, val2) => val1.key < val2.key? -1: 1);
        finalResult = finalResult.map(val => {
            val.data = val.data.sort((val1, val2) => val1.lastName < val2.lastName ? -1: 1);
            return val;
        });
        return finalResult;
    };
    return <div className='contacts-list'>
        {
           categorizeContacts(contacts).map((user: { key: string, data: Contact[] }) => {
            return <div key={user.key} className="list-item">
                <p>{user.key}</p>
                <ul>
                    {
                        user.data.map((val: Contact) => {
                            return <li key={val.id} className={ val.id === selectedId? 'selected': ''} onClick={() => onContactSelection(val.id)}>{ val.firstName + ' ' + val.lastName}{ (val.id === selectedId && mode == Mode.edit) && <span onClick={ () => onDeleteContact(val.id)}>-</span>}</li>
                        })
                    }
                </ul>
            </div>
           }) 
        }
    </div>;
}

ContactList.propTypes = {
    contacts: PropTypes.array,
    onContactSelection: PropTypes.func,
    onDeleteContact: PropTypes.func,
    selectedId: PropTypes.number,
    mode: PropTypes.string
}