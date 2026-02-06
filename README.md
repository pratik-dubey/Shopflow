# 🛍️ ShopFlow - AI-Powered E-Commerce Experience

<div align="center">
  <img src="public/shopflow-banner.svg" alt="ShopFlow Banner" width="600"/>
  
  [![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2015-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
  [![Powered by Tambo](https://img.shields.io/badge/Powered%20by-Tambo%20AI-blue?style=for-the-badge)](https://tambo.ai)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
</div>

---

## 🚀 Overview

**ShopFlow** revolutionizes online shopping by combining the power of conversational AI with a stunning e-commerce interface. Simply describe what you're looking for, and watch as our AI assistant dynamically renders personalized product recommendations, applies filters, and helps you discover exactly what you need.

### 🎯 The Problem

Traditional e-commerce platforms force users through rigid navigation patterns, endless filtering options, and overwhelming product catalogs. Finding the right product often feels like searching for a needle in a haystack.

### 💡 Our Solution

ShopFlow introduces a **conversational commerce paradigm** where users can:
- Describe what they want in natural language
- Get AI-rendered product grids tailored to their needs
- Apply complex filters through simple conversation
- Receive personalized recommendations based on context

---

## ✨ Features

### 🤖 AI-Powered Shopping Assistant
- **Natural Language Queries**: "Show me electronics under $100" or "Find me a stylish jacket"
- **Dynamic UI Rendering**: AI generates and renders product components in real-time
- **Context-Aware Responses**: Remembers your preferences throughout the session

### 🎨 Beautiful, Modern UI
- **Glassmorphism Design**: Stunning frosted glass effects
- **Dark/Light Mode**: Seamless theme switching with smooth transitions
- **Responsive Layout**: Perfect experience on any device
- **Micro-Animations**: Delightful hover effects and transitions

### 🛒 Full E-Commerce Functionality
- **Product Catalog**: Browse 20+ products across 4 categories
- **Smart Filtering**: Category, price range, rating, and search
- **Shopping Cart**: Add, remove, and manage items
- **Real-time Updates**: Instant UI updates without page refresh

### 🔧 Technical Excellence
- **Type-Safe**: Full TypeScript implementation
- **Component Registration**: Tambo-powered AI component rendering
- **API Integration**: FakeStore API for realistic product data
- **State Management**: React Context for global state

---

## 📁 Project Structure
shopflow/
├── public/                          # Static assets
│   ├── shopflow-banner.svg
│   ├── Octo-Icon.svg
│   └── Tambo-Lockup.svg
│
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Root layout with providers
│   │   ├── page.tsx                 # Landing page
│   │   ├── globals.css              # Global styles & theme
│   │   ├── favicon.ico
│   │   │
│   │   ├── chat/                    # 🤖 AI Chat Interface
│   │   │   └── page.tsx             # Main chat page with AI assistant
│   │   │
│   │   ├── products/                # 🛍️ Products Catalog
│   │   │   └── page.tsx             # Browse all products
│   │   │
│   │   └── interactables/           # Interactive components demo
│   │       ├── page.tsx
│   │       └── components/
│   │           └── settings-panel.tsx
│   │
│   ├── components/
│   │   ├── common/                  # 🔧 Shared Components
│   │   │   ├── header.tsx           # Navigation header
│   │   │   ├── footer.tsx           # Site footer
│   │   │   └── theme-toggle.tsx     # Dark/light mode toggle
│   │   │
│   │   ├── landing/                 # 🏠 Landing Page Components
│   │   │   ├── hero-section.tsx     # Hero with CTA
│   │   │   ├── features-section.tsx # Feature highlights
│   │   │   ├── demo-section.tsx     # Interactive demo
│   │   │   └── cta-section.tsx      # Call to action
│   │   │
│   │   ├── tambo/                   # 🤖 AI-Renderable Components
│   │   │   ├── product-card.tsx     # Single product display
│   │   │   ├── product-grid.tsx     # Product grid with filters
│   │   │   ├── product-filters.tsx  # Filter panel
│   │   │   ├── product-details.tsx  # Detailed product view
│   │   │   ├── product-comparison.tsx # Compare products
│   │   │   ├── cart-widget.tsx      # Shopping cart
│   │   │   ├── category-list.tsx    # Category navigation
│   │   │   ├── price-range-slider.tsx # Price filter
│   │   │   ├── search-results.tsx   # Search results
│   │   │   ├── quick-stats.tsx      # Product statistics
│   │   │   ├── message-thread-full.tsx
│   │   │   ├── message-input.tsx
│   │   │   ├── message.tsx
│   │   │   ├── thread-container.tsx
│   │   │   ├── thread-content.tsx
│   │   │   ├── thread-history.tsx
│   │   │   └── scrollable-message-container.tsx
│   │   │
│   │   ├── ui/                      # 🎨 Base UI Components
│   │   │   └── card-data.tsx
│   │   │
│   │   └── ApiKeyCheck.tsx          # API key validation
│   │
│   ├── context/                     # 📦 React Context Providers
│   │   ├── theme-provider.tsx       # Theme state management
│   │   ├── cart-context.tsx         # Shopping cart state
│   │   └── filter-context.tsx       # Filter state management
│   │
│   ├── services/                    # 🌐 API Services
│   │   ├── fakestore-api.ts         # FakeStore API integration
│   │   ├── types.ts                 # TypeScript interfaces
│   │   └── population-stats.ts      # Stats utilities
│   │
│   └── lib/                         # 🛠️ Utilities
│       ├── tambo.ts                 # Tambo AI configuration
│       ├── thread-hooks.ts          # Custom hooks for threads
│       └── utils.ts                 # Helper functions
│
├── .env.local                       # Environment variables
├── tailwind.config.ts               # Tailwind configuration
├── next.config.ts                   # Next.js configuration
├── tsconfig.json                    # TypeScript configuration
├── package.json                     # Dependencies
└── README.md                        # Documentation


---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | React framework with App Router |
| **Tambo AI** | Conversational AI & component rendering |
| **TypeScript** | Type-safe development |
| **Tailwind CSS 4** | Utility-first styling |
| **FakeStore API** | Product data source |
| **React Context** | State management |
| **Lucide Icons** | Beautiful iconography |

---

## 📦 Installation

### Prerequisites
- Node.js 15+ 
- npm or yarn
- Tambo API key

### Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/shopflow.git
cd shopflow

# Install dependencies
npm install

# Set up environment variables
cp example.env.local .env.local
# Add your TAMBO_API_KEY to .env.local

# Run the development server
npm run dev


Example Queries
text

💬 "Show me all electronics"
💬 "Find products under $50"
💬 "I need a men's jacket with good ratings"
💬 "Compare the top-rated jewelry items"
💬 "Add the cheapest laptop to my cart"
💬 "What's the average price of women's clothing?"
💬 "Show me the best-rated products"

🤝 Contributing
We welcome contributions! Please follow these steps:

Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request

🙏 Acknowledgments
<div align="center">
Special Thanks To
<a href="https://www.wemakedevs.org/"> <img src="https://www.wemakedevs.org/images/logo.png" alt="We Make Devs" width="200"/> </a>
We Make Devs - For fostering an amazing developer community and providing opportunities to learn and grow! 🚀

</div>
Tambo AI for the incredible AI platform
FakeStore API for product data
Lucide for beautiful icons
Tailwind CSS for styling utilities


Authors & Team 
Team name :- Uizards
authors :- Pratik Dubey , Aryan Tripathi
