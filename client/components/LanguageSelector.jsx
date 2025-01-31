export default function LanguageSelector({ selected, onChange }) {
    const languages = [
        { code: 'en', name: 'English' },
        { code: 'hi', name: 'हिन्दी' },
        { code: 'bn', name: 'বাংলা' }
    ];

    return (
        <div className="mb-6">
            <label className="mr-2">Select Language:</label>
            <select
                value={selected}
                onChange={(e) => onChange(e.target.value)}
                className="px-4 py-2 border rounded"
            >
                {languages.map(lang => (
                    <option key={lang.code} value={lang.code}>
                        {lang.name}
                    </option>
                ))}
            </select>
        </div>
    );
}