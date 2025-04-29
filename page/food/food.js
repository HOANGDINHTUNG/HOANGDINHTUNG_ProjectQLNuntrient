const rowsPerPage = 5;
let currentPage = 1;
let cardFood = document.getElementById("card-food");
// function renderFood(data = Food) {
//   const start = (currentPage - 1) * rowsPerPage;
//   const end = start + rowsPerPage;
//   cardFood.innerHTML = "";
//   cardFood.addEventListener("click", e => {
//     const card = e.target.closest(".card-detail-food");
//     if (card && card.dataset.id) {
//       const id = card.dataset.id;
//       const food = data.find((r) => r.id == id);
//       if(!food) return
//       overlay.style.display = "flex";
//       formFrame.src="./detail/detail.html"
//       formFrame.onload = () => {
//         const doc = formFrame.contentDocument;
//         doc.getElementById('foodDetail').innerHTML=`
//               <form onsubmit="">
//                 <div>
//                   <h2 class="text-center">Food information</h2>
//                   <p class="text-center">Check and update the information about the food</p>

//                   <!-- Basic Info -->
//                   <div class="grid-2 mb-3">
//                     <div class="input-group">
//                       <span class="input-group-text w-25 text-wrap">Name</span>
//                       <input type="text" class="form-control" name="name" value="${food.name}">
//                     </div>
//                     <div class="input-group">
//                       <span class="input-group-text w-25 text-wrap">Source</span>
//                       <input type="text" class="form-control" placeholder="My foods" name="source" value="${food.source}"/>
//                     </div>
//                   </div>

//                   <div class="grid-2 mb-3">
//                     <div class="input-group">
//                       <span class="input-group-text w-25 text-wrap">Category</span>
//                       <input type="text" class="form-control" placeholder="Select the food group" name="category" value="${food.category}"/>
//                     </div>
//                     <div class="input-group">
//                       <span class="input-group-text w-25 text-wrap">Quanlity</span>
//                       <input type="number" class="form-control" value="100" />
//                       <span class="input-group-text">grams</span>
//                     </div>
//                   </div>

//                   <div class="form-title border border-1 p-2">Nutritional value per 100 g</div>

//                   <div class="section-title text-center">Macronutrients</div>
//                   <div class="grid-2 mb-3">
//                     <div class="input-group">
//                       <span class="input-group-text w-50 text-wrap">Energy</span>
//                       <input type="number" class="form-control" name="energy" value="${food.macronutrients.energy}"/>
//                       <span class="input-group-text">kcal</span>
//                     </div>
//                     <div class="input-group">
//                       <span class="input-group-text w-50 text-wrap">Fat</span>
//                       <input type="number" class="form-control" name="fat" value="${food.macronutrients.fat}"/>
//                       <span class="input-group-text">g</span>
//                     </div>
//                     <div class="input-group">
//                       <span class="input-group-text w-50 text-wrap">Carbohydrate</span>
//                       <input type="number" class="form-control" name="carbohydrate" value="${food.macronutrients.carbohydrate}"/>
//                       <span class="input-group-text">g</span>
//                     </div>
//                     <div class="input-group">
//                       <span class="input-group-text w-50 text-wrap">Protein</span>
//                       <input type="number" class="form-control" name="protein" value="${food.macronutrients.protein}"/>
//                       <span class="input-group-text">g</span>
//                     </div>
//                   </div>

