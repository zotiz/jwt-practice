const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const cors = require('cors')
const databaseConnection = require('./config/connectdb')
const userRouter = require('./routes/userRoutes')
//! create server
const app = express()

//*cors policy
app.use(cors())

//* Databse connection;
const DATABASE_URL = process.env.DATABASE_URL
databaseConnection(DATABASE_URL)

//* JSON
app.use(express.json())

//? Load Routes
app.use('/api/user', userRouter)

//* Listening to the server
const port = process.env.PORT
app.listen(port, () => {
  console.log('Listening to the port number ' + port)
})
