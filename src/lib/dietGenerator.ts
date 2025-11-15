interface UserData {
  weight?: number;
  energyLevel?: number;
  preference: string;
  activityLevel?: string;
  symptoms?: {
    acne?: number;
    cramps?: number;
    hairFall?: number;
  };
}

export function generateDietPlan(userData: UserData) {
  const { weight, energyLevel = 5, preference, activityLevel = 'moderate', symptoms } = userData;
  
  let breakfast = "";
  let lunch = "";
  let dinner = "";
  let snacks = "";
  let foodsToInclude: string[] = [];
  let foodsToAvoid: string[] = [];
  let hydration = "";

  // Base foods to include for PCOS
  foodsToInclude = [
    "Leafy greens (spinach, kale)",
    "Berries (blueberries, strawberries)",
    "Fatty fish (salmon, mackerel)",
    "Nuts and seeds (almonds, flaxseeds, chia)",
    "Whole grains (quinoa, brown rice)",
    "Legumes (lentils, chickpeas)",
    "Avocado",
    "Green tea"
  ];

  // Base foods to avoid for PCOS
  foodsToAvoid = [
    "Refined carbs (white bread, pastries)",
    "Sugary drinks and desserts",
    "Processed foods",
    "Fried foods",
    "Excessive dairy",
    "Red meat (limit intake)",
    "Alcohol",
    "High-GI foods"
  ];

  // Generate meal plans based on preference
  if (preference === 'vegetarian') {
    breakfast = "Oatmeal with berries, chia seeds, and almond butter";
    lunch = "Quinoa salad with chickpeas, cucumber, tomatoes, olive oil";
    dinner = "Grilled tofu with roasted vegetables and brown rice";
    snacks = "Greek yogurt with walnuts, apple slices with almond butter";
  } else {
    breakfast = "Scrambled eggs with spinach, whole grain toast, avocado";
    lunch = "Grilled chicken breast with quinoa and mixed greens";
    dinner = "Baked salmon with sweet potato and steamed broccoli";
    snacks = "Boiled eggs, mixed nuts, protein smoothie";
  }

  // Adjust for weight goals
  if (weight && weight > 70) {
    hydration = "Drink 3-4 liters of water daily. Include green tea and herbal teas.";
    snacks = "Cut vegetables with hummus, handful of nuts (portion controlled)";
  } else {
    hydration = "Drink 2.5-3 liters of water daily. Include green tea.";
  }

  // Adjust for energy levels
  if (energyLevel < 5) {
    foodsToInclude.push("Iron-rich foods (spinach, lentils)", "Vitamin B12 sources", "Complex carbohydrates");
    breakfast += " with a glass of fresh orange juice";
  }

  // Adjust for activity level
  if (activityLevel === 'very_active' || activityLevel === 'extra_active') {
    foodsToInclude.push("Protein-rich foods", "Complex carbohydrates for energy");
    snacks += ", protein bars, dates with nut butter";
  }

  // Adjust for symptoms
  if (symptoms?.acne && symptoms.acne > 5) {
    foodsToInclude.push("Zinc-rich foods (pumpkin seeds)", "Vitamin A sources (carrots, sweet potato)");
    foodsToAvoid.push("Excessive dairy products", "High-glycemic foods");
  }

  if (symptoms?.cramps && symptoms.cramps > 5) {
    foodsToInclude.push("Magnesium-rich foods (dark chocolate, bananas)", "Anti-inflammatory foods (turmeric, ginger)");
  }

  return {
    breakfast,
    lunch,
    dinner,
    snacks,
    foodsToInclude,
    foodsToAvoid,
    hydration
  };
}
