import express, { Request, Response } from 'express'
import path from 'path'
import connectDB from "./db"
import users from './routes/users'
import auth from './routes/auth'
import contacts from './routes/contacts'
import { Options } from 'body-parser'


const PORT = process.env.PORT || 5000;
const app = express();

connectDB()

app.use(express.json({ extended: false } as Options))


app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/contacts", contacts);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../client/build'))

    app.get('*', (req: Request, res: Response) => res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html')))
}

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
