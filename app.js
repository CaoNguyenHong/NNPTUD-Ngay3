const API_URL = "https://api.escuelajs.co/api/v1/products";
const tableBody = document.getElementById("productTable");

// Gọi API
fetch(API_URL)
    .then(response => response.json())
    .then(products => {
        renderProducts(products);
    })
    .catch(error => {
        console.error("Lỗi khi gọi API:", error);
    });

// Render bảng + tooltip description
function renderProducts(products) {
    tableBody.innerHTML = "";

    products.forEach(product => {
        const tr = document.createElement("tr");

        // Gắn tooltip cho cả dòng
        tr.setAttribute("data-bs-toggle", "tooltip");
        tr.setAttribute("data-bs-placement", "top");
        tr.setAttribute(
            "title",
            product.description || "No description"
        );

        tr.innerHTML = `
            <td>${product.id}</td>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>${product.category?.name || ""}</td>
            <td>
                <img 
                    src="${product.images?.[0] || ""}"
                    alt="product image"
                    style="width:60px; height:60px; object-fit:cover;"
                >
            </td>
        `;

        tableBody.appendChild(tr);
    });

    // Khởi tạo tooltip (bắt buộc)
    const tooltipList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipList.forEach(el => new bootstrap.Tooltip(el));
}
