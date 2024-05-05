const multer = require('multer');
const path = require('path'); s

const storage = multer.diskStorage({
  destination: 'upload_images', 
  filename: (req, file, cb) => {
    // Generate a unique filename with current timestamp
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueSuffix);
  },
});

const uploadSingleImage = multer({ storage: storage }).single('image');



module.exports = { uploadSingleImage };
