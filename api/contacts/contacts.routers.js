const { Router } = require("express");
const contactsControllers = require("./contacts.controllers");
const contactsRouter = Router();

contactsRouter.get("/", contactsControllers.listContacts);
contactsRouter.get(
  "/:contactId",
  contactsControllers.validateId,
  contactsControllers.getById
);
contactsRouter.post(
  "/",
  contactsControllers.validateContact,
  contactsControllers.addContact
);
contactsRouter.delete(
  "/:contactId",
  contactsControllers.validateId,
  contactsControllers.removeContact
);
contactsRouter.patch(
  "/:contactId",
  contactsControllers.validateId,
  contactsControllers.validateUpdateContact,
  contactsControllers.updateContact
);

module.exports = contactsRouter;
