import multer from  "multer";
import path from "path";

// const storage = multer.diskStorage({
//     destination: async (req, file, cd) => {
//         const base64 = await convertToBase64(file)
//         console.log(base64)
//         cd(null, "uploads/");
//     },
//     filename: (req, file, cd) => {
//         // cd(null, Date.now() + path.extname(file.originalname));
//     }
// })

// const upload = multer({
//     storage,
//     fileFilter: (req, file, cb) => {
//         if(
//             file.mimetype == "image/png" ||
//             file.mimetype == "image/jpg"
//         ){
//             cb(null, true)
//         } else {
//             console.log('only jpg and png')
//             cb(null, false)
//         }
//     }
// })

// export default upload;

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

export default upload;