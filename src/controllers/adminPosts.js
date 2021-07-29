import Post from "../models/Post.js";
import Category from "../models/Category.js";

export async function posts(req, res) {

  try {

    const postFind = await Post.find().sort({
      _id: -1,
    }).populate("category").lean();
    res.render("admin/posts", {
      posts: postFind,
    });
  } catch {
    req.flash("error_msg", "unable to list posts.");
    res.redirect("/posts");
  }

}

export async function postsAdd(req, res) {

  try {

    const categoryFind = await Category.find().lean();

    res.render("admin/postsadd", {
      categories: categoryFind,
    });

  } catch {
    req.flash("error_msg", "error to load form.");
    res.redirect("admin/posts");
  }

}

export async function postsNew(req, res) {

  let errors = [];

  const { title, slug, description, content, category } = req.body;

  if (!title) errors.push({text: "Invalid title"});
  if (!slug) errors.push({text: "Invalid slug"});
  if (!description) errors.push({text: "Invalid description"});
  if (!content) errors.push({text: "Invalid content"});
  if (category == "0") errors.push({text: "Invalid category"});

  if (errors.length == 0) {

    const newPost = {
      title: title,
      slug: slug,
      description: description,
      content: content,
      category: category,
    };

    try {
      await new Post(newPost).save();
      req.flash("success_msg", "successfully created post.");
      res.redirect("/admin/posts");
    } catch {
      req.flash("error_msg", "error creating post.");
    }

  } else {
    res.render("admin/posts", {
      errors: errors,
    });
  }

}

export async function postsEdit(req, res) {

  try {

    const postFindOne = await Post.findOne({
      _id: req.body.id,
    });

    postFindOne.title = req.body.title;
    postFindOne.slug = req.body.slug;
    postFindOne.description = req.body.description;
    postFindOne.content = req.body.content;
    postFindOne.category = req.body.category;

    try {
      postFindOne.save();
      req.flash("success_msg", "successfully edited post.");
      res.redirect("/admin/posts");
    } catch {
      req.flash("error_msg", "error when save post.");
      res.redirect("/admin/posts");
    }

  } catch {
    req.flash("error_msg", "error when find post.");
    res.redirect("/admin/posts");
  }

}

export async function postsEditId(req, res) {

  try {

    const postFindOne = await Post.findOne({
      _id: req.params.id,
    }).lean();

    try {
      const categoryFind = await Category.find().lean();
      res.render("admin/postsedit", {
        categories: categoryFind,
        post: postFindOne,
      });
    } catch {
      req.flash("error_msg", "failed to list categories");
      res.redirect("/admin/posts");
    }
  } catch {
    req.flash("error_msg", "failed to load form");
    res.redirect("/admin/posts");
  }

}

export async function postsDeleteId(req, res) {

  try {
    await Post.findByIdAndDelete(req.params.id);
    req.flash("success_msg", "successfully deleted post.");
    res.redirect("/admin/posts");
  } catch {
    req.flash("error_msg", "error deleting post.");
    res.redirect("/admin/posts");
  }

}