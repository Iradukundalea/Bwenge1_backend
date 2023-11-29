import mongoose from "mongoose";

const OrganizationPartnerSchema = mongoose.Schema({
    organizationName: {
        type: String,
        required: [true, "Please provide Organization' name"]
    },
    email: {
        type: String,
        required: [true, "Please provide Organization' email"]
    },
    phoneNumber: {
        type: String,
        required: [true, "Please provide Organization' phone number"]
    },
    country: {
        type: String,
        required: [true, "Please provide organization's country"]
    },
    city: {
        type: String,
        required: [true, "Please provide organization's city"]
    },
    street: {
        type: String,
        required: [true, "Please provide organization's street"]
    },
    partnerType: {
        type: String,
        required: [true, "Please what organization type describes you?"]
    },
    marketOfInterest: {
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

const OrganizationPartner = mongoose.model('OrganizationPartner', OrganizationPartnerSchema);

export default OrganizationPartner;