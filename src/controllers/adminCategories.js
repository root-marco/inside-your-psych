export async function categories(req, res) {

	try {
		const categoryFind = await Category.find().sort({
			_id: -1,
		}).lean();
		res.render("admin/categories", {
			categories: categoryFind,
		});
	} catch {
		req.flash("error_msg", "unable to list categories.");
		res.redirect("/admin");
	}

}

export async function categoriesAdd(req, res) {

	res.render("admin/categoriesadd");

}

export async function categoriesNew(req, res) {

	let errors = [];
	const name = req.body.name;
	const slug = req.body.slug;

	if (!name || typeof name == undefined || name == null) {
		errors.push({
			text: "Invalid name",
		});
	}
	if (!slug || typeof slug == undefined || slug == null) {
		errors.push({
			text: "Invalid slug",
		});
	}

	if (errors.length == 0) {
		const newCategory = {
			name: name,
			slug: slug,
		};
		try {
			await new Category(newCategory).save();
			req.flash("success_msg", "successfully created category.");
			res.redirect("/admin/categories");
		} catch {
			req.flash("error_msg", "error creating category.");
		}
	} else {
		res.render("admin/categoriesadd", {
			errors: errors,
		});
	}

}

export async function categoriesEdit(req, res) {

	let errors = [];
	const name = req.body.name;
	const slug = req.body.slug;

	if (!name || typeof name == undefined || name == null)
		errors.push({
			text: "Invalid name",
		});

	if (!slug || typeof slug == undefined || slug == null)
		errors.push({
			text: "Invalid slug",
		});

	if (errors.length == 0) {
		try {
			const categoryFindOne = await Category.findOne({
				_id: req.body.id,
			});
			categoryFindOne.name = req.body.name;
			categoryFindOne.slug = req.body.slug;
			try {
				categoryFindOne.save();
				req.flash("success_msg", "successfully edited category.");
				res.redirect("/admin/categories");
			} catch {
				req.flash("error_msg", "error when save category.");
				res.redirect("/admin/categories");
			}
		} catch {
			req.flash("error_msg", "error when find category.");
			res.redirect("/admin/categories");
		}
	} else {
		res.render("admin/categoriesedit", {
			errors: errors,
		});
	}

}

export async function categoriesEditId(req, res) {

	try {
		const categoryFindOne = await Category.findOne({
			_id: req.params.id,
		}).lean();
		res.render("admin/categoriesedit", {
			category: categoryFindOne,
		});
	} catch {
		req.flash("error_msg", "this category doesn't exist.");
		res.redirect("/admin/categories");
	}

}

export async function categoriesDeleteId(req, res) {

	try {
		await Category.findByIdAndDelete(req.params.id);
		req.flash("success_msg", "successfully deleted category.");
		res.redirect("/admin/categories");
	} catch {
		req.flash("error_msg", "error deleting category.");
		res.redirect("/admin/categories");
	}

}