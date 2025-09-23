# OnePe - Digital Payment App

OnePe is a modern, responsive bill payment application built with Next.js, similar to Paytm but focused on bill payments and wallet management (without peer-to-peer transfers or QR scanning).

## ✨ Features

### 🏠 **Home Page**
- **Animated Splash Screen**: Beautiful OnePe branding with smooth transitions
- **Digital Wallet**: Balance display with quick add money options and transaction insights
- **Promotional Banners**: Auto-rotating carousel showcasing offers and promotions  
- **Service Categories**: Quick access to all bill payment services with visual indicators for popular services and discounts
- **Quick Actions**: Fast access to frequently used features
- **Recent Transactions**: Preview of latest payment activities

### 👤 **Profile Page**
- **User Information**: Complete profile with KYC status and membership tier
- **Account Settings**: Comprehensive settings management
- **Theme Toggle**: Smooth dark/light mode switching
- **Usage Statistics**: Monthly spending and cashback earned
- **Security Settings**: Payment methods and privacy controls

### 📊 **Transactions**
- **Complete History**: All bill payments and wallet transactions
- **Advanced Filters**: Filter by status, date, amount, and category
- **Search Functionality**: Find specific transactions quickly
- **Transaction Details**: Comprehensive information for each payment

### ⚙️ **Services**
- **Bill Payment Categories**: Mobile, DTH, Electricity, Water, Gas, Insurance, etc.
- **Service Discovery**: Visual grid with popular services highlighted
- **Category Organization**: Utilities, Telecom, and other service groups

## 🛠 **Tech Stack**

- **Framework**: Next.js 15.5.3 with App Router and Turbopack
- **Language**: TypeScript for type safety
- **Styling**: TailwindCSS 4.x for utility-first CSS
- **Animations**: Framer Motion for smooth interactions
- **Icons**: Lucide React for consistent iconography  
- **State Management**: Zustand for lightweight state management
- **Theme System**: Next-themes for dark/light mode
- **HTTP Client**: Axios for API requests

## 🚀 **Getting Started**

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd onepe_fe_v2
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Configure your environment variables in `.env.local`

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 **Build Commands**

### Development
```bash
npm run dev          # Start development server with hot reload
```

### Production Build
```bash
npm run build        # Create optimized production build
npm run start        # Start production server
```

### Code Quality
```bash
npm run lint         # Run ESLint for code quality checks
```

## 📱 **Mobile-First Design**

OnePe is designed with a mobile-first approach:

- **Responsive Layout**: Optimized for mobile screens (320px-480px)
- **Touch-Friendly**: 44px minimum touch targets for accessibility
- **Safe Areas**: Full iOS safe area support for notched devices
- **Smooth Scrolling**: Optimized scroll behavior for mobile browsers
- **PWA Ready**: Can be installed as a Progressive Web App

## 🎨 **Design System**

### Color Scheme
- **Light Theme**: Clean whites and subtle grays
- **Dark Theme**: Deep blues and modern dark surfaces
- **Brand Colors**: Primary blue (#3b82f6) with purple accents
- **Status Colors**: Green (success), Orange (warning), Red (error)

### Typography
- **Primary Font**: System fonts for optimal performance
- **Font Sizes**: Responsive scaling with clamp() functions
- **Line Heights**: Optimized for readability on mobile

### Components
- **Consistent Spacing**: 4px base unit system
- **Border Radius**: Consistent rounded corners (8px-16px)
- **Shadows**: Subtle elevation system
- **Animations**: 200-300ms duration for interactions
