const express = require('express');
const router = express.Router();
const {
  getFaqs,
  createFaq
} = require('../controllers/faqController');
const { cache, clearCache } = require('../services/cache');

router.get('/', cache(3600), getFaqs);
router.post('/', clearCache, createFaq);

module.exports = router;