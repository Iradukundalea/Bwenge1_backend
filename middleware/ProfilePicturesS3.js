import S3 from "aws-sdk/clients/s3.js";

import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

const bucketName = process.env.BWENGE_PROFILE_PICTURES_AWS_BUCKET_NAME;
const region = process.env.BWENGE_PROFILE_PICTURES_AWS_BUCKET_REGION;
const accessKeyId = process.env.BWENGE_PROFILE_PICTURES_AWS_ACCESS_KEY;
const secretAccessKey = process.env.BWENGE_PROFILE_PICTURES_AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// uploads a file to s3
export const uploadFile = (file, filepath) => {
  //   const fileStream = fs.createReadStream(file.path);
  console.log(bucketName);

  const uploadParams = {
    Bucket: bucketName,
    Body: file.data,
    Key: `${filepath}/${file.name}`,
  };

  return s3.upload(uploadParams).promise();
};
export const uploadImageFile = (file, filepath) => {
  //   const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: file,
    Key: filepath,
  };

  return s3.upload(uploadParams).promise();
};

export const getProfilePicS3File = (fileKey) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };
  console.log(downloadParams);
  const res = s3.getObject(downloadParams);
  console.log(res);
  return res.createReadStream();
};
