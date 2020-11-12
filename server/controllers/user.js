const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../config");

exports.register = async (req, res, next) => {
  const { username, email, password, passwordConfirmation } = req.body;

  try {
    if (password !== passwordConfirmation)
      return res.status(422).send({ error: "Password is not match" });

    const isExist = await User.findOne({ email });

    if (isExist)
      return res.status(422).send({ error: `Email '${email}' already exist.` });

    const newUser = await User.create({
      username,
      email,
      password,
    });

    return res.status(200).json({
      message: `User with email '${newUser.email}' is registered successfully!`,
    });
  } catch (err) {
    return res.mongoError(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!password || !email)
    return res.status(422).send({
      error: "Email or password is missing!",
    });

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(422).send({
        error: `Provided email not exist in the system.`,
      });

    if (!user.hasSamePassword(password))
      return res.status(422).send({
        error: "Provided password is incorrect!",
      });

    const { username, id } = user;
    const token = jwt.sign(
      {
        id,
        username,
      },
      config.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.status(200).json(token);
  } catch (error) {
    return res.mongoError(err);
  }
};

exports.authUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token)
      return res
        .status(401)
        .send({ error: "Unauthorized access. Please login!" });

    const decoded = jwt.verify(token.split(" ")[1], config.JWT_SECRET);
    if (!decoded) return res.status(401).send({ error: "Invalid token!" });

    const user = await User.findById(decoded.id);
    if (!user)
      return res.status(404).send({ error: "Token used with invalid user" });

    res.locals.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.mongoError(error);
  }
};
