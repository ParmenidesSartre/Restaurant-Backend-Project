const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const multipleCloudinaryUpload = async (req, resourceName) => {
  if (req.files) {
    const imagesArr = await Promise.all(
      req.files.map(async (file) => {
        const images = await cloudinary.uploader.upload(file.path, {
          resource_type: "image",
          public_id: `image/${resourceName}/${file.originalname.split(".")[0]}`,
          overwrite: true,
        });
        // Remove file from local storage after upload
        fs.unlinkSync(file.path);
        return images.secure_url;
      })
    );
    req.body.images = imagesArr;
  }
  return req;
};

module.exports = { multipleCloudinaryUpload };
