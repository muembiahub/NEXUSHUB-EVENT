function homepage(req, res) {
  res.send(`${req.user ? `- Welcome, ${req.user.email}!` : '- Please log in to access more features.'}`);
}

module.exports = { homepage };