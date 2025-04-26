const foods = [
  {
    id: 1,
    name: "Ackee, canned, drained",
    source: "Minh Cuong Tran",
    category: "Vegetables and Vegetable Products",
    quantity: "100g",
    macronutrients: {
      energy: 151,
      carbohydrate: 0.8,
      fat: 15.2,
      protein: 2.9,
    },
    micronutrients: {
      cholesterol: 0.0,
      fiber: null,
      sodium: 240.0,
      water: 76.7,
      VitaminA: null,
      VitaminB6: 0.06,
      VitaminB12: 0.0,
      VitaminC: 30.0,
      VitaminD: 0.0,
      VitaminE: null,
      VitaminK: null,
      starch: 0.0,
      lactose: 0.0,
      calcium: 35.0,
      iron: 0.7,
      magnesium: 40.0,
      phosphorus: 47.0,
      potassium: 270.0,
      zinc: 0.6,
      copper: 0.27,
      fluoride: null,
      manganese: null,
      selenium: null,
      thiamin: 0.03,
      riboflavin: 0.07,
      niacin: 0.6,
      pantothenicAcid: null,
      folateTotal: 41.0,
      folicAcid: null,
      fattyAcidsTrans: 0.0,
      fattyAcidsSaturated: null,
      fattyAcidsMonounsaturated: null,
      fattyAcidsPolyunsaturated: null,
      chloride: 340.0,
    },
  },
];

const recipes = [
  {
    id: 1,
    coverSrc: "https://nutriumstorageaccount.blob.core.windows.net/rails-active-storage/6qim5uox87nr22st6i7nzt8",
    name: "Turmeric Roasted Cauliflower Salad (Lowfodmap)",
    description: "Our roasted cauliflower salad with turmeric is low in calories and packed with punchy flavor.",
    author: "Joana Jardim",
    totalTime: "00:40",
    preparationTime: "00:40",
    finalWeight: "978.8 grams",
    portions: 4,
    ingredients: [foods[0]],
    cookingMethods: [
      {
        id: 1,
        content: "STEP 1 Heat the oven to 200C/fan 180C/gas 6. Put the cauliflower in an ovenproof dish or tin...",
      },
    ],
    category: [
      {id: 1, name: "vegetarian"},
      {id: 2, name: "appetizer"},
    ],
  },
];

const categories = [
  {
    id: 1,
    name: "vegeterian",
    description: "Dishes that do not include meat, fish, or poultry, suitable for vegetarians.",
  },
  {
    id: 2,
    name: "appetizer",
    description: "Small dishes served before the main course to stimulate the appetite.",
  },
  {id: 3, name: "vegan", description: "Plant-based recipes with no animal products, including dairy and eggs."},
  {id: 4, name: "main course", description: "The main dish in a meal, often more substantial and filling."},
  {id: 5, name: "dessert", description: "Sweet dishes typically served at the end of a meal."},
  {
    id: 6,
    name: "low-carb",
    description: "Recipes with reduced carbohydrate content, often for weight or sugar control.",
  },
  {
    id: 7,
    name: "gluten-free",
    description: "Meals made without gluten, suitable for those with gluten intolerance.",
  },
  {id: 8, name: "breakfast", description: "Recipes designed for the first meal of the day."},
  {
    id: 9,
    name: "salad",
    description: "Cold or warm dishes primarily composed of vegetables, fruits, and dressings.",
  },
  {
    id: 10,
    name: "soup",
    description: "Liquid-based dishes, either hot or cold, made with a variety of ingredients.",
  },
];

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

// Render danh sách recipe
function renderRecipes() {
  let recipeList = document.getElementById("recipeList");
  recipeList.innerHTML = "";
  recipes.forEach((recipe) => {
    const nutrition = getNutrition(recipe.ingredients[0]);

    // Lấy danh sách category
    const categoryNames = recipe.category
      .map((cat) => {
        const found = category.find((c) => c.id === cat.id);
        return found ? found.name : "Unknown";
      })
      .join(", ");

    recipeList.innerHTML += `

    <div class="col">
          <div
            class="card h-100"
            style="
              background-image: url('${recipe.coverSrc}');
              color: black;
              background-size: cover;
              background-position: center;
            ">
            <div class="card-body">
              <span class="badge text-bg-warning mb-2">
                <i class="fas fa-users"></i>
                Community Recipes
              </span>
              <div class="d-flex justify-content-between align-items-center">
                <h5 class="card-title">${recipe.name}</h5>
                <div class="gap-2">
                  <div class="border border-1 rounded-2 align-items-center p-1 d-flex flex-nowrap">
                    <i class="far fa-heart me-2"></i>
                    ${getRandomNumber()}
                  </div>
                </div>
              </div>
              <p class="card-text">${recipe.author}</p>
              <p class="card-category">
                <i class="fas fa-tag"></i>
                ${categoryNames}
              </p>
            </div>
            <div class="card-footer border d-flex justify-content-between">
              <small>
                <strong>By</strong>
                100g
              </small>
              <small>
                <strong>Energy</strong>
                ${nutrition.energy}kcal
              </small>
              <small>
                <strong>Fat</strong>
                ${nutrition.fat}g
              </small>
              <small>
                <strong>Carbohydrate</strong>
                ${nutrition.carbohydrate}g
              </small>
              <small>
                <strong>Protein</strong>
                ${nutrition.protein}g
              </small>
            </div>
          </div>
        </div>
    
    `;
  });
}

