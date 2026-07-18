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

export const privacyHighlights = [
    {
        id: 1,
        title: "Data Protection",
        description: "Your data is encrypted & secured",
        icon: "fa-user-shield"
    },
    {
        id: 2,
        title: "Zero Spam",
        description: "We never sell or share your email",
        icon: "fa-envelope-circle-check"
    },
    {
        id: 3,
        title: "100% Confidential",
        description: "Strict privacy standards maintained",
        icon: "fa-lock"
    },
    {
        id: 4,
        title: "Full Control",
        description: "Manage your data preferences anytime",
        icon: "fa-sliders"
    }
];

export const privacyPolicies = [
    {
        id: 1,
        title: "Introduction",
        content: [
            "At BazaarWale, we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.",
            "Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access our website or use our services."
        ]
    },
    {
        id: 2,
        title: "Information We Collect",
        intro: "We collect several types of information from and about users of our website, including:",
        items: [
            { label: "Personal Information", text: "This includes your name, email address, postal address, phone number, and payment information." },
            { label: "Account Information", text: "Details such as your username, password, purchase history, and items in your wishlist." },
            { label: "Transaction Information", text: "Data about purchases and other transactions made through our website, including payment details." },
            { label: "Technical Information", text: "IP addresses, browser types, device types, operating system, and browsing activity." },
            { label: "User Content", text: "Reviews, ratings, feedback, testimonials, and other content you provide on our platform." }
        ]
    },
    {
        id: 3,
        title: "How We Collect Information",
        intro: "We collect information in the following ways:",
        items: [
            { label: "Direct Interactions", text: "When you create an account, make a purchase, subscribe to newsletters, participate in surveys, or communicate with us." },
            { label: "Automated Technologies", text: "As you navigate through our website, we may use cookies and tracking technologies to collect browsing data." },
            { label: "Third Parties", text: "We may receive information from third parties such as business partners, payment processors, and analytics providers." }
        ]
    },
    {
        id: 4,
        title: "How We Use Your Information",
        intro: "We use the information we collect about you to:",
        points: [
            "Process and fulfill your orders",
            "Manage your account and provide customer support",
            "Communicate with you about products, services, and promotions",
            "Improve our website, products, and services",
            "Personalize your shopping experience",
            "Protect against fraud and unauthorized transactions",
            "Comply with legal obligations",
            "Analyze usage patterns to enhance user experience and website functionality"
        ]
    },
    {
        id: 5,
        title: "Disclosure of Your Information",
        intro: "We may disclose your personal information to:",
        items: [
            { label: "Service Providers", text: "Third parties who perform services on our behalf, such as payment processing, shipping, customer service, and marketing." },
            { label: "Business Partners", text: "Companies we collaborate with to offer joint promotions or products." },
            { label: "Legal Authorities", text: "When required by law or if we believe disclosure is necessary to protect our rights, property, or safety." },
            { label: "Business Transfers", text: "In connection with a merger, acquisition, or sale of all or a portion of our business." }
        ],
        outro: "We do not sell your personal information to third parties for their marketing purposes without your consent."
    },
    {
        id: 6,
        title: "Data Security",
        content: [
            "We implement appropriate security measures to protect your personal information from accidental loss, unauthorized access, use, alteration, or disclosure. These measures include encryption, firewalls, and secure server protocols.",
            "However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security."
        ]
    },
    {
        id: 7,
        title: "Your Rights",
        intro: "Depending on your location, you may have certain rights regarding your personal information, including the right to:",
        points: [
            "Access your personal information",
            "Correct inaccurate or incomplete information",
            "Request deletion of your personal information",
            "Withdraw consent where processing is based on consent",
            "Object to processing of your personal information",
            "Request restriction of processing your personal information",
            "Request transfer of your personal information"
        ],
        outro: "To exercise any of these rights, please contact us at privacy@bazaarwale.com."
    },
    {
        id: 8,
        title: "Cookies Policy",
        content: [
            "Our website uses cookies to enhance your experience. Cookies are small text files that are stored on your computer when you visit websites. We use both session cookies (which expire once you close your web browser) and persistent cookies (which stay on your device until you delete them)."
        ],
        intro: "Types of cookies we use:",
        items: [
            { label: "Essential Cookies", text: "Required for the website to function properly." },
            { label: "Analytical/Performance Cookies", text: "Allow us to recognize and count visitors and analyze website usage." },
            { label: "Functionality Cookies", text: "Remember your preferences and choices." },
            { label: "Targeting Cookies", text: "Record your visit to our website, pages visited, and links followed to deliver relevant advertisements." }
        ],
        outro: "You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, some parts of our website may become inaccessible or not function properly."
    },
    {
        id: 9,
        title: "Children's Privacy",
        content: [
            "Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us, and we will delete such information from our systems."
        ]
    },
    {
        id: 10,
        title: "Changes to Our Privacy Policy",
        content: [
            "We may update our Privacy Policy from time to time. Any changes will be posted on this page with a revised \"Last Updated\" date. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information."
        ]
    }
];