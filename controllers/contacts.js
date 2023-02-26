const {Contact} = require("../models/contact")
const { HttpError, ctrlWrapper } = require("../helpers");


const getContacts = async (req, res, next) => {
  const result = await Contact.find();
  console.log(result)
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findOne({_id: id});
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const addContact = async (req, res, next) => {
const reqBody = req.body;
if(!reqBody) {reqBody.favorite = false}
  const result = await Contact.create(reqBody);
  res.status(201).json(result);
};

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
  if (!result) {
    HttpError(404, "Not found");
  }
  res.status(201).json(result);
};

const updateFavorite = async (req, res, next) => {
  const { id } = req.params;
  if(!req.body) {
    HttpError(400, "missing field favorite")
  }
  const result = await Contact.findByIdAndUpdate(id, req.body, {new: true});
  if (!result) {
    HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Delete success" });
};

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
  removeContact: ctrlWrapper(removeContact),
};
