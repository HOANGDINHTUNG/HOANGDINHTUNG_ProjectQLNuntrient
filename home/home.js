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

renderRecipes({
  containerID: "recipeHome",
  paginationID: "paginationHome",
  data: Recipe,
  state: homeState,
  img: ".",
});

// tìm kiếm recipe yêu thích
function filterBooks(keyword) {
  const filtered = Recipe.filter((recipe) => recipe.name.toLowerCase().includes(keyword.toLowerCase()));
  renderRecipes({
    containerID: "recipeHome",
    paginationID: "paginationHome",
    data: filtered,
    state: homeState,
    img: ".",
  });
}

document.getElementById("searchInput").addEventListener("input", function () {
  const keyword = this.value;
  filterBooks(keyword);
});

// sắp xếp theo nutrient
let recipeHome = document.getElementById("recipeHome");
let sortSelect = document.getElementById("sortSelect");

sortSelect.addEventListener("click", () => {
  // Sao chép lại mảng Recipe
  let sortedRecipes = [...Recipe];

  // Lấy giá trị chọn từ select
  const value = document.querySelectorAll("select")[0].value; // Đây là cách lấy giá trị chọn

  // Tiến hành sắp xếp theo giá trị chọn
  if (value === "Energy") {
    sortedRecipes.sort((a, b) => a.ingredients[0].macronutrients.energy - b.ingredients[0].macronutrients.energy); // Sử dụng toán tử trừ để so sánh số
  } else if (value === "Fat") {
    sortedRecipes.sort((a, b) => a.ingredients[0].macronutrients.fat - b.ingredients[0].macronutrients.fat); // Sử dụng toán tử trừ để so sánh số
  } else if (value === "Carbohydrate") {
    sortedRecipes.sort(
      (a, b) => a.ingredients[0].macronutrients.carbohydrate - b.ingredients[0].macronutrients.carbohydrate
    ); // Sử dụng toán tử trừ để so sánh số
  } else if (value === "Protein") {
    sortedRecipes.sort((a, b) => a.ingredients[0].macronutrients.protein - b.ingredients[0].macronutrients.protein); // Sử dụng toán tử trừ để so sánh số
  }

  // Render lại công thức đã sắp xếp
  renderRecipes({
    containerID: "recipeHome",
    paginationID: "paginationHome",
    data: sortedRecipes,
    state: homeState,
    img: ".",
  });
});

// tìm kiếm theo danh mục

const categorySelect = document.getElementById("categorySelect");

categorySelect.addEventListener("change", function () {
  const value = this.value;  // Lấy đúng giá trị của <select>

  // Lọc Recipe: nếu value = '' thì giữ nguyên mảng gốc
  const filtered = value === ""
    ? Recipe
    : Recipe.filter(recipe => {
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

