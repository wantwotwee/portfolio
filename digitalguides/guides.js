/* ================================================================
   EDIT THIS FILE TO MANAGE YOUR GUIDES AND CONTACT DETAILS.
   Images should be placed in digitalguides/assets/.
   WhatsApp number: country code + number, without +, spaces or dashes.
   Telegram username: without the @ symbol.
   ================================================================ */

window.DIGITAL_GUIDE_CONFIG = {
  whatsappNumber: "6589202646",
  telegramUsername: "wantwotwee",
  currency: "S$"
};

window.DIGITAL_GUIDES = [
  {
    id: "cloudflare-github-pages",
    title: "Connect a Cloudflare Domain to GitHub Pages",
    categories: ["Tech"],
    price: 9.90,
    format: "Illustrated PDF · Step-by-step guide",
    image: "assets/tech-guide.webp",
    imageAlt: "Laptop displaying a website deployment dashboard",
    summary: "A beginner-friendly walkthrough for connecting your own domain to a GitHub Pages website.",
    description: "This visual guide takes you through the complete process of connecting a domain managed through Cloudflare to a website hosted on GitHub Pages. Each stage is explained in plain language, with common errors and waiting periods clearly identified.",
    includes: [
      "Preparing your GitHub Pages repository",
      "Adding and verifying a custom domain",
      "Creating the correct Cloudflare DNS records",
      "Understanding HTTPS certificate waiting periods",
      "Troubleshooting common DNS and redirect problems"
    ],
    value: "It replaces scattered technical documentation with one clear sequence, helping first-time website owners avoid incorrect DNS records, broken redirects and unnecessary troubleshooting.",
    published: "2026-07-14",
    featured: 1
  },
  {
    id: "website-creator",
    title: "Full Website Creator",
    categories: ["Tech"],
    price: 20,
    format: "Illustrated PDF · Step-by-step guide",
    image: "assets/travel-guide.webp",
    imageAlt: "Travel journal, map and luggage prepared for a journey",
    summary: "A comprehensive step-by-step guide to creating a professional-level website at the lowest cost. Users save more than $500 per year!",
    description: "A practical planning guide for people who wants to create their own website with their own vision and wanting their own flexibility. This guide was trial and tested several times and replicated with success after many iterarations.",
    includes: [
      "Which platform to build your website on",
       "Which platform to setup your server on",
      "How to setup DNS Routing",
      "How to create your first landing page",
      "How to ensure https SSS certification",
      "How to customize your own website"
    ],
    value: "It helps users create websites that are customizeable to their vision, and it saves a mot of monthly costs that are typically charged by most website builder platforms and server hosting platforms.",
    published: "2026-07-10",
    featured: 2
  },
  {
    id: "handcraft-project-journal",
    title: "The Handcraft Project Journal",
    categories: ["Handcraft"],
    price: 8.90,
    format: "Printable PDF · Creative workbook",
    image: "assets/handcraft-guide.webp",
    imageAlt: "Handcraft tools and materials arranged on a workshop table",
    summary: "Plan, document and improve handmade projects with a simple reusable creative journal.",
    description: "Designed for makers working with textiles, clay, leather, paper or mixed materials, this guide helps turn loose ideas into organised projects. It records materials, dimensions, techniques, costs and lessons from every attempt.",
    includes: [
      "Project concept and sketch pages",
      "Materials, measurements and supplier lists",
      "Cost and pricing worksheets",
      "Process notes and progress checkpoints",
      "Post-project review and improvement prompts"
    ],
    value: "It helps makers reproduce successful work, understand their real costs and preserve the small process discoveries that are often forgotten between projects.",
    published: "2026-07-05",
    featured: 3
  }
];
