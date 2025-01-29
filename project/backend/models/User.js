const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    Un: String,
    Pwd: String,
    Role: String
}, { collection: 'login' }); // Specify the exact collection name here

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
