const express = require('express');
const Image = require('./models/imagenes');
const image_finder_middleware = require('./middlewares/find_image');

const router = express.Router();

// app.com/app/ es relativo a /
router.get('/', (req, res) => {
  // Buscar el usuario
  res.render('app/home')
});

/** REST CRUD */


router.get('/imagenes/new', (req, res) => {
  res.render('app/imagenes/new');
});

router.all('/imagenes/:id*', image_finder_middleware);

router.get('/imagenes/:id/edit', (req, res) => {
  res.render('app/imagenes/edit');
});

router.route('/imagenes/:id')
  .get((req, res) => {
    res.render('app/imagenes/show');
  })
  .put((req, res) => {
    res.locals.imagen.title = req.body.title;
    res.locals.imagen.save((err) => {
      if(!err) {
        res.render('app/imagenes/show');
      } else {
        res.render(`app/imagenes/${res.params.id}/edit`);
      }
    });
  })
  .delete((req, res) => {
    /*
      -- Aquí realiza dos queries--
      Image.findById(req.params.id, (err, imagen) => {
      // Lo que tengas que hacer con la imagen
      imagen.remove();
    }); */
    
    // Eliminar imagenes
    Image.findOneAndRemove({ _id: req.params.id }, err => {
      if(!err) {
        res.redirect('/app/imagenes')
      } else {
        console.log(err);
        res.redirect(`/app/imagenes/${req.params.id}`)
      }
    })
  })

router.route('/imagenes')
  .get((req, res) => {
    Image.find({}, (err, imagenes) => {
      if(err){ res.redirect('/app'); return; }
      res.render('app/imagenes/index', { imagenes })
    });
  })
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
