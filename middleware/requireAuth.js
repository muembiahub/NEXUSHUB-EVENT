function isAuthenticated(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  return res.status(401).send('Unauthorized - Authentication required Please log in.' );
}

module.exports = {
  isAuthenticated,
};