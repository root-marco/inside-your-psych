// MODULES
import methodOverride from "method-override";
import handlebars from "express-handlebars";
import session from "express-session";
import flash from "connect-flash";
import mongoose from "mongoose";
import passport from "passport";
import express from "express";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

// APP
const app = express();
const PORT = process.env.PORT || 3000;
app.set("views", path.join(`${process.cwd()}/src/views`));

// METHOD OVERRIDE
app.use(methodOverride("_method"));

// SESSION
app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true,
}));

// PASSPORT
import configAuth from "./src/config/auth.js";
app.use(passport.initialize());
app.use(passport.session());
configAuth(passport);

// FLASH
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

// EXPRESS
app.use(express.static(`${process.cwd()}/src/public/covers`));
app.use(express.urlencoded({
  extended: true,
}));
app.use(express.json());

// HANDLEBARS
app.engine("handlebars", handlebars({
  defaultLayout: "main",
}));
app.set("view engine", "handlebars");

// ROUTES
import rootRouter from "./src/routes/root.js";
app.use("/", rootRouter);
import adminRouter from "./src/routes/admin.js";
app.use("/admin", adminRouter);
import userRouter from "./src/routes/user.js";
app.use("/user", userRouter);

// MONGOOSE
try {
  await mongoose.connect(process.env.MONGOURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("database connected");
} catch (error) {
  console.log(error);
}

// LISTEN
app.listen(PORT, () => {
  console.log(`server running on localhost:${PORT}`);
});