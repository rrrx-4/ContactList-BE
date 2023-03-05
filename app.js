const express = require("express");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");

const authRouter = require("./router/user")
const contactRouter = require("./router/contact")
const connect = require("./connectDB/connect");



const app = express();


// const corsOpts = {
//     origin: '*',

//     methods: [
//         'GET',
//         'POST',
//     ],

//     allowedHeaders: [
//         'Content-Type',
//     ],
// };


app.use(morgan('dev'))
app.use(express.json({ limit: '30mb', extended: true }))

app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

// app.use('/', (req, res) => res.json({ message: "hello" }))


app.use("/users", authRouter);
app.use("/data", contactRouter);


const port = 3000;
const start = async () => {

    try {

        await connect(process.env.MONGO_URL);

        app.listen(port, () => {
            console.log(`server is listening on port ${port}`);
        })

    } catch (error) {
        console.log(error);
    }


}

start();