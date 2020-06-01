/**
 * File Name: database.js
 * Description: Utility file to manage database connection for this application
 */
// replace the uri string with your connection string.
const uri = "mongodb+srv://raju:raju123@cluster0-ikpuh.mongodb.net/uc-events-db?retryWrites=true&w=majority";
const mongoose = require('mongoose');

/**
 * Method Name: connectToDb
 * Description: Method to connect mongodb using mongoose connection
 */
const connectToDb = async () => {
   // Connect to db. We can also have callback to check db connnect success or any error
   await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
}

module.exports = {
   connectToDb: connectToDb
}