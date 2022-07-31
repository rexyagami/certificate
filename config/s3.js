const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

aws.config.update({
  secretAccessKey: process.env.S3KEY,
  accessKeyId: process.env.S3ID,
  region: process.env.S3REGION,
});

const s3 = new aws.S3();

const S3Config = multerS3({
  s3: s3,
  bucket: process.env.S3BUCKET,
  acl: "public-read",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  limits: { fieldSize: 1024 * 1024 * 10 },
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    console.log(file);
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

module.exports = multer({
  storage: S3Config,
});
