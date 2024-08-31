// Function to fetch products from the server
async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:3000/api/products');
        const products = await response.json();

        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Function to display products in the DOM
function displayProducts(products) {
    const container = document.getElementById('products-container');
    container.innerHTML = '';

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';

        const name = document.createElement('h2');
        name.textContent = product.name;

        const description = document.createElement('p');
        description.textContent = product.description;

        const price = document.createElement('p');
        const priceNumber = parseFloat(product.price);
        price.textContent = `$${priceNumber.toFixed(2)}`;

        const image = document.createElement('img');
        image.src = product.image_url;
        image.alt = product.name;

        productDiv.appendChild(name);
        productDiv.appendChild(description);
        productDiv.appendChild(price);
        productDiv.appendChild(image);

        container.appendChild(productDiv);
    });
}

// Fetch and display products when the page loads
window.addEventListener('DOMContentLoaded', fetchProducts);