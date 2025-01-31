import { useState, useEffect } from 'react';
import FAQItem from '../components/FAQItem';
import LanguageSwitcher from '../components/LanguageSelector'

export default function Home() {
  const [faqs, setFaqs] = useState([]);
  const [lang, setLang] = useState('en');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch(`/api/faqs?lang=${lang}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (!res.ok) throw new Error('Failed to fetch');
        
        const data = await res.json();
        setFaqs(data);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchFaqs();
  }, [lang]);

  return (
    <div className="container mx-auto p-4">
      <LanguageSwitcher lang={lang} setLang={setLang} />
      
      {loading ? (
        <p>Loading FAQs...</p>
      ) : (
        faqs.map(faq => (
          <FAQItem key={faq._id} question={faq.question} answer={faq.answer} />
        ))
      )}
    </div>
  );
}