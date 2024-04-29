import React, { useState } from 'react';
import { Contact, Mode } from '../../models/component.model';
import './editcontact.scss';

export default function EditContact({ contact, onDone, onCreate }: { contact: any, onDone: any, onCreate: any }) {
    const [contactDetails, setContactDetails] = useState(contact );
    const [validations, setValidations] = useState({} as any);
    const handleChange = (value: string, name: string) => {
        if ( name ) {
            setContactDetails({ ...contactDetails, [name]: value });
        }
    }
    const doValidateForm = () => {
        let validations: any = {} ;
        if ( !contactDetails.firstName ) {
            validations.firstName = 'First Name is mandatory';
        }
        if ( !contactDetails.lastName ) {
            validations.lastName = 'Last Name is mandatory';
        }
        if ( !contactDetails.phoneNumber || !(/^\d{3}-\d{3}-\d{4}$/).test(contactDetails.phoneNumber) ) {
            validations.phoneNumber = 'Phone number is mandatory and should be in XXX-XXX-XXXX format';
        }
        if ( !contactDetails.email || !(/^.*@.*$/).test(contactDetails.email) ) {
            validations.email = 'Email is mandatory and should be valid';
        }
        if (!contactDetails.address) {
            validations.address = 'Address is mandatory';
        }
        if (!contactDetails.note) {
            validations.note = 'Note is mandatory';
        }
        setValidations(validations);
        return validations;
    };

    const createContact = () => {
        let validations = doValidateForm();
        if ( Object.keys(validations).length === 0 ) {
            onDone(contactDetails);
        }
    };
    return <div className='edit-contact'>
        <div className='contact-name'>
            <div>
                <div>
                    { validations.firstName && <span className='error-message'>{validations.firstName}</span> }
                    <input type='text' name="firstName" value={contactDetails.firstName} onChange={(event)=>{ handleChange(event.currentTarget.value, 'firstName')}}></input>
                </div>
                <p>first name</p>   
            </div>
            <div>
                <div>
                    { validations.lastName && <span className='error-message'>{validations.lastName}</span> }         
                    <input type='text' name="lastName" value={contactDetails.lastName} onChange={(event)=>{ handleChange(event.currentTarget.value, 'lastName')}}></input>
                </div>
                <p>last name</p>
            </div>
        </div>
        <div className='contact-details'>
            <p>
                <span>phone</span>
                <div>
                    <input type='text' name="phoneNumber" value={contactDetails.phoneNumber} onChange={(event)=>{ handleChange(event.currentTarget.value, 'phoneNumber')}}></input>
                    { validations.phoneNumber && <span className='error-message'>{validations.phoneNumber}</span> }
                </div>                
            </p>
            <p>
                <span>email</span>
                <div>
                    <input type='text' name="email" value={contactDetails.email} onChange={(event)=>{ handleChange(event.currentTarget.value, 'email')}}></input>
                    { validations.email && <span className='error-message'>{validations.email}</span> }
                </div>                
            </p>
            <p>
                <span>address</span>
                <div>
                    <textarea rows={3} name="address" value={contactDetails.address} onChange={(event)=>{ handleChange(event.currentTarget.value, 'address')}}></textarea>
                    { validations.address && <span className='error-message'>{validations.address}</span> }
                </div>                
            </p>
            <p>
                <span>note</span>
                <div>
                    <textarea rows={3} name="note" value={contactDetails.note} onChange={(event)=>{ handleChange(event.currentTarget.value, 'note')}}></textarea>
                    { validations.note && <span className='error-message'>{validations.note}</span> }
                </div>
            </p>
        </div>
        <div className='controls'>
            <button onClick={onCreate}>+</button>
            <button onClick={createContact}>Done</button>
        </div>
    </div>
}