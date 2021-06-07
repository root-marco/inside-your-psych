const isAdmin = (req, res, next) => {

	if (req.isAuthenticated() && req.user.isAdmin === 1) {
		return next();
	}

	req.flash("error_msg", "You're not admin");
	res.redirect("/");

}

export default isAdmin;
