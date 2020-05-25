const Pirate = require('../models/pirate.model');

module.exports.createPirate = (req, res) => {
  Pirate.create(req.body)
    .then(createdPirate => res.json(createdPirate))
    .catch(err => res.status(400).json(err));
}
  
module.exports.getAll = (_req, res) => {
  Pirate.find({}).sort({name:1})
    .then(pirates => res.json(pirates))
    .catch(err => res.json(err));
}
  
module.exports.getOne = (req, res) => {
  Pirate.findById(req.params.id)
    .then(pirate => res.json(pirate))
    .catch(err => res.json(err));
}

module.exports.delete = (req, res) => {
  Pirate.findByIdAndDelete(req.params.id)
    .then(() => res.json({ status: 'success' }))
    .catch(err => res.json(err));
}

module.exports.update = (req, res) => {
  Pirate.findByIdAndUpdate(
    req.params.id,
     req.body,
    {
      new: true,
      runValidators: true
    }
  )
    .then(updatedPirate => res.json(updatedPirate))
    .catch(err => res.status(400).json(err));
}

