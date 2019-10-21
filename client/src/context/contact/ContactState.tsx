import React, { useReducer, FC } from 'react'
import axios from 'axios'
import contactContext from './contactContext'
import contactReducer from './contactReducer'
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    UPDATE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    CLEAR_CONTACTS,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    ContactInitState,
    Contact,
    CONTACT_ERROR,
    GET_CONTACTS
} from '../types'

const ContactState: FC = (props) => {
    const initialState: ContactInitState = {
        contacts: null,
        current: null,
        filtered: null,
        error: null,
        loading: false
    }


    const [state, dispatch] = useReducer(contactReducer, initialState)

    const getContacts = async () => {
        try {
            const res = await axios.get('/api/contacts')
            dispatch({ type: GET_CONTACTS, payload: res.data.contacts })
        } catch (error) {
            dispatch({ type: CONTACT_ERROR, payload: error.msg })
        }
    }


    //add contact
    const addContact = async (contact: Contact) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/contacts', contact, config)
            dispatch({ type: ADD_CONTACT, payload: res.data })

        } catch (error) {
            dispatch({ type: CONTACT_ERROR, payload: error.response.msg })
        }
    }
    //delete contact
    const deleteContact = async (id: string) => {
        try {
            await axios.delete(`/api/contacts/${id}`)
            dispatch({ type: DELETE_CONTACT, payload: id })
        } catch (error) {
            dispatch({ type: CONTACT_ERROR, payload: error.response.msg })
        }
    }
    //set current contact
    const setCurrent = (contact: Contact) => {
        dispatch({ type: SET_CURRENT, payload: contact })
    }
    //clear current contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT })
    }
    //update contact
    const updateContact = async (contact: Contact) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.put(`/api/contacts/${contact._id}`, contact, config)
            dispatch({ type: UPDATE_CONTACT, payload: res.data })

        } catch (error) {
            dispatch({ type: CONTACT_ERROR, payload: error.response.msg })
        }
    }
    //filter contacts
    const filterContacts = (text: string) => {
        dispatch({ type: FILTER_CONTACTS, payload: text })
    }
    //clear filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER })
    }

    const clearContacts = () => {
        dispatch({ type: CLEAR_CONTACTS })
    }

    return (
        <contactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                loading: state.loading,
                getContacts,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearFilter,
                clearContacts
            }}>
            {props.children}
        </contactContext.Provider>
    )
}

export default ContactState