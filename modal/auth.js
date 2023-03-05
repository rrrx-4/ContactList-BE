const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const mongoose = require("mongoose");



const UserSchema = mongoose.Schema({

    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    }

})

UserSchema.pre('save', async function () {

    if (this.password) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }

})

UserSchema.methods.createJWT = function () {

    const token = jwt.sign({ id: this.email }, process.env.JWT_SECRET, { expiresIn: "30d" })

    return token;

}


UserSchema.methods.comparePassword = async function (userPassword) {

    const pw = await bcrypt.compare(userPassword, this.password)

    return pw;

}

module.exports = mongoose.model("User", UserSchema);