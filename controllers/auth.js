const { User } = require("../models/user");
const { ctrlWrapper, HttpError } = require("../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "User is already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or passward is invalid");
  }
  const passwardCompare = await bcrypt.compare(password, user.password);
  if (!passwardCompare) {
    throw HttpError(401, "Email or passward is invalid");
  }
  const payload = {
   id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"})
  await User.findByIdAndUpdate(user._id, ({token}))

  res.json({token})
};

const getCurrent = async (req,res) => {
  const {email, user} = req.user;

  res.json({email, user})
}

const logout = async (req,res) => {
  const {_id} = req.user;
  await User.findByIdAndUpdate(_id, ({token:""}))
  res.status(204).json({messege: "logout success"})
} 

// const changeSubscription = async (req, res) => {
//   const {_id} = req.user;
//   const {subscription} = req.params
//   await User.findByIdAndUpdate(_id, ({subscription}))

// }

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  // changeSubscription: ctrlWrapper(changeSubscription)

};
