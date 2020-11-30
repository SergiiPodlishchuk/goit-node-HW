const contacts = require("./contacts.js");
const yargs = require("yargs");

// index.js
const argv = require("yargs").argv;
console.log(argv);

// TODO: рефакторить
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contacts.listContacts();
      break;

    case "get":
      contacts.getContactById(id);
      break;

    case "add":
      // ... name email phone
      contacts.addContact(name, email, phone);
      break;

    case "remove":
      // ... id
      contacts.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

