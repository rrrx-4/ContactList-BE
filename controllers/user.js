
const User = require("../modal/auth");


const signIn = async (req, res) => {
    // console.log(req.body);
    const { email, password } = req.body;

    try {

        const oldUser = await User.findOne({ email });

        if (!oldUser) {
            return res.status(400).json({ message: "User does not exist" })
        }

        const isMatch = await oldUser.comparePassword(password)

        // console.log(isMatch);

        if (isMatch) {
            const token = await oldUser.createJWT();

            return res.status(200).json({ result: oldUser, token })
        }

        return res.status(400).json({ message: "Invaild credentials" })

    } catch (error) {

        res.status(500).json({ message: "signin error" });
        console.log("signin error");


    }


}

const signUp = async (req, res) => {

    // console.log(req.body);

    const { email, name, password } = req.body;

    try {

        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(400).json({ message: "User already exist" })
        }

        const result = await User.create({
            email, name: name, password
        })

        const token = result.createJWT();

        // console.log(token);

        res.status(200).json({ result, token })

    } catch (error) {

        res.status(500).json({ message: "signup error" });
        console.log("signup error");

    }



}

module.exports = { signIn, signUp }