const API_URL = "https://api.escuelajs.co/api/v1/products";

const tableBody = document.getElementById("productTable");
const pagination = document.getElementById("pagination");
const pageSizeSelect = document.getElementById("pageSize");

let products = [];
let currentPage = 1;
let pageSize = Number(pageSizeSelect.value);

// Gọi API lấy dữ liệu
fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        products = data;
        render();
    });

// Render tổng
function render() {
    renderTable();
    renderPagination();
}

// Render bảng theo trang
function renderTable() {
    tableBody.innerHTML = "";

    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const pageData = products.slice(start, end);

    pageData.forEach(product => {
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

// Render pagination
function renderPagination() {
    pagination.innerHTML = "";

    const totalPages = Math.ceil(products.length / pageSize);

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement("li");
        li.className = `page-item ${i === currentPage ? "active" : ""}`;

        li.innerHTML = `<a class="page-link" href="#">${i}</a>`;

        li.onclick = function () {
            currentPage = i;
            render();
        };

        pagination.appendChild(li);
    }
}

// Đổi số dòng / trang
pageSizeSelect.addEventListener("change", function () {
    pageSize = Number(this.value);
    currentPage = 1;
    render();
});
