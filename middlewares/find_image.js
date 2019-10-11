const Image = require('../models/imagenes');

module.exports = function(req, res, next) {
  Image.findById(req.params.id, (err, imagen) => {
    if(imagen !== null) {
      res.locals.imagen = imagen;
      next();
    } else {
      res.redirect('/app');
    }
  });
}
