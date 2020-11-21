const mongoose = require("mongoose");
const mongoosePagination = require("mongoose-paginate-v2");

const { Schema } = mongoose;

const contactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  subscription: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String, required: false },
});

contactSchema.plugin(mongoosePagination);

const contactModel = mongoose.model("Contact", contactSchema);

module.exports = contactModel;