//                   <div class="section-title text-center">Micronutrients</div>
//                   <div class="grid-3">
//                     <!-- Micronutrient fields -->
//                     <div class="input-group">
//                       <span class="input-group-text w-50 text-wrap">Cholesterol</span>
//                       <input type="text" class="form-control" name="cholesterol" value="${food.micronutrients.cholesterol}"/>
//                       <span class="input-group-text">mg</span>
//                     </div>
//                     <div class="input-group">
//                       <span class="input-group-text w-50 text-wrap">Fiber</span>
//                       <input type="text" class="form-control" name="fiber" value="${food.micronutrients.fiber}"/>
//                       <span class="input-group-text">g</span>
//                     </div>
//                     <div class="input-group">
//                       <span class="input-group-text w-50 text-wrap">Sodium</span>
//                       <input type="text" class="form-control" name="sodium" value="${food.micronutrients.sodium}"/>
//                       <span class="input-group-text">mg</span>
//                     </div>
//                     <div class="input-group">
//                       <span class="input-group-text w-50 text-wrap">Water</span>
//                       <input type="text" class="form-control" name="water" value="${food.micronutrients.water}"/>
//                       <span class="input-group-text">g</span>
//                     </div>
//                     <div class="input-group">
//                       <span class="input-group-text w-50 text-wrap">Vitamin A</span>
//                       <input type="text" class="form-control" name="vitaminA" value="${food.micronutrients.vitaminA}"/>
//                       <span class="input-group-text">ug</span>
//                     </div>
//                     <div class="input-group">
//                       <span class="input-group-text w-50 text-wrap">Vitamin B-6</span>
//                       <input type="text" class="form-control" name="vitaminB6" value="${food.micronutrients.vitaminB6}"/>
//                       <span class="input-group-text">mg</span>
//                     </div>
//                     <div class="input-group">
//                       <span class="input-group-text w-50 text-wrap">Vitamin B-12</span>
//                       <input type="text" class="form-control" name="vitaminB12" value="${food.micronutrients.vitaminB12}"/>
//                       <span class="input-group-text">ug</span>
//                     </div>
//                     <div class="input-group">
//                       <span class="input-group-text w-50 text-wrap">Vitamin C</span>
//                       <input type="text" class="form-control" name="vitaminC" value="${food.micronutrients.vitaminC}"/>
//                       <span class="input-group-text">mg</span>
//                     </div>
//                     <div class="input-group">
//                       <span class="input-group-text w-50 text-wrap">Vitamin D (D2 + D3)</span>
//                       <input type="text" class="form-control" name="vitaminD" value="${food.micronutrients.vitaminD}"/>
//                       <span class="input-group-text">ug</span>
//                     </div>
//                     <div class="input-group">
//                       <span class="input-group-text w-50 text-wrap">Vitamin E</span>
//                       <input type="text" class="form-control" name="vitaminE" value="${food.micronutrients.vitaminE}"/>
//                       <span class="input-group-text">mg</span>
//                     </div>
//                     <div class="input-group">
//                       <span class="input-group-text w-50 text-wrap">Vitamin K</span>
//                       <input type="text" class="form-control" name="vitaminK" value="${food.micronutrients.vitaminK}"/>
//                       <span class="input-group-text">ug</span>
//                     </div>
//                     <div class="input-group">
//                       <span class="input-group-text w-50 text-wrap">Starch</span>
//                       <input type="text" class="form-control" name="starch" value="${food.micronutrients.starch}"/>
//                       <span class="input-group-text">g</span>
//                     </div>
//                     <div class="input-group">
//                       <span class="input-group-text w-50 text-wrap">Lactose</span>
//                       <input type="text" class="form-control" name="lactose" value="${food.micronutrients.lactose}"/>
//                       <span class="input-group-text">g</span>
//                     </div>
//                     <div class="input-group">
//                       <span class="input-group-text w-50 text-wrap">Alcohol</span>
//                       <input type="text" class="form-control" name="alcohol" value="${food.micronutrients.alcohol}"/>
//                       <span class="input-group-text">g</span>
//                     </div>
//                     <div class="input-group">
//                       <span class="input-group-text w-50 text-wrap">Caffeine</span>
//                       <input type="text" class="form-control" name="caffeine" value="${food.micronutrients.caffeine}"/>
//                       <span class="input-group-text">mg</span>
//                     </div>
//                     <div class="input-group">
//                       <span class="input-group-text w-50 text-wrap">Sugars</span>
//                       <input type="text" class="form-control" name="sugars" value="${food.micronutrients.sugars}"/>
//                       <span class="input-group-text">g</span>
//                     </div>
//                     <div class="input-group">
//                       <span class="input-group-text w-50 text-wrap">Calcium</span>
//                       <input type="text" class="form-control" name="calcium" value="${food.micronutrients.calcium}"/>
//                       <span class="input-group-text">mg</span>
//                     </div>
//                     <div class="input-group">
//                       <span class="input-group-text w-50 text-wrap">Iron</span>
//                       <input type="text" class="form-control" name="iron" value="${food.micronutrients.iron}"/>
//                       <span class="input-group-text">mg</span>
//                     </div>
//                     <div class="input-group">
//                       <span class="input-group-text w-50 text-wrap">Magnesium</span>
//                       <input type="text" class="form-control" name="magnesium" value="${food.micronutrients.magnesium}"/>
//                       <span class="input-group-text">mg</span>
//                     </div>
//                     <div class="input-group">
//                       <span class="input-group-text w-50 text-wrap">Phosphorus</span>
//                       <input type="text" class="form-control" name="phosphorus" value="${food.micronutrients.phosphorus}"/>
//                       <span class="input-group-text">mg</span>
//                     </div>
//                     <div class="input-group">
//                       <span class="input-group-text w-50 text-wrap">Potassium</span>
//                       <input type="text" class="form-control" name="potassium" value="${food.micronutrients.potassium}"/>
//                       <span class="input-group-text">mg</span>
//                     </div>
//                     <div class="input-group">
//                       <span class="input-group-text w-50 text-wrap">Zinc</span>
//                       <input type="text" class="form-control" name="zinc" value="${food.micronutrients.zinc}"/>
//                       <span class="input-group-text">mg</span>
//                     </div>
//                     <div class="input-group">
//                       <span class="input-group-text w-50 text-wrap">Copper</span>
//                       <input type="text" class="form-control" name="copper" value="${food.micronutrients.copper}"/>
//                       <span class="input-group-text">mg</span>
//                     </div>
//                     <div class="input-group">
//                       <span class="input-group-text w-50 text-wrap">Fluoride</span>
//                       <input type="text" class="form-control" name="fluoride" value="${food.micronutrients.fluoride}"/>
//                       <span class="input-group-text">ug</span>
//                     </div>
//                     <div class="input-group">
//                       <span class="input-group-text w-50 text-wrap">Manganese</span>
//                       <input type="text" class="form-control" name="manganese" value="${food.micronutrients.manganese}"/>
//                       <span class="input-group-text">mg</span>
//                     </div>
//                     <div class="input-group">
//                       <span class="input-group-text w-50 text-wrap">Selenium</span>
//                       <input type="text" class="form-control" name="selenium" value="${food.micronutrients.selenium}"/>
//                       <span class="input-group-text">ug</span>
//                     </div>
//                     <div class="input-group">
//                       <span class="input-group-text w-50 text-wrap">Thiamin</span>
//                       <input type="text" class="form-control" name="thiamin" value="${food.micronutrients.thiamin}"/>
//                       <span class="input-group-text">mg</span>
//                     </div>
//                     <div class="input-group">
//                       <span class="input-group-text w-50 text-wrap">Riboflavin</span>
//                       <input type="text" class="form-control" name="riboflavin" value="${food.micronutrients.riboflavin}"/>
//                       <span class="input-group-text">mg</span>
//                     </div>
//                     <div class="input-group">
//                       <span class="input-group-text w-50 text-wrap">Niacin</span>
//                       <input type="text" class="form-control" name="niacin" value="${food.micronutrients.niacin}"/>
//                       <span class="input-group-text">mg</span>
//                     </div>
//                     <div class="input-group">
//                       <span class="input-group-text w-50 text-wrap">Pantothenic acid</span>
//                       <input type="text" class="form-control" name="pantothenicAcid" value="${food.micronutrients.pantothenicAcid}"/>
//                       <span class="input-group-text">mg</span>
//                     </div>
//                     <div class="input-group">
//                       <span class="input-group-text w-50 text-wrap">Folate, total</span>
//                       <input type="text" class="form-control" name="folateTotal" value="${food.micronutrients.folateTotal}"/>
//                       <span class="input-group-text">ug</span>
//                     </div>
//                     <div class="input-group">
//                       <span class="input-group-text w-50 text-wrap">Folic acid</span>
//                       <input type="text" class="form-control" name="folicAcid" value="${food.micronutrients.folicAcid}"/>
//                       <span class="input-group-text">ug</span>
//                     </div>
//                     <div class="input-group">
//                       <span class="input-group-text w-50 text-wrap">Fatty acids, total trans</span>
//                       <input type="text" class="form-control" name="fattyAcidsTrans" value="${food.micronutrients.fattyAcidsTrans}"/>
//                       <span class="input-group-text">g</span>
//                     </div>
//                     <div class="input-group">
//                       <span class="input-group-text w-50 text-wrap">Fatty acids, total saturated</span>
//                       <input type="text" class="form-control" name="fattyAcidsSaturated" value="${food.micronutrients.fattyAcidsSaturated}"/>
//                       <span class="input-group-text">g</span>
//                     </div>
//                     <div class="input-group">
//                       <span class="input-group-text w-50 text-wrap">Fatty acids, total monounsaturated</span>
//                       <input type="text" class="form-control" name="fattyAcidsMonounsaturated" value="${food.micronutrients.fattyAcidsMonounsaturated}"/>
//                       <span class="input-group-text">g</span>
//                     </div>
//                     <div class="input-group">
//                       <span class="input-group-text w-50 text-wrap">Fatty acids, total polyunsaturated</span>
//                       <input type="text" class="form-control" name="fattyAcidsPolyunsaturated" value="${food.micronutrients.fattyAcidsPolyunsaturated}"/>
//                       <span class="input-group-text">g</span>
//                     </div>
//                     <div class="input-group">
//                       <span class="input-group-text w-50 text-wrap">Chloride</span>
//                       <input type="text" class="form-control" name="chloride" value="${food.micronutrients.chloride}"/>
//                       <span class="input-group-text">mg</span>
//                     </div>
//                   </div>

