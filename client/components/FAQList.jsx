import FAQItem from './FAQItem';

export default function FAQList({ faqs }) {
    return (
        <div className="space-y-6 mt-4">
            {faqs?.map(faq => (
                <FAQItem
                    key={faq._id}
                    question={faq.question}
                    answer={faq.answer}
                />
            ))}
        </div>
    );
}