function requireAuth(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  return res.status(401).send('Unauthorized - Authentication required Please log in.' );
}

function fieldValidator(requiredFields) {
  return (req, res, next) => {
    const missingFields = requiredFields.filter(field => !(field in req.body));
    if (missingFields.length > 0) {
        return res.status(400).send( `Missing required fields: ${missingFields.join(', ')}` );
    }
    return next();
  };
}


module.exports = {
  requireAuth,
    fieldValidator
};