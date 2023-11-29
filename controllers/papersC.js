import Mongoose from "mongoose";
import Paper from "../models/papers.js";
import UnivProjects from "../models/univProjects.js";
import ErrorResponse from "../utils/errorResponse.js";
import { fileURLToPath } from "url";
import path from "path";
import { uploadFile } from "../middleware/DiasporaProjectsS3.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAllPapers = async (req, res, next) => {
  try {
    const papers = await Paper.find();
    res.status(200).json(papers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getPapers = async (req, res, next) => {
  try {
    let papers = Paper.find();

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * pageSize;
    const total = await Paper.countDocuments();

    const pages = Math.ceil(total / pageSize);
    if (page > pages) {
      return res.status(404).json({
        status: "fail",
        message: "No page found",
      });
    }

    papers = await papers.skip(skip).limit(pageSize);

    res.status(200).json({
      status: "success",
      count: papers.length,
      page,
      pages,
      data: papers,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPaper = async (req, res, next) => {
  const { authors, title, country, field, abstract, keywords, level, contacts, creator } = req.body;
  const paperURL = req.files.selectedFile;
  console.log(req.body);
  if (!req.files) {
    return next(new ErrorResponse("Paper file not entered", 401));
  }
  const paper = await Paper.findOne({ title });
  if (paper) {
    return next(new ErrorResponse("paper already exist", 401));
  }

  uploadFile(paperURL, `Projects/${title}`);

  const newPaper = new Paper({
    authors,
    title,
    submissionDate: new Date(),
    country,
    field,
    abstract,
    level,
    contacts,
    keywords,
    selectedFile: `Projects\\${title}\\${paperURL.name}`,
    creator: JSON.parse(creator),
  });
  try {
    await newPaper.save();
    res.status(200).json({ success: true, message: "paper uploaded" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const createUnivPaper = async (req, res, next) => {
  const { authors, title, university, field, abstract, keywords, level, contacts, creator } = req.body;
  const paperURL = req.files.selectedFile;
  console.log(req.body);
  if (!req.files) {
    return next(new ErrorResponse("Paper file not entered", 401));
  }
  const paper = await Paper.findOne({ title });
  if (paper) {
    return next(new ErrorResponse("paper already exist", 401));
  }

  uploadFile(paperURL, `Projects/${title}`);

  const newUnivPaper = new UnivProjects({
    authors,
    title,
    submissionDate: new Date(),
    university,
    field,
    abstract,
    level,
    contacts,
    keywords,
    selectedFile: `Projects\\${title}\\${paperURL.name}`,
    creator: JSON.parse(creator),
  });
  try {
    await newUnivPaper.save();
    res.status(200).json({ success: true, message: "paper uploaded" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getPaper = async (req, res, next) => {
  const { id } = req.params;
  try {
    const paper = await Paper.findById(id);

    res.status(200).json(paper);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updatePaper = async (req, res, next) => {
  const { id } = req.params;
  const { authors, title, PublicationDate, journal, field, department, abstract, keywords } = req.body;
  var paperURL;
  var updatedPaper;
  if (authors.length == 0) {
    return res.status(401).json({ message: "Paper's authors not set" });
  }
  if (keywords.length == 0) {
    return res.status(401).json({ message: "Paper's keywords not set" });
  }
  if (req.file) {
    paperURL = req.file;
    updatedPaper = { authors, title, PublicationDate, journal, field, department, abstract, keywords, selectedFile: paperURL.path, _id: id };
  } else {
    updatedPaper = { authors, title, PublicationDate, journal, field, department, abstract, keywords, _id: id };
  }
  if (!Mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: `no paper with id: ${id}` });

  try {
    const afterUpdate = await Paper.findByIdAndUpdate(id, updatedPaper, { runValidators: true });
    res.status(200).json(afterUpdate);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const searchPaper = async (req, res, next) => {
  const { option, term } = req.body;
  var regex = new RegExp([term].join(""), "i");
  if (option == "department" || option == "title") {
    try {
      const results = await Paper.find({ [option]: regex });
      res.status(200).json(results);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  } else {
    try {
      const results = await Paper.find({ [option]: { $in: regex } });
      res.status(200).json(results);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
};
export const deletePaper = async (req, res, next) => {
  console.log(req);
  const { id } = req.params;
  if (!Mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: `no paper with id: ${id}` });
  try {
    const { data } = await Paper.findByIdAndDelete(id);
    res.status(200).json({ message: "Paper deleted successfuly" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
