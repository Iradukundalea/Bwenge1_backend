import Service from "../models/services.js";
import Mongoose from "mongoose";

export const InsertService = async (req, res, next) => {
    const { firstName, lastName, email, phoneNumber, jobTitle, country, city, street, serviceType } = req.body;
    const newService = new Service({ firstName, lastName, email, phoneNumber, jobTitle, country, city, street, serviceType });
    try {
        newService.save();
        res.status(200).json({ success: true, message: "Service request successfully" });
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const getServices = async (req, res, next) => {
    try {
        const services = await Service.find();
        res.status(200).json(services)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const setChecked = async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    if (!Mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ message: `no service with id: ${id}` })
    try {
        const service = await Service.findByIdAndUpdate(id, { onChecked: true, _id: id }, { runValidators: true });
        const services = await Service.find();
        res.status(200).json(services)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const setDone = async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    if (!Mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ message: `no service with id: ${id}` })
    try {
        const service = await Service.findByIdAndUpdate(id, { onDone: true, _id: id }, { runValidators: true });
        const services = await Service.find();
        res.status(200).json(services)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}