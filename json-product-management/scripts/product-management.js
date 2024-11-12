const fs = require('fs');

// Load and parse JSON data
function loadProducts() {
    const data = fs.readFileSync('./data/products.json', 'utf-8');
    return JSON.parse(data);
}

// Add a new product
function addProduct(newProduct) {
    const products = loadProducts();
    products.push(newProduct);
    fs.writeFileSync('./data/products.json', JSON.stringify(products, null, 2));
    return "Product added successfully!";
}

// Update product price
function updateProductPrice(productId, newPrice) {
    const products = loadProducts();
    const product = products.find(p => p.id === productId);
    if (product) {
        product.price = newPrice;
        fs.writeFileSync('./data/products.json', JSON.stringify(products, null, 2));
        return "Product price updated successfully!";
    }
    return "Product not found!";
}

// Filter products by availability
function filterAvailableProducts() {
    const products = loadProducts();
    return products.filter(p => p.available);
}

// Filter products by category
function filterProductsByCategory(category) {
    const products = loadProducts();
    return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
}

module.exports = {
    loadProducts,
    addProduct,
    updateProductPrice,
    filterAvailableProducts,
    filterProductsByCategory
};
