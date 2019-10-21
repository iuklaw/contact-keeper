import React, { useState, ChangeEvent, useContext, useEffect, FormEvent } from 'react'
import ContactContext from '../../context/contact/contactContext'
import { Contact } from '../../context/types'

const ContactForm = () => {

    const contactContext = useContext(ContactContext)

    const { addContact, current, updateContact, clearCurrent } = contactContext

    useEffect(() => {
        if (current) {
            setContact(current)
        } else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            })
        }
    }, [contactContext, current])

    const [contact, setContact] = useState<Contact>({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    })


    const { name, email, phone, type } = contact

    const onChange = (e: ChangeEvent<HTMLInputElement>) => setContact({
        ...contact,
        [e.target.name]: e.target.value
    })

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!current) {
            addContact(contact)
        } else {
            updateContact(contact)
            clearCurrent()
        }
        setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal'
        })
    }

    const clearAll = () => {
        clearCurrent()
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">{current ? 'Edit contact' : 'Add Contact'}</h2>
            <input type="text" name="name" placeholder="Name" value={name} onChange={onChange} required />
            <input type="email" name="email" placeholder="Email" value={email} onChange={onChange} />
            <input type="text" name="phone" placeholder="Phone" value={phone} onChange={onChange} />
            <h5>Contact type</h5>
            <input type="radio" name="type" value="personal" checked={type === 'personal'} onChange={onChange} /> Personal {' '}
            <input type="radio" name="type" value="professional" checked={type === 'professional'} onChange={onChange} /> Professional
            <div>
                <input type="submit" value={current ? 'Update contact' : 'Add Contact'} className="btn btn-primary btn-block" />
            </div>
            {current && <div>
                <button className="btn btin-white btn-block" onClick={clearAll}>Clear</button>
            </div>}
        </form>
    )
}

export default ContactForm
