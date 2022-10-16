const express = require('express')
const app = express()
const cors = require('cors')
const port = 3001
const routes = require('./routes')
const errorHandler = require('./middleware/errHandler')

app.use(express.json())
app.use(cors())

app.use(routes)

app.use(errorHandler)

app.listen(port, ()=> console.log(`ON PORT ${port}`))