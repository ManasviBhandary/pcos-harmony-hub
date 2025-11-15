import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-lg shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="rounded-full bg-gradient-primary p-2 shadow-glow group-hover:shadow-lg transition-all">
              <Heart className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              PCOS Care+
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/knowledge" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Learn
            </Link>
            {user && (
              <>
                <Link to="/tracker" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                  Track
                </Link>
                <Link to="/wellness" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                  Wellness
                </Link>
                <Link to="/reports" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                  Reports
                </Link>
              </>
            )}
            <Link to="/contact" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    My Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate("/auth")}>
                  Sign In
                </Button>
                <Button size="sm" className="bg-gradient-primary" onClick={() => navigate("/auth?signup=true")}>
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-3 border-t">
            <Link
              to="/knowledge"
              className="block py-2 text-sm font-medium text-foreground/80 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Learn
            </Link>
            {user && (
              <>
                <Link
                  to="/tracker"
                  className="block py-2 text-sm font-medium text-foreground/80 hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Track
                </Link>
                <Link
                  to="/wellness"
                  className="block py-2 text-sm font-medium text-foreground/80 hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Wellness
                </Link>
                <Link
                  to="/reports"
                  className="block py-2 text-sm font-medium text-foreground/80 hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Reports
                </Link>
                <Link
                  to="/profile"
                  className="block py-2 text-sm font-medium text-foreground/80 hover:text-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
              </>
            )}
            <Link
              to="/contact"
              className="block py-2 text-sm font-medium text-foreground/80 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            {user ? (
              <Button onClick={handleSignOut} className="w-full" variant="outline">
                Sign Out
              </Button>
            ) : (
              <div className="space-y-2 pt-2">
                <Button
                  onClick={() => {
                    navigate("/auth");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full"
                  variant="outline"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => {
                    navigate("/auth?signup=true");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-primary"
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
