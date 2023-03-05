const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {

    try {

        console.log('auth');

        const token = req.headers.authorization.split(" ")[1];

        let = decodedData = jwt.verify(token, process.env.JWT_SECRET)

        req.userEmail = decodedData?.id;

        next();

    } catch (error) {
        console.log("auth error");
    }

}

module.exports = auth;