const { Translate } = require('@google-cloud/translate').v2;
const translate = new Translate({ key: process.env.GOOGLE_API_KEY });

const translateText = async (text, target) => {
  try {
    const [translation] = await translate.translate(text, target);
    return translation;
  } catch (error) {
    console.error('Translation error:', error);
    return null;
  }
};

module.exports = {
  autoTranslate: async (question, answer) => {
    const translations = { question: {}, answer: {} };
    
    for (const lang of ['hi', 'bn']) {
      translations.question[lang] = await translateText(question, lang);
      translations.answer[lang] = await translateText(answer, lang);
    }
    
    return translations;
  }
};