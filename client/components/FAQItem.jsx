export default function FAQItem({ question, answer }) {
    return (
        <div className="border rounded-lg p-4 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">{question}</h3>
            <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: answer }}
            />
        </div>
    );
}