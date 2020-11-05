const express = require("express");

const app = express();
const port = 3000;

app.get("/api/contacts", (request, response) => {
  response.send("Hello from Express!");
});

app.get("/api/contacts/:contactId", (req, res) => {});

app.listen(port, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }
  console.log(`server is listening on ${port}`);
});
