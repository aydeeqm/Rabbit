const express = require('express');

const router = express.Router();

// app.com/app/ es relativo a /
router.get('/', (req, res) => {
  // Buscar el usuario
  res.render('app/home')
});

module.exports = router;
