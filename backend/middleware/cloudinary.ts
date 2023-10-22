import "dotenv/config";
const cloudConfig = require("cloudinary").v2;

cloudConfig.config({
  cloud_name: process.env.cloudNAME,
  api_key: process.env.cloudAPI,
  api_secret: process.env.cloudSECRET,
});

export default cloudConfig;
