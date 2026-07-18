export const companyDetails = {
    companyName: 'BazaarWale',
    companyLogo: '/brand-logo.png',
    backendUrl: 'https://bazaarwale-backend.onrender.com',
    authorName: 'Anurag Kumar Singh',
    authorMobile: '+918090674352',
    authorWhatsapp: '+918090674352',
    authorEmail: 'anuragkumarsingh154@gmail.com',
    copyrightStartYear: '2023',
    copyrightEndYear: '2025',
    address: {
        houseNo: '00',
        street: 'Nilmatha',
        landmark: 'Near railway crossing',
        district: 'Lucknow',
        state: 'Uttar Pradesh',
        country: 'India',
        pincode: '226002',
    },
    fullAddress: '00, Near railwing crossing, Nilmatha, Lucknow, Uttarpraesh, (226002)',
    socialUrl: {
        instagram: 'https://www.instagram.com/01_anurag_10/',
        whatsapp: '+918090674352',
        facebook: 'https://www.facebook.com/profile.php?id=100077091671124',
        linkedin: 'https://www.linkedin.com/in/anurag-singh-lucknow/?skipRedirect=true',
        github: 'https://github.com/AnuragSingh8090',
        portfolio: 'https://myportfolioanurag.netlify.app/',
        twitter: 'https://x.com/?lang=en'
    },
    callingStartTime: '5AM',
    callingEndTime: '6PM',
    callingWorkingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    businessStats: {
        totalCustomers: '10M+',
        totalProducts: '10M+',
        totalOrders: '10M+',
        totalCitiesCovered: '10+',
    },
    copanyMembers: [
        {
            name: 'Anurag Kumar Singh',
            emailId: 'anuragkumarsingh154@gmail.com',
            role: 'Founder and CEO',
            description: 'Frontend Developer with 1.5 Years of professional Experience',
            socialUrl: {
                instagram: 'https://www.instagram.com/01_anurag_10/',
                facebook: 'https://www.facebook.com/profile.php?id=100077091671124',
                linkedin: 'https://www.linkedin.com/in/anurag-singh-lucknow/?skipRedirect=true',
                github: 'https://github.com/AnuragSingh8090',
                portfolio: 'https://myportfolioanurag.netlify.app/',
                twitter: 'https://x.com/?lang=en'
            }
        }
    ]

}




export const faqs = [
    {
        id: 1,
        question: "How do I place an order?",
        answer: "To place an order, browse our products, select the items you wish to purchase, add them to your cart, and proceed to checkout. You'll need to provide shipping information and payment details to complete your order."
    },
    {
        id: 2,
        question: "What payment methods do you accept?",
        answer: "We accept credit cards (Visa, MasterCard, American Express), debit cards, PayPal, and UPI payments. For certain regions, we also offer Cash on Delivery (COD) options."
    },
    {
        id: 3,
        question: "How long will my delivery take?",
        answer: "Delivery times depend on your location and the shipping method chosen. Typically, domestic orders are delivered within 3-7 business days, while international orders may take 7-14 business days."
    },
    {
        id: 4,
        question: "What is your return policy?",
        answer: "We accept returns within 30 days of delivery for most items. Products must be unused, in their original packaging, and in the same condition as received."
    },
    {
        id: 5,
        question: "How do I track my order?",
        answer: "You can track your order by logging into your account and visiting the 'My Orders' section. There, you'll find tracking information for all your recent orders."
    },
    {
        id: 6,
        question: "Can I change or cancel my order?",
        answer: "You can change or cancel your order within 1 hour of placing it. After this period, if the order has not been shipped, you may contact our customer service team to request changes or cancellation."
    },
    {
        id: 7,
        question: "Do you ship internationally?",
        answer: "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary depending on the destination."
    },
    {
        id: 8,
        question: "Are my payment details secure?",
        answer: "Yes, we use industry-standard encryption and security protocols to protect your payment information. We never store your complete credit card details on our servers."
    },
    {
        id: 9,
        question: "How do I reset my password?",
        answer: "If you forgot your password, click on the 'Forgot Password' link on the login page. Enter the email address associated with your account, and we will send you a link to reset your password."
    }
];

