import { AlertInitState, SET_ALERT, REMOVE_ALERT } from "../types";




const alertReducer = (state: AlertInitState, action: any) => {
    switch (action.type) {
        case SET_ALERT:
            return {
                ...state,
                alerts: [...state.alerts, action.payload]
            }

        case REMOVE_ALERT:
            return {
                ...state,
                alerts: state.alerts.filter(alert => alert.id !== action.payload)
            }
        default:
            return state
    }
}


export default alertReducer