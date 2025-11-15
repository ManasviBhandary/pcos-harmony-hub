interface UserData {
  activityLevel?: string;
  weight?: number;
  symptoms?: {
    cramps?: number;
    energy?: number;
  };
}

export function generateExercisePlan(userData: UserData) {
  const { activityLevel = 'moderate', weight, symptoms } = userData;
  
  let dailyPlan = "";
  let weeklyPlan = "";
  let routines: any[] = [];
  let stepCount = 8000;

  const hasHighCramps = symptoms?.cramps && symptoms.cramps > 7;
  const hasLowEnergy = symptoms?.energy && symptoms.energy < 4;

  // Beginner/Sedentary level
  if (activityLevel === 'sedentary' || hasLowEnergy) {
    dailyPlan = "Start with 20-30 minutes of gentle activity. Focus on building consistency.";
    weeklyPlan = `
      Monday: 20-min walk + gentle stretching
      Tuesday: Beginner yoga (15-20 min)
      Wednesday: Rest or light stretching
      Thursday: 25-min walk
      Friday: Yoga for PCOS (20 min)
      Saturday: 30-min leisurely walk
      Sunday: Rest and meditation
    `;
    stepCount = 6000;
    routines = [
      {
        type: "Walking",
        duration: "20-30 minutes",
        frequency: "Daily",
        intensity: "Low"
      },
      {
        type: "Gentle Yoga",
        duration: "15-20 minutes",
        frequency: "3x per week",
        poses: ["Child's pose", "Cat-cow", "Legs up the wall", "Butterfly pose"]
      }
    ];
  }
  
  // Light to Moderate level
  else if (activityLevel === 'light' || activityLevel === 'moderate') {
    dailyPlan = "30-45 minutes of moderate exercise combining cardio and strength.";
    weeklyPlan = `
      Monday: 30-min brisk walk + core exercises
      Tuesday: Yoga for hormonal balance (30 min)
      Wednesday: Strength training (upper body, 30 min)
      Thursday: Swimming or cycling (30 min)
      Friday: Yoga + stretching (30 min)
      Saturday: Full body strength training (40 min)
      Sunday: Active recovery (gentle walk, stretching)
    `;
    stepCount = 10000;
    routines = [
      {
        type: "Cardio",
        duration: "30-40 minutes",
        frequency: "4-5x per week",
        activities: ["Brisk walking", "Swimming", "Cycling", "Dancing"]
      },
      {
        type: "Strength Training",
        duration: "30-40 minutes",
        frequency: "3x per week",
        exercises: ["Squats", "Lunges", "Push-ups", "Planks", "Dumbbell rows"]
      },
      {
        type: "Yoga",
        duration: "30 minutes",
        frequency: "3x per week",
        poses: ["Sun salutations", "Warrior poses", "Bridge pose", "Butterfly pose", "Cobra pose"]
      }
    ];
  }
  
  // Very Active / Extra Active
  else {
    dailyPlan = "45-60 minutes of vigorous exercise with mix of HIIT, strength, and flexibility.";
    weeklyPlan = `
      Monday: HIIT workout (30 min) + strength training (20 min)
      Tuesday: Power yoga (45 min)
      Wednesday: Full body strength training (45 min)
      Thursday: Cardio intervals (40 min)
      Friday: Strength training + yoga (45 min)
      Saturday: Long cardio session (60 min) - running/cycling/swimming
      Sunday: Active recovery yoga + light walk
    `;
    stepCount = 12000;
    routines = [
      {
        type: "HIIT",
        duration: "25-30 minutes",
        frequency: "2-3x per week",
        exercises: ["Jump squats", "Burpees", "Mountain climbers", "High knees"]
      },
      {
        type: "Strength Training",
        duration: "45 minutes",
        frequency: "4x per week",
        exercises: ["Deadlifts", "Squats", "Bench press", "Pull-ups", "Overhead press"]
      },
      {
        type: "Cardio",
        duration: "40-60 minutes",
        frequency: "4-5x per week",
        activities: ["Running", "Cycling", "Swimming", "Rowing"]
      }
    ];
  }

  // Adjust for high cramps
  if (hasHighCramps) {
    dailyPlan = "Focus on gentle movement and pain relief. 15-20 minutes of restorative yoga and walking.";
    weeklyPlan = `
      During high cramps period:
      - Gentle walking (10-15 min, 2-3x daily)
      - Restorative yoga poses (20 min daily)
      - Pelvic stretches and relaxation
      - Light swimming if comfortable
      - Avoid high-impact exercises
    `;
    routines = [
      {
        type: "Restorative Yoga",
        duration: "20 minutes",
        frequency: "Daily during cramps",
        poses: ["Child's pose", "Supine twist", "Legs up the wall", "Cat-cow", "Reclining butterfly"]
      },
      {
        type: "Gentle Walking",
        duration: "10-15 minutes",
        frequency: "2-3x daily",
        intensity: "Very low"
      }
    ];
    stepCount = 5000;
  }

  // Adjust for weight loss goals
  if (weight && weight > 75) {
    stepCount = Math.max(stepCount, 10000);
    dailyPlan += " Prioritize consistency and gradual progression for sustainable weight management.";
  }

  return {
    dailyPlan,
    weeklyPlan: weeklyPlan.trim(),
    routines,
    stepCount
  };
}