export const policyHighlights = [
    {
        id: 1,
        title: "Easy Cancellation",
        description: "Cancel anytime before shipping",
        icon: "fa-ban"
    },
    {
        id: 2,
        title: "30-Day Returns",
        description: "Full policy for eligible items",
        icon: "fa-rotate-left"
    },
    {
        id: 3,
        title: "5-7 Days Refund",
        description: "Direct to original payment mode",
        icon: "fa-wallet"
    },
    {
        id: 4,
        title: "Free Replacement",
        description: "For damaged or defective items",
        icon: "fa-arrows-rotate"
    }
];

export const cancellationReturnPolicies = [
    {
        id: 1,
        title: "Cancellation Policy",
        intro: "At BazaarWale, we understand that plans change and you may need to cancel your order. Please review our cancellation policy:",
        subsections: [
            {
                title: "Order Cancellation Before Shipping",
                icon: "fa-circle-check",
                variant: "primary",
                points: [
                    "You can cancel your order at any time before it has been shipped.",
                    "To cancel an order, log in to your account, go to order history, and select the cancel option.",
                    "Alternatively, you can contact our customer service team via email or phone.",
                    "Once your cancellation request is received, we will process it within 24 hours.",
                    "If payment has already been made, the refund will be processed according to our refund policy."
                ]
            },
            {
                title: "Order Cancellation After Shipping",
                icon: "fa-truck-ramp-box",
                variant: "neutral",
                points: [
                    "Orders that have already been shipped cannot be cancelled directly.",
                    "In such cases, you will need to refuse the delivery or follow our return policy.",
                    "Shipping charges are non-refundable if the order has already been shipped."
                ]
            }
        ]
    },
    {
        id: 2,
        title: "Return Policy",
        intro: "We strive to ensure you're completely satisfied with your purchase. If you're not, you may be eligible to return the product:",
        subsections: [
            {
                title: "Return Eligibility",
                icon: "fa-shield-halved",
                variant: "primary",
                points: [
                    "Returns are accepted within 30 days of delivery.",
                    "Products must be in their original condition, unused, unwashed, and with all tags attached.",
                    "Original packaging must be intact and included with the return.",
                    "Certain products cannot be returned due to hygiene reasons (e.g. personal care items).",
                    "Products marked as \"non-returnable\" on the product page cannot be returned."
                ]
            },
            {
                title: "How to Return",
                icon: "fa-list-check",
                variant: "neutral",
                points: [
                    "Log in to your account and visit the order history section.",
                    "Select the order and item(s) you wish to return.",
                    "Choose a reason for the return from the dropdown menu.",
                    "Follow the instructions to generate a return shipping label.",
                    "Package the item securely and attach the return shipping label.",
                    "Drop off the package at the nearest authorized courier center."
                ]
            }
        ]
    },
    {
        id: 3,
        title: "Refund Policy",
        intro: "Once we receive your returned item, our team will inspect it and process your refund:",
        subsections: [
            {
                title: "Refund Process",
                icon: "fa-clock-rotate-left",
                variant: "neutral",
                points: [
                    "Refunds are processed within 5-7 business days after inspect.",
                    "Credited back to original payment method used.",
                    "Cash on delivery processed to wallet or bank account.",
                    "Confirmation email sent once refund is processed."
                ]
            },
            {
                title: "Refundable Amount",
                icon: "fa-hand-holding-dollar",
                variant: "primary",
                points: [
                    "Product price is fully refundable if criteria met.",
                    "Original shipping non-refundable unless our error.",
                    "Full amount including shipping refunded for defective items."
                ]
            }
        ]
    },
    {
        id: 4,
        title: "Replacement Policy",
        intro: "If you receive a damaged or defective product, you may request a replacement:",
        subsections: [
            {
                title: "Replacement Eligibility",
                icon: "fa-triangle-exclamation",
                variant: "neutral",
                points: [
                    "Replacements available for damaged, defective, or incorrect items.",
                    "Must be requested within 7 days of delivery.",
                    "Photos of damaged or defective product may be required.",
                    "Replacements subject to product availability."
                ]
            },
            {
                title: "Replacement Process",
                icon: "fa-truck-fast",
                variant: "primary",
                points: [
                    "Log in to account and visit order history section.",
                    "Select order and item(s) for replacement.",
                    "Choose \"Replacement\" as preferred resolution and submit details."
                ]
            }
        ]
    }
];