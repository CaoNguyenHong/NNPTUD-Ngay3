const API_URL = "https://api.escuelajs.co/api/v1/products";
const tableBody = document.getElementById("productTable");

let products = [];
let titleAsc = true;
let priceAsc = true;

const viewModal = new bootstrap.Modal(document.getElementById("productModal"));
const createModal = new bootstrap.Modal(document.getElementById("createModal"));

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
        tr.onclick = () => openViewModal(product);

        tr.innerHTML = `
            <td>${product.id}</td>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>${product.category?.name || ""}</td>
            <td>
                <img src="${product.images?.[0] || ""}"
                     style="width:60px;height:60px;object-fit:cover;">
            </td>
        `;

        tableBody.appendChild(tr);
    });
}

// ===== SORT =====
function sortByTitle() {
    products.sort((a, b) =>
        titleAsc
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title)
    );
    titleAsc = !titleAsc;
    renderProducts(products);
}

function sortByPrice() {
    products.sort((a, b) =>
        priceAsc ? a.price - b.price : b.price - a.price
    );
    priceAsc = !priceAsc;
    renderProducts(products);
}

// ===== VIEW + EDIT =====
function openViewModal(product) {
    document.getElementById("modalId").value = product.id;
    document.getElementById("modalTitle").value = product.title;
    document.getElementById("modalPrice").value = product.price;
    document.getElementById("modalDescription").value = product.description;
    document.getElementById("modalImage").value = product.images?.[0] || "";

    viewModal.show();
}

function updateProduct() {
    const id = document.getElementById("modalId").value;

    const payload = {
        title: document.getElementById("modalTitle").value,
        price: Number(document.getElementById("modalPrice").value),
        description: document.getElementById("modalDescription").value,
        images: [document.getElementById("modalImage").value]
    };

    fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
        .then(res => res.json())
        .then(updated => {
            const index = products.findIndex(p => p.id == id);
            products[index] = { ...products[index], ...updated };

            viewModal.hide();
            renderProducts(products);
        });
}

// ===== CREATE PRODUCT (POST API) =====
function openCreateModal() {
    document.getElementById("createTitle").value = "";
    document.getElementById("createPrice").value = "";
    document.getElementById("createDescription").value = "";
    document.getElementById("createCategory").value = 1;
    document.getElementById("createImage").value = "";

    createModal.show();
}

function createProduct() {
    const payload = {
        title: document.getElementById("createTitle").value,
        price: Number(document.getElementById("createPrice").value),
        description: document.getElementById("createDescription").value,
        categoryId: Number(document.getElementById("createCategory").value),
        images: [document.getElementById("createImage").value]
    };

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
        .then(res => res.json())
        .then(newProduct => {
            alert("Tạo sản phẩm thành công (fake API)");

            products.unshift(newProduct);
            createModal.hide();
            renderProducts(products);
        });
}

// ===== EXPORT CSV =====
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
