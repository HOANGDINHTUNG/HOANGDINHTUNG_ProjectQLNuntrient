let userLogin = null;
function checkAuthen() {
  userLogin = JSON.parse(localStorage.getItem("userLogin"));
}

checkAuthen();

function renderHome() {
  if (!userLogin) {
    alert("Vui lòng đăng nhập!!");
    window.location.href = "/auth/authen.html";
    return;
  }
}

function logout() {
  if (!confirm("bạn thật sự muốn đăng xuất?")) return;
  window.location.reload();
  localStorage.removeItem("userLogin");
}

renderHome();


/* Phân trang */
const rowsPerPage = 6;
let currentPage = 1;

function renderTable() {
  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const cardItem = document.getElementById("card-item");
  cardItem.innerHTML = "";

  const pageItems = employees.slice(start, end);
  pageItems.forEach((emp, index) => {
    const row = `<tr>
        <td>${start + index + 1}</td>
        <td>${emp.name}</td>
        <td>${emp.position}</td>
      </tr>`;
      cardItem.innerHTML += row;
  });

  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(employees.length / rowsPerPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  // Previous button
  const prevBtn = document.createElement("button");
  prevBtn.textContent = "Previous";
  if (currentPage === 1) prevBtn.disabled = true;
  prevBtn.addEventListener("click", () => changePage(currentPage - 1));
  pagination.appendChild(prevBtn);

  // Page number buttons
  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.textContent = i;
    // tạo hiệu ứng để biết đang ở trang nào
    if (i === currentPage) pageBtn.classList.add("active");
    // Khi click thì gọi hàm đổi trang
    pageBtn.addEventListener("click", () => changePage(i));
    pagination.appendChild(pageBtn);
  }

  // Next button
  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next";
  if (currentPage === totalPages) nextBtn.disabled = true;
  nextBtn.addEventListener("click", () => changePage(currentPage + 1));
  pagination.appendChild(nextBtn);
}

function changePage(page) {
  const totalPages = Math.ceil(employees.length / rowsPerPage);
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  renderTable();
}