//                   <!-- Footer -->
//                   <div class="footer-btns">
//                     <button class="btn btn-outline-secondary" id="close-form">Cancel</button>
//                     <button type="submit" class="btn btn-success">Save and close</button>
//                   </div>
//                 </div>
//               </form>
//         `
//     }
//   }});
//   const pageItems = data.slice(start, end);
//   pageItems.forEach((f) => {
//     const row = `
//         <div class="border border-1 p-2 d-flex justify-content-between mb-3 card-detail-food" data-id="${f.id}">
//           <div class="d-flex flex-column">
//             <h5>${f.name}</h5>
//             <span>McCance and Widdowson's</span>
//           </div>

//           <div class="d-flex gap-5 me-5">
//             <div class="d-flex flex-column text-center">
//               <span>${f.macronutrients.energy} kcal</span>
//               <span>Eneryg</span>
//             </div>
//             <div class="d-flex flex-column text-center">
//               <span>${f.macronutrients.fat} g</span>
//               <span>Fat</span>
//             </div>
//             <div class="d-flex flex-column text-center">
//               <span>${f.macronutrients.carbohydrate} g</span>
//               <span>Carbohydrate</span>
//             </div>
//             <div class="d-flex flex-column text-center">
//               <span>${f.macronutrients.protein} g</span>
//               <span>Protein</span>
//             </div>
//           </div>
//         </div>
//     `;
//     cardFood.innerHTML += row;
//   });

//   renderPagination(data);
// }


