// Người dùng
let userList = [
    {
      id: 1,
      email: "alice@example.com",
      username: "alice",
      password: "hashed_password_1",
    },
    {
      id: 2,
      email: "bob@example.com",
      username: "bob",
      password: "hashed_password_2",
    },
    {
      id: 3,
      email: "charlie@example.com",
      username: "charlie",
      password: "hashed_password_3",
    },
    {
      id: 4,
      email: "david@example.com",
      username: "david",
      password: "hashed_password_4",
    },
    {
      id: 5,
      email: "eva@example.com",
      username: "eva",
      password: "hashed_password_5",
    },
  ];
  
  // Công thức
  let Recipe = [
    {
      id: 1,
      coverSrc: "https://nutriumstorageaccount.blob.core.windows.net/rails-active-storage/6qim5uox87nr22st617nzt8",
      name: "Turmeric Roasted Cauliflower Salad (lowfodmap)",
      description: "Our roasted cauliflower salad with turmeric is low in calories and packed with punchy flavor.",
      author: "Joana Jardim",
      totalTime: "00:40",
      preparationTime: "00:40",
      finalWeight: "978.8 grams",
      portions: 4,
      ingredients: ["food {}, food_02 {}... ---> Lấy từ thư viện food"],
      cookingMethods: [
        {
          id: 1,
          content: "STEP 1 Heat the oven to 200C/fan 180C/gas 6. Put the cauliflower in an ovenproof dish or tin,",
        },
      ],
      category: [
        {
          id: 1,
          name: "vegeterian",
        },
        {
          id: 2,
          name: "appetizer",
        },
      ],
    },
  ];
  
  //
  Food = [
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
        zinc: 0.6,
        vitaminE: 2.4,
        vitaminA: null,
        vitaminD: null,
        vitaminC: 30.0,
        vitaminB12: 0.0,
        vitaminB6: 0.8,
        vitaminB2: 0.0,
        vitaminB1: 0.0,
        vitaminK: null,
        vitaminB3: null,
        vitaminB5: null,
        alcohol: null,
        caffeine: null,
        calcium: 35.0,
        iron: 5.0,
        magnesium: 40.0,
        potassium: 270.0,
        phosphorus: 47.0,
        copper: 0.2,
        fluoride: null,
        iodine: null,
        manganese: null,
        selenium: 0.83,
        riboflavin: 0.07,
        niacin: 0.6,
        pantothenicAcid: null,
        folateTotal: 41.0,
        folicAcid: 0.0,
        fattyAcidsTrans: 0.0,
        fattyAcidsSaturated: null,
        fattyAcidsMonounsaturated: null,
        fattyAcidsPolyunsaturated: null,
        chloride: 340.0,
      },
    },
  ]
  
  // Thể loại món ăn
  let category=[
      {
        "id": 1,
        "name": "vegeterian",
        "description": "Dishes that do not include meat, fish, or poultry, suitable for vegetarians."
      },
      {
        "id": 2,
        "name": "appetizer",
        "description": "Small dishes served before the main course to stimulate the appetite."
      },
      {
        "id": 3,
        "name": "vegan",
        "description": "Plant-based recipes with no animal products, including dairy and eggs."
      },
      {
        "id": 4,
        "name": "main course",
        "description": "The main dish in a meal, often more substantial and filling."
      },
      {
        "id": 5,
        "name": "dessert",
        "description": "Sweet dishes typically served at the end of a meal."
      },
      {
        "id": 6,
        "name": "low-carb",
        "description": "Recipes with reduced carbohydrate content, often for weight or sugar control."
      },
      {
        "id": 7,
        "name": "gluten-free",
        "description": "Meals made without gluten, suitable for those with gluten intolerance or celiac disease."
      },
      {
        "id": 8,
        "name": "breakfast",
        "description": "Recipes designed for the first meal of the day."
      },
      {
        "id": 9,
        "name": "salad",
        "description": "Cold or warm dishes primarily composed of vegetables, fruits, and dressings."
      },
      {
        "id": 10,
        "name": "soup",
        "description": "Liquid-based dishes, either hot or cold, made with a variety of ingredients."
      }
    ]