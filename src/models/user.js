const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  image: String,
}, { timestamps: true });


// before user is saved, store the hashed password
userSchema.pre('save', function preSaveUser(next) {
  const user = this;
  // if the password is not modified, dont change it
  if (!user.isModified('password')) { return next(); }
  // get the hash of the password
  return bcrypt.hash(user.password, 10).then((hashedPassword) => {
    user.password = hashedPassword;
    next();
  }).catch(next);
});
// compare if the password of logins is the password of the user
userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return reject(err);
      return resolve(isMatch);
    });
  });
};
module.exports = mongoose.model('user', userSchema);
