const baseImagePath = "../..";

Recipe = loadFromLocalStorage("Recipe", Recipe) || [];

document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll(".nutrition-row input");

  inputs.forEach((input) => {
    const row = input.closest(".nutrition-row");

    input.addEventListener("focus", () => {
      document.querySelectorAll(".nutrition-row").forEach((r) => r.classList.remove("active"));
      row.classList.add("active");
    });

    input.addEventListener("blur", () => {
      setTimeout(() => {
        row.classList.remove("active");
      }, 200);
    });
  });
});

// Hàm lấy thông tin dinh dưỡng (giả sử 100g đầu tiên)
function getNutrition(f) {
  const food = f; // hiện tại lấy đại 1 food mẫu, tùy vào công thức thực tế bạn sẽ nối food chính xác
  const macro = food.macronutrients;
  return {
    energy: macro.energy,
    fat: macro.fat,
    carbohydrate: macro.carbohydrate,
    protein: macro.protein,
  };
}

const recipeState = {
  currentPage: 1,
  rowsPerPage: 4,
};

renderRecipes({
  containerID: "recipeList",
  paginationID: "paginationRecipe",
  data: Recipe,
  state: recipeState,
  img: baseImagePath,
});


function renderRecipes({containerID, paginationID, data, state, img = baseImagePath}) {
  const start = (state.currentPage - 1) * state.rowsPerPage;
  const end = start + state.rowsPerPage;
  const recipeList = document.getElementById(containerID);

  recipeList.addEventListener("click", (e) => {
    const card = e.target.closest(".recipe-card");
    if (card && card.dataset.id) {
      const id = card.dataset.id;
      const recipe = data.find((r) => r.id == id);
      document.getElementById("box-recipe").style.display = "none";
      document.getElementById("recipeDetail").style.display = "block";
      updateRecipeWithChart(recipe);
    }
  });

  recipeList.innerHTML = "";

  const pageItems = data.slice(start, end);
  pageItems.forEach((recipe) => {
    const nutrition = getNutrition(recipe.ingredients[0]);
    const categoryNames = recipe.category
      .map((cat) => {
        const found = category.find((c) => c.id === cat.id);
        return found ? found.name : "Unknown";
      })
      .join(", ");

    const imagePath = `${img}${recipe.coverSrc}`;

    recipeList.innerHTML += `
      <div class="col">
        <div class="recipe-card" data-id="${recipe.id}">
          <div class="likes-badge">
            <i class="far fa-heart me-1"></i> ${getRandomNumber()}
          </div>
          
          <div class="recipe-image" style="background-image: url('${imagePath}');"></div>
          
          <div class="recipe-content">
            <p class="subtitle">Community Recipes</p>
            <h5 class="recipe-title">${recipe.name}</h5>
            <p class="author-text">${recipe.author}</p>
            
            <div class="category-tag">
              <i class="fas fa-tag" style="color: orangered;"></i>
              <span>${categoryNames}</span>
            </div>
            
            <div class="card-footer d-flex flex-column justify-content-between">
              <small><strong>By</strong> 100g</small>
              <small><strong>Energy</strong> ${nutrition.energy}kcal</small>
              <small><strong>Fat</strong> ${nutrition.fat}g</small>
              <small><strong>Carbohydrate</strong> ${nutrition.carbohydrate}g</small>
              <small><strong>Protein</strong> ${nutrition.protein}g</small>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  console.log(Recipe)

  renderPagination({
    paginationID,
    dataLength: data.length,
    state,
    onPageChange: (newPage) => {
      state.currentPage = newPage;
      renderRecipes({containerID, paginationID, data, state, img});
    },
  });
  updateFavoriteCount();
}

function renderPagination({paginationID, dataLength, state, onPageChange}) {
  const totalPages = Math.ceil(dataLength / state.rowsPerPage);
  const pagination = document.getElementById(paginationID);
  pagination.innerHTML = "";

  if (state.currentPage > 1) {
    const firstBtn = document.createElement("button");
    firstBtn.innerHTML = `<i class="fas fa-angle-double-left"></i>`;
    firstBtn.addEventListener("click", () => onPageChange(1));
    pagination.appendChild(firstBtn);

    const prevBtn = document.createElement("button");
    prevBtn.innerHTML = `<i class="fas fa-angle-left"></i>`;
    prevBtn.addEventListener("click", () => onPageChange(state.currentPage - 1));
    pagination.appendChild(prevBtn);
  }

  const maxVisiblePages = 5;
  let startPage = Math.max(1, state.currentPage - 2);
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  if (startPage > 1) {
    const dots = document.createElement("button");
    dots.textContent = "...";
    dots.classList.add("dots");
    pagination.appendChild(dots);
  }

  for (let i = startPage; i <= endPage; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.textContent = i;
    if (i === state.currentPage) pageBtn.classList.add("active");
    pageBtn.addEventListener("click", () => onPageChange(i));
    pagination.appendChild(pageBtn);
  }

  if (endPage < totalPages) {
    const dots = document.createElement("button");
    dots.textContent = "...";
    dots.classList.add("dots");
    pagination.appendChild(dots);
  }

  if (state.currentPage < totalPages) {
    const nextBtn = document.createElement("button");
    nextBtn.innerHTML = `<i class="fas fa-angle-right"></i>`;
    nextBtn.addEventListener("click", () => onPageChange(state.currentPage + 1));
    pagination.appendChild(nextBtn);

    const lastBtn = document.createElement("button");
    lastBtn.innerHTML = `<i class="fas fa-angle-double-right"></i>`;
    lastBtn.addEventListener("click", () => onPageChange(totalPages));
    pagination.appendChild(lastBtn);
  }
}

function showDetailRecipe(recipe) {
  let recipeDetail = document.getElementById("recipeDetail");
  const nutrition = getNutrition(recipe.ingredients[0]);

  const imgPath = recipeDetail.dataset.imagePath || baseImagePath;
  // Lấy danh sách category
  const categoryNames = recipe.category
    .map((cat) => {
      const found = category.find((c) => c.id === cat.id);
      return found ? found.name : "Unknown";
    })
    .join(", ");

  const headerStyle = recipe.coverSrc
    ? `background-image: url('${imgPath}${recipe.coverSrc}'); background-size: cover; background-position: center;`
    : "";
  recipeDetail.innerHTML = `
    <div class="box-content mb-4">
            <div class="w-25">
              <div class="d-flex flex-column gap-4">
                <div class="border border-1 rounded-2" style="background-color: white; height: 300px; padding: 20px; ${headerStyle}">
                  <div class="d-flex flex-column justify-content-between h-100">
                    <div class="d-flex align-items-center gap-2">
                      <span class="badge text-bg-warning p-2">
                        <i class="fas fa-users"></i>
                        Community Recipes
                      </span>
                      <div
                        class="d-flex border border-1 rounded-2 gap-1 align-items-center"
                        style="font-size: 12px; padding: 4px">
                        <i class="far fa-heart" style="color:white;"></i>
                        <span style="color:white;">${getRandomNumber()}</span>
                      </div>
                    </div>

                    <div class="card-category border border-1 p-1 rounded-3" style="width: 150px;color:white">
                      <i class="fas fa-tag" style="color: orangered;"></i>
                      ${categoryNames}
                    </div>
                  </div>
                </div>
                <div onclick="addFavoriteFoodToHomepage(${recipe.id})"
                  class="d-flex border border-1 rounded-2 gap-1 align-items-center"
                  style="font-size: 12px; padding: 4px; width: 130px" >
                  <i id="heart-${recipe.id}" class="fa-solid fa-heart" style="color: white"></i>
                  <span>Add to favourite</span>
                </div>
              </div>
            </div>

            <div class="border border-1 w-100 rounded-2 lh-1" style="background-color: white; padding: 20px">
              <div class="fw-light fs-4">Basic information</div>
              <span class="fw-light" style="font-size: 14px">Check and edit recipe's basic information</span>
              <div class="d-flex mt-3">
                <span
                  class="border border-end-0 w-50 text-wrap rounded-start-0 ps-2 align-items-center d-flex fs-6 fw-light"
                  style="background-color: #fafafb">
                  Name
                </span>
                <span class="form-control rounded-0 fw-light">${recipe.name}</span>
              </div>
              <div class="d-flex mt-3">
                <span
                  class="border border-end-0 w-50 text-wrap rounded-start-0 ps-2 align-items-center d-flex fs-6 fw-light"
                  style="background-color: #fafafb">
                  Description
                </span>
                <span class="form-control rounded-0 fw-light">${recipe.description}</span>
              </div>
              <div class="d-flex mt-3">
                <span
                  class="border border-end-0 w-50 text-wrap rounded-start-0 ps-2 align-items-center d-flex fs-6 fw-light"
                  style="background-color: #fafafb">
                  Author
                </span>
                <span class="form-control rounded-0 fw-light">${recipe.author}</span>
              </div>
              <div class="d-flex mt-3">
                <span
                  class="border border-end-0 w-50 text-wrap rounded-start-0 ps-2 align-items-center d-flex fs-6 fw-light"
                  style="background-color: #fafafb">
                  Total time
                </span>
                <span class="form-control rounded-0 fw-light">${recipe.totalTime}</span>
              </div>
              <div class="d-flex mt-3">
                <span
                  class="border border-end-0 w-50 text-wrap rounded-start-0 ps-2 align-items-center d-flex fs-6 fw-light"
                  style="background-color: #fafafb">
                  Preparation time
                </span>
                <span class="form-control rounded-0 fw-light">${recipe.preparationTime}</span>
              </div>
              <div class="d-flex mt-3">
                <span
                  class="border border-end-0 w-50 text-wrap rounded-start-0 ps-2 align-items-center d-flex fs-6 fw-light"
                  style="background-color: #fafafb">
                  Final weight
                </span>
                <span class="form-control rounded-0 fw-light">${recipe.finalWeight} grams</span>
              </div>
              <div class="d-flex mt-3">
                <span
                  class="border border-end-0 w-50 text-wrap rounded-start-0 ps-2 align-items-center d-flex fs-6 fw-light"
                  style="background-color: #fafafb">
                  Portions
                </span>
                <span class="form-control rounded-0 fw-light">${recipe.portions}</span>
              </div>
            </div>
          </div>

          <div
            class="box-content flex-column p-3 lh-2 rounded-2 mb-4"
            style="background-color: #333433; gap: 5px; color: white">
            <span class="fs-5">Creation</span>
            <span style="font-size: 14px">Create the recipe and choose the ingredients</span>
          </div>

          <div class="box-content">
            <div class="statistical">
              <div
                class="d-flex flex-column gap-3 border border-1 rounded-2 mb-4"
                style="padding: 20px; background-color: white">
                <div class="d-flex lh-1 flex-column mb-2">
                  <span class="fs-4">Ingredients</span>
                  <span style="opacity: 0.5; font-size: 14px">Search and add ingredients to the recipe</span>
                </div>
                <div class="border border-2 p-2">1 chopped cup (1/2" pieces) of cauliflower, raw (107 g)</div>
                <div class="border border-2 p-2">1 tsp of spices, turmeric, ground (3 g)</div>
                <div class="border border-2 p-2">1 tbsp of olive oil (14 g)</div>
                <div class="border border-2 p-2">100 grams of rice, brown, medium-grain, raw</div>
                <div class="border border-2 p-2">150 grams of edamame, frozen, unprepared</div>
                <div class="border border-2 p-2">1 cup, sections of lemons, raw, without peel (212 g)</div>
                <div class="border border-2 p-2">1 cup slices of cucumber, with peel, raw (104 g)</div>
                <div class="border border-2 p-2">4 tbsps of parsley, fresh (15 g)</div>
                <div class="border border-2 p-2">50 grams of nuts, cashew nuts, oil roasted, with salt added</div>
                <div class="border border-2 p-2">5 tbsps of vinegar, balsamic (80 g)</div>
                <div class="border border-2 p-2">4 tbsps of soy sauce made from soy (tamari) (72 g)</div>
                <div class="border border-2 p-2">1 tablespoon of oil, sesame, salad or cooking (14 g)</div>
                <div class="border border-2 p-2">1 tablespoon of oil, sesame, salad or cooking (14 g)</div>
                <div class="border border-2 p-2">2 tbsps of syrups, maple (40 g)</div>
              </div>

              <div
                class="d-flex flex-column gap-2 border border-1 rounded-2"
                style="padding: 20px; background-color: white">
                <div class="d-flex lh-1 flex-column">
                  <span class="fs-4">Cooking method</span>
                  <span style="opacity: 0.5; font-size: 14px">Give instructions to prepare this recipe</span>
                </div>
                ${recipe.cookingMethods
                  .map(
                    (m, index) => `
                  <div class="d-flex mt-2">
                    <span
                      class="border border-end-0 p-2 text-center rounded-start-0 ps-2 align-items-center d-flex fs-5 fw-light justify-content-center"
                      style="background-color: #fafafb; min-width: 50px;">
                      ${index + 1}
                    </span>
                    <div class="form-control rounded-0 fw-light mb-0 d-flex align-items-center">
                      ${m.content}
                    </div>
                  </div>
                `
                  )
                  .join("")}                
              </div>
            </div>

            <div class="chart">
              <div class="border rounded-2 d-flex flex-column mb-4" style="background-color: white; padding: 20px">
                <div class="d-flex lh-1 flex-column mb-2">
                  <span class="fs-4">Global analysis per portion</span>
                  <span style="opacity: 0.5; font-size: 14px">Energy, macronutrients and fiber distribution</span>
                </div>
                <div class="d-flex justify-content-between mt-2 mb-1 border-bottom">
                  <span>Energy</span>
                  <span>${nutrition.energy} kcal</span>
                </div>

                <div class="d-flex justify-content-around mt-4 flex-wrap gap-3">
                  <div class="d-flex flex-column align-items-center">
                    <div class="border-5 rounded-circle m-0 d-flex justify-content-center align-items-center" style="border: solid #db4965;width: 50px;height: 50px;">${
                      nutrition.fat
                    }g</div>
                    <span>Fat</span>
                  </div>
                  <div class="d-flex flex-column align-items-center">
                    <div class="border-5 rounded-circle m-0 d-flex justify-content-center align-items-center" style="border: solid #ea9f77;width: 50px;height: 50px;">${
                      nutrition.carbohydrate
                    }g</div>
                    <span>Carbohydrate</span>
                  </div>
                  <div class="d-flex flex-column align-items-center">
                    <div class="border-5 rounded-circle m-0 d-flex justify-content-center align-items-center" style="border: solid #1ab394;width: 50px;height: 50px;">${
                      nutrition.protein
                    }g</div>
                    <span>Protein</span>
                  </div>
                  <div class="d-flex flex-column align-items-center">
                    <div class="border-5 rounded-circle m-0 d-flex justify-content-center align-items-center" style="border: solid #6a7d93;width: 50px;height: 50px;">${(
                      100 -
                      nutrition.fat -
                      nutrition.carbohydrate -
                      nutrition.protein
                    ).toFixed(2)}</div>
                    <span>Fiber</span>
                  </div>
                </div>
              </div>

              <div class="border rounded-2 d-flex flex-column mb-4" style="background-color: white; padding: 20px">
                <div class="d-flex lh-1 flex-column mb-4">
                  <span class="fs-4">Macronutrients per portion</span>
                  <span style="opacity: 0.5; font-size: 14px">Macronutrients distribution of the recipe</span>
                </div>
                <div>
                  <canvas id="myPieChart" width="300" height="300" class="ms-4"></canvas>

                  <div id="legend" class="ms-5">
                    <div class="legend-item">
                      <div class="box" style="background-color: #db4965"></div>
                      Fat
                    </div>
                    <div class="legend-item">
                      <div class="box" style="background-color: #f4a261"></div>
                      Carbohydrate
                    </div>
                    <div class="legend-item">
                      <div class="box" style="background-color: #2a9d8f"></div>
                      Protein
                    </div>
                  </div>
                </div>
              </div>

              <div class="border rounded-2 d-flex flex-column mb-4" style="background-color: white; padding: 20px">
                <div class="d-flex lh-1 flex-column mb-4">
                  <span class="fs-4">Micronutrients per portion</span>
                  <span style="opacity: 0.5; font-size: 14px">Micronutrients distribution of the recipe</span>
                </div>
                <div class="d-flex flex-column" id="micronutrients">
                    <div class="d-flex justify-content-between p-1">
                        <span>Sodium</span>
                        <span>1418 mg</span>
                    </div>
                    <div class="d-flex justify-content-between p-1" style="background-color: #FAFAFB;">
                        <span>Vitamin A</span>
                        <span>18 ug</span>
                    </div>
                    <div class="d-flex justify-content-between p-1">
                        <span>Vitamin B-6</span>
                        <span>0 mg</span>
                    </div>
                    <div class="d-flex justify-content-between p-1" style="background-color: #FAFAFB;">
                        <span>Vitamin B-12</span>
                        <span>0 ug</span>
                    </div>
                    <div class="d-flex justify-content-between p-1">
                        <span>Vitamin C</span>
                        <span>50 mg</span>
                    </div>
                    <div class="d-flex justify-content-between p-1" style="background-color: #FAFAFB;">
                        <span>Vitamin D (D2 + D3)</span>
                        <span>0 ug</span>
                    </div>
                    <div class="d-flex justify-content-between p-1">
                        <span>Vitamin E</span>
                        <span>1 mg</span>
                    </div>
                    <div class="d-flex justify-content-between p-1" style="background-color: #FAFAFB;">
                        <span>Vitamin K</span>
                        <span>87 ug</span>
                    </div>
                    <div class="d-flex justify-content-between p-1">
                        <span>Sugars</span>
                        <span>13 g</span>
                    </div>
                    <div class="d-flex justify-content-between p-1" style="background-color: #FAFAFB;">
                        <span>Calcium</span>
                        <span>88 mg</span>
                    </div>
                    <div class="d-flex justify-content-between p-1">
                        <span>Iron</span>
                        <span>4 mg</span>
                    </div>
                    <div class="d-flex justify-content-between p-1" style="background-color: #FAFAFB;">
                        <span>Magnesium</span>
                        <span>127 mg</span>
                    </div>
                    <div class="d-flex justify-content-between p-1">
                        <span>Phosphorus</span>
                        <span>251 mg</span>
                    </div>
                    <div class="d-flex justify-content-between p-1" style="background-color: #FAFAFB;">
                        <span>Phosphorus</span>
                        <span>649 mg</span>
                    </div>
                    <div class="d-flex justify-content-between p-1">
                        <span>Zinc</span>
                        <span>2 mg</span>
                    </div>
                    <div class="d-flex justify-content-between p-1" style="background-color: #FAFAFB;">
                        <span>Copper</span>
                        <span>1 mg</span>
                    </div>
                    <div class="d-flex justify-content-between p-1">
                        <span>Copper</span>
                        <span>1 ug</span>
                    </div>
                    <div class="d-flex justify-content-between p-1" style="background-color: #FAFAFB;">
                        <span>Manganese</span>
                        <span>2 mg</span>
                    </div>
                    <div class="d-flex justify-content-between p-1">
                        <span>Manganese</span>
                        <span>4 ug</span>
                    </div>
                    <div class="d-flex justify-content-between p-1" style="background-color: #FAFAFB;">
                        <span>Thiamin</span>
                        <span>0 mg</span>
                    </div>
                    <div class="d-flex justify-content-between p-1">
                        <span>Riboflavin</span>
                        <span>0 mg</span>
                    </div>
                    <div class="d-flex justify-content-between p-1" style="background-color: #FAFAFB;">
                        <span>Niacin</span>
                        <span>3 mg</span>
                    </div>
                    <div class="d-flex justify-content-between p-1">
                        <span>Pantothenic acid</span>
                        <span>1 mg</span>
                    </div>
                    <div class="d-flex justify-content-between p-1" style="background-color: #FAFAFB;">
                        <span>Folate, total</span>
                        <span>156 ug</span>
                    </div>
                </div>
              </div>
              <div class="d-flex justify-content-end"><button class="btn btn-primary" onclick="goBack()" >Return Dashboard</button></div>
            </div>
          </div>
  `;
  // document.getElementById("recipeDetail").dataset.imagePath = imgPath;
  markFavoriteHearts();
}

function pieChart(food, id) {
  // Clear any existing chart first
  Chart.getChart(id)?.destroy();

  const ctx = document.getElementById(id);
  if (!ctx) {
    console.error(`Canvas with ID '${id}' not found`);
    return;
  }

  const total = food.macronutrients.fat + food.macronutrients.carbohydrate + food.macronutrients.protein;
  if (total <= 0) {
    console.error("Total macronutrients is zero or negative");
    return;
  }

  const fat = (food.macronutrients.fat * 100) / total;
  const carbohydrate = (food.macronutrients.carbohydrate * 100) / total;
  const protein = (food.macronutrients.protein * 100) / total;

  const data = {
    labels: ["Fat", "Carbohydrate", "Protein"],
    datasets: [
      {
        data: [fat.toFixed(2), carbohydrate.toFixed(2), protein.toFixed(2)],
        backgroundColor: ["#DB4965", "#F4A261", "#2A9D8F"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const config = {
    type: "pie",
    data: data,
    options: {
      responsive: false,
      plugins: {
        legend: {display: false},
        tooltip: {
          callbacks: {
            label: function (context) {
              return context.label + ": " + context.parsed + "%";
            },
          },
        },
        datalabels: {
          color: "#fff",
          font: {
            weight: "bold",
            size: 14,
          },
          formatter: (value, context) => {
            return value + "%";
          },
        },
      },
    },
    plugins: [ChartDataLabels],
  };

  new Chart(ctx, config);
  console.log("Chart created for food:", food.name);
}

function updateRecipeWithChart(recipe) {
  // Hiển thị chi tiết công thức
  showDetailRecipe(recipe);

  // Lấy dinh dưỡng của công thức
  const nutrition = recipe.ingredients[0];

  // Vẽ biểu đồ tròn
  pieChart(nutrition, "myPieChart");
}

function goBack() {
  document.getElementById("box-recipe").style.display = "block";
  document.getElementById("recipeDetail").style.display = "none";
}

function addDetailRecipe() {
  document.getElementById("box-recipe").style.display = "none";
  document.getElementById("addNewRecipe").style.display = "block";
}

const changeMethod = document.getElementById("change-method");

// 2 trạng thái nội dung
const communityHTML = `
  <i class="fas fa-users" style="margin-right: 5px;"></i>
  <span class="text-nowrap" style="font-size: 12px; font-weight: 700;">
    Community Recipes
  </span>
`;
const myRecipesHTML = `
  <i class="fa-solid fa-pen-to-square" style="color: #2196f3; margin-right: 5px;"></i>
  <span style="font-size: 12px; font-weight: 700; color: #2196f3">
    My recipes
  </span>
`;

// bắt sự kiện click
changeMethod.addEventListener("click", () => {
  const isCommunity = changeMethod.innerHTML.trim() === communityHTML.trim();

  if (isCommunity) {
    // chuyển sang My recipes
    changeMethod.innerHTML = myRecipesHTML;
    changeMethod.classList.remove("bg-warning"); // bỏ nền vàng
    changeMethod.classList.add("bg-transparent"); // trắng/transparent
    // giữ lại border, rounded, shadow như ban đầu
  } else {
    // chuyển về Community Recipes
    changeMethod.innerHTML = communityHTML;
    changeMethod.classList.add("bg-warning"); // lại nền vàng
    changeMethod.classList.remove("bg-transparent");
  }
});

// khởi tạo để tương tác
const labelHTML = `
  <div class="card-category border border-1 p-1 rounded-3">
    <i class="fa-solid fa-tags"></i>
    New category
  </div>
`;
const inputHTML = `
  <div class="position-relative" style="max-width: 300px">
    <input
      type="text"
      id="comboInput"
      class="form-control"
      placeholder="Thêm mới hoặc chọn từ dropdown"
      autocomplete="off"
    />
    <ul
      id="comboList"
      class="list-group position-absolute w-100 shadow"
      style="z-index: 1000; display: none;
             max-height: 200px; overflow-y: auto"
    ></ul>
  </div>
`;
let isInputVisible = false;
function initCombo() {
  const comboInput = document.getElementById("comboInput");
  const comboList = document.getElementById("comboList");
  if (!comboInput || !comboList) return;
  const options = [
    "vegeterian",
    "appetizer",
    "vegan",
    "main course",
    "dessert",
    "low-carb",
    "gluten-free",
    "breakfast",
    "salad",
    "soup",
  ];
  function renderDropdown(items) {
    comboList.innerHTML = items.map((o) => `<li class="list-group-item list-group-item-action">${o}</li>`).join("");
    comboList.style.display = items.length ? "block" : "none";
  }
  comboInput.addEventListener("focus", () => renderDropdown(options));
  comboInput.addEventListener("input", () => {
    const val = comboInput.value.trim().toLowerCase();
    renderDropdown(options.filter((o) => o.toLowerCase().includes(val)));
  });
  comboList.addEventListener("click", (e) => {
    if (e.target.matches("li")) {
      comboInput.value = e.target.textContent;
      comboList.style.display = "none";
    }
  });
  document.addEventListener("click", (e) => {
    if (!comboInput.contains(e.target) && !comboList.contains(e.target)) {
      comboList.style.display = "none";
    }
  });
}

//Thêm vào danh sách yêu thích
function addFavoriteFoodToHomepage(idFood) {
  const heart = document.getElementById(`heart-${idFood}`);
  // Đảm bảo lấy mảng hiện tại hoặc khởi tạo mảng rỗng
  const favoriteRecipe = loadFromLocalStorage("favoriteRecipe", []);

  const index = favoriteRecipe.findIndex((food) => food.id === idFood);
  const isFavorite = index !== -1;

  if (isFavorite) {
    // Xóa khỏi yêu thích
    favoriteRecipe.splice(index, 1);
    heart.style.color = "white";
    alert("Đã xóa khỏi danh sách yêu thích");
  } else {
    // Sửa lỗi: thay Food thành Recipe
    const foodToAdd = Recipe.find((f) => f.id === idFood);
    if (foodToAdd) {
      favoriteRecipe.push(foodToAdd);
      heart.style.color = "red";
      alert("Đã thêm vào danh sách yêu thích");
    } else {
      alert("Không tìm thấy công thức này!");
      return;
    }
  }

  // Lưu vào localStorage
  saveDataToLocal("favoriteRecipe", favoriteRecipe);
  updateFavoriteCount();
}

// Hiệu ứng tim
function markFavoriteHearts() {
  let favoriteRecipe = loadFromLocalStorage("favoriteRecipe");
  favoriteRecipe.forEach((food) => {
    const heart = document.getElementById(`heart-${food.id}`);
    if (heart) {
      heart.style.color = "red";
    }
  });
}

// tổng số lượng thích
function updateFavoriteCount() {
  const favoriteRecipe = loadFromLocalStorage("favoriteRecipe", []);
  const countEl = document.getElementById("numberFavorite");
  if (countEl) {
    countEl.innerText = favoriteRecipe.length;
  }
}

// Tìm kiếm băng input
function searchFood(input, datas, render) {
  document.getElementById(input).addEventListener("input", function () {
    const keyword = this.value;
    currentPage = 1;
    filterRecipeMain(keyword);
  });

  function filterRecipeMain(keyword) {
    const filtered = datas.filter((d) => d.name.toLowerCase().includes(keyword.toLowerCase()));
    render(filtered); // gọi hàm render đúng cách
  }
}

// gọi
searchFood("searchRecipeMain", Recipe, function (filtered) {
  renderRecipes({
    containerID: "recipeList",
    paginationID: "paginationRecipe",
    data: filtered,
    state: recipeState,
    img: "../..",
  });
});

// sắp xếp theo nutrient
let isAscFoodSort = true;
const sortButtonMain = document.getElementById("sortButtonMain");
const sortIconMain = document.getElementById("sortIconMain");
const sortSelectMain = document.getElementById("sortSelectMain");

function mainSortSelect(btn, icon, stackingDirection, data, render) {
  btn.addEventListener("click", () => {
    isAscFoodSort = !isAscFoodSort;
    icon.className = isAscFoodSort ? "fas fa-sort-amount-up m-0" : "fas fa-sort-amount-down m-0";
    if (stackingDirection.value && stackingDirection.value !== "Sort by nutrient") {
      sortMain();
    }
  });

  stackingDirection.addEventListener("change", () => {
    sortMain();
  });

  function sortMain() {
    const nutrient = stackingDirection.value;
    if (!nutrient) return;

    const sorted = [...data].sort((a, b) => {
      let valA, valB;

      // Kiểm tra loại dữ liệu đang xử lý
      if (data === Food) {
        valA = a.macronutrients?.[nutrient] ?? 0;
        valB = b.macronutrients?.[nutrient] ?? 0;
      } else if (data === Recipe) {
        valA = a.ingredients?.[0]?.macronutrients?.[nutrient] ?? 0;
        valB = b.ingredients?.[0]?.macronutrients?.[nutrient] ?? 0;
      }
      return isAscFoodSort ? valA - valB : valB - valA;
    });

    // Gọi render callback với dữ liệu đã sắp xếp
    render(sorted);
  }
}

// gọi
mainSortSelect(sortButtonMain, sortIconMain, sortSelectMain, Recipe, function (sorted) {
  renderRecipes({
    containerID: "recipeList",
    paginationID: "paginationRecipe",
    data: sorted,
    state: recipeState,
    img: "../..",
  });
});

// tìm kiếm theo danh mục
const categorySelectMain = document.getElementById("categorySelectMain");
function categorySelectNutrition(key, data, render) {
  key.addEventListener("change", function () {
    const value = this.value;
    let filtered;
    if (value === "") {
      filtered = data;
    } else {
      if (data === Food) {
        filtered = data.filter((d) => {
          const categoryNames = d.category;
          return categoryNames && categoryNames.toLowerCase().includes(value.toLowerCase());
        });
      } else if (data === Recipe) {
        filtered = data.filter((d) => {
          const categoryNames = d.category
            .map((cate) => {
              const found = category.find((c) => c.id === cate.id);
              return found ? found.name : null;
            })
            .filter((name) => name) // loại bỏ null
            .map((name) => name.toLowerCase());

          // so sánh với value đã chọn (cũng lowercase)
          return categoryNames.includes(value.toLowerCase());
        });
      }
    }

    render(filtered);
  });
}

//gọi
categorySelectNutrition(categorySelectMain, Recipe, function (filtered) {
  renderRecipes({
    containerID: "recipeList",
    paginationID: "paginationRecipe",
    data: filtered,
    state: recipeState,
    img: "../..",
  });
});

const rowsPerPage = 5;
let currentPage = 1;

function renderNutritionItems(data = Food) {
  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const container = document.getElementById("nutritionItems");
  container.innerHTML = "";

  const pageItems = data.slice(start, end);

  pageItems.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "nutrition-row";
    // Store the actual index from the array
    const realIndex = start + index;
    row.setAttribute("data-index", realIndex);

    row.innerHTML = `
          <div class="d-flex border border-top-0" style="padding: 20px; background-color: white">
            <div class="d-flex flex-column" style="width: 230px">
              <span>${item.name}</span>
              <span style="font-size: 12px; opacity: 0.5">${item.source}</span>
              <div class="d-flex">
                <span
                  class="border text-wrap align-items-center d-flex fw-light"
                  style="background-color: #fafafb; font-size: 12px; width: 30px; padding-left: 10px">
                  1
                </span>
                <span class="border border-start-0" style="font-size: 12px; width: 120px; padding-left: 10px">portion (${item.quantity} grams)</span>
                <span
                  class="border text-wrap align-items-center d-flex fw-light"
                  style="background-color: #fafafb; font-size: 12px; width: 45px; padding-left: 10px">
                  ${item.quantity}g
                </span>
              </div>
              </div>
                  <div style="padding: 15px 15px; font-size: 10px">${item.macronutrients.energy} kcal</div>
                  <div style="padding: 15px 15px; font-size: 10px">${item.macronutrients.fat}g</div>
                  <div style="padding: 15px 15px; font-size: 10px">${item.macronutrients.carbohydrate}g</div>
                  <div style="padding: 15px 15px; font-size: 10px">${item.macronutrients.protein}g</div>
              </div>
            <div class="plus-button add-to-queue" data-index="${realIndex}">
              <i class="fa-solid fa-plus" style="color: white"></i>
            </div>
          </div>
      `;
    container.appendChild(row);
  });

  // Add click handlers to rows
  document.querySelectorAll(".nutrition-row").forEach((row) => {
    row.addEventListener("click", function (e) {
      // Don't trigger row selection when clicking the plus button
      if (e.target.closest(".add-to-queue")) {
        return;
      }

      // Remove active class from all rows
      document.querySelectorAll(".nutrition-row").forEach((r) => {
        r.classList.remove("active");
      });
      // Add active class to clicked row
      this.classList.add("active");

      const index = parseInt(this.getAttribute("data-index"));
      const selectedFood = data[index];

      // Display the chart immediately
      pieChart(selectedFood, "nutritionPieChart");
      informContainerChart(selectedFood);
      renderMicronutrientsFromData(selectedFood, "micronutrientsContainer");
    });
  });

  // Add click handlers for plus buttons
  document.querySelectorAll(".add-to-queue").forEach((button) => {
    button.addEventListener("click", function (e) {
      e.stopPropagation(); // Prevent row click event from firing
      const index = parseInt(this.getAttribute("data-index"));
      const selectedFood = data[index];
      addIngredientChart(selectedFood);
    });
  });

  // phân trang
  renderPaginationNutri(data);
}

let selectedIngredients = [];

// Thêm vào food vào hàng chờ
function addIngredientChart(food) {
  const addIngredients = document.getElementById("addIngredients");

  const ingredientId = `ingredient-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  // Thêm đối tượng thực phẩm hoàn chỉnh vào mảng selectedIngredients
  selectedIngredients.push({
    id: ingredientId,
    food: food, // Lưu trữ toàn bộ thực phẩm
  });

  addIngredients.innerHTML += `
    <div id="${ingredientId}" class="ingredient-item d-flex mb-3">
      <div class="d-flex flex-column w-100">
        <span class="border border-end-0 border-bottom-0" style="padding: 10px; font-size: 12px">
          ${food.name}
        </span>
        <div class="d-flex">
          <span
            class="border border-end-0 text-wrap align-items-center d-flex fs-6 fw-light"
            style="background-color: #fafafb; padding: 10px">
            <i class="fa-solid fa-plus" style="color: #023f10"></i>
          </span>
          <input
            type="text"
            class="border border-start-0 w-100 border-end-0"
            placeholder="Add new food equivalent" />
        </div>
      </div>
      <span
        class="delete-ingredient border text-wrap align-items-center d-flex fs-6 fw-light cursor-pointer"
        style="background-color: #fafafb; padding: 10px; cursor: pointer;"
        data-ingredient-id="${ingredientId}">
        <i class="fa-solid fa-trash"></i>
      </span>
    </div>
  `;

  // hàm xóa
  setupDeleteIngredientListeners();
}

// hàm xóa food khỏi Ingredient
function setupDeleteIngredientListeners() {
  const addIngredients = document.getElementById("addIngredients");

  // Xóa các trình nghe hiện có để tránh trùng lặp
  const newAddIngredients = addIngredients.cloneNode(true);
  addIngredients.parentNode.replaceChild(newAddIngredients, addIngredients);

  // thêm sự kiện vào
  newAddIngredients.addEventListener("click", function (e) {
    if (e.target.closest(".delete-ingredient")) {
      const button = e.target.closest(".delete-ingredient");
      const ingredientId = button.getAttribute("data-ingredient-id");
      const ingredientElement = document.getElementById(ingredientId);

      if (ingredientElement) {
        // Xóa khỏi mảng selectedIngredients
        selectedIngredients = selectedIngredients.filter((item) => item.id !== ingredientId);

        // hiệu ứng xóa
        ingredientElement.style.transition = "opacity 0.3s";
        ingredientElement.style.opacity = "0";
        setTimeout(() => {
          ingredientElement.remove();
        }, 300);
      }
    }
  });
}

//dữ liệu số của Macronutrients
function informContainerChart(food) {
  const containerInformFood = document.getElementById("containerInformFood");
  containerInformFood.innerHTML = `
    <div class="border rounded-2 d-flex flex-column mb-4" style="background-color: white; padding: 20px">
      <div class="d-flex lh-1 flex-column mb-2">
        <span class="fs-4">Global analysis</span>
        <div class="d-flex align-items-center justify-content-between">
          <span style="opacity: 0.5; font-size: 14px">Energy, macronutrients and fiber distribution</span>
          <div class="bg-success p-2 rounded-circle">
            <i class="fa-solid fa-comment" style="color: white"></i>
          </div>
        </div>
      </div>

      <div class="d-flex justify-content-between mt-2 mb-1 border-bottom">
        <span>Energy</span>
        <span>${food.macronutrients.energy} kcal</span>
      </div>

      <div class="d-flex justify-content-around mt-4 flex-wrap gap-3">
        <div class="d-flex flex-column align-items-center">
          <div class="p-2 border-5 rounded-circle m-0" style="border: solid #db4965">${food.macronutrients.fat} g</div>
          <span>Fat</span>
        </div>
        <div class="d-flex flex-column align-items-center">
          <div class="p-2 border-5 rounded-circle m-0" style="border: solid #f4a261">${
            food.macronutrients.carbohydrate
          } g</div>
          <span>Carbohydrate</span>
        </div>
        <div class="d-flex flex-column align-items-center">
          <div class="p-2 border-5 rounded-circle m-0" style="border: solid #2a9d8f">${
            food.macronutrients.protein
          } g</div>
          <span>Protein</span>
        </div>
        <div class="d-flex flex-column align-items-center">
          <div class="p-2 border-5 rounded-circle m-0" style="border: solid #6a7d93">${(
            100 -
            food.macronutrients.fat -
            food.macronutrients.carbohydrate -
            food.macronutrients.protein
          ).toFixed(2)} g</div>
          <span>Fiber</span>
        </div>
      </div>
    </div>
  `;
}

// biểu đồ
function addChartContainer() {
  // Check if container already exists
  const container = document.getElementById("containerChart");
  if (!container) {
    console.error("Container with ID 'containerChart' not found");
    return;
  }

  container.innerHTML = `
      <div class="border rounded-2 d-flex flex-column mb-4" style="background-color: white; padding: 20px">
        <div class="d-flex lh-1 flex-column mb-4">
          <span class="fs-4">Macronutrients</span>
          <span style="opacity: 0.5; font-size: 14px">Macronutrients distribution of the recipe</span>
        </div>
        <div>
          <canvas id="nutritionPieChart" width="270px" height="270px"></canvas>

          <div id="legend" class="ms-5">
            <div class="legend-item">
              <div class="box" style="background-color: #db4965"></div>
              Fat
            </div>
            <div class="legend-item">
              <div class="box" style="background-color: #f4a261"></div>
              Carbohydrate
            </div>
            <div class="legend-item">
              <div class="box" style="background-color: #2a9d8f"></div>
              Protein
            </div>
          </div>
        </div>
      </div>
    `;
}

// dữ liệu của Micronutrients
function renderMicronutrientsFromData(data, containerId) {
  const container = document.getElementById(containerId);
  if (!container || !data || !data.micronutrients) return;

  const unitMap = {
    cholesterol: "mg",
    fiber: "g",
    sodium: "mg",
    water: "g",
    vitaminA: "µg",
    vitaminB6: "mg",
    vitaminB12: "µg",
    vitaminC: "mg",
    vitaminD: "µg",
    vitaminE: "mg",
    vitaminK: "µg",
    starch: "g",
    lactose: "g",
    alcohol: "g",
    caffeine: "mg",
    sugars: "g",
    calcium: "mg",
    iron: "mg",
    magnesium: "mg",
    phosphorus: "mg",
    potassium: "mg",
    zinc: "mg",
    copper: "mg",
    fluoride: "µg",
    manganese: "mg",
    selenium: "µg",
    thiamin: "mg",
    riboflavin: "mg",
    niacin: "mg",
    pantothenicAcid: "mg",
    folateTotal: "µg",
    folicAcid: "µg",
    fattyAcidsTrans: "g",
    fattyAcidsSaturated: "g",
    fattyAcidsMonounsaturated: "g",
    fattyAcidsPolyunsaturated: "g",
    chloride: "mg",
  };

  function camelToLabel(str) {
    return str
      .replace(/([A-Z])/g, " $1")
      .replace(/Acid/g, "Acid")
      .replace(/Total/g, "Total")
      .replace(/^./, (char) => char.toUpperCase())
      .trim();
  }

  container.innerHTML = `
    <div class="border rounded-2 d-flex flex-column mb-4" style="background-color: white; padding: 20px">
      <div class="d-flex lh-1 flex-column mb-4">
        <span class="fs-4">Micronutrients</span>
        <span style="opacity: 0.5; font-size: 14px">Micronutrients distribution of the recipe</span>
      </div>
      <div class="d-flex flex-column" id="${containerId}-list"></div>
    </div>
  `;

  const listContainer = document.getElementById(`${containerId}-list`);
  const entries = Object.entries(data.micronutrients).filter(([, value]) => value != null);

  entries.forEach(([key, value], index) => {
    const isAlt = index % 2 !== 0;
    const label = camelToLabel(key);
    const unit = unitMap[key] || "";

    const row = document.createElement("div");
    row.className = "d-flex justify-content-between p-1";
    if (isAlt) row.style.backgroundColor = "#fafafb";
    row.innerHTML = `<span>${label}</span><span>${value} ${unit}</span>`;
    listContainer.appendChild(row);
  });
}

addChartContainer();

// render và tìm kiếm
document.addEventListener("DOMContentLoaded", function () {
  renderNutritionItems();
  // truyền dữ liệu cho tìm kiếm input
  searchFood("searchNutrition", Food, function (filtered) {
    renderNutritionItems(filtered);
  });
  // sắp xếp theo dinh dưỡng
  const sortNutrition = document.getElementById("sortNutrition");
  const sortIconNutrion = document.getElementById("sortIconNutrion");
  const sortSelectNutrition = document.getElementById("sortSelectNutrition");
  mainSortSelect(sortNutrition, sortIconNutrion, sortSelectNutrition, Food, function (sorted) {
    renderNutritionItems(sorted);
  });
  // tìm kiếm bằng category
  const categorySelectNutri = document.getElementById("categorySelectNutri");
  categorySelectNutrition(categorySelectNutri, Food, function (filtered) {
    renderNutritionItems(filtered);
  });
});

function renderPaginationNutri(data) {
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const pagination = document.getElementById("paginationNutri");
  pagination.innerHTML = "";

  // Nút về trang đầu ⏮ (ẩn nếu đang ở trang 1)
  if (currentPage > 1) {
    const firstBtn = document.createElement("button");
    firstBtn.innerHTML = `<i class="fas fa-angle-double-left"></i>`;
    firstBtn.addEventListener("click", () => changePageNutri(data, 1));
    pagination.appendChild(firstBtn);

    // Nút trước đó ◀
    const prevBtn = document.createElement("button");
    prevBtn.innerHTML = `<i class="fas fa-angle-left"></i>`;
    prevBtn.addEventListener("click", () => changePageNutri(data, currentPage - 1));
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
    pageBtn.addEventListener("click", () => changePageNutri(data, i));
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
    nextBtn.addEventListener("click", () => changePageNutri(data, currentPage + 1));
    pagination.appendChild(nextBtn);

    const lastBtn = document.createElement("button");
    lastBtn.innerHTML = `<i class="fas fa-angle-double-right"></i>`;
    lastBtn.addEventListener("click", () => changePageNutri(data, totalPages));
    pagination.appendChild(lastBtn);
  }
}

function changePageNutri(data, page) {
  const totalPages = Math.ceil(data.length / rowsPerPage);
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  renderNutritionItems(data);
}

document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".cooking-methods-container");

  // Lắng nghe sự kiện nhấn phím trong container
  if (container) {
    container.addEventListener("keydown", function (event) {
      // Nếu phím Enter được nhấn
      if (event.key === "Enter") {
        // Ngăn chặn hành vi mặc định (xuống dòng trong input)
        event.preventDefault();

        // Lấy vị trí hiện tại của con trỏ trong input
        const activeElement = document.activeElement;

        // Chỉ xử lý khi đang focus vào input
        if (activeElement.classList.contains("cooking-method-input")) {
          // Tìm dòng hiện tại
          const currentRow = activeElement.closest(".cooking-method-row");

          // Tạo dòng mới
          createNewRow(currentRow);
        }
      }
    });
  }

  // Hàm tạo dòng mới
  function createNewRow(afterElement) {
    // Đếm số dòng hiện tại để xác định số thứ tự mới
    const rowCount = container.querySelectorAll(".cooking-method-row").length + 1;

    // Tạo phần tử div mới cho dòng
    const newRow = document.createElement("div");
    newRow.className = "cooking-method-row d-flex mb-2";

    // Thiết lập HTML cho dòng mới
    newRow.innerHTML = `
      <span class="border border-end-0 p-2 text-wrap rounded-start-0 align-items-center d-flex fw-light step-number" style="background-color: #fafafb">
        ${rowCount}
      </span>
      <input type="text" class="form-control rounded-0 fw-light cooking-method-input" placeholder="Add new cooking method" />
      <span class="border text-wrap p-2 align-items-center d-flex fs-6 fw-light edit-button" style="background-color: #fafafb">
        <i class="fa-solid fa-pen" style="color: #023f10"></i>
      </span>
      <span class="border text-wrap p-2 align-items-center d-flex fs-6 fw-light delete-btn" style="background-color: #fafafb; cursor: pointer;">
        <i class="fa-solid fa-trash" style="color: #ff0000"></i>
      </span>
    `;

    // Chèn dòng mới sau dòng hiện tại
    if (afterElement) {
      afterElement.after(newRow);
    } else {
      container.appendChild(newRow);
    }

    // Focus vào input của dòng mới
    const newInput = newRow.querySelector(".cooking-method-input");
    newInput.focus();

    // Cập nhật lại số thứ tự cho tất cả các dòng (để bảo đảm tuần tự)
    updateStepNumbers();
  }

  // Hàm cập nhật số thứ tự cho tất cả các dòng
  function updateStepNumbers() {
    const rows = container.querySelectorAll(".cooking-method-row");
    rows.forEach((row, index) => {
      const stepNumber = row.querySelector(".step-number");
      stepNumber.textContent = index + 1;
    });
  }

  // Thêm hàm xóa dòng
  if (container) {
    container.addEventListener("click", function (event) {
      // Kiểm tra nếu nút xóa được click
      if (event.target.classList.contains("delete-btn") || event.target.closest(".delete-btn")) {
        const rowToDelete = event.target.closest(".cooking-method-row");

        // Chỉ xóa nếu có nhiều hơn 1 dòng
        if (container.querySelectorAll(".cooking-method-row").length > 1) {
          rowToDelete.remove();
          updateStepNumbers(); // Cập nhật lại số thứ tự
        }
      }
    });
  }

  // Khởi tạo ban đầu với một dòng nếu chưa có
  if (container && container.querySelectorAll(".cooking-method-row").length === 0) {
    createNewRow();
  }
});

