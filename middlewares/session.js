const User = require('../models/user').User;

module.exports = function(req, res, next){
  if(!req.session.user_id){
    res.redirect('/login')
  }

  User.findById(req.session.user_id, (err, user) => {
    if(err) {
      console.log(err);
      res.redirect('/login');
    }
    res.locals = { user };
    next();
  });
}
