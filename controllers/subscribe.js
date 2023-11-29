import subscriberEmail from "../models/subscriberEmail.js";

export const UserSubscribe = async (req, res, next) => {
  const { email } = req.body;
  console.log(email);
  const newSubscriber = new subscriberEmail({ email });
  try {
    await newSubscriber.save();
    res.status(200).json({ success: true, message: "Subscriber request successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
