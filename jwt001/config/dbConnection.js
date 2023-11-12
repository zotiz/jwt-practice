const mongoose = require('mongoose')

const dbConnection = async (dbs_url) => {
  try {
    const dbs_option = {
      dbName: 'BodhRaj_DBS',
    }
    await mongoose.connect(dbs_url, dbs_option)
    console.log('dbs connection successfully.')
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = dbConnection
