# 🏪 GreenLantern Electronics Website

A modern, feature-rich e-commerce website for electronic products and electrical services built with React, TypeScript, and Supabase.

## ✨ Features

### 🛍️ E-Commerce Features
- **Product Catalog** - Browse electronic products with detailed information
- **Shopping Cart** - Add products to cart with quantity management
- **Checkout System** - Place orders with customer information
- **Real-time Cart Updates** - Cart state persisted across sessions

### ⚡ Service Features
- **Book an Electrician** - Schedule electrical services with form submission
- **Service Categories** - Various electrical services available
- **Appointment Management** - Date and time scheduling

### 📞 Customer Features
- **Feedback System** - 5-star rating and message submission
- **Contact Information** - Multiple contact methods
- **Social Media Integration** - WhatsApp, Instagram, Twitter, Facebook

### 🎨 Technical Features
- **Smooth Animations** - Framer Motion animations throughout
- **Responsive Design** - Mobile-first approach
- **Type Safety** - Full TypeScript support
- **Modern UI** - Styled-components with consistent design system
- **Database Integration** - Supabase for backend operations

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account (for backend features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd electronic-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp .env.local.example .env.local
   
   # Edit .env.local with your Supabase credentials
   REACT_APP_SUPABASE_URL=your_supabase_project_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase database** (See [Database Setup](#database-setup) section)

5. **Start the development server**
   ```bash
   npm start
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🗄️ Database Setup

### Supabase Configuration

1. **Create a Supabase project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note your project URL and anon key

2. **Run the database schema**
   - Open the Supabase SQL Editor
   - Copy and paste the contents of `database-schema.sql`
   - Execute the script to create all necessary tables

### Database Tables Created

- **products** - Electronic products catalog
- **cart_items** - User shopping cart items
- **orders** - Customer orders
- **order_items** - Individual items in orders
- **bookings** - Electrician service bookings
- **feedback** - Customer reviews and messages

### Sample Data
The schema includes sample products to get you started immediately.

## 📱 Social Media Integration

The website includes social media links for:
- **WhatsApp**: 08109657708
- **Instagram**: @greenlantern_enterprises
- **Twitter/X**: @ik_gwarzo
- **Facebook**: @ibrahim tijjani

## 🎨 Color Scheme

The website maintains a consistent color scheme:
- **Primary**: Black (#000000)
- **Accent**: Gold/Yellow (#dbbc07)
- **Text**: Dark Gray (#2c3e50)
- **Background**: Light Gray (#f8f9fa)

## 📂 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Booking/        # Electrician booking form
│   ├── Feedback/       # Customer feedback form
│   ├── Footer/         # Site footer with social links
│   ├── Header/         # Navigation header
│   └── Products/       # Product-related components
├── contexts/           # React contexts
│   └── CartContext.tsx # Shopping cart state management
├── data/              # Static data
│   └── products.ts    # Product catalog
├── lib/               # Utility libraries
│   └── supabaseClient.ts # Database client
├── Pages/             # Page components
│   ├── About/
│   ├── Booking/       # Book electrician page
│   ├── Cart/          # Shopping cart page
│   ├── Contact/       # Contact and feedback page
│   ├── Home/
│   └── Products/      # Product listing page
├── styles/            # Global styles
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## 🛠️ Available Scripts

### Development
```bash
npm start          # Start development server
npm test           # Run test suite
npm run lint       # Run ESLint
npm run type-check # Run TypeScript checks
```

### Production
```bash
npm run build      # Build for production
npm run eject      # Eject from Create React App (irreversible)
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

3. **Set Environment Variables**
   - In Vercel dashboard, go to Project Settings
   - Add environment variables:
     - `REACT_APP_SUPABASE_URL`
     - `REACT_APP_SUPABASE_ANON_KEY`

### Other Platforms

The app can be deployed to:
- **Netlify** - Connect GitHub repo and set env vars
- **AWS Amplify** - Import from GitHub
- **GitHub Pages** - Use `npm run build` and deploy build folder

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|-----------|
| `REACT_APP_SUPABASE_URL` | Your Supabase project URL | Yes |
| `REACT_APP_SUPABASE_ANON_KEY` | Your Supabase anonymous key | Yes |

### Customization

- **Colors**: Update the color scheme in styled-components
- **Products**: Modify `src/data/products.ts` for your catalog
- **Social Links**: Update URLs in Footer and Contact components
- **Contact Info**: Change contact details in Contact page

## 🎯 Features Usage

### Shopping Cart
- Products automatically sync to local storage
- Cart persists across browser sessions
- Quantity management with validation
- Checkout creates orders in database

### Service Booking
- Form validation for all required fields
- Date/time scheduling with constraints
- Service type selection
- Automatic confirmation emails (if configured)

### Feedback System
- 5-star rating system
- Message submission
- Admin can view all feedback in Supabase dashboard

## 🐛 Troubleshooting

### Common Issues

1. **Supabase Connection Error**
   - Check your environment variables
   - Verify Supabase URL and key are correct
   - Ensure database tables are created

2. **Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
   - Check TypeScript errors: `npm run type-check`

3. **Icons Not Displaying**
   - This is a known issue with React Icons and React 19
   - The app includes type-safe wrappers for icons

## 📞 Support

For support or questions:
- **Email**: info@greenlanternelectronics.com
- **WhatsApp**: 08109657708
- **GitHub Issues**: Create an issue in this repository

## 📄 License

© 2025 GreenLantern Electronics. All rights reserved.

---

**Built with ❤️ using React, TypeScript, and Supabase**
