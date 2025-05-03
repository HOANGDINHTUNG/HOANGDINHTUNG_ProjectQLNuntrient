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

function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

const homeState = {
  currentPage: 1,
  rowsPerPage: 4,
};

// 1. Khởi tạo đúng cách với xử lý trường hợp rỗng
let favoriteRecipe = loadFromLocalStorage("favoriteRecipe") || [];
// console.log(favoriteRecipe.length)
console.log(favoriteRecipe)
if (favoriteRecipe.length > 0) {
  renderRecipes({
    containerID: "recipeHome",
    paginationID: "paginationHome",
    data: favoriteRecipe,
    state: homeState,
    img: "."
  });
} else {
  const recipeHomeElement = document.getElementById("recipeHome");
  if (recipeHomeElement) {
    recipeHomeElement.innerHTML = "<div class='col-12 text-center p-3'>Chưa có công thức yêu thích nào. Hãy thêm công thức yêu thích!</div>";
  }
}

// Tìm kiếm băng input
document.getElementById("searchInput").addEventListener("input", function () {
  const keyword = this.value;
  currentPage = 1; 
  filterRecipe(keyword);
});
function filterRecipe(keyword) {
  const filtered = favoriteRecipe.filter((recipe) => recipe.name.toLowerCase().includes(keyword.toLowerCase()));
  renderRecipes({
    containerID: "recipeHome",
    paginationID: "paginationHome",
    data: filtered,
    state: homeState, 
    img: "."
  });
}

// sắp xếp theo nutrient
let isSortAscending = true;
const sortButton = document.getElementById("sortButton");
const sortIcon = document.getElementById("sortIcon");
const sortSelect = document.getElementById("sortSelect");
sortButton.addEventListener("click", () => {
  isSortAscending = !isSortAscending;
  // Cập nhật icon
  sortIcon.className = isSortAscending
    ? "fas fa-sort-amount-up m-0"
    : "fas fa-sort-amount-down m-0";

  // Gọi lại hàm sắp xếp nếu đã chọn nutrient
  if (sortSelect.value && sortSelect.value !== "Sort by nutrient") {
    sortRecipes();
  }
});
sortSelect.addEventListener("change", () => {
  sortRecipes();
});

function sortRecipes() {
  const nutrient = sortSelect.value;
  if (!nutrient) return;

  const sorted = [...favoriteRecipe].sort((a, b) => {
    const valA = a.ingredients[0].macronutrients[nutrient];
    const valB = b.ingredients[0].macronutrients[nutrient];
    return isSortAscending ? valA - valB : valB - valA;
  });

  renderRecipes({
    containerID: "recipeHome",
    paginationID: "paginationHome",
    data: sorted,
    state: homeState,
    img: "."
  });
}

// tìm kiếm theo danh mục
const categorySelect = document.getElementById("categorySelect");
categorySelect.addEventListener("change", function () {
  const value = this.value;  // Lấy đúng giá trị của <select>

  // Lọc Recipe: nếu value = '' thì giữ nguyên mảng gốc
  const filtered = value === ""
    ? favoriteRecipe
    : favoriteRecipe.filter(recipe => {
        // Với mỗi recipe, ánh xạ qua mảng recipe.category để lấy tên
        const categoryNames = recipe.category
          .map(cat => {
            const found = category.find(c => c.id === cat.id);
            return found ? found.name : null;
          })
          .filter(name => name) // loại bỏ null
          .map(name => name.toLowerCase());

        // so sánh với value đã chọn (cũng lowercase)
        return categoryNames.includes(value.toLowerCase());
      });

  renderRecipes({
    containerID: "recipeHome",
    paginationID: "paginationHome",
    data: filtered,
    state: homeState,
    img: "."
  });
});
