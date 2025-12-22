const products = [
    {
        id: 1,
        name: "Luxury Classic Watch",
        price: 299.99,
        image: "asset/image/products/p1.webp",
        category: "luxury",
        rating: 4.8,
        reviews: 128,
        featured: true,
        description: "Elegant luxury watch with premium materials and timeless design"
    },
    {
        id: 2,
        name: "Smart Watch Pro",
        price: 249.99,
        image: "asset/image/products/p2.webp",
        category: "smart",
        rating: 4.6,
        reviews: 95,
        featured: true,
        description: "Advanced smart watch with health tracking and notifications"
    },
    {
        id: 3,
        name: "Sports Watch Elite",
        price: 199.99,
        image: "asset/image/products/p3.webp",
        category: "sports",
        rating: 4.7,
        reviews: 156,
        featured: true,
        description: "Durable sports watch designed for active lifestyle"
    },
    {
        id: 4,
        name: "Classic Analog",
        price: 179.99,
        image: "asset/image/products/p1.webp",
        category: "luxury",
        rating: 4.5,
        reviews: 87,
        featured: false,
        description: "Minimalist classic design with reliable movement"
    },
    {
        id: 5,
        name: "Tech Smartwatch",
        price: 269.99,
        image: "asset/image/products/p2.webp",
        category: "smart",
        rating: 4.4,
        reviews: 112,
        featured: false,
        description: "Latest technology with seamless smartphone integration"
    },
    {
        id: 6,
        name: "Performance Sports",
        price: 219.99,
        image: "asset/image/products/p3.webp",
        category: "sports",
        rating: 4.9,
        reviews: 203,
        featured: false,
        description: "Professional grade sports watch for athletes"
    },
    {
        id: 7,
        name: "Gold Luxury",
        price: 449.99,
        image: "asset/image/products/p1.webp",
        category: "luxury",
        rating: 4.9,
        reviews: 76,
        featured: true,
        description: "Premium gold-plated luxury timepiece"
    },
    {
        id: 8,
        name: "Fitness Tracker Watch",
        price: 159.99,
        image: "asset/image/products/p2.webp",
        category: "smart",
        rating: 4.3,
        reviews: 324,
        featured: false,
        description: "Complete fitness tracking with modern design"
    }
];

// Function to get featured products
function getFeaturedProducts() {
    return products.filter(product => product.featured);
}

// Function to get all products
function getAllProducts() {
    return products;
}

// Function to get product by ID
function getProductById(id) {
    return products.find(product => product.id === id);
}

// Function to get products by category
function getProductsByCategory(category) {
    return products.filter(product => product.category === category);
}

export { getFeaturedProducts, getAllProducts, getProductById, getProductsByCategory };
