const client = require('../dbClient')

module.exports = {
  create: (user, callback) => {
    // Check parameters
    if(!user.username)
      return callback(new Error("Wrong user parameters"), null)
    // Create User schema
    const userObj = {
      firstname: user.firstname,
      lastname: user.lastname,
    }
    // Save to DB
    // TODO check if user already exists
    client.exists(user.username,(err, res) => {
      if(res == 1) return callback(new Error("user already exist"), null)
      client.hmset(user.username, userObj, (err, res) => {
        if (err) return callback(err, null)
        callback(null, res) // Return callback
      })
    })
  },

   get: (username, callback) => {
     client.hgetall(username, (err, res) => {
      if (err) return callback(err, null)
      if(res == null) return callback( new Error("unsuccessfully get user/user does not exist"), null)
      res.username=username
      callback(null, res) // Return callback
   })
  }
}
