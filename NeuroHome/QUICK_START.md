# Quick Start Guide - NeuroHome

## 🚀 Getting Started in 5 Minutes

### Prerequisites
- Node.js installed (v14+)
- Terminal/Command Prompt access
- Text editor (VS Code recommended)

### Step 1: Navigate to Project
```bash
cd /workspaces/OJT_training_2401030400012/NeuroHome
```

### Step 2: Install Dependencies (if not already done)
```bash
npm install
```

### Step 3: Start Development Server
```bash
npm run dev
```

### Step 4: Open in Browser
Visit: **http://localhost:5173**

You should see the NeuroHome fashion store with all neuromorphic styling!

---

## 📁 Project Structure Explained

```
NeuroHome/
│
├── 📂 src/
│   ├── 📂 components/       # React components
│   │   ├── TopBar.jsx       # Promotional header
│   │   ├── Navbar.jsx       # Navigation bar
│   │   ├── HeroSlider.jsx   # Main carousel
│   │   ├── CategoryGrid.jsx # Category showcase
│   │   ├── ProductCard.jsx  # Individual product
│   │   ├── ProductShowcase.jsx  # Products grid
│   │   ├── Newsletter.jsx   # Email signup
│   │   └── Footer.jsx       # Footer section
│   │
│   ├── App.jsx              # Main component (assembles all)
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles + Tailwind
│
├── 📄 tailwind.config.js    # Tailwind CSS config
├── 📄 postcss.config.js     # PostCSS config
├── 📄 vite.config.js        # Vite bundler config
├── 📄 package.json          # Dependencies list
│
└── 📄 README files:
    ├── README_NEUROMORPHISM.md  # Design system guide
    ├── NEUROMORPHISM_GUIDE.md   # Deep dive into neumorphism
    └── TRANSFORMATION_GUIDE.md  # HTML to React journey
```

---

## 🎯 Common Tasks

### 🔧 Edit a Component

**Example: Change Navbar Title**

1. Open: `src/components/Navbar.jsx`
2. Find: `Fashion & Freedom`
3. Change to: Your store name
4. Save (Ctrl+S)
5. Browser updates automatically!

### 🎨 Add a New Product

1. Open: `src/components/ProductShowcase.jsx`
2. Find the `products` array
3. Add new object:
```javascript
{
  id: 7,
  title: 'New Product Name',
  price: 99.99,
  category: 'Category',
  image: 'https://your-image-url.jpg'
}
```
4. Save - automatically appears!

### 🌈 Change Colors

1. Open: `tailwind.config.js`
2. Modify the `colors.neuromorphic` section:
```javascript
neuromorphic: {
  light: "#ffffff",      // Change light color
  dark: "#f0f0f0",       // Change dark color
}
```
3. Save - all components update!

### 📱 Make Components Responsive

All components already use Tailwind's responsive classes:
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  <!-- 1 column on mobile, 2 on tablet, 4 on desktop -->
</div>
```

Key prefixes:
- `sm:` - Small screens (640px+)
- `md:` - Medium screens (768px+)
- `lg:` - Large screens (1024px+)
- `xl:` - Extra large (1280px+)

---

## 🎨 Understanding Neuromorphism in This Project

### The Three Shadow States

**1. Default (Elevated)**
```jsx
className="shadow-neuro"
// Element appears raised/3D
```

**2. Hover (Closer)**
```jsx
className="hover:shadow-neuro_hover"
// Shadow reduces, element appears closer
```

**3. Pressed (Active)**
```jsx
className="active:shadow-neuro_inset"
// Inset shadow, element appears pressed down
```

### Example: Neuromorphic Button
```jsx
<button className="px-8 py-4 bg-neuromorphic-light text-gray-800 rounded-xl shadow-neuro hover:shadow-neuro_hover active:shadow-neuro_inset transition-all duration-300">
  Click Me
