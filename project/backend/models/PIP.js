const mongoose = require('mongoose');

const PurchaseIndentItemSchema = new mongoose.Schema({
  psNo : {
    type: String,
    required: true
    // unique: true
  },
  date :{
    type: String,
    required: true
  },
  department :{
    type: String,
    required: true
  },
  serialNo: {
    type: Number,
    required: true
  },
    itemDescription: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  unitPrice :{
    type: Number,
    required: true
  },
  totalPrice :{
    type: Number,
    required: true
  },
  remarks :{
    type: String,
    required: true
  },
  status :{
    type: String,
    required: true
  },
});

const Pimodel = mongoose.model('PIP', PurchaseIndentItemSchema);

module.exports = Pimodel;