function renderFood(data = Food) {
  const start = (currentPage - 1) * rowsPerPage;
  const end = start + rowsPerPage;

  // Render các thẻ card hiển thị food
  const pageItems = data.slice(start, end);
  cardFood.innerHTML = pageItems.map(f => `
    <div class="border border-1 p-2 d-flex justify-content-between mb-3 card-detail-food" data-id="${f.id}">
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
  `).join("");

  // Chỉ gán sự kiện 1 lần duy nhất
  if (!cardFood.dataset.bound) {
    cardFood.addEventListener("click", e => {
      const card = e.target.closest(".card-detail-food");
      if (!card || !card.dataset.id) return;

      const food = data.find(r => r.id == card.dataset.id);
      if (!food) return;

      overlay.style.display = "flex";
      formFrame.src = "./detail/detail.html";

      formFrame.onload = () => {
        const doc = formFrame.contentDocument;

        // Kiểm tra DOM đã sẵn sàng chưa
        if (!doc || !doc.getElementById('foodDetail')) return;

        // Inject HTML form
        doc.getElementById('foodDetail').innerHTML = renderFoodForm(food)
        //     `<form onsubmit="">
        //         <div>
        //           <h2 class="text-center">Food information</h2>
        //           <p class="text-center">Check and update the information about the food</p>

        //           <!-- Basic Info -->
        //           <div class="grid-2 mb-3">
        //             <div class="input-group">
        //               <span class="input-group-text w-25 text-wrap">Name</span>
        //               <input type="text" class="form-control" name="name" value="${food.name}">
        //             </div>
        //             <div class="input-group">
        //               <span class="input-group-text w-25 text-wrap">Source</span>
        //               <input type="text" class="form-control" placeholder="My foods" name="source" value="${food.source}"/>
        //             </div>
        //           </div>

        //           <div class="grid-2 mb-3">
        //             <div class="input-group">
        //               <span class="input-group-text w-25 text-wrap">Category</span>
        //               <input type="text" class="form-control" placeholder="Select the food group" name="category" value="${food.category}"/>
        //             </div>
        //             <div class="input-group">
        //               <span class="input-group-text w-25 text-wrap">Quanlity</span>
        //               <input type="number" class="form-control" value="100" />
        //               <span class="input-group-text">grams</span>
        //             </div>
        //           </div>

        //           <div class="form-title border border-1 p-2">Nutritional value per 100 g</div>

        //           <div class="section-title text-center">Macronutrients</div>
        //           <div class="grid-2 mb-3">
        //             <div class="input-group">
        //               <span class="input-group-text w-50 text-wrap">Energy</span>
        //               <input type="number" class="form-control" name="energy" value="${food.macronutrients.energy.toFixed(2)}"/>
        //               <span class="input-group-text">kcal</span>
        //             </div>
        //             <div class="input-group">
        //               <span class="input-group-text w-50 text-wrap">Fat</span>
        //               <input type="number" class="form-control" name="fat" value="${food.macronutrients.fat.toFixed(2)}"/>
        //               <span class="input-group-text">g</span>
        //             </div>
        //             <div class="input-group">
        //               <span class="input-group-text w-50 text-wrap">Carbohydrate</span>
        //               <input type="number" class="form-control" name="carbohydrate" value="${food.macronutrients.carbohydrate.toFixed(2)}"/>
        //               <span class="input-group-text">g</span>
        //             </div>
        //             <div class="input-group">
        //               <span class="input-group-text w-50 text-wrap">Protein</span>
        //               <input type="number" class="form-control" name="protein" value="${food.macronutrients.protein.toFixed(2)}"/>
        //               <span class="input-group-text">g</span>
        //             </div>
        //           </div>

        //           <div class="section-title text-center">Micronutrients</div>
        //           <div class="grid-3">
        //             <!-- Micronutrient fields -->
        //             <div class="input-group">
        //               <span class="input-group-text w-50 text-wrap">Cholesterol</span>
        //               <input type="text" class="form-control" name="cholesterol" value="${food.micronutrients.cholesterol==null?null:food.micronutrients.cholesterol.toFixed(2)}"/>
        //               <span class="input-group-text">mg</span>
        //             </div>
        //             <div class="input-group">
        //               <span class="input-group-text w-50 text-wrap">Fiber</span>
        //               <input type="text" class="form-control" name="fiber" value="${food.micronutrients.fiber==null?null:food.micronutrients.fiber.toFixed(2)}"/>
        //               <span class="input-group-text">g</span>
        //             </div>
        //             <div class="input-group">
        //               <span class="input-group-text w-50 text-wrap">Sodium</span>
        //               <input type="text" class="form-control" name="sodium" value="${food.micronutrients.sodium==null?null:food.micronutrients.sodium.toFixed(2)}"/>
        //               <span class="input-group-text">mg</span>
        //             </div>
        //             <div class="input-group">
        //               <span class="input-group-text w-50 text-wrap">Water</span>
        //               <input type="text" class="form-control" name="water" value="${food.micronutrients.water==null?null:food.micronutrients.water.toFixed(2)}"/>
        //               <span class="input-group-text">g</span>
        //             </div>
        //             <div class="input-group">
        //               <span class="input-group-text w-50 text-wrap">Vitamin A</span>
        //               <input type="text" class="form-control" name="vitaminA" value="${food.micronutrients.vitaminA==null?null:food.micronutrients.vitaminA.toFixed(2)}"/>
        //               <span class="input-group-text">ug</span>
        //             </div>
        //             <div class="input-group">
        //               <span class="input-group-text w-50 text-wrap">Vitamin B-6</span>
        //               <input type="text" class="form-control" name="vitaminB6" value="${food.micronutrients.vitaminB6==null?null:food.micronutrients.vitaminB6.toFixed(2)}"/>
        //               <span class="input-group-text">mg</span>
        //             </div>
        //             <div class="input-group">
        //               <span class="input-group-text w-50 text-wrap">Vitamin B-12</span>
        //               <input type="text" class="form-control" name="vitaminB12" value="${food.micronutrients.vitaminB12==null?null:food.micronutrients.vitaminB12.toFixed(2)}"/>
        //               <span class="input-group-text">ug</span>
        //             </div>
        //             <div class="input-group">
        //               <span class="input-group-text w-50 text-wrap">Vitamin C</span>
        //               <input type="text" class="form-control" name="vitaminC" value="${food.micronutrients.vitaminC==null?null:food.micronutrients.vitaminC.toFixed(2)}"/>
        //               <span class="input-group-text">mg</span>
        //             </div>
        //             <div class="input-group">
        //               <span class="input-group-text w-50 text-wrap">Vitamin D (D2 + D3)</span>
        //               <input type="text" class="form-control" name="vitaminD" value="${food.micronutrients.vitaminD==null?null:food.micronutrients.vitaminD.toFixed(2)}"/>
        //               <span class="input-group-text">ug</span>
        //             </div>
        //             <div class="input-group">
        //               <span class="input-group-text w-50 text-wrap">Vitamin E</span>
        //               <input type="text" class="form-control" name="vitaminE" value="${food.micronutrients.vitaminE==null?null:food.micronutrients.vitaminE.toFixed(2)}"/>
        //               <span class="input-group-text">mg</span>
        //             </div>
        //             <div class="input-group">
        //               <span class="input-group-text w-50 text-wrap">Vitamin K</span>
        //               <input type="text" class="form-control" name="vitaminK" value="${food.micronutrients.vitaminK==null?null:food.micronutrients.vitaminK.toFixed(2)}"/>
        //               <span class="input-group-text">ug</span>
        //             </div>
        //             <div class="input-group">
        //               <span class="input-group-text w-50 text-wrap">Starch</span>
        //               <input type="text" class="form-control" name="starch" value="${food.micronutrients.starch==null?null:food.micronutrients.starch.toFixed(2)}"/>
        //               <span class="input-group-text">g</span>
        //             </div>
        //             <div class="input-group">
        //               <span class="input-group-text w-50 text-wrap">Lactose</span>
        //               <input type="text" class="form-control" name="lactose" value="${food.micronutrients.lactose==null?null:food.micronutrients.lactose.toFixed(2)}"/>
        //               <span class="input-group-text">g</span>
        //             </div>
        //             <div class="input-group">
        //               <span class="input-group-text w-50 text-wrap">Alcohol</span>
        //               <input type="text" class="form-control" name="alcohol" value="${food.micronutrients.alcohol==null?null:food.micronutrients.alcohol.toFixed(2)}"/>
        //               <span class="input-group-text">g</span>
        //             </div>
        //             <div class="input-group">
        //               <span class="input-group-text w-50 text-wrap">Caffeine</span>
        //               <input type="text" class="form-control" name="caffeine" value="${food.micronutrients.caffeine==null?null:food.micronutrients.caffeine.toFixed(2)}"/>
        //               <span class="input-group-text">mg</span>
        //             </div>
        //             <div class="input-group">
        //               <span class="input-group-text w-50 text-wrap">Sugars</span>
        //               <input type="text" class="form-control" name="sugars" value="${food.micronutrients.sugars==null?null:food.micronutrients.sugars.toFixed(2)}"/>
        //               <span class="input-group-text">g</span>
        //             </div>
        //             <div class="input-group">
        //               <span class="input-group-text w-50 text-wrap">Calcium</span>
        //               <input type="text" class="form-control" name="calcium" value="${food.micronutrients.calcium==null?null:food.micronutrients.calcium.toFixed(2)}"/>
        //               <span class="input-group-text">mg</span>
        //             </div>
        //             <div class="input-group">
        //               <span class="input-group-text w-50 text-wrap">Iron</span>
        //               <input type="text" class="form-control" name="iron" value="${food.micronutrients.iron==null?null:food.micronutrients.iron.toFixed(2)}"/>
        //               <span class="input-group-text">mg</span>
        //             </div>
        //             <div class="input-group">
        //               <span class="input-group-text w-50 text-wrap">Magnesium</span>
        //               <input type="text" class="form-control" name="magnesium" value="${food.micronutrients.magnesium==null?null:food.micronutrients.magnesium.toFixed(2)}"/>
        //               <span class="input-group-text">mg</span>
        //             </div>
        //             <div class="input-group">
        //               <span class="input-group-text w-50 text-wrap">Phosphorus</span>
        //               <input type="text" class="form-control" name="phosphorus" value="${food.micronutrients.phosphorus==null?null:food.micronutrients.phosphorus.toFixed(2)}"/>
        //               <span class="input-group-text">mg</span>
        //             </div>
        //             <div class="input-group">
        //               <span class="input-group-text w-50 text-wrap">Potassium</span>
        //               <input type="text" class="form-control" name="potassium" value="${food.micronutrients.potassium==null?null:food.micronutrients.potassium.toFixed(2)}"/>
        //               <span class="input-group-text">mg</span>
        //             </div>
        //             <div class="input-group">
        //               <span class="input-group-text w-50 text-wrap">Zinc</span>
        //               <input type="text" class="form-control" name="zinc" value="${food.micronutrients.zinc==null?null:food.micronutrients.zinc.toFixed(2)}"/>
        //               <span class="input-group-text">mg</span>
        //             </div>
        //             <div class="input-group">
        //               <span class="input-group-text w-50 text-wrap">Copper</span>
        //               <input type="text" class="form-control" name="copper" value="${food.micronutrients.copper==null?null:food.micronutrients.copper.toFixed(2)}"/>
        //               <span class="input-group-text">mg</span>
        //             </div>
        //             <div class="input-group">
        //               <span class="input-group-text w-50 text-wrap">Fluoride</span>
        //               <input type="text" class="form-control" name="fluoride" value="${food.micronutrients.fluoride==null?null:food.micronutrients.fluoride.toFixed(2)}"/>
        //               <span class="input-group-text">ug</span>
        //             </div>
        //             <div class="input-group">
        //               <span class="input-group-text w-50 text-wrap">Manganese</span>
        //               <input type="text" class="form-control" name="manganese" value="${food.micronutrients.manganese==null?null:food.micronutrients.manganese.toFixed(2)}"/>
        //               <span class="input-group-text">mg</span>
        //             </div>
        //             <div class="input-group">
        //               <span class="input-group-text w-50 text-wrap">Selenium</span>
        //               <input type="text" class="form-control" name="selenium" value="${food.micronutrients.selenium==null?null:food.micronutrients.selenium.toFixed(2)}"/>
        //               <span class="input-group-text">ug</span>
        //             </div>
        //             <div class="input-group">
        //               <span class="input-group-text w-50 text-wrap">Thiamin</span>
        //               <input type="text" class="form-control" name="thiamin" value="${food.micronutrients.thiamin==null?null:food.micronutrients.thiamin.toFixed(2)}"/>
        //               <span class="input-group-text">mg</span>
        //             </div>
        //             <div class="input-group">
        //               <span class="input-group-text w-50 text-wrap">Riboflavin</span>
        //               <input type="text" class="form-control" name="riboflavin" value="${food.micronutrients.riboflavin==null?null:food.micronutrients.riboflavin.toFixed(2)}"/>
        //               <span class="input-group-text">mg</span>
        //             </div>
        //             <div class="input-group">
        //               <span class="input-group-text w-50 text-wrap">Niacin</span>
        //               <input type="text" class="form-control" name="niacin" value="${food.micronutrients.niacin==null?null:food.micronutrients.niacin.toFixed(2)}"/>
        //               <span class="input-group-text">mg</span>
        //             </div>
        //             <div class="input-group">
        //               <span class="input-group-text w-50 text-wrap">Pantothenic acid</span>
        //               <input type="text" class="form-control" name="pantothenicAcid" value="${food.micronutrients.pantothenicAcid==null?null:food.micronutrients.pantothenicAcid.toFixed(2)}"/>
        //               <span class="input-group-text">mg</span>
        //             </div>
        //             <div class="input-group">
        //               <span class="input-group-text w-50 text-wrap">Folate, total</span>
        //               <input type="text" class="form-control" name="folateTotal" value="${food.micronutrients.folateTotal==null?null:food.micronutrients.folateTotal.toFixed(2)}"/>
        //               <span class="input-group-text">ug</span>
        //             </div>
        //             <div class="input-group">
        //               <span class="input-group-text w-50 text-wrap">Folic acid</span>
        //               <input type="text" class="form-control" name="folicAcid" value="${food.micronutrients.folicAcid==null?null:food.micronutrients.folicAcid.toFixed(2)}"/>
        //               <span class="input-group-text">ug</span>
        //             </div>
        //             <div class="input-group">
        //               <span class="input-group-text w-50 text-wrap">Fatty acids, total trans</span>
        //               <input type="text" class="form-control" name="fattyAcidsTrans" value="${food.micronutrients.fattyAcidsTrans==null?null:food.micronutrients.fattyAcidsTrans.toFixed(2)}"/>
        //               <span class="input-group-text">g</span>
        //             </div>
        //             <div class="input-group">
        //               <span class="input-group-text w-50 text-wrap">Fatty acids, total saturated</span>
        //               <input type="text" class="form-control" name="fattyAcidsSaturated" value="${food.micronutrients.fattyAcidsSaturated==null?null:food.micronutrients.fattyAcidsSaturated.toFixed(2)}"/>
        //               <span class="input-group-text">g</span>
        //             </div>
        //             <div class="input-group">
        //               <span class="input-group-text w-50 text-wrap">Fatty acids, total monounsaturated</span>
        //               <input type="text" class="form-control" name="fattyAcidsMonounsaturated" value="${food.micronutrients.fattyAcidsMonounsaturated==null?null:food.micronutrients.fattyAcidsMonounsaturated.toFixed(2)}"/>
        //               <span class="input-group-text">g</span>
        //             </div>
        //             <div class="input-group">
        //               <span class="input-group-text w-50 text-wrap">Fatty acids, total polyunsaturated</span>
        //               <input type="text" class="form-control" name="fattyAcidsPolyunsaturated" value="${food.micronutrients.fattyAcidsPolyunsaturated==null?null:food.micronutrients.fattyAcidsPolyunsaturated.toFixed(2)}"/>
        //               <span class="input-group-text">g</span>
        //             </div>
        //             <div class="input-group">
        //               <span class="input-group-text w-50 text-wrap">Chloride</span>
        //               <input type="text" class="form-control" name="chloride" value="${food.micronutrients.chloride==null?null:food.micronutrients.chloride.toFixed(2)}"/>
        //               <span class="input-group-text">mg</span>
        //             </div>
        //           </div>

        //           <!-- Footer -->
        //           <div class="footer-btns">
        //             <button class="btn btn-outline-secondary" id="close-form">Cancel</button>
        //             <button type="submit" class="btn btn-success">Save and close</button>
        //           </div>
        //         </div>
        //       </form>
        // `;
      };
    });

    // Đánh dấu đã gán sự kiện click để tránh gán lại
    cardFood.dataset.bound = "true";
  }

  renderPagination(data)
}

