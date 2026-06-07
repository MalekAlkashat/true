export function requireAdmin(req, res, next) {
  if (req.session?.isAdmin) {
    return next();
  }

  return res.redirect('/admin/login');
}

export function requireAdminFile(req, res, next) {
  if (req.session?.isAdmin) {
    return next();
  }

  return res.status(401).send('Unauthorized');
}
