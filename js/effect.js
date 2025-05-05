function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const content = document.getElementById("content");
  const sidebarToggleText = document.getElementById("sidebarToggleText");
  const tool = document.getElementById("tool");
  const logo = document.getElementById("btn-logo");
  const menuToggle = document.querySelector(".menu-toggle"); // ✅ sửa đúng
  const navHome = document.querySelector(".nav-home");
  const navFood = document.querySelector(".nav-food");
  const navRecipe = document.querySelector(".nav-recipe");
  sidebar.classList.toggle("collapsed");
  content.classList.toggle("expanded");
  

  if (sidebar.classList.contains("collapsed")) {
    sidebarToggleText.classList.remove("d-none");
    tool.classList.remove("d-none");
    menuToggle.classList.add("d-none");
    logo.classList.remove("d-none");
    navHome.style.marginLeft = "0";
    navFood.style.marginLeft = "0";
    navRecipe.style.marginLeft = "0";
  } else {
    sidebarToggleText.classList.add("d-none");
    tool.classList.add("d-none");
    menuToggle.classList.remove("d-none");
    logo.classList.add("d-none"); // ✅ sửa đúng chỗ này
    navHome.style.marginLeft = "250px";
    navFood.style.marginLeft = "250px";
    navRecipe.style.marginLeft = "250px";
    // menuNav.style.padding
  }
}

// Active navigation link
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navLinks.forEach((item) => item.classList.remove("active"));
    this.classList.add("active");
  });
});

// ảnh động
const recipes = [
  {
    type: "Special Recipes",
    name: "Pan-Seared Salmon with Roasted Vegetables",
    description:
      "The vibrant colors and rich flavors make it a healthy yet indulgent meal, perfect for any gourmet occasion.",
    imageUrl: "./img/istockphoto-1165399909-612x612.webp",
  },
  {
    type: "Chef's Favorites",
    name: "Spaghetti Carbonara",
    description:
      "A classic Italian pasta dish with crispy pancetta, egg yolks, and Parmesan cheese for a creamy, indulgent experience.",
    imageUrl: "./img/istockphoto-1388791676-612x612.webp",
  },
  {
    type: "Dessert Collection",
    name: "Chocolate Fondant",
    description: "Decadent chocolate cake with a warm, flowing center served with a scoop of vanilla ice cream.",
    imageUrl: "./img/photo-1552166539-3237229859a4.avif",
  },
  {
    type: "Quick Meals",
    name: "Thai Green Curry",
    description: "A fragrant and spicy curry with coconut milk, fresh vegetables, and your choice of protein.",
    imageUrl: "./img/photo-1554502078-ef0fc409efce.avif",
  },
  {
    type: "Quick Meals",
    name: "Teriyaki Chicken Bowl",
    description: "Juicy chicken glazed with sweet teriyaki sauce served over steamed rice with stir-fried vegetables.",
    imageUrl: "./img/photo-1414235077428-338989a2e8c0.avif",
  },
  {
    type: "Special Recipes",
    name: "Mediterranean Lamb Kebabs",
    description:
      "Tender marinated lamb skewers with bell peppers and red onions, served with tzatziki sauce and warm pita bread.",
    imageUrl: "./img/premium_photo-1661432501995-2612dfa06f60.avif",
  },
  {
    type: "Chef's Favorites",
    name: "Truffle Mushroom Risotto",
    description:
      "Creamy Arborio rice slowly cooked with porcini mushrooms, finished with black truffle oil and aged Parmesan.",
    imageUrl: "./img/premium_photo-1679503585289-c02467981894.avif",
  },
  {
    type: "Dessert Collection",
    name: "Salted Caramel Cheesecake",
    description:
      "Rich cream cheese base with a buttery graham cracker crust, topped with homemade salted caramel sauce.",
    imageUrl: "./img/premium_photo-1687089577128-1e06cb71bc96.avif",
  },
  {
    type: "Breakfast Options",
    name: "Avocado Toast with Poached Eggs",
    description: "Rustic sourdough bread topped with smashed avocado, perfectly poached eggs, and red pepper flakes.",
    imageUrl: "./img/premium_photo-1733342490269-4eb4d00be07e.avif",
  },
  {
    type: "Healthy Choices",
    name: "Quinoa Buddha Bowl",
    description:
      "Protein-rich quinoa with roasted sweet potatoes, kale, chickpeas, and tahini dressing for a nutritious meal.",
    imageUrl: "./img/photo-1648187843394-13b241481dad.avif",
  },
];

