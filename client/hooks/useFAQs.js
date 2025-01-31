import { useEffect, useState } from 'react'

export default function useFAQs (language) {
  const [faqs, setFaqs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/faqs?lang=${language}`)
        if (!response.ok) throw new Error('Failed to fetch FAQs')
        const data = await response.json()
        setFaqs(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchFAQs()
  }, [language])

  return { faqs, loading, error }
}
