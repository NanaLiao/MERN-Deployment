const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/pirates',{
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useFindAndModify:true,
  useCreateIndex:true
});