const mongoose = require('mongoose');

const PirateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [
      true,
      'Please provide a private name!'
    ],
    minlength: [
      3,
      'Please provide a name that is at least 3 characters.'
    ]
  },
  catchPhrase: {
    type: String,
    required: [
      true,
      'Please provide a catch phrase!'
    ]
  },

  imageUrl: {
    type: String,
    required: [
      true,
      'Please provide an image URL!'
    ]
  },

 chest:{
  type: Number,
   required: [
    true,
    'Please provide treasure chest!'
  ]
 },

  pegLeg: {
    type: Boolean,
    required: [
      true,
      'Please specify if peg leg.'
    ]
  },
  
  eyePatch:{
    type: Boolean,
    required: [
      true,
      'Please specify if eye patch.'
    ]
  },

  hookHand:{
    type: Boolean,
    required: [
      true,
      'Please specify if hook hand.'
    ]
  },


  crewPosition:{
    type: String,
    required: [
      true,
      'Please provide crew position!'
    ]

  }

}, {
  timestamps: true
});

const Pirate = mongoose.model('Pirate', PirateSchema);

module.exports = Pirate;