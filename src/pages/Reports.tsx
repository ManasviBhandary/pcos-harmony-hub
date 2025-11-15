import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useToast } from "@/hooks/use-toast";
import { TrendingUp, Activity, Moon, Heart } from "lucide-react";

export default function Reports() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [symptoms, setSymptoms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchSymptoms();
    }
  }, [user]);

  const fetchSymptoms = async () => {
    try {
      const { data, error } = await supabase
        .from('symptoms')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setSymptoms(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading data",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getDailyData = () => {
    const today = new Date().toISOString().split('T')[0];
    return symptoms.filter(s => s.created_at?.startsWith(today));
  };

  const getWeeklyData = () => {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return symptoms.filter(s => new Date(s.created_at) >= weekAgo);
  };

  const getMonthlyData = () => {
    const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    return symptoms.filter(s => new Date(s.created_at) >= monthAgo);
  };

  const formatChartData = (data: any[]) => {
    return data.map(s => ({
      date: new Date(s.created_at).toLocaleDateString(),
      energy: s.energy_level || 0,
      sleep: s.sleep_hours || 0,
      acne: s.acne_level || 0,
      cramps: s.cramps || 0,
      weight: s.weight || 0
    }));
  };

  const calculateAverage = (data: any[], field: string) => {
    if (data.length === 0) return 0;
    const sum = data.reduce((acc, curr) => acc + (curr[field] || 0), 0);
    return (sum / data.length).toFixed(1);
  };

  const renderReport = (data: any[], title: string) => {
    const chartData = formatChartData(data);

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="p-4 bg-gradient-card">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Avg Energy</h3>
            </div>
            <p className="text-3xl font-bold">{calculateAverage(data, 'energy_level')}/10</p>
          </Card>

          <Card className="p-4 bg-gradient-card">
            <div className="flex items-center gap-2 mb-2">
              <Moon className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Avg Sleep</h3>
            </div>
            <p className="text-3xl font-bold">{calculateAverage(data, 'sleep_hours')}h</p>
          </Card>

          <Card className="p-4 bg-gradient-card">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Avg Acne</h3>
            </div>
            <p className="text-3xl font-bold">{calculateAverage(data, 'acne_level')}/10</p>
          </Card>

          <Card className="p-4 bg-gradient-card">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Avg Cramps</h3>
            </div>
            <p className="text-3xl font-bold">{calculateAverage(data, 'cramps')}/10</p>
          </Card>
        </div>

        {chartData.length > 0 ? (
          <>
            <Card className="p-6 bg-gradient-card">
              <h3 className="text-lg font-semibold mb-4">Energy & Sleep Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="energy" stroke="hsl(var(--primary))" name="Energy Level" />
                  <Line type="monotone" dataKey="sleep" stroke="hsl(var(--secondary))" name="Sleep Hours" />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 bg-gradient-card">
              <h3 className="text-lg font-semibold mb-4">Symptom Intensity</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="acne" fill="hsl(var(--primary))" name="Acne Level" />
                  <Bar dataKey="cramps" fill="hsl(var(--accent))" name="Cramps" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </>
        ) : (
          <Card className="p-8 text-center bg-gradient-card">
            <p className="text-muted-foreground">No data available for this period. Start tracking your symptoms!</p>
          </Card>
        )}
      </div>
    );
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4">
        <Card className="p-8 text-center bg-gradient-card">
          <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
          <p className="text-muted-foreground">Please sign in to view your reports.</p>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-soft flex items-center justify-center">
        <p className="text-lg">Loading your reports...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-soft py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-primary bg-clip-text text-transparent">
          Health Reports
        </h1>

        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>

          <TabsContent value="daily">
            {renderReport(getDailyData(), "Today's Report")}
          </TabsContent>

          <TabsContent value="weekly">
            {renderReport(getWeeklyData(), "This Week's Report")}
          </TabsContent>

          <TabsContent value="monthly">
            {renderReport(getMonthlyData(), "This Month's Report")}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
