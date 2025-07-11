import { body, validationResult } from "express-validator";

export default [
  body('id_galeri')
    .optional()
    .isInt().withMessage('ID Galeri must be an integer'),

  body('judul')
    .trim()
    .notEmpty().withMessage('Judul is required')
    .isLength({ max: 100 }).withMessage('Judul cannot exceed 100 characters'),

  body('deskripsi')
    .trim()
    .notEmpty().withMessage('Deskripsi is required')
    .isLength({ max: 500 }).withMessage('Deskripsi cannot exceed 500 characters'),

  body('gambar1')
    .notEmpty().withMessage('At least one image is required (gambar1)')
    .isString().withMessage('Image path must be a string'),

  body(['gambar2', 'gambar3', 'gambar4', 'gambar5'])
    .optional()
    .isString().withMessage('Image path must be a string'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];