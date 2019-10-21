import React, { useReducer, FC } from 'react'
import AlertContext from './alertContext'
import AlertReducer from './alertReducer'
import uuid from 'uuid'
import { SET_ALERT, REMOVE_ALERT, AlertInitState } from '../types'

const AlertState: FC = (props) => {
    const initialState: AlertInitState = {
        alerts: []
    }

    const [state, dispatch] = useReducer(AlertReducer, initialState)

    const setAlert = (msg: string, type: string, timeout: number = 4000) => {
        const id = uuid.v4()
        dispatch({ type: SET_ALERT, payload: { msg, type, id } })

        setTimeout(() => {
            dispatch({ type: REMOVE_ALERT, payload: id })
        }, timeout)
    }

    return (
        <AlertContext.Provider value={{
            alerts: state.alerts,
            setAlert
        }}>
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState
