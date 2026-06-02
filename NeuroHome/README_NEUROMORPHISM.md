# NeuroHome - React + Tailwind CSS Neuromorphism Fashion Store

A modern, responsive e-commerce frontend built with **React** and **Tailwind CSS** featuring **Neuromorphism** design principles - a soft, 3D aesthetic that combines skeuomorphism with minimalism.

## 🎨 Project Overview

NeuroHome is a fashion e-commerce website inspired by the classic "Fashion and Freedom" design from Day-1 and Day-2, completely redesigned with:

- **React Components**: Modular, reusable UI components
- **Tailwind CSS**: Utility-first CSS framework for rapid development
- **Neuromorphism**: Soft shadows, subtle depth, and organic shapes for a premium feel
- **Responsive Design**: Mobile-first approach for all screen sizes
- **Interactive Features**: Auto-scrolling hero slider, smooth transitions, and hover effects

## 📁 Project Structure

```
NeuroHome/
├── src/
│   ├── components/
│   │   ├── TopBar.jsx          # Top promotional bar
│   │   ├── Navbar.jsx          # Main navigation with logo and icons
│   │   ├── HeroSlider.jsx      # Auto-scrolling hero section with neuromorphic buttons
│   │   ├── CategoryGrid.jsx    # Category showcase with hover effects
│   │   ├── ProductCard.jsx     # Individual product card component
│   │   ├── ProductShowcase.jsx # Grid of featured products
│   │   ├── Newsletter.jsx      # Email subscription section
│   │   └── Footer.jsx          # Footer with links and social media
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # React entry point
│   └── index.css               # Tailwind directives and custom styles
├── tailwind.config.js          # Tailwind configuration with neuromorphic theme
├── postcss.config.js           # PostCSS configuration
├── vite.config.js              # Vite bundler configuration
└── package.json                # Project dependencies
```

## 🎯 Key Components

### 1. **TopBar** 
- Black promotional header
- Sign-in, FAQ links
- Currency selector
- Simple and clean design

### 2. **Navbar**
- Logo (Fashion & Freedom)
- Navigation links with hover effects
- Search, profile, and cart icons
- Neuromorphic shadow effects
- Sticky/fixed position ready

### 3. **HeroSlider**
- Full-screen image carousel
- Auto-rotates every 5 seconds
- Navigation arrows with neuromorphic styling
- Dot indicators for slide selection
- Overlay text with neuromorphic button
- Smooth transitions and animations

### 4. **CategoryGrid**
- 4-column category showcase
- Image overlay with hover effects
- Neuromorphic "Explore" button
- Responsive grid layout
- Scale and shadow animations on hover

### 5. **ProductCard**
- Product image with aspect ratio
- Category label
- Product title
- Price display
- Neuromorphic add-to-cart button
- Hover scale effects

### 6. **ProductShowcase**
- Grid of featured products
- Section with decorative divider
- "View All Products" CTA button
- Responsive layout (1-3 columns)

### 7. **Newsletter**
- Email subscription form
- Neuromorphic input and button
- Dark background for contrast
- Responsive flex layout

### 8. **Footer**
- Multi-column layout
- About, Support, Legal links
- Social media buttons with neuromorphic style
- Copyright information

## 🎨 Neuromorphism Design Details

### Neuromorphic Elements:
- **Soft Shadows**: `shadow-neuro` class creates dual shadows (inset and outer)
- **Subtle Depth**: Multiple shadow layers for 3D effect
- **Rounded Corners**: `rounded-xl` and `rounded-2xl` for organic appearance
- **Light Background**: Soft off-white (#f5f7fa) for neutral base
- **Hover States**: Scale transforms and shadow adjustments
- **Active States**: Inset shadows for press effect

### Custom Tailwind Classes:
```css
neuro: "9px 9px 16px rgba(0, 0, 0, 0.1), -9px -9px 16px rgba(255, 255, 255, 0.7)"
neuro_inset: "inset 9px 9px 16px rgba(0, 0, 0, 0.1), inset -9px -9px 16px rgba(255, 255, 255, 0.7)"
neuro_hover: "5px 5px 12px rgba(0, 0, 0, 0.15), -5px -5px 12px rgba(255, 255, 255, 0.8)"
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project:
```bash
cd NeuroHome
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit: `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

## 📦 Dependencies

### Core
- **React**: UI library
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool and dev server
- **PostCSS**: CSS transformation tool
- **Autoprefixer**: Vendor prefix automat

## 🎯 Features

✅ **Responsive Design** - Works on mobile, tablet, and desktop  
✅ **Neuromorphic UI** - Soft, modern aesthetic  
✅ **Interactive Components** - Hover effects, animations  
✅ **Auto-scrolling Hero** - 5-second interval carousel  
✅ **Reusable Components** - Modular React structure  
✅ **Tailwind CSS** - Easy customization and theming  
✅ **SEO-friendly** - Semantic HTML  
✅ **Performance** - Optimized with Vite  

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  neuromorphic: {
    light: "#f5f7fa",  // Change this
    dark: "#e0e5ec",
    shadow: "rgba(0, 0, 0, 0.1)",
    highlight: "rgba(255, 255, 255, 0.3)",
  }
}
```

### Modify Shadows
Adjust shadow values in `tailwind.config.js` `boxShadow` section.

### Update Products
Edit the `products` array in [ProductShowcase.jsx](src/components/ProductShowcase.jsx)

### Change Images
Replace image URLs in each component with your own images.

## 🔧 Development Tips

- **Hot Module Replacement**: Changes save instantly
- **Tailwind IntelliSense**: Install VSCode extension for autocomplete
- **Component Reusability**: Import and use components anywhere
- **Custom Classes**: Add in `@layer components` in `index.css`

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Vite Documentation](https://vite.dev)
- [Neuromorphism Design Guide](https://uxdesign.cc/neumorphism-in-user-interfaces-b0106cdc9bbd)

## 📄 License

This project is open source and available for personal and commercial use.

---

**Created**: June 2, 2026  
**Designer**: AI Assistant  
**Purpose**: OJT Training Project - Day-18
