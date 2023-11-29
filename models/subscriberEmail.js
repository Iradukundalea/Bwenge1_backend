import mongoose from "mongoose";

const subscriberEmailSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide a valid email"],
    unique: true,
    // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
});

const subscriberEmail = mongoose.model("Subscriberemail", subscriberEmailSchema);

export default subscriberEmail;
