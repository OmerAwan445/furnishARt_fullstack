import { FaFacebook, FaInstagram, FaPinterest, FaTwitter } from "react-icons/fa";

const footerContent = {
    title: "FurnishARt",
    description: "Elevate your living space with our curated collection of artful furniture, designed to inspire and impress.",
    footerColumns: [
        {
            title: "Explore",
            links: [
                {
                    name: "Living Room",
                    link: "/explore/living-room",
                },
                {
                    name: "Bedroom",
                    link: "/explore/bedroom",
                },
                {
                    name: "Office",
                    link: "/explore/office",
                },
            ]
        },
        {
            title: "Resources",
            links: [
                {
                    name: "Design Tips",
                    link: "/resources/design-tips",
                },
                {
                    name: "Furniture Care",
                    link: "/resources/furniture-care",
                },
                {
                    name: "Customer Support",
                    link: "/resources/customer-support",
                },
            ]
        },
        {
            title: "Company",
            links: [
                {
                    name: "About Us",
                    link: "/about",
                },
                {
                    name: "Contact Us",
                    link: "/contact-us",
                },
                {
                    name: "Privacy Policy",
                    link: "/privacy-policy",
                },
                {
                    name: "Terms of Service",
                    link: "/terms-of-service",
                },
            ]
        },
    ],
    socials: [
        {
            name: 'Facebook',
            link: 'https://www.facebook.com/',
            SocialIcon: FaFacebook,
        },
        {
            name: 'Instagram',
            link: 'https://www.instagram.com/',
            SocialIcon: FaInstagram,
        },
        {
            name: 'Pinterest',
            link: 'https://www.pinterest.com/',
            SocialIcon: FaPinterest,
        },
        {
            name: 'Twitter',
            link: 'https://www.twitter.com/',
            SocialIcon: FaTwitter,
        },
    ],
};

export default footerContent;
