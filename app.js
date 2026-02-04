const API_URL = "https://api.escuelajs.co/api/v1/products";
const tableBody = document.getElementById("productTable");

// Gọi API lấy danh sách sản phẩm
fetch(API_URL)
    .then(response => response.json())
    .then(products => {
        renderProducts(products);
    })
    .catch(error => {
        console.error("Lỗi khi gọi API:", error);
    });

// Render bảng sản phẩm
function renderProducts(products) {
    tableBody.innerHTML = "";

    products.forEach(product => {
        const tr = document.createElement("tr");

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
}
