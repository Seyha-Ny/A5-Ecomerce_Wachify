# WATCH - Premium Timepieces Ecommerce

A modern, responsive ecommerce website for premium watches and smartwatches built with vanilla JavaScript, HTML, and CSS.

## Overview

WATCH is a full-featured ecommerce platform that showcases a curated collection of luxury watches, smartwatches, and sports watches. The site features a clean, professional design with smooth interactions and a fully functional shopping cart system.

## Features

### 🛍️ Core Features
- **Product Catalog** - Browse and search through premium watch collections
- **Dynamic Product Grid** - Responsive grid layout that adapts to different screen sizes
- **Product Details** - Detailed product pages with specifications and images
- **Shopping Cart** - Add/remove products with real-time cart updates
- **Category Filtering** - Shop by categories (Luxury, Smart Watches, Sports)
- **Dropdown Navigation** - Collections dropdown menu for easy navigation
- **Responsive Design** - Mobile-first approach for all devices

### 🎨 Design Features
- **Modern UI** - Clean, professional interface with consistent branding
- **Smooth Animations** - Hover effects and transitions throughout
- **Hero Section** - Eye-catching hero with gradient overlay and parallax background
- **Fixed Header** - Always-accessible navigation with search and cart
- **Professional Footer** - Quick links, newsletter subscription, and social links

### 📱 Responsive Breakpoints
- Desktop: 1200px and above
- Tablet: 768px - 991px
- Mobile: Below 576px

## Project Structure

```
ecommerce-js/
├── index.html                 # Homepage
├── README.md                  # Project documentation
├── asset/
│   ├── css/
│   │   ├── index.css         # Main stylesheet
│   │   ├── components/
│   │   │   ├── header.css    # Header styles
│   │   │   ├── footer.css    # Footer styles
│   │   │   └── product-card.css
│   │   └── pages/
│   │       ├── home.css
│   │       ├── products.css
│   │       └── cart.css
│   ├── image/
│   │   ├── icons/            # Icon assets
│   │   └── products/         # Product images
│   └── Js/
│       ├── index.js          # Main entry point
│       ├── config.js         # Configuration
│       ├── components/
│       │   ├── header.js
│       │   ├── cart.js
│       │   └── product.js
│       ├── services/
│       │   ├── api.js        # API calls
│       │   └── cart.js       # Cart service
│       └── utils/
│           ├── helpers.js
│           └── validators.js
├── data/
│   └── products.js           # Product data
└── pages/
    ├── cart.html             # Shopping cart page
    ├── checkout.html         # Checkout page
    ├── product-detail.html   # Product details page
    └── products.html         # Products listing page
```

## Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Advanced styling with CSS variables and grid/flexbox
- **Vanilla JavaScript (ES6+)** - No frameworks, pure JavaScript
- **Font Awesome** - Icon library
- **Remix Icon** - Modern icon set

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Seyha-Ny/A5-Ecomerce_Wachify.git
   cd ecommerce-js
   ```

2. **Open in a web browser**
   - Simply open `index.html` in your preferred web browser
   - Or use a local server for better performance:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Python 2
     python -m SimpleHTTPServer 8000
     
     # Using Node.js (if http-server is installed)
     npx http-server
     ```

3. **Access the site**
   - Navigate to `http://localhost:8000` in your browser

## Usage

### Browsing Products
1. Click **"Shop"** in the navigation to view all products
2. Use **"Collections"** dropdown to filter by category
3. Click on any product card to view details

### Shopping Cart
1. Click the **cart icon** in the header
2. Add products using the "Add to Cart" button
3. View cart by clicking the **cart icon** in the top right
4. Proceed to checkout to complete your purchase

### Mobile Navigation
- Click the **hamburger menu** icon on mobile devices
- The navigation will slide in from the left
- Tap anywhere to close or select a link

## CSS Architecture

### CSS Variables (Root)
The project uses CSS custom properties for:
- **Colors** - Primary, secondary, text, and utility colors
- **Spacing** - Consistent spacing scale (xs, sm, md, lg, xl)
- **Typography** - Font family, sizes, and line heights
- **Transitions** - Smooth animation timing

### Component Classes
- `.btn` - Base button styles
- `.btn--primary` - Primary action buttons
- `.btn--icon` - Icon buttons
- `.btn--text` - Text-only buttons with underline animation
- `.card` - Reusable card component
- `.dropdown` - Dropdown menu container
- `.dropdown__menu` - Dropdown menu list

## Features in Detail

### Dropdown Navigation
- Smooth hover transitions
- Automatically hides on scroll (can be customized)
- Keyboard accessible
- Mobile-friendly alternative using hamburger menu

### Hero Section
- Gradient overlay on background image
- Parallax scrolling effect
- Responsive text sizing
- Call-to-action button

### Shopping Cart
- Persistent storage using localStorage
- Real-time cart count badge
- Item quantity management
- Cart subtotal calculation

### Product Cards
- Hover zoom effect on images
- Product information display
- "Add to Cart" functionality
- Related products section

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

- Lazy loading for images
- CSS Grid and Flexbox for layouts
- Minified assets
- Optimized image formats (WebP where possible)
- Efficient JavaScript event delegation

## Customization

### Changing Colors
Edit the CSS variables in `asset/css/index.css`:
```css
:root {
    --primary-color: #1a5a8d;
    --secondary-color: #e63946;
    /* ... other colors ... */
}
```

### Adding Products
Add new products to `data/products.js`:
```javascript
{
    id: 4,
    name: "Watch Name",
    price: 299.99,
    image: "asset/image/products/p4.webp",
    category: "luxury",
    description: "Product description"
}
```

### Modifying Layout
Adjust grid columns in responsive media queries in `asset/css/index.css`

## Development

### File Organization
- Keep component styles in separate files
- Use consistent naming conventions (BEM)
- Maintain separation of concerns
- Comment complex code sections

### Code Standards
- Use semantic HTML5 tags
- Follow CSS naming conventions
- Write clean, readable JavaScript
- Test across devices and browsers

## Known Issues & Future Improvements

### Current Limitations
- Payment gateway not yet integrated
- Limited product filtering options
- No user authentication system

### Planned Features
- User accounts and wishlists
- Advanced search and filtering
- Customer reviews and ratings
- Product recommendations
- Email notifications
- Admin dashboard for inventory management

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact & Support

- **Owner**: Seyha-Ny
- **Repository**: [GitHub - A5-Ecomerce_Wachify](https://github.com/Seyha-Ny/A5-Ecomerce_Wachify)
- **Branch**: phoun

For issues, questions, or suggestions, please open an issue on GitHub.

## Changelog

### v1.0.0 (Current)
- Initial release
- Core ecommerce functionality
- Responsive design
- Dropdown navigation
- Shopping cart system
- Product catalog
- Footer with newsletter signup

---

Made with ❤️ by the WATCH team