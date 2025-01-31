const FAQ = require('../models/faq')
const { translateFAQ } = require('../services/translation')

module.exports = {
  getFAQs: async (req, res) => {
    try {
      const lang = req.query.lang || 'en'
      const faqs = await FAQ.find()
      res.json(faqs.map(faq => faq.getTranslated(lang)))
    } catch (error) {
      res.status(500).json({ error: 'Server error' })
    }
  },

  createFAQ: async (req, res) => {
    try {
      const translations = await translateFAQ(req.body)
      const faq = await FAQ.create({
        question: { en: req.body.question.en, ...translations.question },
        answer: { en: req.body.answer.en, ...translations.answer }
      })

      res.status(201).json(faq)
    } catch (error) {
      res.status(400).json({ error: 'Invalid data' })
    }
  }
}
