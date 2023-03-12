const {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateFavorite,
} = require("./contacts");
const { register, login, getCurrent, logout, updateAvatar, changeSubscription} = require("./auth");

module.exports = {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateFavorite,
  register,
  login,
  getCurrent,
  logout,
  updateAvatar,
  changeSubscription,
};
