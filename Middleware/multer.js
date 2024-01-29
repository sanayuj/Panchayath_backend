const multer = require("multer");
const path = require("path");

const createMulterInstance = (folderName) => {
  console.log(folderName,"&&&&&&");
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `public/images/${folderName}`);
    },
    filename: (req, file, cb) => {
      console.log("&&&&&&8888877&&&&&");
      const originalname = path.parse(file.originalname);
      cb(null, `${originalname.name}_${Date.now()}${originalname.ext}`);
    },
  });
  return multer({ storage: storage });
};

module.exports = createMulterInstance;
