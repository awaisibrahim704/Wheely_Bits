import FallbackImage from "../components/FallbackImage";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Brain, Box, SlidersHorizontal, Palette } from "lucide-react";

const BACKGROUND_IMAGES = [
  "https://lh3.googleusercontent.com/aida/AP1WRLtTqILqTHVumpH57ivNT0tkCWVJUq8w47cc2V5MWb9LuKjMcxqTDHpAKUJWs7Z_u0K8H8XIO52vFHzOWgctc64biDwwGKTcfDSSghAh9NRIkXAdmKe8q0C1sHcGvVTzKpFXj5Voc0LPoBNd0V8BuTBq0E6_ca7R-MYKZyZ95A5-ylS0HfN9mQkEo43fW7YC8ELFdt0r5ArY0CIUXcTdWbfJMZb75_yPD9uu-UMoSRZKrgGIAjximmQDEc4",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuApnFGEP6kv0IBd19J7YEGidqDPXuaUnXxwAIV9yJKi3ttpuoROklU24XDPTdd_Vs5QuT8VTBDqMcLeHJ7sIyur5eSHlysyHc5kEIuI87jG8SE_dPlAcRTB0wToKbbRiWaevG0OixeqIx7PNTQ10RiMuPPK_myOVBwXhY4bzg3oQQSIV6fGUUBD9fF8JXDIzRP-9VcnmFkq98MLDCIj9skdmi_gzifffMbU6flKGz55nWnpwyOS7-O4FdsYHJSHNf74IFvmHMN9cx3o",
];

export default function Home() {
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-background overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {BACKGROUND_IMAGES.map((src, idx) => (
            <FallbackImage
              key={idx}
              src={src}
              alt={`Car background ${idx + 1}`}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                idx === currentBg ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-8 z-10">
            <div className="bg-surface-high/40 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center max-w-md shadow-2xl animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-medium text-on-surface mb-8">
                New to Wheely Bits? Start here...
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/signup"
                  className="bg-primary-brand text-on-primary px-8 py-3 rounded-full font-medium hover:bg-primary transition-colors w-full sm:w-auto text-center"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="bg-transparent border border-outline text-on-surface px-8 py-3 rounded-full font-medium hover:bg-surface-highest transition-colors w-full sm:w-auto text-center"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="py-16 max-w-[1280px] mx-auto px-4 md:px-12 mt-16">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-medium text-on-surface mb-2">
            Core Capabilities
          </h2>
          <p className="text-base text-on-surface-muted">
            Engineered for precision. Designed for perfection.
          </p>
          <Link
            to="/vendors"
            className="mt-5 inline-flex items-center rounded-full bg-primary-brand px-6 py-3 font-semibold text-on-primary transition hover:bg-primary"
          >
            Find Automotive Shops
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1 */}
          <div className="bg-surface-low rounded-xl p-8 border border-white/5 hover:border-primary-brand/30 hover:shadow-[0_0_30px_rgba(143,179,151,0.15)] transition-all duration-300 group">
            <div className="h-12 w-12 rounded-full bg-primary-brand/20 flex items-center justify-center mb-4 text-primary-brand">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-medium text-on-surface mb-2">
              AI Recognition
            </h3>
            <p className="text-base text-on-surface-muted">
              Instantly identify wheel models, specs, and optimal fitment
              parameters from a single photograph.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-surface-low rounded-xl p-8 border border-white/5 hover:border-primary-brand/30 hover:shadow-[0_0_30px_rgba(143,179,151,0.15)] transition-all duration-300 group">
            <div className="h-12 w-12 rounded-full bg-primary-brand/20 flex items-center justify-center mb-4 text-primary-brand">
              <Box className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-medium text-on-surface mb-2">
              Studio Visualizer
            </h3>
            <p className="text-base text-on-surface-muted">
              Experience photorealistic 3D rendering of your vehicle with custom
              wheel setups before making a purchase.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-surface-low rounded-xl p-8 border border-white/5 hover:border-primary-brand/30 hover:shadow-[0_0_30px_rgba(143,179,151,0.15)] transition-all duration-300 group">
            <div className="h-12 w-12 rounded-full bg-primary-brand/20 flex items-center justify-center mb-4 text-primary-brand">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-medium text-on-surface mb-2">
              Fitment Engine
            </h3>
            <p className="text-base text-on-surface-muted">
              Calculate exact clearances, offset impacts, and suspension
              geometry changes with mathematical precision.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-surface-low rounded-xl p-8 border border-white/5 hover:border-primary-brand/30 hover:shadow-[0_0_30px_rgba(143,179,151,0.15)] transition-all duration-300 group">
            <div className="h-12 w-12 rounded-full bg-primary-brand/20 flex items-center justify-center mb-4 text-primary-brand">
              <Palette className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-medium text-on-surface mb-2">
              Colorimetry Lab
            </h3>
            <p className="text-base text-on-surface-muted">
              Match finishes exactly with advanced color profiling, ensuring
              perfect harmony between body and wheels.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
