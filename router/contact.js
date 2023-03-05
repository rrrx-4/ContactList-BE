const { getContacts, editContact, deleteContact, createContacts, getSearchContact } = require("../controllers/contact")
const express = require("express");
const auth = require("../middleware/auth")


const router = express.Router();

router.post("/create", auth, createContacts)

router.get("/contacts", auth, getContacts);

router.delete("/delete/:id", auth, deleteContact);

router.patch("/edit/:id", auth, editContact);

router.get("/search", auth, getSearchContact);

module.exports = router


