import React, { FC, useContext } from 'react'
import { Link } from 'react-router-dom'


import AuthContext from '../../context/auth/authContext'
import ContactContext from '../../context/contact/contactContext'


type IProps = {
    title?: string,
    icon?: string
}


const Navbar: FC<IProps> = ({ title = 'Contact Keeper', icon = 'fas fa-id-card-alt' }) => {

    const authContext = useContext(AuthContext)
    const contactContext = useContext(ContactContext)
    const { isAuthenticated, logoutUser, user } = authContext
    const { clearContacts } = contactContext


    const onLogout = () => {
        clearContacts()
        logoutUser()
    }

    const href = '#'

    const authLinks = (
        <>
            <li>Hello {user && user.name}</li>
            <li>
                <a onClick={onLogout} style={{ cursor: "pointer" }} href={href}>
                    <i className="fas fa-sign-out-alt"></i> <span className="hide-sm">Logout</span>
                </a>
            </li>
        </>
    )

    const guestLinks = (
        <>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </>
    )

    return (
        <div className="navbar bg-primary">
            <h1>
                <i className={icon} />     {title}
            </h1>
            <ul>
                {isAuthenticated ? authLinks : guestLinks}
            </ul>
        </div>
    )
}


export default Navbar
