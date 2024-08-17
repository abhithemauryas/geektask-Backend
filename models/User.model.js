const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
  },
  username: {
    type: String,
    required: true,
    trim: true, 
    minlength: 3, 
    maxlength: 30, 
  },
  phoneNumber: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Phone number must be 10 digits"], // Validates phone number format
  },
  password: {
    type: String,
    required: true,
    minlength: 5, 
  },
  profession: {
    type: String,
    required: true,
    trim: true, 
  },
}, { timestamps: true }); 

const UserModel = mongoose.model('User', UserSchema);

module.exports = {
  UserModel,
};
