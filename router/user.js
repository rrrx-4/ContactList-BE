const express = require("express");

const { signUp, signIn } = require("../controllers/user");

const router = express.Router();


router.post("/signin", signIn);
router.post("/signup", signUp);


module.exports = router;