const jwt = require("jsonwebtoken");

module.exports.authenticate = (req, res, next) => {

  try{
    
    console.log(jwt.verify(req.cookies.token, process.env.SECRET_KEY));
    jwt.verify(req.cookies.token, process.env.SECRET_KEY);
    next();
  }
  catch(e){
    res.status(401).json({message:"unauthorized"});
  }
}