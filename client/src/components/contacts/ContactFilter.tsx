import React, { useContext, useRef, ChangeEvent, useEffect, FC } from 'react'
import ContactContext from '../../context/contact/contactContext'

const ContactFilter: FC = () => {
    const contactContext = useContext(ContactContext)

    const { filterContacts, clearFilter, filtered } = contactContext

    const text = useRef<any>('')

    useEffect(() => {
        if (filtered === null) {
            text.current!.value = '';
        }
    });

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (text.current!.value !== '') {
            filterContacts(e.target.value);
        } else {
            clearFilter();
        }
    };
    return (
        <form>
            <input ref={text} type="text" placeholder="Filter contacts..." onChange={onChange} />
        </form>
    )
}

export default ContactFilter
