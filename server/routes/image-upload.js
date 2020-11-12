const express = require("express");
const router = express.Router();

const { authUser } = require("../controllers/user");
const CloudImage = require("../models/cloud-image");

const upload = require("../services/multer");
const { dataUri } = require("../services/dataUri");
const { cloudUpload } = require("../services/cloudinary");

//can use multiple based on multer api
const singleUpload = upload.single("image");

const singleUploadController = (req, res, next) => {
  singleUpload(req, res, (error) => {
    if (error) {
      res.status(422).json({
        message: `There is an error: ${error.message}`,
      });
    }
    next();
  });
};

router.post("", authUser, singleUploadController, async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(422).json({
        message: `The file is not presented`,
      });
    }

    const file64 = dataUri(req.file);
    const result = await cloudUpload(file64.content);
    const cImage = new CloudImage({
      url: result.secure_url,
      cloudinaryId: result.public_id,
    });

    const savedImage = await cImage.save();

    return res.status(200).json({ _id: savedImage._id, url: savedImage.url });
  } catch (error) {
    return res.status(422).json({
      message: `There is an error: ${error.message}`,
    });
  }
});

module.exports = router;
