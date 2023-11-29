import Mongoose from 'mongoose';
import IndividualPartner from '../models/individualpartner.js';
import OrganizationPartner from '../models/OrganizationPartner.js';


export const InsertPartner = async (req, res, next) => {
    if (req.body.type == "Individual") {
        const { firstName, lastName, jobTitle, companyName, email, phoneNumber,
            country, city, street, partnerType, marketOfInterest, fieldOfExpertise } = req.body;
        const newIndividualPartner = new IndividualPartner({
            firstName, lastName, jobTitle, companyName, email, phoneNumber,
            country, city, street, partnerType, marketOfInterest, fieldOfExpertise
        });
        try {
            await newIndividualPartner.save();
            res.status(200).json({ success: true, message: 'Partnership request Submited' });
        } catch (error) {
            res.status(409).json({ message: error.message })
        }
    } else {
        const { organizationName, email, phoneNumber, country, city, street, partnerType, marketOfInterest } = req.body;
        const newOrganizationPartner = new OrganizationPartner({ organizationName, email, phoneNumber, country, city, street, partnerType, marketOfInterest });

        try {
            await newOrganizationPartner.save({ success: true, message: 'Partnership request Submited' });
            res.status(200).json()
        } catch (error) {
            res.status(409).json({ message: error.message })
        }
    }
}
export const getIndividualPartners = async (req, res, next) => {
    try {
        const IndivPartners = await IndividualPartner.find();
        res.status(200).json(IndivPartners);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const getOrganizationPartners = async (req, res, next) => {
    try {
        const OrgPartners = await OrganizationPartner.find();
        res.status(200).json(OrgPartners);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const setIndivPartnerChecked = async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    if (!Mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ message: `no partner with id: ${id}` })
    try {
        const indivPartner = await IndividualPartner.findByIdAndUpdate(id, { onChecked: true, _id: id }, { runValidators: true });
        const individualpartners = await IndividualPartner.find();
        res.status(200).json(individualpartners)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const setOrgPartnerChecked = async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    if (!Mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ message: `no partner with id: ${id}` })
    try {
        const orgPartner = await OrganizationPartner.findByIdAndUpdate(id, { onChecked: true, _id: id }, { runValidators: true });
        const orgPartners = await OrganizationPartner.find();
        res.status(200).json(orgPartners)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const setIndivPartnerApproved = async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    if (!Mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ message: `no partner with id: ${id}` })
    try {
        const indivPartner = await IndividualPartner.findByIdAndUpdate(id, { onApproved: true, _id: id }, { runValidators: true });
        const individualpartners = await IndividualPartner.find();
        res.status(200).json(individualpartners)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
export const setOrgPartnerApproved = async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    if (!Mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ message: `no partner with id: ${id}` })
    try {
        const orgPartner = await OrganizationPartner.findByIdAndUpdate(id, { onApproved: true, _id: id }, { runValidators: true });
        const orgPartners = await OrganizationPartner.find();
        res.status(200).json(orgPartners)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}