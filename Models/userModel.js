const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'user must have email'],
    unique: [true, 'this email is already in use'],
    validate: [validator.isEmail, 'please provide correct email'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'a user must have a password'],
    minlength: 6,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'you have to retype a previous password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'password are not the same',
    },
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  passwordChangedAt: Date,

  follower: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    }
  ],
  following: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  }
  ],

},
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual('followers', {
  ref: 'User',
  foreignField: '_id',
  localField: '_id',
});

userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};


const User = mongoose.model('User', userSchema);
module.exports = User;