</button>
```

Breaking it down:
- `px-8 py-4` - Padding
- `bg-neuromorphic-light` - Soft light background
- `rounded-xl` - 12px border radius
- `shadow-neuro` - Neuromorphic shadow
- `hover:shadow-neuro_hover` - Reduced shadow on hover
- `active:shadow-neuro_inset` - Inset on click
- `transition-all duration-300` - Smooth animation (0.3s)

---

## 💡 Component Overview

### TopBar
- **Purpose**: Promo message + navigation links
- **Edit**: `src/components/TopBar.jsx`
- **Features**: Currency selector, Sign in link

### Navbar
- **Purpose**: Main navigation
- **Edit**: `src/components/Navbar.jsx`
- **Features**: Logo, menu items, search/profile/cart icons

### HeroSlider
- **Purpose**: Full-screen carousel
- **Edit**: `src/components/HeroSlider.jsx`
- **Features**: Auto-rotate (5s), manual navigation, dots
- **State**: Uses `useState` for current slide

### CategoryGrid
- **Purpose**: 4-column category showcase
- **Edit**: `src/components/CategoryGrid.jsx`
- **Features**: Hover effects, overlay text

### ProductCard
- **Purpose**: Reusable product display
- **Edit**: `src/components/ProductCard.jsx`
- **Features**: Image, title, price, add-to-cart button
- **Usage**: Used by ProductShowcase

### ProductShowcase
- **Purpose**: Featured products section
- **Edit**: `src/components/ProductShowcase.jsx`
- **Features**: Grid layout, uses ProductCard component
- **Data**: Contains products array

### Newsletter
- **Purpose**: Email subscription
- **Edit**: `src/components/Newsletter.jsx`
- **Features**: Input field + subscribe button

### Footer
- **Purpose**: Links and info
- **Edit**: `src/components/Footer.jsx`
- **Features**: Multi-column layout, social icons

---

## 🚨 Troubleshooting

### Problem: Page won't load
**Solution:**
```bash
# Stop server (Ctrl+C)
npm install
npm run dev
```

### Problem: Styles not updating
**Solution:**
```bash
# Clear Tailwind cache
rm -rf .next # (if using Next.js)
npm run dev
```

### Problem: Components not showing
**Solution:**
- Check console for errors (F12)
- Verify imports in App.jsx
- Check component file names

### Problem: Images not loading
**Solution:**
- Replace image URLs with your own
- Ensure URLs are valid and accessible
- Check image format (jpg, png, webp)

---

## 📚 Useful Resources

**React Docs**: https://react.dev  
**Tailwind CSS**: https://tailwindcss.com  
**Vite**: https://vite.dev  
**Neuromorphism Design**: https://uxdesign.cc/neumorphism  

---

## 🎯 Next Steps

### For Learning:
1. Read `NEUROMORPHISM_GUIDE.md` for design deep-dive
2. Read `TRANSFORMATION_GUIDE.md` to understand React conversion
3. Experiment by modifying components

### For Development:
1. Add backend API integration
2. Connect to e-commerce platform
3. Add user authentication
4. Implement shopping cart
5. Add product filters

### For Deployment:
```bash
# Build for production
npm run build

# Upload dist/ folder to hosting
# Examples: Netlify, Vercel, GitHub Pages
```

---

## 🎓 Learning React Components

### Basic Structure
```jsx
const ComponentName = () => {
  return (
    <div className="...">
      {/* JSX code here */}
    </div>
  );
};

export default ComponentName;
```

### With State
```jsx
import { useState } from 'react';

const ComponentName = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
};
```

### With Effects
```jsx
import { useEffect } from 'react';

const ComponentName = () => {
  useEffect(() => {
    // Runs once on mount
    console.log('Component loaded');
    
    return () => {
      // Cleanup function
    };
  }, []); // Empty array = run once
  
  return <div>Content</div>;
};
```

---

## 📞 Tips & Tricks

**Tip 1: Use Tailwind IntelliSense**
- Install VSCode extension: "Tailwind CSS IntelliSense"
- Get autocomplete for all classes

**Tip 2: Debug React Components**
- Install React DevTools browser extension
- Inspect component props and state in real-time

**Tip 3: Check Performance**
- Use Lighthouse (Chrome DevTools)
- Monitor performance metrics

**Tip 4: Version Control**
```bash
git add .
git commit -m "Your message"
git push origin main
```

---

## 🎉 You're Ready!

Start exploring, editing, and building with NeuroHome. Happy coding! 🚀

For questions, refer to the other documentation files or check the component source code - it's well-commented!
