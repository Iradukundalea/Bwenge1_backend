import mongoose from 'mongoose';

const serviceSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please provide your firstname"]
    },
    lastName: {
        type: String,
        required: [true, "Please provide your lastname"]
    },
    jobTitle: {
        type: String,
        required: [true, "Please provide your job title"]
    },
    email: {
        type: String,
        required: [true, "Please provide your email"]
    },
    phoneNumber: {
        type: String,
        required: [true, "Please provide your phone number"]
    },
    country: {
        type: String,
        required: [true, "Please provide your's country"]
    },
    city: {
        type: String,
        required: [true, "Please provide your's city"]
    },
    street: {
        type: String,
        required: [true, "Please provide your's street"]
    },
    serviceType: {
        type: String,
        required: [true, "Please provide service type"]
    },
    onChecked: {
        type: Boolean,
        default: false
    },
    onDone: {
        type: Boolean,
        default: false
    },
    requestTime: {
        type: Date,
        default: new Date()
    }
})

const Service = mongoose.model("service", serviceSchema);

export default Service;