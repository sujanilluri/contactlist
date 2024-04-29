import React, { useState } from 'react';
import { Contact } from '../../models/component.model';
import PropTypes from 'prop-types';
import './contactinfo.scss';

export default function ContactInfo({ contact, onCreate, onEdit }: { contact: Contact | undefined, onCreate: any, onEdit: any }) {

  return <div className='contact-info'>
    {
      contact ? <>
        <p className='contact-name'>{contact.firstName + ' ' + contact.lastName}</p>
        <div className='contact-details'>
          <p>
            <span>phone</span>
            <span>{contact.phoneNumber}</span>
          </p>
          <p>
            <span>email</span>
            <span><a href={"mailto:"+contact.email}>{contact.email}</a></span>
          </p>
          <p>
            <span>address</span>
            <span>{contact.address}</span>
          </p>
          <p>
            <span>note</span>
            <span>{contact.note}</span>
          </p>
        </div>
      </> : <p>No details found</p>
    }

    <div className='controls'>
      <button onClick={onCreate}>+</button>
      <button onClick={onEdit}>Edit</button>
    </div>
  </div>
}
ContactInfo.propTypes = {
  contact: PropTypes.object,
  selectedContact: PropTypes.number
}