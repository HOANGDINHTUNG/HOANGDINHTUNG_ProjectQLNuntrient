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

function renderCard() {
  let cardItem = document.querySelector(".card-item");
  cardItem.innerHTML = "";

  Recipe.forEach((re) => {
    let categories = category
      .filter((cate) => re.category.some((c) => c.id === cate.id))
      .map((cate) => cate.name)
      .join(", ");
      cardItem.innerHTML+= `
      <div class="col">
        <div class="card h-100">
          <div class="card-body">
            <span class="badge text-bg-warning mb-2">
              <i class="fas fa-users"></i>
              Community Recipes
            </span>
            <h5 class="card-title">${re.name}</h5>
            <p class="card-text">${re.author}</p>
            <p class="card-category">
              <i class="fas fa-tag"></i>
              ${categories}
            </p>
            <div class="d-flex justify-content-end gap-2 align-items-center">
              <i class="far fa-heart"></i>
              ${Math.floor(Math.random() * 100)}
            </div>
          </div>
          <div class="card-footer d-flex justify-content-between">
            <small><strong>By</strong> 100g</small>
            <small><strong>Energy</strong> ${re.ingredients[0].macronutrients.energy} kcal</small>
            <small><strong>Fat</strong> ${re.ingredients[0].macronutrients.fat} g</small>
            <small><strong>Carbohydrate</strong> ${re.ingredients[0].macronutrients.carbohydrate} g</small>
            <small><strong>Protein</strong> ${re.ingredients[0].macronutrients.protein} g</small>
          </div>
        </div>
      </div>
    `;
  });
}

renderCard();