let currentIndex = 0;
const recipeType = document.getElementById("recipeType");
const recipeName = document.getElementById("recipeName");
const recipeDescription = document.getElementById("recipeDescription");
const slideshowContainer = document.querySelector(".slideshow-container");
const titleDiv = document.querySelector(".title");
let slideshowInterval;
let isPaused = false;

// Tạo các phần tử hình ảnh trước
recipes.forEach((recipe, index) => {
  const img = document.createElement("img");
  img.src = recipe.imageUrl;
  img.alt = recipe.name;
  img.className = "slideshow-image";
  if (index === 0) img.classList.add("active");
  slideshowContainer.appendChild(img);
});

const images = document.querySelectorAll(".slideshow-image");

function showRecipe(index) {
  // Hide current text with animation
  recipeType.style.opacity = "0";
  recipeName.style.opacity = "0";
  recipeDescription.style.opacity = "0";

  // Hide current image
  images.forEach((img) => img.classList.remove("active"));

  setTimeout(() => {
    // Update text content
    recipeType.textContent = recipes[index].type;
    recipeName.textContent = recipes[index].name;
    recipeDescription.textContent = recipes[index].description;

    // Show text with animation
    recipeType.classList.remove("text-animated");
    recipeName.classList.remove("text-animated");
    recipeDescription.classList.remove("text-animated");

    void recipeType.offsetWidth; // Trigger reflow
    void recipeName.offsetWidth;
    void recipeDescription.offsetWidth;

    recipeType.classList.add("text-animated");
    recipeName.classList.add("text-animated");
    recipeDescription.classList.add("text-animated");

    recipeType.style.opacity = "1";
    recipeName.style.opacity = "1";
    recipeDescription.style.opacity = "1";

    // Show new image with fade effect
    images[index].classList.add("active");
  }, 400);
}

// Hàm để bắt đầu slideshow
function startSlideshow() {
  slideshowInterval = setInterval(() => {
    if (!isPaused) {
      currentIndex = (currentIndex + 1) % recipes.length;
      showRecipe(currentIndex);
    }
  }, 3000);
}

// Thêm sự kiện hover để dừng/tiếp tục slideshow
const recipeContainer = document.querySelector(".title");

const pauseIndicator = document.querySelector(".paused-indicator");

recipeContainer.addEventListener("mouseenter", () => {
  isPaused = true;
  // Thêm dấu hiệu trực quan khi slideshow đang tạm dừng
  slideshowContainer.style.boxShadow = "0 0 0 3px #f8e9b8, 0 4px 12px rgba(0, 0, 0, 0.3)";
  pauseIndicator.classList.add("active");
});

recipeContainer.addEventListener("mouseleave", () => {
  isPaused = false;
  // Loại bỏ dấu hiệu trực quan
  slideshowContainer.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.3)";
  pauseIndicator.classList.remove("active");
});

// Thêm nút điều khiển thủ công (tùy chọn)
function createNavButtons() {
  const prevButton = document.createElement("button");
  const nextButton = document.createElement("button");

  prevButton.innerHTML = "&#10094;";
  nextButton.innerHTML = "&#10095;";

  prevButton.classList.add("nav-btn", "prev");
  nextButton.classList.add("nav-btn", "next");

  slideshowContainer.appendChild(prevButton);
  slideshowContainer.appendChild(nextButton);

  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + recipes.length) % recipes.length;
    showRecipe(currentIndex);
  });

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % recipes.length;
    showRecipe(currentIndex);
  });
}

// Khởi tạo slideshow và các điều khiển
startSlideshow();
createNavButtons();

const imagesbg = [
  "../img/67bc4717833ea4680fcafc3b_img_vgQO.webp",
  "./img/67bc3074ecafdc204d436891_couple_dining.jpg",
  "./img/67bc41c08d8e1b551eed051a_img_h7Y4.webp",
  "./img/67bc3074ecafdc204d436966_A_wine_menu2.webp",

];

function setRandomBackground() {
  const banner = document.getElementById("animation");
  const randomIndex = Math.floor(Math.random() * imagesbg.length);
  banner.style.backgroundImage = `url("${imagesbg[randomIndex]}")`;
}

setRandomBackground();
