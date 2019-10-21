import { createContext } from 'react'
import { ContactInitState, ContactContextFunctionTypes } from '../types'


const contactContext = createContext<ContactInitState & ContactContextFunctionTypes>({} as ContactInitState & ContactContextFunctionTypes)


export default contactContext