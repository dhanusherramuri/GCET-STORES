const mongoose = require('mongoose');

const MaterialIssueSchema = new mongoose.Schema({
  issueId: {
    type: String,
    required: true,
    unique: true
  },
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ConsumableItem',
    required: true
  },
  itemName: {
    type: String,
    required: true
  },
  requiredQty: {
    type: Number,
    required: true,
    min: 0
  },
  issuedQty: {
    type: Number,
    required: true,
    min: 0
  },
  remainingQty: {
    type: Number,
    required: true,
    min: 0
  },
  department: {
    type: String,
    required: true
  },
  issuerName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'issued'],
    default: 'pending'
  },
  departmentIssueDate: {
    type: Date
  }
}, {
  timestamps: true
});

const MaterialIssue = mongoose.model('MaterialIssue', MaterialIssueSchema);

module.exports = MaterialIssue;