const fs = require("fs");
const path = require("path");

const contactsPath = path.join(__dirname, "/db/contacts.json");

const users = JSON.parse(fs.readFileSync(contactsPath).toString());

// TODO: задокументировать каждую функцию
function listContacts() {
  /**
   * @param {contactsPath:}
   */
  console.table(
    fs.readFile(contactsPath, "utf8", (err, data) => {
      if (err) throw err;
      console.log(data);
    })
  );
}

function getContactById(contactId) {
  /**
   * @param {contactId: number}
   */
  const userById = users.find((user) => user.id === contactId);
  console.log(userById);
}

function removeContact(contactId) {
  /**
   * @param {contactId: number}
   */
  const userById = users.find((user) => user.id === contactId);
  console.log(userById);
  if (!userById) {
    console.log("No have user with this id");
    return;
  }

  const indexUser = users.indexOf(userById);
  users.splice(indexUser, 1);
  const content = JSON.stringify(users, null, 1);

  fs.writeFile(contactsPath, content, (err, data) => {});
  console.log(users);
}

function addContact(name, email, phone) {
  /**
   * @param {{name: string, email: string, phone: string}}
   */
  let maxId = 0;
  const mapid = users.map((user) => {
    user.id > maxId ? (maxId = user.id) : (maxId = 0);
  });
  const newUser = { id: maxId + 1, name, email, phone };
  users.push(newUser);
  const content = JSON.stringify(users, null, 1);
  fs.writeFile(contactsPath, content, (err, data) => {});
  console.log(users);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