renderRecipes();

function showDetailRecipe(recipe) {
  let detail = document.getElementById("detail");
  const nutrition = getNutrition(recipe.ingredients[0]);
  // Lấy danh sách category
  const categoryNames = recipe.category
    .map((cat) => {
      const found = category.find((c) => c.id === cat.id);
      return found ? found.name : "Unknown";
    })
    .join(", ");
  detail.innerHTML = `
    <div class="box-content mb-4">
            <div class="w-25">
              <div class="d-flex flex-column gap-4">
                <div class="border border-1 rounded-2" style="background-color: white; height: 300px; padding: 20px">
                  <div class="d-flex flex-column justify-content-between h-100">
                    <div class="d-flex align-items-center gap-2">
                      <span class="badge text-bg-warning p-2">
                        <i class="fas fa-users"></i>
                        Community Recipes
                      </span>
                      <div
                        class="d-flex border border-1 rounded-2 gap-1 align-items-center"
                        style="font-size: 12px; padding: 4px">
                        <i class="far fa-heart"></i>
                        <span>37</span>
                      </div>
                    </div>

                    <div class="card-category border border-1 p-1 rounded-3" style="width: 150px">
                      <i class="fas fa-tag"></i>
                      ${categoryNames}
                    </div>
                  </div>
                </div>
                <div
                  class="d-flex border border-1 rounded-2 gap-1 align-items-center"
                  style="font-size: 12px; padding: 4px; width: 130px">
                  <i class="fa-solid fa-heart" style="color: red"></i>
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
                <span class="form-control rounded-0 fw-light">${recipe.finalWeight}</span>
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
            style="background-color: #1ab394; gap: 5px; color: white">
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
                <div class="d-flex mt-3">
                  <span
                    class="border border-end-0 p-3 text-center rounded-start-0 ps-2 align-items-center d-flex fs-5 fw-light"
                    style="background-color: #fafafb">
                    1
                  </span>
                  <p class="form-control rounded-0 fw-light mb-0">
                    ${recipe.cookingMethods[0].content}
                  </p>
                </div>
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
                    <div class="border-5 rounded-circle m-0 d-flex justify-content-center align-items-center" style="border: solid #db4965;width: 50px;height: 50px;">${nutrition.fat}g</div>
                    <span>Fat</span>
                  </div>
                  <div class="d-flex flex-column align-items-center">
                    <div class="border-5 rounded-circle m-0 d-flex justify-content-center align-items-center" style="border: solid #ea9f77;width: 50px;height: 50px;">${nutrition.carbohydrate}g</div>
                    <span>Carbohydrate</span>
                  </div>
                  <div class="d-flex flex-column align-items-center">
                    <div class="border-5 rounded-circle m-0 d-flex justify-content-center align-items-center" style="border: solid #1ab394;width: 50px;height: 50px;">${nutrition.protein}g</div>
                    <span>Protein</span>
                  </div>
                  <div class="d-flex flex-column align-items-center">
                    <div class="border-5 rounded-circle m-0 d-flex justify-content-center align-items-center" style="border: solid #6a7d93;width: 50px;height: 50px;"></div>
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
                  <canvas id="myPieChart" width="300" height="300" class="ms-4" onload="pieChart(${recipe.ingredients[0]})"></canvas>

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
                <div class="d-flex flex-column">
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
            </div>
          </div>
  `;
}


function pieChart(food) {
  const ctx = document.getElementById("myPieChart").getContext("2d");

  let total=food.macronutrients.fat+ food.macronutrients.carbohydrate+ food.macronutrients.protein
  let fat=(food.macronutrients.fat*100)/total
  let carbohydrate=(food.macronutrients.carbohydrate*100)/total
  let protein=(food.macronutrients.protein*100)/total
  const data = {
    labels: ["Fat", "Carbohydrate", "Protein"],
    datasets: [
      {
        data: [fat,carbohydrate,protein],
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
    plugins: [ChartDataLabels], // <<< thêm dòng này
  };
  new Chart(ctx, config);
}
