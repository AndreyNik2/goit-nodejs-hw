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
const { schemas } = require("../../models/contact");
const { validateBody, isValidId } = require("../../middlewares");

router.get("/", getContacts);
router.get("/:id", isValidId, getContactById);
router.post(
  "/",
  validateBody(schemas.addSchema),
  addContact
);
router.delete("/:id", isValidId, removeContact);
router.put(
  "/:id",
  isValidId,
  validateBody(schemas.addSchema),
  updateContact
);
router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  updateFavorite
);

module.exports = router;
