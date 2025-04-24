// Công thức
const Recipe = [
  {
    "id": 1,
    "coverSrc": "https://example.com/images/recipe1.jpg",
    "name": "Grilled Tofu Skewers",
    "description": "Tofu skewers marinated in herbs and grilled to perfection.",
    "author": "Minh Cuong Tran",
    "totalTime": "00:30",
    "preparationTime": "00:15",
    "finalWeight": "500 grams",
    "portions": 2,
    "ingredients": [Food[10]],
    "cookingMethods": [
      { "id": 1, "content": "STEP 1: Marinate the tofu with herbs and spices for 15 minutes." },
      { "id": 2, "content": "STEP 2: Grill the tofu on skewers until golden brown." }
    ],
    "category": [{ "id": 3 }, { "id": 4 }]
  },
  {
    "id": 2,
    "coverSrc": "https://example.com/images/recipe2.jpg",
    "name": "Chickpea Curry",
    "description": "A hearty vegan chickpea curry with rich spices.",
    "author": "Nguyen Bao Anh",
    "totalTime": "00:45",
    "preparationTime": "00:20",
    "finalWeight": "800 grams",
    "portions": 4,
    "ingredients": [Food[1]],
    "cookingMethods": [
      { "id": 1, "content": "STEP 1: Saute onion and garlic in a pot." },
      { "id": 2, "content": "STEP 2: Add chickpeas and spices, simmer for 25 minutes." }
    ],
    "category": [{ "id": 1 }, { "id": 5 }]
  },
  {
    "id": 3,
    "coverSrc": "https://example.com/images/recipe3.jpg",
    "name": "Avocado Toast Deluxe",
    "description": "Creamy avocado spread on toasted bread with toppings.",
    "author": "Linh Nguyen",
    "totalTime": "00:10",
    "preparationTime": "00:10",
    "finalWeight": "250 grams",
    "portions": 1,
    "ingredients": [Food[16]],
    "cookingMethods": [
      { "id": 1, "content": "STEP 1: Toast the bread slices." },
      { "id": 2, "content": "STEP 2: Mash avocado and spread evenly." }
    ],
    "category": [{ "id": 8 }, { "id": 9 }]
  },
  {
    "id": 4,
    "coverSrc": "https://example.com/images/recipe4.jpg",
    "name": "Mango Chia Pudding",
    "description": "A sweet, creamy pudding made from chia seeds and fresh mango.",
    "author": "Tran Quoc Huy",
    "totalTime": "00:20",
    "preparationTime": "00:10",
    "finalWeight": "400 grams",
    "portions": 2,
    "ingredients": [Food[11]],
    "cookingMethods": [
      { "id": 1, "content": "STEP 1: Blend mango and mix with chia and almond milk." },
      { "id": 2, "content": "STEP 2: Chill in fridge for 10 minutes before serving." }
    ],
    "category": [{ "id": 5 }, { "id": 7 }]
  },
  {
    "id": 5,
    "coverSrc": "https://example.com/images/recipe5.jpg",
    "name": "Baked Sweet Potato Fries",
    "description": "Healthy baked fries made with sweet potatoes and seasoning.",
    "author": "Dang Thanh Tam",
    "totalTime": "00:35",
    "preparationTime": "00:15",
    "finalWeight": "600 grams",
    "portions": 3,
    "ingredients": [Food[15]],
    "cookingMethods": [
      { "id": 1, "content": "STEP 1: Cut sweet potatoes into thin strips." },
      { "id": 2, "content": "STEP 2: Bake with olive oil and seasoning at 200°C for 20 minutes." }
    ],
    "category": [{ "id": 6 }, { "id": 2 }]
  },
  {
    "id": 6,
    "coverSrc": "https://example.com/images/recipe6.jpg",
    "name": "Lentil Soup",
    "description": "A warm, hearty soup packed with lentils and vegetables.",
    "author": "Nguyen Thi Mai",
    "totalTime": "00:50",
    "preparationTime": "00:15",
    "finalWeight": "900 grams",
    "portions": 4,
    "ingredients": [Food[14]],
    "cookingMethods": [
      { "id": 1, "content": "STEP 1: Simmer lentils with diced vegetables in vegetable broth." }
    ],
    "category": [{ "id": 10 }, { "id": 1 }]
  },
  {
    "id": 7,
    "coverSrc": "https://example.com/images/recipe7.jpg",
    "name": "Spinach Mushroom Omelette",
    "description": "A protein-rich omelette filled with spinach and mushrooms.",
    "author": "Vo Thi Kim Oanh",
    "totalTime": "00:15",
    "preparationTime": "00:10",
    "finalWeight": "350 grams",
    "portions": 1,
    "ingredients": [Food[9]],
    "cookingMethods": [
      { "id": 1, "content": "STEP 1: Whisk eggs, add spinach and mushrooms, then cook in a pan." }
    ],
    "category": [{ "id": 8 }, { "id": 6 }]
  },
  {
    "id": 8,
    "coverSrc": "https://example.com/images/recipe8.jpg",
    "name": "Quinoa Salad with Avocado",
    "description": "A fresh salad combining quinoa, avocado, and a zesty lemon dressing.",
    "author": "Pham Tuan Anh",
    "totalTime": "00:25",
    "preparationTime": "00:20",
    "finalWeight": "450 grams",
    "portions": 2,
    "ingredients": [Food[7]],
    "cookingMethods": [
      { "id": 1, "content": "STEP 1: Cook quinoa and let cool." },
      { "id": 2, "content": "STEP 2: Mix with avocado, lemon, and herbs." }
    ],
    "category": [{ "id": 9 }, { "id": 3 }]
  },
  {
    "id": 9,
    "coverSrc": "https://example.com/images/recipe9.jpg",
    "name": "Coconut Milk Rice Pudding",
    "description": "Creamy rice pudding with a tropical coconut flavor.",
    "author": "Le Thi Thao",
    "totalTime": "00:40",
    "preparationTime": "00:10",
    "finalWeight": "600 grams",
    "portions": 3,
    "ingredients": [Food[12]],
    "cookingMethods": [
      { "id": 1, "content": "STEP 1: Simmer rice in coconut milk and sugar until soft." }
    ],
    "category": [{ "id": 5 }, { "id": 7 }]
  },
  {
    "id": 10,
    "coverSrc": "https://example.com/images/recipe10.jpg",
    "name": "Tofu Stir-Fry with Broccoli",
    "description": "Quick stir-fry dish with tofu and crunchy broccoli.",
    "author": "Hoang Minh Tuan",
    "totalTime": "00:20",
    "preparationTime": "00:10",
    "finalWeight": "500 grams",
    "portions": 2,
    "ingredients": [Food[6]],
    "cookingMethods": [
      { "id": 1, "content": "STEP 1: Stir-fry tofu until golden then add broccoli and sauce." }
    ],
    "category": [{ "id": 1 }, { "id": 4 }]
  },
  {
    "id": 11,
    "coverSrc": "https://example.com/images/recipe11.jpg",
    "name": "Zucchini Noodles with Tomato Sauce",
    "description": "Low-carb alternative to pasta with fresh tomato sauce.",
    "author": "Nguyen Van Hieu",
    "totalTime": "00:30",
    "preparationTime": "00:15",
    "finalWeight": "400 grams",
    "portions": 2,
    "ingredients": [Food[2]],
    "cookingMethods": [
      { "id": 1, "content": "STEP 1: Spiralize zucchini and sauté lightly." },
      { "id": 2, "content": "STEP 2: Add tomato sauce and simmer briefly." }
    ],
    "category": [{ "id": 6 }, { "id": 10 }]
  },
  {
    "id": 12,
    "coverSrc": "https://example.com/images/recipe12.jpg",
    "name": "Roasted Beet Salad",
    "description": "Colorful salad with roasted beets and fresh greens.",
    "author": "Phan Thi Lan",
    "totalTime": "00:35",
    "preparationTime": "00:20",
    "finalWeight": "500 grams",
    "portions": 2,
    "ingredients": [Food[20]],
    "cookingMethods": [
      { "id": 1, "content": "STEP 1: Roast beets until tender and toss with greens." }
    ],
    "category": [{ "id": 9 }, { "id": 2 }]
  },
  {
    "id": 13,
    "coverSrc": "https://example.com/images/recipe13.jpg",
    "name": "Vegetarian Sushi Rolls",
    "description": "Sushi rolls filled with vegetables and sticky rice.",
    "author": "Dang Quang Huy",
    "totalTime": "00:50",
    "preparationTime": "00:30",
    "finalWeight": "600 grams",
    "portions": 3,
    "ingredients": [Food[4]],
    "cookingMethods": [
      { "id": 1, "content": "STEP 1: Prepare sushi rice and slice vegetables." },
      { "id": 2, "content": "STEP 2: Roll with seaweed and cut into pieces." }
    ],
    "category": [{ "id": 1 }, { "id": 4 }]
  },
  {
    "id": 14,
    "coverSrc": "https://example.com/images/recipe14.jpg",
    "name": "Cucumber Mint Smoothie",
    "description": "A refreshing smoothie with cucumber, mint, and lime.",
    "author": "Vo Thi Thu Ha",
    "totalTime": "00:10",
    "preparationTime": "00:10",
    "finalWeight": "400 grams",
    "portions": 2,
    "ingredients": [Food[5]],
    "cookingMethods": [
      { "id": 1, "content": "STEP 1: Blend cucumber, mint, lime, and ice together." }
    ],
    "category": [{ "id": 8 }, { "id": 7 }]
  },
  {
    "id": 15,
    "coverSrc": "https://example.com/images/recipe15.jpg",
    "name": "Stuffed Bell Peppers",
    "description": "Baked bell peppers stuffed with rice and vegetables.",
    "author": "Le Van Long",
    "totalTime": "00:55",
    "preparationTime": "00:25",
    "finalWeight": "750 grams",
    "portions": 4,
    "ingredients": [Food[0]],
    "cookingMethods": [
      { "id": 1, "content": "STEP 1: Mix filling and stuff into peppers." },
      { "id": 2, "content": "STEP 2: Bake until peppers are tender." }
    ],
    "category": [{ "id": 2 }, { "id": 3 }]
  }
]
