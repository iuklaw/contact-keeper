export const GET_CONTACTS = 'GET_CONTACTS';
export const ADD_CONTACT = 'ADD_CONTACT';
export const DELETE_CONTACT = 'DELETE_CONTACT';
export const SET_CURRENT = 'SET_CURRENT';
export const CLEAR_CURRENT = 'CLEAR_CURRENT';
export const UPDATE_CONTACT = 'UPDATE_CONTACT';
export const FILTER_CONTACTS = 'FILTER_CONTACTS';
export const CLEAR_CONTACTS = 'CLEAR_CONTACTS';
export const CLEAR_FILTER = 'CLEAR_FILTER';
export const CONTACT_ERROR = 'CONTACT_ERROR';
export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const USER_LOADED = 'USER_LOADED';
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';


export type Contact = {
    _id?: string
    name: string,
    email: string,
    phone?: string,
    type: string,
    date?: Date
}


export type Alert = {
    msg: string
    type: string
    id: string
}

export type UserForm = {
    name?: string,
    email: string
    password: string
}

export type ContactContextFunctionTypes = {
    getContacts: () => void,
    addContact: (contact: Contact) => void,
    deleteContact: (id: string) => void,
    setCurrent: (contact: Contact) => void,
    clearCurrent: () => void,
    updateContact: (contact: Contact) => void,
    filterContacts: (text: string) => void,
    clearFilter: () => void,
    clearContacts: () => void
}

export type AuthContextFunctionTypes = {
    registerUser: (formData: UserForm) => void
    clearErrors: () => void
    logoutUser: () => void,
    loginUser: (formData: UserForm) => void,
    loadUser: () => void
}


export type AlertContextFunctionTypes = {
    setAlert: (msg: string, type: string, timeout?: number) => void
}


export type ContactInitState = {
    contacts: Contact[] | null,
    current: null | Contact,
    filtered: Contact[] | null,
    error: string | null,
    loading: boolean
}

export type AuthInitState = {
    token: string | null,
    isAuthenticated: boolean | null,
    loading: boolean,
    user: UserForm | null
    error: string | null
}

export type AlertInitState = {
    alerts: Alert[]
}