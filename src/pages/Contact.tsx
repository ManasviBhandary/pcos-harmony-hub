import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, MessageSquare, HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert({
          name,
          email,
          message
        });

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "We'll get back to you soon."
      });

      setName("");
      setEmail("");
      setMessage("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-primary bg-clip-text text-transparent">
          Contact Us
        </h1>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="p-8 bg-gradient-card shadow-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-full bg-gradient-primary">
                <Mail className="h-6 w-6 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold">Send us a message</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="How can we help you?"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-gradient-primary" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>

          <Card className="p-8 bg-gradient-card shadow-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-full bg-gradient-primary">
                <HelpCircle className="h-6 w-6 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold">FAQ</h2>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is PCOS Care+?</AccordionTrigger>
                <AccordionContent>
                  PCOS Care+ is a comprehensive platform for managing PCOS symptoms through tracking, personalized wellness plans, and health insights.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>How do I track my symptoms?</AccordionTrigger>
                <AccordionContent>
                  Navigate to the Track page and fill in your daily symptoms including mood, energy levels, sleep hours, and physical symptoms. Your data will be saved and used to generate insights.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Are the diet and exercise plans personalized?</AccordionTrigger>
                <AccordionContent>
                  Yes! Our wellness plans are generated based on your profile information, activity level, dietary preferences, and current symptoms.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Is my health data secure?</AccordionTrigger>
                <AccordionContent>
                  Absolutely. Your data is encrypted and stored securely. Only you have access to your health information.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Can I export my reports?</AccordionTrigger>
                <AccordionContent>
                  Currently, you can view your daily, weekly, and monthly reports on the platform. Export functionality is coming soon!
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        </div>
      </div>
    </div>
  );
}
