import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { generateDietPlan } from "@/lib/dietGenerator";
import { generateExercisePlan } from "@/lib/exerciseGenerator";
import { useToast } from "@/hooks/use-toast";
import { Apple, Dumbbell } from "lucide-react";

export default function Wellness() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [dietPlan, setDietPlan] = useState<any>(null);
  const [exercisePlan, setExercisePlan] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    fetchProfile();
    fetchPlans();
  }, [user, navigate]);

  const fetchProfile = async () => {
    if (!user) return;
    const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
    setProfile(data);
  };

  const fetchPlans = async () => {
    if (!user) return;
    
    const { data: diet } = await supabase.from("diet_plans").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(1).single();
    const { data: exercise } = await supabase.from("exercise_plans").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(1).single();
    
    setDietPlan(diet);
    setExercisePlan(exercise);
  };

  const handleGenerateDiet = async () => {
    if (!user || !profile) {
      toast({ title: "Please complete your profile first", variant: "destructive" });
      navigate("/profile");
      return;
    }
    
    setLoading(true);
    const plan = generateDietPlan({
      weight: profile.weight,
      preference: profile.diet_preference || "vegetarian",
      activityLevel: profile.activity_level,
    });

    const { error } = await supabase.from("diet_plans").insert([{ user_id: user.id, ...plan }]);
    
    if (!error) {
      toast({ title: "Diet plan generated!" });
      fetchPlans();
    }
    setLoading(false);
  };

  const handleGenerateExercise = async () => {
    if (!user || !profile) {
      toast({ title: "Please complete your profile first", variant: "destructive" });
      navigate("/profile");
      return;
    }
    
    setLoading(true);
    const plan = generateExercisePlan({
      activityLevel: profile.activity_level,
      weight: profile.weight,
    });

    const { error } = await supabase.from("exercise_plans").insert([{ 
      user_id: user.id, 
      daily_plan: plan.dailyPlan,
      weekly_plan: plan.weeklyPlan,
      routines: plan.routines,
      step_count_recommendation: plan.stepCount
    }]);
    
    if (!error) {
      toast({ title: "Exercise plan generated!" });
      fetchPlans();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-primary bg-clip-text text-transparent">
          Wellness Plans
        </h1>

        <Tabs defaultValue="diet" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="diet">Diet Plan</TabsTrigger>
            <TabsTrigger value="exercise">Exercise Plan</TabsTrigger>
          </TabsList>

          <TabsContent value="diet" className="space-y-6">
            <Card className="p-6 bg-gradient-card shadow-card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <Apple className="h-6 w-6 text-primary" />
                  Personalized Diet Plan
                </h2>
                <Button onClick={handleGenerateDiet} disabled={loading} className="bg-gradient-primary">
                  {dietPlan ? "Regenerate Plan" : "Generate Plan"}
                </Button>
              </div>
              
              {dietPlan ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Breakfast</h3>
                    <p className="text-muted-foreground">{dietPlan.breakfast}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Lunch</h3>
                    <p className="text-muted-foreground">{dietPlan.lunch}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Dinner</h3>
                    <p className="text-muted-foreground">{dietPlan.dinner}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Snacks</h3>
                    <p className="text-muted-foreground">{dietPlan.snacks}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Foods to Include</h3>
                    <ul className="list-disc list-inside text-muted-foreground">
                      {dietPlan.foods_to_include?.map((food: string, i: number) => <li key={i}>{food}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Foods to Avoid</h3>
                    <ul className="list-disc list-inside text-muted-foreground">
                      {dietPlan.foods_to_avoid?.map((food: string, i: number) => <li key={i}>{food}</li>)}
                    </ul>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">Generate your personalized diet plan based on your profile and symptoms.</p>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="exercise" className="space-y-6">
            <Card className="p-6 bg-gradient-card shadow-card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <Dumbbell className="h-6 w-6 text-primary" />
                  Personalized Exercise Plan
                </h2>
                <Button onClick={handleGenerateExercise} disabled={loading} className="bg-gradient-primary">
                  {exercisePlan ? "Regenerate Plan" : "Generate Plan"}
                </Button>
              </div>
              
              {exercisePlan ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Daily Plan</h3>
                    <p className="text-muted-foreground">{exercisePlan.daily_plan}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Weekly Schedule</h3>
                    <pre className="text-sm text-muted-foreground whitespace-pre-wrap">{exercisePlan.weekly_plan}</pre>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Step Goal</h3>
                    <p className="text-muted-foreground">{exercisePlan.step_count_recommendation} steps/day</p>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">Generate your personalized exercise plan based on your fitness level.</p>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
