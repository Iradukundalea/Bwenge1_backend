import S3 from "aws-sdk/clients/s3.js";

import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

const bucketName = process.env.BWENGE_COMMUNITY_AWS_BUCKET_NAME;
const region = process.env.BWENGE_COMMUNITY_AWS_BUCKET_REGION;
const accessKeyId = process.env.BWENGE_COMMUNITY_AWS_ACCESS_KEY;
const secretAccessKey = process.env.BWENGE_COMMUNITY_AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

export const uploadImageFile = (file, filepath) => {
  const uploadParams = {
    Bucket: bucketName,
    Body: file,
    Key: filepath,
  };
  return s3.upload(uploadParams).promise();
};

export async function generateUploadURL() {
  // console.log(S3);
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString("hex");
  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60,
  };
  const uploadURL = await S3.getSignedUrlPromise("putObject", params);
  return uploadURL;
}

export const getCommunityProfilePicS3File = (fileKey) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };
  // console.log(downloadParams);
  const res = s3.getObject(downloadParams);
  // console.log(res);
  return res.createReadStream();
};
