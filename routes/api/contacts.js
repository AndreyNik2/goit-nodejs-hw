const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
  updateFavorite,
} = require("../../controllers");
const { schemas } = require("../../models/contact");
const { validateBody, isValidId, authenticate } = require("../../middlewares");

router.get("/", authenticate, getContacts);
router.get("/:id", authenticate, isValidId, getContactById);
router.post("/", authenticate, validateBody(schemas.addSchema), addContact);
router.delete("/:id", authenticate, isValidId, removeContact);
router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  updateContact
);
router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  updateFavorite
);

module.exports = router;
