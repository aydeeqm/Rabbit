const express = require('express');
const Image = require('./models/imagenes');

const router = express.Router();

// app.com/app/ es relativo a /
router.get('/', (req, res) => {
  // Buscar el usuario
  res.render('app/home')
});

// REST

router.get('/imagenes/new', (req, res) => {
  res.render('app/imagenes/new');
});

router.get('/imagenes/:id/edit', (req, res) => {

});

router.route('/imagenes/:id')
  .get((req, res) => {
    Image.findById(req.params.id, (err, image) => {
      res.render('app/imagenes/show', { imagen: image });
    });
  })
  .put((req, res) => {})
  .delete((req, res) => {})

router.route('/imagenes')
  .get((req, res) => {})
  .post((req, res) => {
    const data = { title: req.body.title };
    const image = new Image(data);
    
    image.save((err) => {
      if(!err){
        res.redirect(`/app/imagenes/${image._id}`)
      } else {
        res.render(err)
      }
    })
  })


module.exports = router;
