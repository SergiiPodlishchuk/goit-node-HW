const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

const contactsRouter = require("./contacts/contacts.routers");
const userRouter = require("./users/users.router");

const PORT = 3010;

(async function () {
  return await mongoose.connect(
    process.env.MONGO_DB_URL,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },

    function (error) {
      if (error) {
        console.log(error);
        process.exit(1);
      }
      console.log("Database connection successful");
    }
  );
})();

const app = express();

app.use(express.static("public"));

app.use(express.json());
app.use(cors({ origin: "http://localhost:3010" }));
app.use(morgan("combined"));

app.use("/api/contacts", contactsRouter);
app.use("/", userRouter);

app.listen(PORT, () => {
  console.log("starting server by port", PORT);
});
