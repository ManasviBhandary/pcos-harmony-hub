import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Heart, Dna, Stethoscope, Pill } from "lucide-react";

export default function Knowledge() {
  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Understanding PCOS
          </h1>
          <p className="text-lg text-muted-foreground">
            Comprehensive information about Polycystic Ovary Syndrome
          </p>
        </div>

        <div className="space-y-8">
          {/* What is PCOS */}
          <Card className="p-8 bg-gradient-card shadow-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">What is PCOS?</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Polycystic Ovary Syndrome (PCOS) is a hormonal disorder common among women of reproductive age. 
              Women with PCOS may have infrequent or prolonged menstrual periods or excess male hormone (androgen) levels. 
              The ovaries may develop numerous small collections of fluid (follicles) and fail to regularly release eggs.
            </p>
          </Card>

          {/* Symptoms */}
          <Card className="p-8 bg-gradient-card shadow-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-full bg-primary/10 p-3">
                <AlertCircle className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Common Symptoms</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-muted-foreground">Irregular or absent menstrual periods</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-muted-foreground">Excess hair growth (hirsutism)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-muted-foreground">Acne and oily skin</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-muted-foreground">Weight gain or difficulty losing weight</span>
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-muted-foreground">Thinning hair or male-pattern baldness</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-muted-foreground">Darkening of skin (acanthosis nigricans)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-muted-foreground">Skin tags</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-muted-foreground">Pelvic pain and cramps</span>
                </li>
              </ul>
            </div>
          </Card>

          {/* Causes */}
          <Card className="p-8 bg-gradient-card shadow-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Dna className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Causes & Risk Factors</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              The exact cause of PCOS is unknown, but several factors play a role:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-primary font-semibold mt-1">•</span>
                <div>
                  <p className="font-semibold">Excess Insulin</p>
                  <p className="text-muted-foreground">Insulin resistance can increase androgen production, causing difficulty with ovulation.</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-semibold mt-1">•</span>
                <div>
                  <p className="font-semibold">Low-grade Inflammation</p>
                  <p className="text-muted-foreground">Women with PCOS have a type of low-grade inflammation that stimulates polycystic ovaries to produce androgens.</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-semibold mt-1">•</span>
                <div>
                  <p className="font-semibold">Heredity</p>
                  <p className="text-muted-foreground">Research suggests that certain genes might be linked to PCOS.</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-semibold mt-1">•</span>
                <div>
                  <p className="font-semibold">Excess Androgen</p>
                  <p className="text-muted-foreground">The ovaries produce abnormally high levels of androgen, resulting in hirsutism and acne.</p>
                </div>
              </li>
            </ul>
          </Card>

          {/* Hormonal Imbalance */}
          <Card className="p-8 bg-gradient-card shadow-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Stethoscope className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Hormonal Imbalance</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              PCOS involves an imbalance of reproductive hormones that affects the ovaries:
            </p>
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Elevated Androgens</h3>
                <p className="text-sm text-muted-foreground">
                  High levels of "male hormones" like testosterone can prevent ovulation and cause physical symptoms.
                </p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Insulin Resistance</h3>
                <p className="text-sm text-muted-foreground">
                  Up to 70% of women with PCOS have insulin resistance, which can worsen hormonal imbalances.
                </p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">LH/FSH Imbalance</h3>
                <p className="text-sm text-muted-foreground">
                  Elevated luteinizing hormone (LH) relative to follicle-stimulating hormone (FSH) disrupts the menstrual cycle.
                </p>
              </div>
            </div>
          </Card>

          {/* Diagnosis */}
          <Card className="p-8 bg-gradient-card shadow-card">
            <h2 className="text-2xl font-bold mb-4">Diagnosis</h2>
            <p className="text-muted-foreground mb-4">
              There's no single test to definitively diagnose PCOS. Your doctor will likely:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span className="text-muted-foreground">Discuss your medical history and symptoms</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span className="text-muted-foreground">Perform a physical examination</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span className="text-muted-foreground">Order blood tests to measure hormone levels</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span className="text-muted-foreground">Conduct a pelvic ultrasound to check your ovaries</span>
              </li>
            </ul>
          </Card>

          {/* Treatment */}
          <Card className="p-8 bg-gradient-card shadow-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Pill className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Treatment Approaches</h2>
            </div>
            <p className="text-muted-foreground mb-4">
              PCOS treatment focuses on managing symptoms. Common approaches include:
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Lifestyle Changes</h3>
                <ul className="space-y-1 ml-4">
                  <li className="text-sm text-muted-foreground">• Regular exercise and physical activity</li>
                  <li className="text-sm text-muted-foreground">• Balanced, low-glycemic diet</li>
                  <li className="text-sm text-muted-foreground">• Weight management (5-10% loss can improve symptoms)</li>
                  <li className="text-sm text-muted-foreground">• Stress reduction techniques</li>
                </ul>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Medical Treatments</h3>
                <ul className="space-y-1 ml-4">
                  <li className="text-sm text-muted-foreground">• Birth control pills to regulate periods</li>
                  <li className="text-sm text-muted-foreground">• Metformin for insulin resistance</li>
                  <li className="text-sm text-muted-foreground">• Anti-androgen medications</li>
                  <li className="text-sm text-muted-foreground">• Fertility treatments if pregnancy is desired</li>
                </ul>
              </div>
              <Separator />
              <div>
                <h3 className="font-semibold mb-2">Complementary Therapies</h3>
                <ul className="space-y-1 ml-4">
                  <li className="text-sm text-muted-foreground">• Supplements (inositol, vitamin D, omega-3)</li>
                  <li className="text-sm text-muted-foreground">• Acupuncture</li>
                  <li className="text-sm text-muted-foreground">• Herbal remedies (consult doctor first)</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
