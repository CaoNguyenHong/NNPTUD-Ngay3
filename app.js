const API_URL = "https://api.escuelajs.co/api/v1/products";
const tableBody = document.getElementById("productTable");

let products = [];
let titleAsc = true;
let priceAsc = true;

// Gọi API
fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        products = data;
        renderProducts(products);
    });

// Render bảng
function renderProducts(data) {
    tableBody.innerHTML = "";

    data.forEach(product => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${product.id}</td>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>${product.category?.name || ""}</td>
            <td>
                <img
                    src="${product.images?.[0] || ""}"
                    style="width:60px; height:60px; object-fit:cover;"
                >
            </td>
        `;

        tableBody.appendChild(tr);
    });
}

// Sort theo Title
function sortByTitle() {
    products.sort((a, b) => {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return titleAsc ? -1 : 1;
        }
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return titleAsc ? 1 : -1;
        }
        return 0;
    });

    titleAsc = !titleAsc;
    renderProducts(products);
}

// Sort theo Price
function sortByPrice() {
    products.sort((a, b) => {
        return priceAsc
            ? a.price - b.price
            : b.price - a.price;
    });

    priceAsc = !priceAsc;
    renderProducts(products);
}
