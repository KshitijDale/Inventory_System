const mongoose = require('mongoose');
const { Schema } = mongoose;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    login_id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    user_type: { type: mongoose.Schema.Types.ObjectId, ref: 'UserType', required: true }, //Reference to UserType
    name: { type: String, default: 'User' },
    refrestoken: {
      type: String
    }
  });

  userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password,10);
    return next();
  })
  
  userSchema.method('isPasswordCorrect', async function(password){
    // console.log(password);
    return await bcrypt.compare(password,this.password);
  })


  userSchema.method('generateAccessToken', function(){
    return jwt.sign(
      {
        _id : this._id,
        name : this.name,
        login_id: this.login_id,
        user_type: this.user_type
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
    )
  })

  userSchema.methods.refreshAccessToken = function(){
    return jwt.sign(
      {
        _id : this._id
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }
    )
  }
module.exports = mongoose.model('User', userSchema);