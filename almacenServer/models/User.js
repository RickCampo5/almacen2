const passportLocalMongoose = require('passport-local-mongoose');
const Schema = require('mongoose').Schema;
const userSchema = new require('mongoose').Schema({
  username: String,
  email: String,
  bodegas: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Bodegas'
    }
  ]
},{
  timestamps:{
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

userSchema.plugin(passportLocalMongoose, {usernameField:'email'});

module.exports = require('mongoose').model('User', userSchema);