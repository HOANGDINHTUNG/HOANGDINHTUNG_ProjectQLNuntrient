// Công thức
let Recipe = [
  {
    "id": 1,
    "coverSrc": "/img/photo-1432139555190-58524dae6a55.avif",
    "name": "Grilled Tofu Skewers",
    "description": "Tofu skewers marinated in herbs and grilled to perfection.",
    "author": "Minh Cuong Tran",
    "totalTime": "00:30",
    "preparationTime": "00:15",
    "finalWeight": "500",
    "portions": 2,
    "ingredients": [Food[10]],
    "cookingMethods": [
      { "id": 1, "content": "STEP 1: Marinate the tofu with herbs and spices for 15 minutes." },
      { "id": 2, "content": "STEP 2: Grill the tofu on skewers until golden brown." },
      { "id": 3, "content": "STEP 3: Brush the tofu with a light layer of oil before grilling." },
      { "id": 4, "content": "STEP 4: Rotate the skewers occasionally to ensure even cooking." },
      { "id": 5, "content": "STEP 5: Remove from heat when tofu is crispy on the outside." },
      { "id": 6, "content": "STEP 6: Garnish with fresh herbs and serve with dipping sauce." }
    ],
    "category": [{ "id": 3 }, { "id": 4 }]
  },
  {
    "id": 2,
    "coverSrc": "/img/photo-1447078806655-40579c2520d6.avif",
    "name": "Chickpea Curry",
    "description": "A hearty vegan chickpea curry with rich spices.",
    "author": "Nguyen Bao Anh",
    "totalTime": "00:45",
    "preparationTime": "00:20",
    "finalWeight": "800",
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
    "coverSrc": "/img/photo-1465014925804-7b9ede58d0d7.avif",
    "name": "Avocado Toast Deluxe",
    "description": "Creamy avocado spread on toasted bread with toppings.",
    "author": "Linh Nguyen",
    "totalTime": "00:10",
    "preparationTime": "00:10",
    "finalWeight": "250",
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
    "coverSrc": "/img/photo-1504754524776-8f4f37790ca0.avif",
    "name": "Mango Chia Pudding",
    "description": "A sweet, creamy pudding made from chia seeds and fresh mango.",
    "author": "Tran Quoc Huy",
    "totalTime": "00:20",
    "preparationTime": "00:10",
    "finalWeight": "400",
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
    "coverSrc": "/img/photo-1516100882582-96c3a05fe590.avif",
    "name": "Baked Sweet Potato Fries",
    "description": "Healthy baked fries made with sweet potatoes and seasoning.",
    "author": "Dang Thanh Tam",
    "totalTime": "00:35",
    "preparationTime": "00:15",
    "finalWeight": "600",
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
    "coverSrc": "/img/photo-1520218508822-998633d997e6.avif",
    "name": "Lentil Soup",
    "description": "A warm, hearty soup packed with lentils and vegetables.",
    "author": "Nguyen Thi Mai",
    "totalTime": "00:50",
    "preparationTime": "00:15",
    "finalWeight": "900",
    "portions": 4,
    "ingredients": [Food[14]],
    "cookingMethods": [
      { "id": 1, "content": "STEP 1: Simmer lentils with diced vegetables in vegetable broth." }
    ],
    "category": [{ "id": 10 }, { "id": 1 }]
  },
  {
    "id": 7,
    "coverSrc": "/img/photo-1522666257812-173fdc2d11fe.avif",
    "name": "Spinach Mushroom Omelette",
    "description": "A protein-rich omelette filled with spinach and mushrooms.",
    "author": "Vo Thi Kim Oanh",
    "totalTime": "00:15",
    "preparationTime": "00:10",
    "finalWeight": "350",
    "portions": 1,
    "ingredients": [Food[9]],
    "cookingMethods": [
      { "id": 1, "content": "STEP 1: Whisk eggs, add spinach and mushrooms, then cook in a pan." }
    ],
    "category": [{ "id": 8 }, { "id": 6 }]
  },
  {
    "id": 8,
    "coverSrc": "/img/photo-1540189549336-e6e99c3679fe.avif",
    "name": "Quinoa Salad with Avocado",
    "description": "A fresh salad combining quinoa, avocado, and a zesty lemon dressing.",
    "author": "Pham Tuan Anh",
    "totalTime": "00:25",
    "preparationTime": "00:20",
    "finalWeight": "450",
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
    "coverSrc": "/img/photo-1555939594-58d7cb561ad1.avif",
    "name": "Coconut Milk Rice Pudding",
    "description": "Creamy rice pudding with a tropical coconut flavor.",
    "author": "Le Thi Thao",
    "totalTime": "00:40",
    "preparationTime": "00:10",
    "finalWeight": "600",
    "portions": 3,
    "ingredients": [Food[12]],
    "cookingMethods": [
      { "id": 1, "content": "STEP 1: Simmer rice in coconut milk and sugar until soft." }
    ],
    "category": [{ "id": 5 }, { "id": 7 }]
  },
  {
    "id": 10,
    "coverSrc": "/img/photo-1559054663-e8d23213f55c.avif",
    "name": "Tofu Stir-Fry with Broccoli",
    "description": "Quick stir-fry dish with tofu and crunchy broccoli.",
    "author": "Hoang Minh Tuan",
    "totalTime": "00:20",
    "preparationTime": "00:10",
    "finalWeight": "500",
    "portions": 2,
    "ingredients": [Food[6]],
    "cookingMethods": [
      { "id": 1, "content": "STEP 1: Stir-fry tofu until golden then add broccoli and sauce." }
    ],
    "category": [{ "id": 1 }, { "id": 4 }]
  },
  {
    "id": 11,
    "coverSrc": "/img/photo-1559742811-822873691df8.avif",
    "name": "Zucchini Noodles with Tomato Sauce",
    "description": "Low-carb alternative to pasta with fresh tomato sauce.",
    "author": "Nguyen Van Hieu",
    "totalTime": "00:30",
    "preparationTime": "00:15",
    "finalWeight": "400",
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
    "coverSrc": "/img/photo-1562967916-eb82221dfb92.avif",
    "name": "Roasted Beet Salad",
    "description": "Colorful salad with roasted beets and fresh greens.",
    "author": "Phan Thi Lan",
    "totalTime": "00:35",
    "preparationTime": "00:20",
    "finalWeight": "500",
    "portions": 2,
    "ingredients": [Food[20]],
    "cookingMethods": [
      { "id": 1, "content": "STEP 1: Roast beets until tender and toss with greens." }
    ],
    "category": [{ "id": 9 }, { "id": 2 }]
  },
  {
    "id": 13,
    "coverSrc": "/img/photo-1569718212165-3a8278d5f624.avif",
    "name": "Vegetarian Sushi Rolls",
    "description": "Sushi rolls filled with vegetables and sticky rice.",
    "author": "Dang Quang Huy",
    "totalTime": "00:50",
    "preparationTime": "00:30",
    "finalWeight": "600",
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
    "coverSrc": "/img/photo-1580959375944-abd7e991f971.avif",
    "name": "Cucumber Mint Smoothie",
    "description": "A refreshing smoothie with cucumber, mint, and lime.",
    "author": "Vo Thi Thu Ha",
    "totalTime": "00:10",
    "preparationTime": "00:10",
    "finalWeight": "400",
    "portions": 2,
    "ingredients": [Food[5]],
    "cookingMethods": [
      { "id": 1, "content": "STEP 1: Blend cucumber, mint, lime, and ice together." }
    ],
    "category": [{ "id": 8 }, { "id": 7 }]
  },
  {
    "id": 15,
    "coverSrc": "/img/photo-1744116432662-dbe90acb4a63.avif",
    "name": "Stuffed Bell Peppers",
    "description": "Baked bell peppers stuffed with rice and vegetables.",
    "author": "Le Van Long",
    "totalTime": "00:55",
    "preparationTime": "00:25",
    "finalWeight": "750",
    "portions": 4,
    "ingredients": [Food[0]],
    "cookingMethods": [
      { "id": 1, "content": "STEP 1: Mix filling and stuff into peppers." },
      { "id": 2, "content": "STEP 2: Bake until peppers are tender." }
    ],
    "category": [{ "id": 2 }, { "id": 3 }]
  }
]
