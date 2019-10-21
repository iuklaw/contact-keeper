import { createContext } from 'react'
import { AlertInitState, AlertContextFunctionTypes } from '../types'

const alertContext = createContext<AlertInitState & AlertContextFunctionTypes>({} as AlertInitState & AlertContextFunctionTypes)

export default alertContext