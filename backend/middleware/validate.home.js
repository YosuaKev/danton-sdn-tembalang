import { body, validationResult } from "express-validator";

export default [
  // Header Section Validation
  body('header')
    .trim()
    
    .isLength({ max: 100 }).withMessage('Header cannot exceed 100 characters'),

  // Main Content Validation
  body('judul')
    .trim()
    
    .isLength({ max: 200 }).withMessage('Title cannot exceed 200 characters'),

  body('subjudul')
    .trim()
    
    .isLength({ max: 200 }).withMessage('Subtitle cannot exceed 200 characters'),

  body('deskripsi')
    .trim()
    
    .isLength({ max: 1000 }).withMessage('Description cannot exceed 1000 characters'),

//   body('gambar')
//     .trim()
//     .isURL().withMessage('Invalid image URL format'),

  // Stats Validation
  body('namajumlah')
    .trim()
    
    .isLength({ max: 50 }).withMessage('Stat name cannot exceed 50 characters'),

  body('jumlah')
    .isInt({ min: 0 }).withMessage('Stat value must be a positive integer'),

  // Features Validation
  ...['1', '2', '3', '4'].map(num => [
    body(`feature${num}`)
      .trim()
      
      .isLength({ max: 100 }).withMessage(`Feature ${num} title cannot exceed 100 characters`),
    
    body(`deskripsifeature${num}`)
      .trim()
      
      .isLength({ max: 300 }).withMessage(`Feature ${num} description cannot exceed 300 characters`)
  ]).flat(),

  // Error handling middleware
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];