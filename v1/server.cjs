const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const router = require("./routes/router.cjs");
const { PORT } = require("./config/index.cjs");


const server = express();

server.disable("x-powered-by"); //Reduce fingerprinting
server.use(bodyParser.json());
server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: false }));


const corsOptions = {
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200
}
server.use(cors(corsOptions))

server.use("/",router)

server.listen(PORT, () => console.log(`Server in esecuzione sulla porta ${PORT}`));
