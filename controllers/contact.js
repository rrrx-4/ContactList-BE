const Contact = require("../modal/contacts");

const createContacts = async (req, res) => {

    console.log(req.body);

    const { name, number } = req.body

    console.log(req.userEmail);
    const newContact = new Contact({
        name,
        contactNo: number,
        email: req.userEmail,
    })

    try {

        await newContact.save()

        res.status(201).json(newContact);

    } catch (error) {

        res.status(404).json({ message: "Contact does not saved" })

    }

}

const getContacts = async (req, res) => {

    const email = req.userEmail;

    try {

        const contacts = await Contact.find({ email })

        res.status(200).json(contacts);

    } catch (error) {

        res.status(401).json({ message: "Cant get contacts" })
    }

}

const editContact = async (req, res) => {

    try {

        console.log(req.body);
        const { id } = req.params
        const { name, number } = req.body

        console.log(name, number);

        const newContact = { name, contactNo: number }

        await Contact.findByIdAndUpdate(id, newContact, { new: true });

        res.status(200).json({ message: "Contact edited" });

    } catch (error) {
        res.status(401).json({ message: "Cant edited the contact" })
    }

}

const deleteContact = async (req, res) => {


    try {

        const { id } = req.params;

        await Contact.findByIdAndRemove(id)

        res.status(200).json({ message: "contact deleted" })


    } catch (error) {

        res.status(401).json({ message: "Cant delete contact" })
    }


}

const getSearchContact = async (req, res) => {

    const email = req.userEmail;

    const { searchQuery } = req.query;

    try {

        // const number = new RegExp(searchQuery, "i")

        const name = new RegExp(searchQuery, "i")



        const contacts = await Contact.find({ email, name })

        // const con2 = await Contact.find(number)
        res.status(200).json(contacts);

    } catch (error) {
        res.status(401).json({ message: "Cant get contacts" })
    }



}



module.exports = { createContacts, getContacts, editContact, deleteContact, getSearchContact };