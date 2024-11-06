import express from "express";

import {
  getContact,
  getContacts,
  createContacts,
  updateContact,
  deleteContact,
} from "../Controllers/myContControllers.js";
import ValidateToken from "../middlewares/validateTokenHandler.js";

const mycontacts = express.Router();

mycontacts.use(ValidateToken);

mycontacts.route("/")
.get(getContacts)
.post(createContacts);

mycontacts
  .route("/:id")
  .get(getContact)
  .put(updateContact)
  .delete(deleteContact);

export default mycontacts;