// Hàm thu thập dữ liệu cooking methods
function collectCookingMethods() {
  const cookingMethods = [];
  const container = document.querySelector(".cooking-methods-container");

  if (!container) return [];

  const rows = container.querySelectorAll(".cooking-method-row");

  rows.forEach((row, index) => {
    const stepNumber = index + 1;
    const contentInput = row.querySelector(".cooking-method-input");
    const content = contentInput.value.trim();

    // Chỉ lưu những dòng có nội dung
    if (content) {
      cookingMethods.push({
        id: stepNumber,
        content: `STEP ${stepNumber}: ${content}`,
      });
    }
  });

  return cookingMethods;
}

// Tạo rand sách
function createFoodSelector() {
  const foodSelectorContainer = document.getElementById("foodSelectorContainer");
  if (!foodSelectorContainer) return;

  const foodSelector = document.createElement("div");
  foodSelector.className = "food-selector mb-3";
  foodSelector.innerHTML = `
    <label for="foodSelect" class="form-label">Select Ingredients</label>
    <select id="foodSelect" class="form-select">
      <option value="">-- Select a food ingredient --</option>
      ${Food.map((food) => `<option value="${food.id}">${food.name}</option>`).join("")}
    </select>
    <button type="button" id="addFoodButton" class="btn btn-primary mt-2">Add Ingredient</button>
  `;

  foodSelectorContainer.appendChild(foodSelector);

  // Event listener for add button
  document.getElementById("addFoodButton").addEventListener("click", function () {
    const select = document.getElementById("foodSelect");
    const foodId = parseInt(select.value);

    if (foodId) {
      const selectedFood = Food.find((food) => food.id === foodId);
      if (selectedFood) {
        addIngredientChart(selectedFood);
      }
    }
  });
}

