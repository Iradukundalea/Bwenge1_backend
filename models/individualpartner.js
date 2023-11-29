import mongoose from "mongoose";

const IndividualPartnerSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please provide partner firstname"]
    },
    lastName: {
        type: String,
        required: [true, "Please provide partner lastname"]
    },
    jobTitle: {
        type: String,
        required: [true, "Please provide partner job title"]
    },
    companyName: {
        type: String,
        required: [true, "Please provide partner company name"]
    },
    email: {
        type: String,
        required: [true, "Please provide partner email"]
    },
    phoneNumber: {
        type: String,
        required: [true, "Please provide partner phone number"]
    },
    country: {
        type: String,
        required: [true, "Please provide partner's country"]
    },
    city: {
        type: String,
        required: [true, "Please provide partner's city"]
    },
    street: {
        type: String,
        required: [true, "Please provide partner's street"]
    },
    partnerType: {
        type: String,
        required: [true, "Please what partner type describes you?"]
    },
    marketOfInterest: {
        type: String,
        required: [true, "Please what's your market of interest"]
    },
    fieldOfExpertise: {
        type: String,
        required: [true, "Please what's your market of interest"]
    },
    onChecked: {
        type: Boolean,
        default: false
    },
    onApproved: {
        type: Boolean,
        default: false
    }
})

const IndividualPartner = mongoose.model('IndividualPartner', IndividualPartnerSchema);
export default IndividualPartner;