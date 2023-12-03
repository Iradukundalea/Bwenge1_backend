import aws from "aws-sdk";

import crypto from "crypto";
const randomBytes = promisify(crypto.randomBytes);

import dotenv from "dotenv";
import { promisify } from "util";
dotenv.config({ path: "./config.env" });

const bucketName = process.env.BWENGE_ARTICLE_AWS_BUCKET_NAME;
const region = process.env.BWENGE_ARTICLE_AWS_BUCKET_REGION;
const accessKeyId = process.env.BWENGE_ARTICLE_AWS_ACCESS_KEY;
const secretAccessKey = process.env.BWENGE_ARTICLE_AWS_SECRET_KEY;

const S3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
});

export async function generateUploadURL() {
  console.log(S3);
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

export async function generateArticleQuizUploadURL(type) {
  console.log(S3);
  const rawBytes = await randomBytes(16);
  var imageName = `quizes${type}/${rawBytes.toString("hex")}`;
  if (type == "pdf") {
    imageName = `quizes${type}/${rawBytes.toString("hex")}.pdf`;
  }
  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60,
  };
  const uploadURL = await S3.getSignedUrlPromise("putObject", params);
  return uploadURL;
}
