import { useState } from 'react';
import dynamic from 'next/dynamic';

const CKEditor = dynamic(
    () => import('@ckeditor/ckeditor5-react').then(mod => mod.CKEditor),
    { ssr: false }
);
const ClassicEditor = dynamic(
    () => import('@ckeditor/ckeditor5-build-classic'),
    { ssr: false }
);

export default function AdminForm() {
    const [formData, setFormData] = useState({
        question: '',
        answer: ''
    });
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await fetch('/api/faqs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    question: { en: formData.question },
                    answer: { en: formData.answer }
                })
            });

            if (response.ok) {
                setFormData({ question: '', answer: '' });
                alert('FAQ created successfully!');
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="mb-4">
                <label className="block mb-2 font-medium">Question (English)</label>
                <input
                    type="text"
                    value={formData.question}
                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2 font-medium">Answer (English)</label>
                <CKEditor
                    editor={ClassicEditor}
                    data={formData.answer}
                    onChange={(event, editor) => {
                        setFormData({ ...formData, answer: editor.getData() });
                    }}
                />
            </div>

            <button
                type="submit"
                disabled={submitting}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {submitting ? 'Submitting...' : 'Create FAQ'}
            </button>
        </form>
    );
}