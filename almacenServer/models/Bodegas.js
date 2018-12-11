const Schema = require('mongoose').Schema

const bodegasSchema = new require('mongoose').Schema({
  name: String,
  objetos: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Objetos'
    }
  ],
  user:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
},{
  timestamps:{
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = require('mongoose').model('Bodegas', bodegasSchema);