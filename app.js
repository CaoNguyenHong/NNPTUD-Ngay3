const API_URL = "https://api.escuelajs.co/api/v1/products";
const tableBody = document.getElementById("productTable");

let products = [];
let titleAsc = true;
let priceAsc = true;

// ===== FETCH API =====
fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        products = data;
        renderProducts(products);
    });

// ===== RENDER TABLE =====
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

// ===== SORT TITLE =====
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

// ===== SORT PRICE =====
function sortByPrice() {
    products.sort((a, b) =>
        priceAsc ? a.price - b.price : b.price - a.price
    );

    priceAsc = !priceAsc;
    renderProducts(products);
}

// ===== EXPORT CSV (VIEW HIỆN TẠI) =====
function exportCSV() {
    let csv = "ID,Title,Price,Category,Image\n";

    products.forEach(p => {
        csv += [
            p.id,
            `"${p.title.replace(/"/g, '""')}"`,
            p.price,
            `"${p.category?.name || ""}"`,
            `"${p.images?.[0] || ""}"`
        ].join(",") + "\n";
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "products.csv";
    a.click();

    URL.revokeObjectURL(url);
}