// Chức năng thu thập các thành phần đã chọn cho công thức
function collectIngredients() {
  return selectedIngredients.map((item) => item.food); // Trả lại các đối tượng thực phẩm hoàn chỉnh
}

function addNewRecipes(event) {
  event.preventDefault();

  // xóa lỗi xác thực
  clearValidationErrors();
  const formRecipe = event.target;
  const recipeData = getFormData(formRecipe);

  // lấy category và chuyển thành id
  const comboInput = document.getElementById("comboInput");
  if (comboInput && comboInput.value) {
    const selectedNames = comboInput.value.split(",").map((name) => name.trim().toLowerCase());

    const selectedCategoryIds = category
      .filter((cat) => selectedNames.includes(cat.name.toLowerCase()))
      .map((cat) => ({id: cat.id}));

    recipeData.category = selectedCategoryIds;
  }

  // lấy dữ liệu cooking
  const cookingMethods = collectCookingMethods();
  recipeData.cookingMethods = cookingMethods;

  // thêm ingredients
  recipeData.ingredients = collectIngredients();

  // lấy dữ liệu ảnh
  const coverInput = document.getElementById("coverInput");
  if (coverInput.files && coverInput.files.length > 0) {
    recipeData.coverSrc = "/img/" + coverInput.files[0].name;
  }

  // kiểu tra form hợp lệ hay chưa
  const validationResult = validateRecipeForm(recipeData);

  if (!validationResult.isValid) {
    // hiển thị lỗi
    Object.keys(validationResult.errors).forEach((fieldName) => {
      showValidationError(fieldName, validationResult.errors[fieldName]);
    });

    // di chuyển đến lỗi đàu tiên
    const firstErrorField = document.querySelector(".is-invalid");
    if (firstErrorField) {
      firstErrorField.focus();
      firstErrorField.scrollIntoView({behavior: "smooth", block: "center"});
    }

    return;
  }

  Recipe.push({id: Recipe.length + 1, ...recipeData});
  saveDataToLocal("Recipe", Recipe);
  renderRecipes({
    containerID: "recipeList",
    paginationID: "paginationRecipe",
    data: Recipe,
    state: recipeState,
    img: baseImagePath,
  });
  alert("Thêm vào danh sách Recipe thành công");
  formRecipe.reset();

  // reset ảnh
  const previewImage = document.getElementById("previewImage");
  if (previewImage) {
    previewImage.src = "";
  }

  // Reset bước làm
  const cookingMethodsContainer = document.querySelector(".cooking-methods-container");
  if (cookingMethodsContainer) {
    cookingMethodsContainer.innerHTML = "";
  }

  // Reset ingredients
  const addIngredients = document.getElementById("addIngredients");
  if (addIngredients) {
    addIngredients.innerHTML = "";
    selectedIngredients = [];
  }
}

