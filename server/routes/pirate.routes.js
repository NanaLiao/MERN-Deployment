const piratesCtl = require('../controllers/pirate.controller');

const {authenticate} =require('../config/jwt.config');

module.exports = app => {

  app.get('/api/pirates', authenticate,piratesCtl.getAll);
  app.post('/api/pirates',piratesCtl.createPirate);
  app.get('/api/pirates/:id', piratesCtl.getOne);
  app.delete('/api/pirates/:id', piratesCtl.delete);
  app.put('/api/pirates/:id', piratesCtl.update);


}