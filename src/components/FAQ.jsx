import React, { useState } from 'react';

//faqs hardcoded
const faqs = [
  {
    question: 'How do I place an order?',
    answer: 'Simply browse products, add to cart, and proceed to checkout. Login required.'
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept Credit/Debit Cards, UPI, Wallets, and Cash on Delivery.'
  },
  {
    question: 'Can I return my order?',
    answer: 'Yes, returns are accepted within 7 days of delivery. Check our Return Policy.'
  },
  {
    question: 'How can I track my order?',
    answer: 'After placing an order, you’ll receive a tracking link via email or SMS.'
  }
];
// // Tracks which FAQ is currently expanded
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {                                // Toggles open/close
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <section className="bg-[#F5EBDD] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8 text-[#6C3428]">
          Frequently Asked Questions
        </h2>

        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-[#BA704F] rounded-lg mb-4 overflow-hidden"
          >
            <button
              className="w-full text-left px-5 py-4 flex justify-between items-center text-[#6C3428] font-medium text-base bg-[#CEE6F3] hover:bg-[#DFA878] transition-colors duration-300"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span className="ml-2 text-xl">{openIndex === index ? '-' : '+'}</span>
            </button>
            {openIndex === index && (
              <div className="px-5 py-3 bg-white text-sm text-[#6C3428] border-t border-[#BA704F]">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
