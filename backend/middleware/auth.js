// middleware//auth.js
function isAuthenticated(req, res, next) {
  if (req.session && req.session.admin) {
    return next();
  } else {
    return res.status(401).json({ message: 'ログインが必要です' });
  }
}

module.exports = {
  isAuthenticated
};
