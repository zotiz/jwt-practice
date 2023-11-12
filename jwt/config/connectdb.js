const mongoose = require('mongoose')

const databaseConnection = async (DATABASE_URL) => {
  try {
    const database_option = {
      dbName: 'Dahal',
    }
    await mongoose.connect(DATABASE_URL, database_option)
    console.log('Database connection succesfully.')
  } catch (error) {
    console.log(error)
  }
}

module.exports = databaseConnection