// Hàm tạo form HTML từ 1 object food
function renderFoodForm(food) {
  const getVal = (obj, key, fallback = "") => obj?.[key] ?? fallback;
  const getMicro = key => getVal(food.micronutrients, key);
  const getMacro = key => getVal(food.macronutrients, key);

  return `
    <form>
      <div>
        <h2 class="text-center">Food information</h2>
        <p class="text-center">Check and update the information about the food</p>

        <div class="grid-2 mb-3">
          <div class="input-group">
            <span class="input-group-text w-25 text-wrap">Name</span>
            <input type="text" class="form-control" name="name" value="${food.name}">
          </div>
          <div class="input-group">
            <span class="input-group-text w-25 text-wrap">Source</span>
            <input type="text" class="form-control" name="source" value="${food.source ?? ""}">
          </div>
        </div>

        <div class="grid-2 mb-3">
          <div class="input-group">
            <span class="input-group-text w-25 text-wrap">Category</span>
            <input type="text" class="form-control" name="category" value="${food.category ?? ""}">
          </div>
          <div class="input-group">
            <span class="input-group-text w-25 text-wrap">Quanlity</span>
            <input type="number" class="form-control" value="100" />
            <span class="input-group-text">grams</span>
          </div>
        </div>

        <div class="form-title border border-1 p-2">Nutritional value per 100 g</div>

        <div class="section-title text-center">Macronutrients</div>
        <div class="grid-2 mb-3">
          ${renderMacroInput("Energy", "energy", getMacro("energy"), "kcal")}
          ${renderMacroInput("Fat", "fat", getMacro("fat"), "g")}
          ${renderMacroInput("Carbohydrate", "carbohydrate", getMacro("carbohydrate"), "g")}
          ${renderMacroInput("Protein", "protein", getMacro("protein"), "g")}
        </div>

        <div class="section-title text-center">Micronutrients</div>
        <div class="grid-3">
          ${renderMicroInput("Cholesterol", "cholesterol", getMicro("cholesterol"), "mg")}
          ${renderMicroInput("Fiber", "fiber", getMicro("fiber"), "g")}
          ${renderMicroInput("Sodium", "sodium", getMicro("sodium"), "mg")}
          ${renderMicroInput("Water", "water", getMicro("water"), "g")}
          ${renderMicroInput("Vitamin A", "vitaminA", getMicro("vitaminA"), "ug")}
          ${renderMicroInput("Vitamin B-6", "vitaminB6", getMicro("vitaminB6"), "mg")}
          ${renderMicroInput("Vitamin B-12", "vitaminB12", getMicro("vitaminB12"), "ug")}
          ${renderMicroInput("Vitamin C", "vitaminC", getMicro("vitaminC"), "mg")}
          ${renderMicroInput("Vitamin D", "vitaminD", getMicro("vitaminD"), "ug")}
          ${renderMicroInput("Vitamin E", "vitaminE", getMicro("vitaminE"), "mg")}
          ${renderMicroInput("Vitamin K", "vitaminK", getMicro("vitaminK"), "ug")}
          ${renderMicroInput("Starch", "starch", getMicro("starch"), "g")}
          ${renderMicroInput("Lactose", "lactose", getMicro("lactose"), "g")}
          ${renderMicroInput("Alcohol", "alcohol", getMicro("alcohol"), "g")}
          ${renderMicroInput("Caffeine", "caffeine", getMicro("caffeine"), "mg")}
          ${renderMicroInput("Sugars", "sugars", getMicro("sugars"), "g")}
          ${renderMicroInput("Calcium", "calcium", getMicro("calcium"), "mg")}
          ${renderMicroInput("Iron", "iron", getMicro("iron"), "mg")}
          ${renderMicroInput("Magnesium", "magnesium", getMicro("magnesium"), "mg")}
          ${renderMicroInput("Phosphorus", "phosphorus", getMicro("phosphorus"), "mg")}
          ${renderMicroInput("Potassium", "potassium", getMicro("potassium"), "mg")}
          ${renderMicroInput("Zinc", "zinc", getMicro("zinc"), "mg")}
          ${renderMicroInput("Copper", "copper", getMicro("copper"), "mg")}
          ${renderMicroInput("Fluoride", "fluoride", getMicro("fluoride"), "ug")}
          ${renderMicroInput("Manganese", "manganese", getMicro("manganese"), "mg")}
          ${renderMicroInput("Selenium", "selenium", getMicro("selenium"), "ug")}
          ${renderMicroInput("Thiamin", "thiamin", getMicro("thiamin"), "mg")}
          ${renderMicroInput("Riboflavin", "riboflavin", getMicro("riboflavin"), "mg")}
          ${renderMicroInput("Niacin", "niacin", getMicro("niacin"), "mg")}
          ${renderMicroInput("Pantothenic acid", "pantothenicAcid", getMicro("pantothenicAcid"), "mg")}
          ${renderMicroInput("Folate, total", "folateTotal", getMicro("folateTotal"), "ug")}
          ${renderMicroInput("Folic acid", "folicAcid", getMicro("folicAcid"), "ug")}
          ${renderMicroInput("Fatty acids, total trans", "fattyAcidsTrans", getMicro("fattyAcidsTrans"), "g")}
          ${renderMicroInput("Fatty acids, total saturated", "fattyAcidsSaturated", getMicro("fattyAcidsSaturated"), "g")}
          ${renderMicroInput("Fatty acids, total monounsaturated", "fattyAcidsMonounsaturated", getMicro("fattyAcidsMonounsaturated"), "g")}
          ${renderMicroInput("Fatty acids, total polyunsaturated", "fattyAcidsPolyunsaturated", getMicro("fattyAcidsPolyunsaturated"), "g")}
          ${renderMicroInput("Chloride", "chloride", getMicro("chloride"), "mg")}
        </div>

        <div class="footer-btns">
          <button class="btn btn-outline-secondary" id="close-form">Cancel</button>
          <button type="submit" class="btn btn-success">Save and close</button>
        </div>
      </div>
    </form>
  `;
}

