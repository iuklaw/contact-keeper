import React, { useReducer, FC } from 'react'
import axios from 'axios'
import AuthContext from './authContext'
import AuthReducer from './authReducer'
import setAuthToken from '../../utils/setAuthToken'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    AUTH_ERROR,
    USER_LOADED,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    CLEAR_ERRORS,
    AuthInitState,
    UserForm
} from '../types'



const AuthState: FC = (props) => {
    const initialState: AuthInitState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState)

    const loadUser = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token)
        }
        try {
            const res = await axios.get('/api/auth')
            dispatch({ type: USER_LOADED, payload: res.data })
        } catch (error) {
            dispatch({ type: AUTH_ERROR })
        }
    }

    const registerUser = async (formData: UserForm) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/users', formData, config)
            dispatch({ type: REGISTER_SUCCESS, payload: res.data })
            loadUser()
        } catch (error) {
            dispatch({ type: REGISTER_FAIL, payload: error.response.data.msg })
        }
    }

    const loginUser = async (formData: UserForm) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/auth', formData, config)
            dispatch({ type: LOGIN_SUCCESS, payload: res.data })
            loadUser()
        } catch (error) {
            dispatch({ type: LOGIN_FAIL, payload: error.response.data.msg })
        }
    }
    //logout
    const logoutUser = () => {
        dispatch({ type: LOGOUT })
    }
    //clear errors
    const clearErrors = () => {
        dispatch({ type: CLEAR_ERRORS })
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                registerUser,
                clearErrors,
                logoutUser,
                loginUser,
                loadUser
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}





export default AuthState