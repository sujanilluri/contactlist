import React, { useState } from 'react';
import ContactList from '../contactlist/contactlist';
import { Contact, Mode } from '../../models/component.model';
import './contactsboard.scss';
import ContactInfo from '../contactinfo/contactinfo';
import EditContact from '../editcontact/editcontact';

export default function ContactsBoard(props: any) {
    const [contacts, setContacts] = useState([{
        'firstName': 'Adam',
        'lastName': 'Alice',
        'phoneNumber': '399-692-7753',
        'email': 'adam.alice@gmail.com',
        'address': 'Check',
        'note': 'California address',
        'id': 1
    }, {
        'firstName': 'Adam',
        'lastName': 'Bob',
        'phoneNumber': '399-692-7753',
        'email': 'adam.alice@gmail.com',
        'address': 'Check',
        'note': 'California address',
        'id': 2
    }]);
    
    const [mode, setMode] = useState('view');
    const [selectedContact, setSelectedContact] = useState(1);
    const [nextId, setNextId] = useState(3);
    const onContactSelection = (contactId: number) => {
        setSelectedContact(contactId);
        setMode(Mode.view);
    };
    const onCreateAction = () => {
        setMode(Mode.new);
    };
    const onEditAction = () => {
        setMode(Mode.edit);
    };
    const deleteContact = (id: number) => {
        let updatedContacts = contacts.filter(val => val.id !== id);
        setContacts(updatedContacts);
        setMode(Mode.view);
        if ( updatedContacts.length > 0 ) {
            setSelectedContact(updatedContacts[0].id);
        }        
    }
    const createNewContact = (contact: Contact) => {
        contact.firstName = contact.firstName.charAt(0).toUpperCase() + contact.firstName.slice(1);
        contact.lastName = contact.lastName.charAt(0).toUpperCase() + contact.lastName.slice(1);
        setContacts([...contacts, contact ]);
        setNextId(nextId + 1);
        setSelectedContact(contact.id);
        setMode(Mode.view);
    };
    const editContact = (contact: Contact) => {
        let updatedContacts = [...contacts];
        let contactToBeEdited = updatedContacts.find(val => val.id === contact.id);
        if ( contactToBeEdited ) {
            Object.assign( contactToBeEdited, { firstName: contact.firstName,
                lastName: contact.lastName,
                phoneNumber: contact.phoneNumber,
                email: contact.email,
                address: contact.address,
                note: contact.note  
            });
        }
        setContacts(updatedContacts);
        setSelectedContact(contact.id);
        setMode(Mode.view);
    };
    return <div className='contacts-board'>
        <ContactList contacts={contacts} onContactSelection={onContactSelection} onDeleteContact={deleteContact} selectedId={selectedContact} mode={mode}></ContactList>
        { mode  === Mode.view && <ContactInfo contact={contacts.find(val => val.id === selectedContact )} selectedContact={selectedContact} onCreate={onCreateAction} onEdit={onEditAction}></ContactInfo> }
        { mode  === Mode.edit && <EditContact contact={contacts.find(val => val.id === selectedContact )} onDone={ editContact } onCreate={onCreateAction}></EditContact> }
        { mode  === Mode.new && <EditContact contact={{ id: nextId, firstName: '', lastName: '', phoneNumber: '', email: '', address: '', note: ''}} onDone={ createNewContact } onCreate={onCreateAction}></EditContact> }
    </div>
}