const multer = require('multer');
const path = require('path'); // To handle file paths

const storage = multer.diskStorage({
  destination: 'upload_images', // Set the destination folder
  filename: (req, file, cb) => {
    // Generate a unique filename with current timestamp
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueSuffix);
  },
});

const uploadSingleImage = multer({ storage: storage }).single('image');



module.exports = { uploadSingleImage };
