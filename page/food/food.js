const rowsPerPage = 5;
let currentPage = 1;

function renderTable() {
  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  let cardFood = document.querySelector(".card-food");
  cardFood.innerHTML = "";

  const pageItems = Food.slice(start, end);
  pageItems.forEach((f) => {
    const row = `
        <div class="border border-1 p-2 d-flex justify-content-between mb-3">
            <div class="d-flex flex-column">
                <h5>${f.name}</h5>
                <span>McCance and Widdowson's</span>
              </div>
              <div class="d-flex gap-5 me-5">
                <div class="d-flex flex-column text-center">
                  <span>${f.macronutrients.energy} kcal</span>
                  <span>Eneryg</span>
                </div>
                <div class="d-flex flex-column text-center">
                  <span>${f.macronutrients.fat} g</span>
                  <span>Fat</span>
                </div>
                <div class="d-flex flex-column text-center">
                  <span>${f.macronutrients.carbohydrate} g</span>
                  <span>Carbohydrate</span>
                </div>
                <div class="d-flex flex-column text-center">
                  <span>${f.macronutrients.protein} g</span>
                  <span>Protein</span>
                </div>
              </div>
            </div>
    `;
    cardFood.innerHTML += row;
  });

  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(Food.length / rowsPerPage);
  const pagination = document.getElementById("paginationFood");
  pagination.innerHTML = "";

  // Nút về trang đầu ⏮ (ẩn nếu đang ở trang 1)
  if (currentPage > 1) {
    const firstBtn = document.createElement("button");
    firstBtn.innerHTML = `<i class="fas fa-angle-double-left"></i>`;
    firstBtn.addEventListener("click", () => changePage(1));
    pagination.appendChild(firstBtn);

    // Nút trước đó ◀
    const prevBtn = document.createElement("button");
    prevBtn.innerHTML = `<i class="fas fa-angle-left"></i>`;
    prevBtn.addEventListener("click", () => changePage(currentPage - 1));
    pagination.appendChild(prevBtn);
  }

  // Các nút số trang
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  // Hiển thị dấu ba chấm nếu có
  if (startPage > 1) {
    const dots = document.createElement("button");
    dots.textContent = "...";
    dots.classList.add("dots");
    pagination.appendChild(dots);
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.textContent = i;
    if (i === currentPage) pageBtn.classList.add("active");
    pageBtn.addEventListener("click", () => changePage(i));
    pagination.appendChild(pageBtn);
  }

  // Hiển thị dấu ba chấm nếu có
  if (endPage < totalPages) {
    const dots = document.createElement("button");
    dots.textContent = "...";
    dots.classList.add("dots");
    pagination.appendChild(dots);
  }

  // Nút kế tiếp ▶ và đến cuối ⏭ (ẩn nếu đang ở trang cuối)
  if (currentPage < totalPages) {
    const nextBtn = document.createElement("button");
    nextBtn.innerHTML = `<i class="fas fa-angle-right"></i>`;
    nextBtn.addEventListener("click", () => changePage(currentPage + 1));
    pagination.appendChild(nextBtn);

    const lastBtn = document.createElement("button");
    lastBtn.innerHTML = `<i class="fas fa-angle-double-right"></i>`;
    lastBtn.addEventListener("click", () => changePage(totalPages));
    pagination.appendChild(lastBtn);
  }
}

function changePage(page) {
  const totalPages = Math.ceil(Food.length / rowsPerPage);
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  renderTable();
}

// Khởi tạo lần đầu
renderTable();


document.getElementById("openFormBtn").addEventListener("click", function () {
  window.location.href = "./form/form.html";
});

document.getElementById("closeForm").addEventListener("click",()=>{
  window.location.href = "../food.html";
})

document.getElementById("close-form").addEventListener("click",()=>{
  window.location.href = "../food.html";
})

function addNewFood(e){
  e.preventDefault()
  let formFoodEl=e.target
  let data=getFormData(formFoodEl)
  if(validateForm(data)){
    alert("Thông tin đã nhập vào đầy đủ")
  }
  Food.push(data)
  saveDataToLocal("Food",Food)
  alert("Thêm thành công")
}