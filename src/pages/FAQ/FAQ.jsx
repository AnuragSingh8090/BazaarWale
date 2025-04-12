import React, { useState, useEffect } from "react";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import "./FAQ.css";

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [filteredFaqs, setFilteredFaqs] = useState([]);

  // FAQ data
  const faqs = [
    {
      id: 1,
      question: "How do I place an order?",
      answer:
        "To place an order, browse our products, select the items you wish to purchase, add them to your cart, and proceed to checkout. You'll need to provide shipping information and payment details to complete your order.",
      category: "orders",
    },
    {
      id: 2,
      question: "What payment methods do you accept?",
      answer:
        "We accept credit cards (Visa, MasterCard, American Express), debit cards, PayPal, and UPI payments. For certain regions, we also offer Cash on Delivery (COD) options.",
      category: "payment",
    },
    {
      id: 3,
      question: "How long will my delivery take?",
      answer:
        "Delivery times depend on your location and the shipping method chosen. Typically, domestic orders are delivered within 3-7 business days, while international orders may take 7-14 business days. You can track your order through your account dashboard.",
      category: "shipping",
    },
    {
      id: 4,
      question: "Can I change or cancel my order?",
      answer:
        "You can change or cancel your order within 1 hour of placing it. After this period, if the order has not been shipped, you may contact our customer service team to request changes or cancellation, though we cannot guarantee it will be possible.",
      category: "orders",
    },
    {
      id: 5,
      question: "What is your return policy?",
      answer:
        "We accept returns within 30 days of delivery for most items. Products must be unused, in their original packaging, and in the same condition as received. Some items, like perishables or customized products, cannot be returned. Please visit our Returns & Refunds page for detailed information.",
      category: "returns",
    },
    {
      id: 6,
      question: "How do I track my order?",
      answer:
        "You can track your order by logging into your account and visiting the 'My Orders' section. There, you'll find tracking information for all your recent orders. Alternatively, you can use the tracking link provided in your shipping confirmation email.",
      category: "shipping",
    },
    {
      id: 7,
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary depending on the destination. Please note that customers are responsible for any customs duties, taxes, or import fees that may apply to international orders.",
      category: "shipping",
    },
    {
      id: 8,
      question: "How can I contact customer service?",
      answer:
        "You can reach our customer service team via email at support@bazaarwale.com, by phone at +91-8090674352 (9 AM to 6 PM, Monday to Saturday), or through the live chat feature on our website. We aim to respond to all inquiries within 24 hours.",
      category: "support",
    },
    {
      id: 9,
      question: "Do you offer gift wrapping?",
      answer:
        "Yes, we offer gift wrapping services for most products. During checkout, select the 'Gift Wrap' option and add a personalized message if desired. A nominal fee may apply for this service.",
      category: "orders",
    },
    {
      id: 10,
      question: "What should I do if I receive a damaged item?",
      answer:
        "If you receive a damaged item, please contact our customer service team within 48 hours of delivery. Include your order number and photos of the damaged item and packaging. We will arrange for a replacement or refund, depending on your preference and product availability.",
      category: "returns",
    },
    {
      id: 11,
      question: "Can I change my shipping address after placing an order?",
      answer:
        "Address changes can only be accommodated if the order has not been processed for shipping. Please contact our customer service team immediately with your order number and the new shipping address. If the order has already been processed, we may not be able to change the delivery address.",
      category: "shipping",
    },
    {
      id: 12,
      question: "Do you have a loyalty program?",
      answer:
        "Yes, we have a loyalty program called 'BazaarRewards.' You earn points with every purchase, which can be redeemed for discounts on future orders. You can also earn bonus points by referring friends, writing product reviews, and participating in promotions.",
      category: "rewards",
    },
    {
      id: 13,
      question: "Are my payment details secure?",
      answer:
        "Yes, we use industry-standard encryption and security protocols to protect your payment information. We are PCI DSS compliant and never store your complete credit card details on our servers. Your payment data is encrypted during transmission and processed through secure payment gateways.",
      category: "payment",
    },
    {
      id: 14,
      question: "How do I create an account?",
      answer:
        "To create an account, click on the 'Sign Up' or 'Register' button in the top right corner of our website. Fill in your email address, create a password, and provide the required personal information. You can also sign up using your Google or Facebook account for faster registration.",
      category: "account",
    },
    {
      id: 15,
      question: "What do I do if I forgot my password?",
      answer:
        "If you forgot your password, click on the 'Forgot Password' link on the login page. Enter the email address associated with your account, and we will send you a link to reset your password. For security reasons, this link will expire after 24 hours.",
      category: "account",
    },
  ];

  // Filter FAQs based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredFaqs(faqs);
    } else {
      const lowercasedFilter = searchTerm.toLowerCase();
      const filtered = faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(lowercasedFilter) ||
          faq.answer.toLowerCase().includes(lowercasedFilter) ||
          faq.category.toLowerCase().includes(lowercasedFilter)
      );
      setFilteredFaqs(filtered);
    }
  }, [searchTerm]);

  // Initialize filtered FAQs with all FAQs
  useEffect(() => {
    setFilteredFaqs(faqs);
  }, []);

  const toggleFaq = (id) => {
    if (expandedFaq === id) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(id);
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto my-10 px-5 font-['IBM_Plex_Sans'] text-[#333]">
      <ScrollToTop />
      <div className="text-center mb-6 pb-3 border-b border-[var(--border-light)]">
        <h1 className="text-[var(--primary)] text-2xl md:text-3xl mb-1">Frequently Asked Questions</h1>
      </div>

      <div className="mb-6">
        <div className="relative w-full max-w-[600px] mx-auto mb-6">
          <input
            type="text"
            placeholder="Search for questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:border-[var(--primary)] shadow-sm text-sm"
          />
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
        </div>

        <div className="bg-white rounded-lg p-6 md:p-8 shadow-md">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-8">
              <i className="fa-solid fa-face-frown text-[var(--primary)] text-3xl mb-3"></i>
              <p className="text-sm text-gray-600">No FAQs match your search criteria. Try a different keyword or browse all questions.</p>
              <button
                className="mt-3 text-[var(--primary)] font-medium text-sm"
                onClick={() => setSearchTerm("")}
              >
                View all FAQs
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq) => (
              <div key={faq.id} className="mb-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0 last:mb-0">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleFaq(faq.id)}
                >
                  <h3 className="text-sm font-medium flex-grow">
                    {faq.question}
                  </h3>
                  <span className="text-[var(--primary)] ml-4 flex items-center justify-center h-8 w-6 translate-y-[-10px]">
                    <i className={`fa-solid ${expandedFaq === faq.id ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                  </span>
                </div>
                {expandedFaq === faq.id && (
                  <div className="mt-2 pl-0 text-xs leading-relaxed text-gray-600 animate-fadeIn">
                    {faq.answer}
                    <div className="mt-1 text-xs text-[var(--primary-dark)]">
                      Category: <span className="font-medium capitalize">{faq.category}</span>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
