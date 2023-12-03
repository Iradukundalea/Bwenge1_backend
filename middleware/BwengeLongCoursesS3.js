import fs from "fs";
import AWS from "aws-sdk";

import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

const bucketName = process.env.BWENGE_COURSE_AWS_BUCKET_NAME;
const region = process.env.BWENGE_COURSE_AWS_BUCKET_REGION;
const accessKeyId = "AKIA4AFWCR7PEY2CDYHW";
const secretAccessKey = "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 ";

AWS.config.update({ region });

const s3 = new AWS.S3({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

// uploads a file to s3
export const uploadFile = (file, filepath) => {
  //   const fileStream = fs.createReadStream(file.path);
  console.log({ bucketName });

  const uploadParams = {
    Bucket: bucketName,
    Body: file.data,
    Key: `${filepath}/${file.name}`,
  };

  return s3.upload(uploadParams).promise();
};

export const getBwengeCourseS3File = (fileKey) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };
  console.log({ downloadParams });
  const res = s3.getObject(downloadParams);
  console.log({ res });
  // return res.createReadStream();
  return res;
};
export const uploadImageFile = async (file, filepath) => {
  //   const fileStream = fs.createReadStream(file.path);
  console.log(file);

  const uploadParams = {
    Bucket: bucketName,
    Body: file,
    Key: filepath,
  };

  return await s3.upload(uploadParams).promise();
};
