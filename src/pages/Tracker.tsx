import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Plus } from "lucide-react";
import { format } from "date-fns";

export default function Tracker() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [symptoms, setSymptoms] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [periodDate, setPeriodDate] = useState<Date | undefined>(new Date());
  
  const [formData, setFormData] = useState({
    mood: "",
    acne_level: 0,
    hair_fall_level: 0,
    cramps: 0,
    sleep_hours: 0,
    weight: 0,
    energy_level: 0,
  });

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    fetchSymptoms();
  }, [user, navigate]);

  const fetchSymptoms = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from("symptoms")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) {
      console.error("Error fetching symptoms:", error);
    } else {
      setSymptoms(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);

    const { error } = await supabase.from("symptoms").insert([
      {
        user_id: user.id,
        mood: formData.mood,
        acne_level: formData.acne_level,
        hair_fall_level: formData.hair_fall_level,
        cramps: formData.cramps,
        sleep_hours: formData.sleep_hours,
        weight: formData.weight,
        energy_level: formData.energy_level,
        period_date: periodDate ? format(periodDate, "yyyy-MM-dd") : null,
      },
    ]);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add symptom entry",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Symptom entry added successfully",
      });
      setFormData({
        mood: "",
        acne_level: 0,
        hair_fall_level: 0,
        cramps: 0,
        sleep_hours: 0,
        weight: 0,
        energy_level: 0,
      });
      fetchSymptoms();
    }

    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("symptoms").delete().eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete entry",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Deleted",
        description: "Entry removed successfully",
      });
      fetchSymptoms();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-primary bg-clip-text text-transparent">
          Symptom Tracker
        </h1>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Form */}
          <Card className="p-6 bg-gradient-card shadow-card">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Plus className="h-6 w-6 text-primary" />
              Add New Entry
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="mood">Mood</Label>
                <Input
                  id="mood"
                  placeholder="e.g., Happy, Anxious, Tired"
                  value={formData.mood}
                  onChange={(e) => setFormData({ ...formData, mood: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="acne">Acne Level (0-10)</Label>
                  <Input
                    id="acne"
                    type="number"
                    min="0"
                    max="10"
                    value={formData.acne_level}
                    onChange={(e) => setFormData({ ...formData, acne_level: parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="hairfall">Hair Fall (0-10)</Label>
                  <Input
                    id="hairfall"
                    type="number"
                    min="0"
                    max="10"
                    value={formData.hair_fall_level}
                    onChange={(e) => setFormData({ ...formData, hair_fall_level: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cramps">Cramps (0-10)</Label>
                  <Input
                    id="cramps"
                    type="number"
                    min="0"
                    max="10"
                    value={formData.cramps}
                    onChange={(e) => setFormData({ ...formData, cramps: parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="energy">Energy Level (0-10)</Label>
                  <Input
                    id="energy"
                    type="number"
                    min="0"
                    max="10"
                    value={formData.energy_level}
                    onChange={(e) => setFormData({ ...formData, energy_level: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="sleep">Sleep Hours</Label>
                  <Input
                    id="sleep"
                    type="number"
                    step="0.5"
                    min="0"
                    max="24"
                    value={formData.sleep_hours}
                    onChange={(e) => setFormData({ ...formData, sleep_hours: parseFloat(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) })}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-gradient-primary" disabled={loading}>
                {loading ? "Saving..." : "Add Entry"}
              </Button>
            </form>
          </Card>

          {/* Calendar */}
          <Card className="p-6 bg-gradient-card shadow-card">
            <h2 className="text-2xl font-semibold mb-4">Period Date</h2>
            <Calendar
              mode="single"
              selected={periodDate}
              onSelect={setPeriodDate}
              className="rounded-md border"
            />
          </Card>
        </div>

        {/* History Table */}
        <Card className="p-6 bg-gradient-card shadow-card">
          <h2 className="text-2xl font-semibold mb-6">Recent Entries</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Mood</TableHead>
                  <TableHead>Acne</TableHead>
                  <TableHead>Hair Fall</TableHead>
                  <TableHead>Cramps</TableHead>
                  <TableHead>Sleep</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead>Energy</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {symptoms.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center text-muted-foreground">
                      No entries yet. Add your first symptom entry above.
                    </TableCell>
                  </TableRow>
                ) : (
                  symptoms.map((symptom) => (
                    <TableRow key={symptom.id}>
                      <TableCell>{format(new Date(symptom.created_at), "MMM dd, yyyy")}</TableCell>
                      <TableCell>{symptom.mood}</TableCell>
                      <TableCell>{symptom.acne_level}</TableCell>
                      <TableCell>{symptom.hair_fall_level}</TableCell>
                      <TableCell>{symptom.cramps}</TableCell>
                      <TableCell>{symptom.sleep_hours}h</TableCell>
                      <TableCell>{symptom.weight}kg</TableCell>
                      <TableCell>{symptom.energy_level}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(symptom.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
}
