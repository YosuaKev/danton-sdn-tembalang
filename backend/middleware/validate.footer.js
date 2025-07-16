// validate.footer.js
import { body, validationResult } from "express-validator";

const validateFooter = [
  body("nama_sekolah")
    .notEmpty()
    .withMessage("Nama sekolah is required")
    .isString()
    .withMessage("Nama sekolah must be a string"),

  body("alamat")
    .notEmpty()
    .withMessage("Alamat is required")
    .isString()
    .withMessage("Alamat must be a string"),

  body("no_telepon")
    .notEmpty()
    .withMessage("No telepon is required")
    .isNumeric()
    .withMessage("No telepon must be a number"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("facebook")
    .notEmpty()
    .withMessage("Facebook link is required")
    .isString()
    .withMessage("Facebook must be a string"),

  body("youtube")
    .notEmpty()
    .withMessage("Youtube link is required")
    .isString()
    .withMessage("Youtube must be a string"),

  body("instagram")
    .notEmpty()
    .withMessage("Instagram link is required")
    .isString()
    .withMessage("Instagram must be a string"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export default validateFooter;