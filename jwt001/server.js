require('dotenv').config()
const express = require('express')
const dbConnection = require('./config/dbConnection')
const userRouter = require('./routes/userRoutes')
//! create server

const server = express()

//! Middleware

server.use(express.json())
//! Router
server.use('/', userRouter)
//! database connection
const dbs_url = process.env.DATABASE_URL
dbConnection(dbs_url)

//! listening to the server
const port = process.env.PORT
server.listen(port, () => {
  console.log('conneting to the server...')
})
