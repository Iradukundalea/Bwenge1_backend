import express from "express";
import { InsertPartner, getIndividualPartners, getOrganizationPartners, setIndivPartnerChecked, setIndivPartnerApproved, setOrgPartnerChecked, setOrgPartnerApproved } from './../controllers/Partnership.js';

const router = express.Router();

router.post('/insertpartner', InsertPartner);
router.get('/getindivpartners', getIndividualPartners);
router.get('/getorgpartners', getOrganizationPartners);
router.patch('/setindivpartchecked/:id', setIndivPartnerChecked);
router.patch('/setindivpartapproved/:id', setIndivPartnerApproved);
router.patch('/setorgpartchecked/:id', setOrgPartnerChecked);
router.patch('/setorgpartapproved/:id', setOrgPartnerApproved);

export default router;