import React, { useContext, useEffect } from 'react'

import { CSSTransition, TransitionGroup } from 'react-transition-group'
import ContactContext from '../../context/contact/contactContext'
import Spinner from '../layout/Spinner'
import ContactItem from './ContactItem'

const Contact = () => {

    const contactContext = useContext(ContactContext)


    const { getContacts, contacts, filtered, loading } = contactContext

    useEffect(() => {
        getContacts()
        //eslint-disable-next-line
    }, [])


    return (
        <>
            {contacts !== null && !loading ? (
                <TransitionGroup>
                    {filtered !== null ?
                        filtered.map(contact => (
                            <CSSTransition key={contact._id} timeout={200} classNames="item">
                                <ContactItem contact={contact} />
                            </CSSTransition>))
                        :
                        contacts!.map(contact => (
                            <CSSTransition key={contact._id} timeout={200} classNames="item">
                                <ContactItem contact={contact} />
                            </CSSTransition>))}
                </TransitionGroup>
            ) : <Spinner />}

        </>
    )
}

export default Contact