// Function to show validation error
function showValidationError(fieldName, errorMessage) {
  const field =
    document.getElementById(fieldName) ||
    document.querySelector(`[name="${fieldName}"]`) ||
    document.getElementById(`${fieldName}Container`);

  if (field) {
    field.classList.add("is-invalid");

    // tạo phần tử lỗi
    const errorDiv = document.createElement("div");
    errorDiv.className = "invalid-feedback";
    errorDiv.textContent = errorMessage;

    // Chèn thông báo lỗi sau trường
    field.parentNode.insertBefore(errorDiv, field.nextSibling);
  } else if (fieldName === "ingredients") {
    // Trường hợp đặc biệt cho các thành phần có thể không có trường trực tiếp
    const ingredientsContainer = document.getElementById("addIngredients");
    if (ingredientsContainer) {
      ingredientsContainer.classList.add("is-invalid");

      const errorDiv = document.createElement("div");
      errorDiv.className = "invalid-feedback d-block";
      errorDiv.textContent = errorMessage;

      ingredientsContainer.parentNode.insertBefore(errorDiv, ingredientsContainer.nextSibling);
    }
  }
}

// Chức năng xóa tất cả các lỗi xác thực
function clearValidationErrors() {
  // Xóa lớp đỏ khỏi tất cả các phần tử
  document.querySelectorAll(".is-invalid").forEach((element) => {
    element.classList.remove("is-invalid");
  });

  // Xóa tất cả các thông báo lỗi
  document.querySelectorAll(".invalid-feedback").forEach((element) => {
    element.remove();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Create the food selector
  createFoodSelector();

  // khi bấm vào nút submit
  const recipeForm = document.getElementById("recipeForm");
  if (recipeForm) {
    recipeForm.addEventListener("submit", addNewRecipes);
  }
});

// Hàm kiểm tra xác thực form có thể cần thêm phần cookingMethods
function validateRecipeForm(data) {
  const errors = {};
  let isValid = true;

  // Các kiểm tra hiện có
  if (!data.name || data.name.trim() === "") {
    errors.name = "Tên công thức không được để trống";
    isValid = false;
  }

  // Kiểm tra cookingMethods
  if (!data.cookingMethods || data.cookingMethods.length === 0) {
    errors.cookingMethods = "Vui lòng thêm ít nhất một bước nấu ăn";
    isValid = false;
  }

  // Các kiểm tra khác...

  return {
    isValid,
    errors,
  };
}

// Helper function để tạo row mới cho cooking methods container
function createNewRow(afterElement = null) {
  const container = document.querySelector(".cooking-methods-container");
  if (!container) return;

  // Đếm số dòng hiện tại để xác định số thứ tự mới
  const rowCount = container.querySelectorAll(".cooking-method-row").length + 1;

  // Tạo phần tử div mới cho dòng
  const newRow = document.createElement("div");
  newRow.className = "cooking-method-row d-flex mb-2";

  // Thiết lập HTML cho dòng mới
  newRow.innerHTML = `
    <span class="border border-end-0 p-2 text-wrap rounded-start-0 align-items-center d-flex fw-light step-number" style="background-color: #fafafb">
      ${rowCount}
    </span>
    <input type="text" class="form-control rounded-0 fw-light cooking-method-input" placeholder="Add new cooking method" />
    <span class="border text-wrap p-2 align-items-center d-flex fs-6 fw-light edit-button" style="background-color: #fafafb">
      <i class="fa-solid fa-pen" style="color: #023f10"></i>
    </span>
    <span class="border text-wrap p-2 align-items-center d-flex fs-6 fw-light delete-btn" style="background-color: #fafafb; cursor: pointer;">
      <i class="fa-solid fa-trash" style="color: #ff0000"></i>
    </span>
  `;

  // Chèn dòng mới sau dòng hiện tại
  if (afterElement) {
    afterElement.after(newRow);
  } else {
    container.appendChild(newRow);
  }

  // Focus vào input của dòng mới
  const newInput = newRow.querySelector(".cooking-method-input");
  newInput.focus();

  // Cập nhật lại số thứ tự cho tất cả các dòng
  const rows = container.querySelectorAll(".cooking-method-row");
  rows.forEach((row, index) => {
    const stepNumber = row.querySelector(".step-number");
    stepNumber.textContent = index + 1;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  //
  addValidationStyles();

  //
  setupValidationListeners();

  // Setup form submission (if not already in HTML)
  const form = document.querySelector("form");
  if (form && !form.getAttribute("onsubmit")) {
    form.addEventListener("submit", addNewRecipes);
  }

  // bắt dữ liệu khi tương tác
  const selectInput = document.getElementById("selectInput");
  if (selectInput) {
    selectInput.addEventListener("dblclick", () => {
      if (!isInputVisible) {
        selectInput.innerHTML = inputHTML;
        initCombo();
      } else {
        selectInput.innerHTML = labelHTML;
      }
      isInputVisible = !isInputVisible;
    });
  }

  const uploadBtn = document.getElementById("uploadBtn");
  const coverInput = document.getElementById("coverInput");
  if (uploadBtn && coverInput) {
    uploadBtn.addEventListener("click", function () {
      coverInput.click();
    });

    coverInput.addEventListener("change", function () {
      const file = this.files[0];
      if (file) {
        const imgURL = URL.createObjectURL(file);
        const previewImage = document.getElementById("previewImage");
        if (previewImage) {
          previewImage.src = imgURL;
        }
        console.log("File name:", file.name);
      }
    });
  }
});
