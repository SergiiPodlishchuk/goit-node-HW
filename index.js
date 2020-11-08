const contacts = require("./contacts.js");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const PORT = 3010;

const contactsPath = path.join(__dirname, "/db/contacts.json");

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3010" }));

const contactsRouter = express.Router();
app.use("/api/contacts", contactsRouter);

contactsRouter.get("/", listContacts);
contactsRouter.get("/:contactId", getById);
contactsRouter.post("/", addContact);
contactsRouter.delete("/:contactId", removeContact);
contactsRouter.patch("/:contactId", updateContact);

function listContacts(req, res, next) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) throw err;
    res.status(200).send(JSON.parse(data));
  });
}

function getById(req, res, next) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    const contactById = JSON.parse(data).find(
      (contact) => contact.id === parseInt(req.params.contactId)
    );
    if (contactById) {
      res.status(200).send(contactById);
    } else {
      res.status(404).send({ message: "Not found" });
    }
  });
}

function addContact(req, res, next) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    const users = JSON.parse(data);
    const newUser = {
      ...req.body,
      id: users.length + 1,
    };
    users.push(newUser);
    const content = JSON.stringify(users, null, 1);
    fs.writeFile(contactsPath, content, (err, data) => {});
    console.log(req.body.name === undefined);

    let name_Field = "";

    if (req.body.name === undefined) {
      name_Field = "name";
    } else if (req.body.email === undefined) {
      name_Field = "email";
    } else if (req.body.phone === undefined) {
      name_Field = "phone";
    }

    if (name_Field !== "") {
      return res
        .status(400)
        .send({ message: `missing required ${name_Field}` });
    } else {
      return res.status(201).send(newUser);
    }
  });
}

function removeContact(req, res, next) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    const users = JSON.parse(data);
    const userById = users.find(
      (user) => user.id === parseInt(req.params.contactId)
    );
    const indexUser = users.indexOf(userById);
    users.splice(indexUser, 1);
    const content = JSON.stringify(users, null, 1);
    fs.writeFile(contactsPath, content, (err, data) => {});
    if (userById) {
      res.status(200).send({ message: "contact deleted" });
    } else {
      res.status(404).send({ message: "Not found" });
    }
  });
}

function updateContact(req, res, next) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    const users = JSON.parse(data);
    const userById = users.find(
      (user) => user.id === parseInt(req.params.contactId)
    );
    const indexUser = users.indexOf(userById);
    users[indexUser] = {
      ...users[indexUser],
      ...req.body,
    };
    const content = JSON.stringify(users, null, 1);
    fs.writeFile(contactsPath, content, (err, data) => {});

    let name_Field = "";

    if (req.body.name) {
      name_Field = req.body.name;
    } else if (req.body.email) {
      name_Field = req.body.email;
    } else if (req.body.phone) {
      name_Field = req.body.phone;
    }

    if (name_Field === "") {
      return res.status(400).send({ message: "missing fields" });
    }

    if (userById) {
      return res.status(200).send(users[indexUser]);
    } else {
      return res.status(404).send({ message: "Not found" });
    }
  });
}

app.listen(PORT, () => {
  console.log("starting server by port", PORT);
});
