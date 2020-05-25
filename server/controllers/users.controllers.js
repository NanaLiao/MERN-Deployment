const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

module.exports={
  register(req,res ){
    User.create(req.body)
        .then(newUser => {
            const token = jwt.sign({
                id: newUser._id,
                email: newUser.email
            }, process.env.SECRET_KEY);
    
            res.cookie('token', token, {
                httpOnly: true
            })
            .json({status: 'Success'})
        })
        .catch(err => res.status(400).json(err));
},

async login(req,res){
  //find user by email
  //confirm pw is a match
  //sh store some info about the user
  const {email,password} = req.body;
  const user =await User.findOne({email}) // we want to wait until this complete
  if(user===null){
    return res.sendStatus(400);
   }
   const result = await bcrypt.compare(password,user.password);

    if(result===false){
      return res.sendStatus(400);
    }

    const token = jwt.sign({
      id:user._id,
      email:user.email
    },process.env.SECRET_KEY);

   res.cookie('token',token,{
     httpOnly:true
   });
    res.json({status:'success',token});

  // try{
  //   const user =await User.findOne({email}) // we want to wait until this complete
  //   if(user===null){
  //     throw new Error('Please check your email and password')
  //   }
  //   const result = await bcrypt.compare(password,user.password);

  //   if(result===false){
  //     throw new Error('Please check your email and password')
  //   }

  //   const token = jwt.sign({
  //     id:user._id,
  //     email:user.email
  //   },process.env.SECRET_KEY);

  //  res.cookie('token',token,{
  //    httpOnly:true
  //  });
  //   res.json({status:'success',token});


    
  // }catch(e){
  //   res.status(400).json({message:'Please check your email and password2'});

  // }

},

  logout(_req,res){
    res.clearCookie('token');
    res.json({status:"success"}); 

  }




}