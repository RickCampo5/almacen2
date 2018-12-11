const Schema = require('mongoose').Schema
const objetosSchema = new require('mongoose').Schema({
  name: String,
  qty: Number,
  caducidad: Date,
  bodega: {
    type: Schema.Types.ObjectId,
    ref: 'Bodegas'
  }
},{
  timestamps:{
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

module.exports = require('mongoose').model('Objetos', objetosSchema);