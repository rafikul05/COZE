function toggleSidebar() {
    const sidebar = document.getElementById('filt');
    if (sidebar.style.transform === 'translateX(0%)') {
        sidebar.style.transform = 'translateX(-100%)';
    } else {
        sidebar.style.transform = 'translateX(0%)';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const filters = document.querySelectorAll('.filt');
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    const sortOptions = document.getElementById('sortOptions');
    const productGrid = document.getElementById('productGrid');
    const products = Array.from(productGrid.children);

    filters.forEach(filter => {
        filter.addEventListener('change', filterProducts);
    });

    priceRange.addEventListener('input', function() {
        priceValue.textContent = priceRange.value;
        filterProducts();
    });

    sortOptions.addEventListener('change', sortProducts);

    function filterProducts() {
        const activeFilters = Array.from(filters).filter(filter => filter.checked).map(filter => filter.dataset.filter);
        const maxPrice = priceRange.value;

        products.forEach(product => {
            const productCategory = product.dataset.category;
            const productGender = product.dataset.gender;
            const productSize = product.dataset.size;
            const productPrice = product.dataset.price;
            const productBrand = product.dataset.brand;

            const matchesFilter = activeFilters.length === 0 || activeFilters.includes(productCategory) || activeFilters.includes(productGender) || activeFilters.includes(productSize) || activeFilters.includes(productBrand);
            const matchesPrice = productPrice <= maxPrice;

            if (matchesFilter && matchesPrice) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    function sortProducts() {
        const sortOption = sortOptions.value;
        const sortedProducts = products.sort((a, b) => {
            const priceA = parseFloat(a.dataset.price);
            const priceB = parseFloat(b.dataset.price);

            if (sortOption === 'newToOld') {
                return priceB - priceA;
            } else {
                return priceA - priceB;
            }
        });

        productGrid.innerHTML = '';
        sortedProducts.forEach(product => {
            productGrid.appendChild(product);
        });
    }
});