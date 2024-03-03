const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 4000
const cors = require('cors')
const router = require('./routes/router.cjs')



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


const corsOptions = {
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

app.use('/',router)

app.listen(PORT, () => console.log(`Server in esecuzione sulla porta ${PORT}`));
