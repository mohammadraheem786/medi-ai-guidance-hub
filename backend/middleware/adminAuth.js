
module.exports = function(req, res, next) {
  // Check if user has admin role
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }
  
  next();
};
