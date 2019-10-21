import { createContext } from 'react'
import { AuthInitState, AuthContextFunctionTypes } from '../types'

const authContext = createContext<AuthInitState & AuthContextFunctionTypes>({} as AuthInitState & AuthContextFunctionTypes)

export default authContext