const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const PORT = 3010;
const MONGO_DB_URL =
  "mongodb+srv://podluy23:magazin12@cluster0.s8rqh.mongodb.net/db_contacts";

async function connect_DB() {
  return await mongoose.connect(
    MONGO_DB_URL,
    {
      useUnifiedTopology: true,
    },
    function (error) {
      if (error) {
        console.log(error);
        process.exit(1);
      }
      console.log("Database connection successful");
    }
  );
}

connect_DB();

const contactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  subscription: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String, required: false },
});

const contactModel = mongoose.model("Contact", contactSchema);

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3010" }));
app.use(morgan("combined"));

const contactsRouter = express.Router();
app.use("/api/contacts", contactsRouter);

contactsRouter.get("/", listContacts);
contactsRouter.get("/:contactId", getById);
contactsRouter.post("/", addContact);
contactsRouter.delete("/:contactId", removeContact);
contactsRouter.patch("/:contactId", updateContact);

async function listContacts(req, res, next) {
  try {
    const listContact = await contactModel.find();
    res.status(200).json(listContact);
    console.log(listContacts);
  } catch (error) {
    next(error);
  }
}

async function getById(req, res, next) {
  try {
    const contactId = req.params.contactId;
    const contactById = await contactModel.findById(contactId);

    if (!contactById) {
      return res.status(404).send();
    }

    return res.status(200).json(contactById);
  } catch (error) {
    next(error);
  }
}

async function addContact(req, res, next) {
  try {
    const contactCreate = await contactModel.create(req.body);
    return res.status(201).json(contactCreate);
  } catch (error) {
    next(error);
  }
}

async function removeContact(req, res, next) {
  try {
    const contactId = req.params.contactId;
    const deleteContact = await contactModel.findByIdAndDelete(contactId);

    if (!deleteContact) {
      return res.status(404).send();
    }

    return res.status(204).json(deleteContact);
  } catch (error) {
    next(error);
  }
}

async function updateContact(req, res, next) {
  try {
    const contactId = req.params.contactId;
    const updateContact = await contactModel.findByIdAndUpdate(
      contactId,
      req.body
    );
    if (!updateContact) {
      return res.status(404).send();
    }
    console.log(updateContact);
    return res.status(204).send(updateContact);
  } catch (error) {
    next(error);
  }
}

app.listen(PORT, () => {
  console.log("starting server by port", PORT);
});