// Helper để render ô input
function renderMicroInput(label, name, value, unit) {
  return `
    <div class="input-group">
      <span class="input-group-text w-50 text-wrap">${label}</span>
      <input type="text" class="form-control" name="${name}" value="${value ?? ""}" />
      <span class="input-group-text">${unit}</span>
    </div>
  `;
}

function renderMacroInput(label, name, value, unit) {
  return renderMicroInput(label, name, value, unit);
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

// Khởi tạo lần đầu
renderFood();

function addNewFood(e) {
  e.preventDefault();
  let formFoodEl = e.target;
  let data = getFormData(formFoodEl);
  if (validateForm(data)) {
    alert("Thông tin đã nhập vào đầy đủ");
  }
  Food.push(data);
  saveDataToLocal("Food", Food);
  alert("Thêm thành công");
}

function filterFood(keyword) {
  const filtered = Food.filter((food) => food.name.toLowerCase().includes(keyword.toLowerCase()));
  renderFood(filtered);
}

document.getElementById("searchFood").addEventListener("input", function () {
  const keyword = this.value;
  filterFood(keyword);
});

// sắp xếp theo nutrient

let sortCategoryFood = document.getElementById("sortCategoryFood");

sortCategoryFood.addEventListener("click", () => {
  let sortFoods = [...Food];
  const value = document.querySelectorAll("select")[0].value;
  if (value === "Energy") {
    sortFoods.sort((a, b) => a.macronutrients.energy - b.macronutrients.energy); // Sử dụng toán tử trừ để so sánh số
  } else if (value === "Fat") {
    sortFoods.sort((a, b) => a.macronutrients.fat - b.macronutrients.fat); // Sử dụng toán tử trừ để so sánh số
  } else if (value === "Carbohydrate") {
    sortFoods.sort((a, b) => a.macronutrients.carbohydrate - b.macronutrients.carbohydrate); // Sử dụng toán tử trừ để so sánh số
  } else if (value === "Protein") {
    sortFoods.sort((a, b) => a.macronutrients.protein - b.macronutrients.protein); // Sử dụng toán tử trừ để so sánh số
  }
  renderFood(sortFoods);
});

// tìm kiếm theo thẻ loại

const categoryFood = document.getElementById("categoryFood");

categoryFood.addEventListener("change", function () {
  const value = this.value;
  const filtered =
    value === ""
      ? Food
      : Food.filter((food) => {
          const categoryNames = food.category;
          // so sánh với value đã chọn (cũng lowercase)
          return categoryNames.includes(value.toLowerCase());
        });

  renderFood(filtered);
});

// form
const openBtn = document.getElementById("openFormBtn");
const overlay = document.getElementById("overlay");
const closeOverlay = document.getElementById("closeOverlay");
const formFrame = document.getElementById("formFrame");

openBtn.addEventListener("click", () => {
  // đổ src và show overlay
  formFrame.src = "./form/form.html";
  overlay.style.display = "flex";
});

closeOverlay.addEventListener("click", () => {
  overlay.style.display = "none";
  formFrame.src = ""; // reset nếu muốn
});

// click ngoài khung form cũng đóng
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.style.display = "none";
    formFrame.src = "";
  }
});


