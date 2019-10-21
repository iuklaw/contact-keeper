import { UserInterface } from "./user";

export interface ContactInterface {
    user: UserInterface
    id: string,
    email: string,
    phone?: string,
    date: Date,
    name: string,
    type: string
}