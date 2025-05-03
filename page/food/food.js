const rowsPerPage = 5;
let currentPage = 1;
Food = loadFromLocalStorage("Food", Food);

function renderFood(data = Food) {
  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const cardFood = document.getElementById("card-food");
  cardFood.innerHTML = "";

  const pageItems = data.slice(start, end);

  pageItems.forEach((f, index) => {
    const actualIndex = Food.findIndex((item) => item.id === f.id);
    const row = `
      <div class="border border-1 p-2 d-flex justify-content-between mb-3" onclick="editFoodItem(${actualIndex})">
        <div class="d-flex flex-column">
          <h5>${f.name}</h5>
          <span>${f.source || "McCance and Widdowson's"}</span>
        </div>
        <div class="d-flex gap-5 me-5">
          <div class="d-flex flex-column text-center">
            <span>${f.macronutrients.energy} kcal</span>
            <span>Energy</span>
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
  renderPagination(data);
}

function renderPagination(data) {
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const pagination = document.getElementById("paginationFood");
  pagination.innerHTML = "";

  // Nút về trang đầu ⏮ (ẩn nếu đang ở trang 1)
  if (currentPage > 1) {
    const firstBtn = document.createElement("button");
    firstBtn.innerHTML = `<i class="fas fa-angle-double-left"></i>`;
    firstBtn.addEventListener("click", () => changePage(data, 1));
    pagination.appendChild(firstBtn);

    // Nút trước đó ◀
    const prevBtn = document.createElement("button");
    prevBtn.innerHTML = `<i class="fas fa-angle-left"></i>`;
    prevBtn.addEventListener("click", () => changePage(data, currentPage - 1));
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
    pageBtn.addEventListener("click", () => changePage(data, i));
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
    nextBtn.addEventListener("click", () => changePage(data, currentPage + 1));
    pagination.appendChild(nextBtn);

    const lastBtn = document.createElement("button");
    lastBtn.innerHTML = `<i class="fas fa-angle-double-right"></i>`;
    lastBtn.addEventListener("click", () => changePage(data, totalPages));
    pagination.appendChild(lastBtn);
  }
}

function changePage(data, page) {
  const totalPages = Math.ceil(data.length / rowsPerPage);
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  renderFood(data);
}

function populateForm(form, data, parentKey = "") {
  for (let key in data) {
    const fullKey = parentKey ? `${parentKey}.${key}` : key;
    const value = data[key];

    if (value !== null && typeof value === "object") {
      populateForm(form, value, fullKey); // đệ quy cho object con
    } else {
      if (form.elements[fullKey]) {
        form.elements[fullKey].value = value ?? "";
      }
    }
  }
}

function addNewFood(e) {
  e.preventDefault();

  let formFoodEl = document.getElementById("foodForm");

  if (validateForm(formFoodEl)) {
    let formData = getFormData(formFoodEl);

    if (editingIndex !== null && editingIndex >= 0 && editingIndex < Food.length) {
      const originalId = Food[editingIndex].id;
      const updatedFood = {
        id: originalId,
        name: formData.name,
        source: formData.source,
        category: formData.category,
        quanlity: formData.quanlity,
        macronutrients: formData.macronutrients || {},
        micronutrients: formData.micronutrients || {},
      };
      Food[editingIndex] = updatedFood;
      alert("Thực phẩm đã cập nhật thành công");
    } else {
      const newId = Food.length > 0 ? Math.max(...Food.map((item) => item.id || 0)) + 1 : 1;
      const newFood = {
        id: newId,
        name: formData.name,
        source: formData.source,
        category: formData.category,
        quanlity: formData.quanlity,
        macronutrients: formData.macronutrients || {},
        micronutrients: formData.micronutrients || {},
      };

      Food.push(newFood);
      alert("Thực phẩm đã thêm thành công");
    }

    // Save to localStorage and update UI
    saveDataToLocal("Food", Food);
    renderFood();

    // Reset form and state
    formFoodEl.reset();
    editingIndex = null;
    overlay.style.display = "none";
  }
}

let editingIndex = null;

function showFormFood() {
  overlay.style.display = "flex";
  document.querySelector(".container-form").style.display = "flex";
  document.getElementById("title-form-food").innerHTML = "Add new food";
  document.getElementById("note-form-food").innerHTML = "Fill in the fields below with the food information";
  editingIndex = null;
}

function editFoodItem(index) {
  if (index >= 0 && index < Food.length) {
    overlay.style.display = "flex";
    document.getElementById("title-form-food").innerHTML = "Food information";
    document.getElementById("note-form-food").innerHTML = "Check and update the information about the food";

    const food = Food[index];
    const foodForm = document.getElementById("foodForm");
    foodForm.reset(); // Clear form first
    populateForm(foodForm, food);
    editingIndex = index;
  } else {
    alert("Không tìm thấy thực phẩm này!");
  }
}

function filterFood(keyword) {
  const filtered = Food.filter((food) => food.name.toLowerCase().includes(keyword.toLowerCase()));
  renderFood(filtered);
}
document.getElementById("searchFood").addEventListener("input", function () {
  const keyword = this.value;
  filterFood(keyword);
});

let isAscFoodSort = true;
let currentSortKey = "";
const selectNutrientFood = document.getElementById("selectNutrientFood");
const btnSortNutrientFood = document.getElementById("btnSortNutrientFood");
// Khi chọn nutrient
selectNutrientFood.addEventListener("change", () => {
  currentSortKey = selectNutrientFood.value;
  applySortByNutrient(currentSortKey, isAscFoodSort);
});
// Khi click nút (icon) → đảo chiều và sắp xếp lại
btnSortNutrientFood.addEventListener("click", () => {
  if (!currentSortKey) return alert("Vui lòng chọn nutrient trước!");
  isAscFoodSort = !isAscFoodSort;
  // Đổi icon theo chiều
  btnSortNutrientFood.innerHTML = isAscFoodSort
    ? '<i class="fas fa-sort-amount-up m-0"></i>'
    : '<i class="fas fa-sort-amount-down m-0"></i>';
  // Sắp xếp lại
  applySortByNutrient(currentSortKey, isAscFoodSort);
});
// Hàm sắp xếp
function applySortByNutrient(nutrientKey, isAsc) {
  const sortedList = [...Food];
  const getValue = (item) => {
    const macro = item.macronutrients || {};
    return Number(macro[nutrientKey.toLowerCase()]);
  };
  sortedList.sort((a, b) => (isAsc ? getValue(a) - getValue(b) : getValue(b) - getValue(a)));
  renderFood(sortedList);
}

const categoryFood = document.getElementById("categoryFood");
categoryFood.addEventListener("change", function () {
  const value = this.value;
  const filtered =
    value === ""
      ? Food
      : Food.filter((food) => {
          const categoryNames = food.category;
          return categoryNames && categoryNames.toLowerCase().includes(value.toLowerCase());
        });

  renderFood(filtered);
});
// form
const overlay = document.getElementById("overlay");
const closeOverlay = document.getElementById("closeOverlay");

closeOverlay.addEventListener("click", () => {
  overlay.style.display = "none";
  document.getElementById("foodForm").reset();
});

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.style.display = "none";
    document.getElementById("foodForm").reset();
  }
});

document.getElementById("close-form").addEventListener("click", () => {
  if (confirm("Dữ liệu sẽ mất, bạn có chắc đóng form chứ!!!")) {
    overlay.style.display = "none";
    document.getElementById("foodForm").reset();
  }
});

document.getElementById("foodForm").addEventListener("submit", addNewFood);

renderFood();
