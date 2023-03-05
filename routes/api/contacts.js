const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateFavorite,
} = require("../../controllers/contacts");
// const { contactsControlers } = "../../controllers";
const {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateFavorite,
} = require("../../controllers/contacts");
// const { contactsControlers } = "../../controllers";
const { schemas } = require("../../models/contact");
const { validateBody, isValidId } = require("../../middlewares");

router.get("/", contactsControlers.getContacts);
router.get("/:id", isValidId, contactsControlers.getContactById);
router.post(
  "/",
  validateBody(schemas.addSchema),
  contactsControlers.addContact
);
router.delete("/:id", isValidId, contactsControlers.removeContact);
router.put(
  "/:id",
  isValidId,
  validateBody(schemas.addSchema),
  contactsControlers.updateContact
);
router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  updateFavorite
);

module.exports = router;
