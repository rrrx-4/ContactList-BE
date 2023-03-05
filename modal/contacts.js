const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema({

    name: {
        type: String,
        require: true,
    },

    contactNo: {
        type: String,
        require: true,
    },

    email: {
        type: String,
        require: true,
    }

})


module.exports = mongoose.model("contact", ContactSchema);