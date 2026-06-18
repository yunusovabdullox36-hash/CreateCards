const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Ism kiritish shart'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email kiritish shart'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Parol kiritish shart'],
    minlength: 6,
    select: false,
  },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (entered) {
  return await bcrypt.compare(entered, this.password);
};

module.exports = mongoose.model('User', userSchema);
