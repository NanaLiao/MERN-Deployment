const mongoose =require ('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  firstName:{
    type:String,
    minlength:[
      2,
      'please enter at least 2 chars for first name'
    ]
  },

  lastName:{
    type:String,
    minlength:[
      2,
      'please enter at least 2 chars for last name'
    ]
  },

  email:{
    type:String,
    unique:true,
    required: [
      true,
      "Email is required"
    ],
    validate:{
      validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
      message: "Please enter a valid email"
    }
  },

  password:{
    type:String,
    minlength:[
      3,
      'Please enter at least 3 chars for password.'
    ]
  }

},{
  timestamps:true
});

UserSchema.virtual('confirmPassword')
  .get( () => this._confirmPassword )
  .set( value => this._confirmPassword = value );



UserSchema.pre('validate', function(next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
  });


UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 10)
    .then(hash => {
        this.password = hash;
        next();
      });
  });

module.exports = mongoose.model("User",UserSchema);