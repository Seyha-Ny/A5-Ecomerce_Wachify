const products = [
    {
        id: 1,
        name: "Premium Watch 1",
        price: 199.99,
        image: "/asset/images/products/watch-1.jpg",
        category: "watches",
        rating: 4.5,
        reviews: 128,
        featured: true
    },
    {
        id: 2,
        name: "Luxury Watch 2",
        price: 249.99,
        image: "/asset/images/products/watch-2.jpg",
        category: "watches",
        rating: 4.7,
        reviews: 95,
        featured: true
    },
    {
        id: 3,
        name: "Classic Watch 3",
        price: 179.99,
        image: "/asset/images/products/watch-3.jpg",
        category: "watches",
        rating: 4.3,
        reviews: 156,
        featured: true
    },
    {
        id: 4,
        name: "Sport Watch 4",
        price: 159.99,
        image: "/asset/images/products/watch-4.jpg",
        category: "watches",
        rating: 4.2,
        reviews: 87,
        featured: true
    }
];

// Function to get featured products
function getFeaturedProducts() {
    return products.filter(product => product.featured);
}

// Function to get product by ID
function getProductById(id) {
    return products.find(product => product.id === id);
}

export { getFeaturedProducts, getProductById };
