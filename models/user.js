const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },// s'assure ici qu'il ne peut y avoir deux utilisateurs ac le mm mail
  password: { type: String, required: true }
}, {
  writeConcern: {
    j: true,
    wtimeout: 1000
  }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);