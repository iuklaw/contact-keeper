import express, { Request, Response, Router } from 'express'
import { check, validationResult } from 'express-validator'
import authMiddleware from '../middleware/auth'

import { UserInterface } from '../interfaces/user'
import { ContactInterface } from '../interfaces/contact'
import Contact from '../models/Contact'
const router = Router()

//get api/contacts get all user's contacts private
router.get("/", [authMiddleware], async (req: Request & { user: UserInterface }, res: Response) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 })
        res.json({ contacts })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server error")
    }
})

//post api/contacts add contact private
router.post("/", [authMiddleware,
    check('name', 'Name is required').not().isEmpty()
], async (req: Request & { user: UserInterface }, res: Response) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, phone, type } = req.body

    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        })

        const contact = await newContact.save()
        res.json(contact)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server error')
    }
})

//put api/contacts/:id update contact private
router.put("/:id", [authMiddleware], async (req: Request & { user: UserInterface }, res: Response) => {
    const { name, email, phone, type } = req.body

    const contactFields = {} as ContactInterface
    if (name) contactFields.name = name
    if (email) contactFields.email = email
    if (phone) contactFields.phone = phone
    if (type) contactFields.type = type

    try {
        let contact = await Contact.findById(req.params.id);

        if (!contact) return res.status(404).json({ msg: 'Contact not found' });

        // Make sure user owns contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { $set: contactFields },
            { new: true }
        );

        res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//post api/contacts:/:id delete contact private
router.delete("/:id", [authMiddleware], async (req: Request & { user: UserInterface }, res: Response) => {

    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) return res.status(404).json({ msg: 'Contact not found' });

        // Make sure user owns contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Contact.findByIdAndRemove(req.params.id);

        res.json({ msg: 'Contact removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


export default router




