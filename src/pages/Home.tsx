import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Heart, Activity, Apple, TrendingUp, Stethoscope, Users } from "lucide-react";
import heroImage from "@/assets/hero-wellness.jpg";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-10" />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  PCOS Care+
                </span>
                <br />
                <span className="text-3xl md:text-4xl text-foreground/90">
                  Track • Heal • Balance
                </span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Your personalized companion for managing PCOS. Track symptoms, get tailored
                diet & exercise plans, and take control of your health journey.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-gradient-primary shadow-glow" onClick={() => navigate("/auth?signup=true")}>
                  Get Started Free
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate("/knowledge")}>
                  Learn About PCOS
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-3xl opacity-20" />
              <img
                src={heroImage}
                alt="Wellness and yoga"
                className="relative rounded-3xl shadow-card w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to Manage PCOS
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Evidence-based tools and personalized plans designed specifically for PCOS management
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-card hover:shadow-card transition-all cursor-pointer group" onClick={() => navigate("/knowledge")}>
            <div className="rounded-full bg-primary/10 w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Stethoscope className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">PCOS Education</h3>
            <p className="text-muted-foreground">
              Learn about symptoms, causes, hormonal imbalance, diagnosis, and treatment options
            </p>
          </Card>

          <Card className="p-6 bg-gradient-card hover:shadow-card transition-all cursor-pointer group" onClick={() => navigate("/tracker")}>
            <div className="rounded-full bg-primary/10 w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Activity className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Symptom Tracking</h3>
            <p className="text-muted-foreground">
              Monitor mood, acne, hair fall, cramps, sleep, weight, and energy levels daily
            </p>
          </Card>

          <Card className="p-6 bg-gradient-card hover:shadow-card transition-all cursor-pointer group" onClick={() => navigate("/wellness")}>
            <div className="rounded-full bg-primary/10 w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Apple className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Personalized Diet Plans</h3>
            <p className="text-muted-foreground">
              Get customized meal plans based on your symptoms, preferences, and activity level
            </p>
          </Card>

          <Card className="p-6 bg-gradient-card hover:shadow-card transition-all cursor-pointer group" onClick={() => navigate("/wellness")}>
            <div className="rounded-full bg-primary/10 w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Heart className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Exercise Programs</h3>
            <p className="text-muted-foreground">
              Rule-based workout plans tailored to your fitness level and PCOS symptoms
            </p>
          </Card>

          <Card className="p-6 bg-gradient-card hover:shadow-card transition-all cursor-pointer group" onClick={() => navigate("/reports")}>
            <div className="rounded-full bg-primary/10 w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <TrendingUp className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Health Reports</h3>
            <p className="text-muted-foreground">
              View daily, weekly, and monthly analytics with charts and cycle predictions
            </p>
          </Card>

          <Card className="p-6 bg-gradient-card hover:shadow-card transition-all cursor-pointer group" onClick={() => navigate("/lifestyle")}>
            <div className="rounded-full bg-primary/10 w-14 h-14 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Users className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Lifestyle Guidance</h3>
            <p className="text-muted-foreground">
              Tips for stress management, sleep hygiene, and hormone-balancing habits
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of women managing PCOS with personalized, evidence-based tools
          </p>
          <Button size="lg" variant="secondary" className="shadow-lg" onClick={() => navigate("/auth?signup=true")}>
            Start Your Journey Today
          </Button>
        </div>
      </section>
    </div>
  );
}
