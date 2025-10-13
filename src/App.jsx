import React, { useEffect, useState } from "react";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  Phone,
  ExternalLink,
  Server,
  Database,
  Lock,
  ShoppingCart,
  Radio,
  Bot,
  Cloud,
  Settings,
  Code,
  Layers,
  Container,
  GitBranch,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const App = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Define all architecture images with metadata
  const architectureImages = [
    {
      src: "High-level.png",
      title: "High-Level Architecture",
      description: "System overview",
    },
    {
      src: "Auth-service.png",
      title: "Auth Service",
      description: "Authentication flow",
    },
    {
      src: "Google-Oauth-2.0.png",
      title: "OAuth 2.0",
      description: "Google OAuth integration",
    },
    {
      src: "user-service.png",
      title: "User Service",
      description: "User profile management",
    },
    {
      src: "Event-service.png",
      title: "Event Service",
      description: "Event creation and scheduling",
    },
    {
      src: "Auction-service.png",
      title: "Auction Service",
      description: "Live auction management",
    },
    {
      src: "Bidding.png",
      title: "Bidding Flow",
      description: "Redis + Lua bidding logic",
    },
    {
      src: "Live-score-service.png",
      title: "Live Score Service",
      description: "Real-time score updates",
    },
    {
      src: "Cron-Jobs.png",
      title: "RAG Agent Service",
      description: "AI-powered Q&A layer",
    },
    {
      src: "Deployment-service.png",
      title: "Deployment",
      description: "CI/CD pipeline",
    },
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!lightboxOpen) return;

      if (e.key === "Escape") {
        setLightboxOpen(false);
      } else if (e.key === "ArrowLeft") {
        navigateImage("prev");
      } else if (e.key === "ArrowRight") {
        navigateImage("next");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [lightboxOpen, currentImageIndex]);

  const openLightbox = (imageSrc) => {
    const index = architectureImages.findIndex((img) => img.src === imageSrc);
    if (index !== -1) {
      setCurrentImageIndex(index);
      setLightboxOpen(true);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "unset";
  };

  const navigateImage = (direction) => {
    if (direction === "next") {
      setCurrentImageIndex((prev) => (prev + 1) % architectureImages.length);
    } else {
      setCurrentImageIndex(
        (prev) =>
          (prev - 1 + architectureImages.length) % architectureImages.length
      );
    }
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="bg-black text-white min-h-screen relative">
      {/* Subtle gradient overlay - minimal */}
      <div className="fixed inset-0 bg-gradient-to-br from-neutral-950 via-black to-neutral-950 pointer-events-none opacity-60"></div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 50 ? "glass-dark shadow-lg" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="sportsync_logo.jpg"
                alt="Logo"
                className="w-10 h-10 rounded-full ring-2 ring-white/10"
              />
              <span className="text-xl font-semibold tracking-tight">
                SportsSync Engineering
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection("overview")}
                className="text-sm hover:text-gray-300 transition"
              >
                Overview
              </button>
              <button
                onClick={() => scrollToSection("architecture")}
                className="text-sm hover:text-gray-300 transition"
              >
                Architecture
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-sm hover:text-gray-300 transition"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("stack")}
                className="text-sm hover:text-gray-300 transition"
              >
                Tech Stack
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-sm hover:text-gray-300 transition"
              >
                Contact
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-white/5 rounded-lg transition"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 glass-dark rounded-lg p-4 space-y-3">
              <button
                onClick={() => scrollToSection("overview")}
                className="block w-full text-left py-2 hover:text-gray-300"
              >
                Overview
              </button>
              <button
                onClick={() => scrollToSection("architecture")}
                className="block w-full text-left py-2 hover:text-gray-300"
              >
                Architecture
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="block w-full text-left py-2 hover:text-gray-300"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("stack")}
                className="block w-full text-left py-2 hover:text-gray-300"
              >
                Tech Stack
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left py-2 hover:text-gray-300"
              >
                Contact
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Image Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 glass-dark rounded-full flex items-center justify-center hover:bg-white/10 transition-all group z-10"
            aria-label="Close lightbox"
          >
            <X
              size={24}
              className="group-hover:scale-110 transition-transform"
            />
          </button>

          {/* Image counter */}
          <div className="absolute top-6 left-6 glass-dark px-4 py-2 rounded-full text-sm font-mono">
            {currentImageIndex + 1} / {architectureImages.length}
          </div>

          {/* Previous button */}
          <button
            onClick={() => navigateImage("prev")}
            className="absolute left-6 w-14 h-14 glass-dark rounded-full flex items-center justify-center hover:bg-white/10 transition-all group"
            aria-label="Previous image"
          >
            <ChevronLeft
              size={28}
              className="group-hover:-translate-x-1 transition-transform"
            />
          </button>

          {/* Next button */}
          <button
            onClick={() => navigateImage("next")}
            className="absolute right-6 w-14 h-14 glass-dark rounded-full flex items-center justify-center hover:bg-white/10 transition-all group"
            aria-label="Next image"
          >
            <ChevronRight
              size={28}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>

          {/* Image container */}
          <div className="max-w-7xl mx-auto px-20 w-full">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">
                {architectureImages[currentImageIndex].title}
              </h3>
              <p className="text-gray-400">
                {architectureImages[currentImageIndex].description}
              </p>
            </div>

            <div className="relative">
              <img
                src={architectureImages[currentImageIndex].src}
                alt={architectureImages[currentImageIndex].title}
                className="w-full h-auto max-h-[70vh] object-contain rounded-xl"
              />
            </div>

            {/* Thumbnail navigation */}
            <div className="flex gap-2 mt-6 overflow-x-auto pb-2 scrollbar-thin justify-center">
              {architectureImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === currentImageIndex
                      ? "border-white scale-110"
                      : "border-white/20 opacity-50 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Keyboard shortcuts hint */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 glass-dark px-4 py-2 rounded-full text-xs text-gray-400">
            Use arrow keys or swipe to navigate • ESC to close
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-8 inline-block">
              <img
                src="sportsync_logo.jpg"
                alt="SportsSync"
                className="w-32 h-32 rounded-full mx-auto ring-4 ring-white/10"
              />
            </div>

            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6">
              Engineering behind
              <br />
              <span className="text-gray-400">SportsSync</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              A scalable microservices architecture for real-time sports auction
              management
            </p>

            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <a
                href="#overview"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("overview");
                }}
                className="px-8 py-4 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition"
              >
                Explore Architecture
              </a>
              <a
                href="https://github.com/kaustubhduse/SportSync"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 glass border border-white/10 font-medium rounded-lg hover:bg-white/10 transition inline-flex items-center gap-2"
              >
                <Github size={20} />
                View on GitHub
              </a>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section id="overview" className="py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                The Challenge
              </h2>
              <div className="w-20 h-1 bg-white mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-dark p-12 rounded-2xl">
                <h3 className="text-2xl font-semibold mb-4">The Problem</h3>
                <p className="text-gray-400 leading-relaxed text-lg">
                  During sports auctions at our institute, the excitement was
                  real, but so was the confusion. Volunteers tried to track
                  every bid, but updates were either delayed or inconsistent. By
                  the time the auction ended, teams questioned who won which
                  player, and players weren't sure where they landed.
                </p>
              </div>

              <div className="glass-dark p-12 rounded-2xl">
                <h3 className="text-2xl font-semibold mb-4">The Solution</h3>
                <p className="text-gray-400 leading-relaxed text-lg">
                  SportsSync creates a centralized platform for managing sports
                  auctions efficiently. It ensures complete transparency by
                  displaying final bid amounts and team assignments, with data
                  seamlessly flowing into the Live Score Service for real-time
                  match management.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture Diagram */}
        <section id="architecture" className="py-32 px-6 bg-neutral-950/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                System Architecture
              </h2>
              <div className="w-20 h-1 bg-white mx-auto mb-8"></div>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                High-level overview of the microservices architecture powering
                SportsSync
              </p>
            </div>

            <div
              className="glass-dark p-8 rounded-2xl cursor-pointer hover:border-white/20 transition-all group"
              onClick={() => openLightbox("High-level.png")}
            >
              <img
                src="High-level.png"
                alt="Architecture Diagram"
                className="w-full h-auto rounded-xl group-hover:scale-[1.02] transition-transform"
              />
              <div className="text-center mt-4 text-sm text-gray-400 group-hover:text-white transition-colors">
                Click to view full size
              </div>
            </div>
          </div>
        </section>

        {/* Microservices */}
        <section id="services" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Microservices
              </h2>
              <div className="w-20 h-1 bg-white mx-auto mb-8"></div>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Seven specialized services working together to deliver a
                seamless experience
              </p>
            </div>

            <div className="space-y-8">
              {/* Auth Service */}
              <div className="glass-dark rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all">
                <div className="p-8 md:p-12">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-blue-500/10 rounded-xl flex items-center justify-center">
                      <Lock className="text-blue-400" size={32} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-mono text-gray-500">
                          01
                        </span>
                        <h3 className="text-3xl font-bold">Auth Service</h3>
                      </div>
                      <p className="text-lg text-gray-400 leading-relaxed">
                        Manages user sign-up, login, and Google OAuth 2.0
                        integration. Issues and validates JWTs for securing all
                        other services. Stores authentication details and
                        refresh tokens in Postgres.
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-8">
                    <div
                      className="cursor-pointer group relative"
                      onClick={() => openLightbox("Auth-service.png")}
                    >
                      <img
                        src="Auth-service.png"
                        alt="Auth Service"
                        className="w-full rounded-xl border border-white/5 group-hover:border-white/20 transition-all"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all rounded-xl flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 text-sm bg-white/10 backdrop-blur px-4 py-2 rounded-lg transition-all">
                          Click to enlarge
                        </span>
                      </div>
                    </div>
                    <div
                      className="cursor-pointer group relative"
                      onClick={() => openLightbox("Google-Oauth-2.0.png")}
                    >
                      <img
                        src="Google-Oauth-2.0.png"
                        alt="OAuth Flow"
                        className="w-full rounded-xl border border-white/5 group-hover:border-white/20 transition-all"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all rounded-xl flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 text-sm bg-white/10 backdrop-blur px-4 py-2 rounded-lg transition-all">
                          Click to enlarge
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Service */}
              <div className="glass-dark rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all">
                <div className="p-8 md:p-12">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-purple-500/10 rounded-xl flex items-center justify-center">
                      <Server className="text-purple-400" size={32} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-mono text-gray-500">
                          02
                        </span>
                        <h3 className="text-3xl font-bold">User Service</h3>
                      </div>
                      <p className="text-lg text-gray-400 leading-relaxed">
                        Central user profile repository storing basic user data
                        and allowing profile updates (bio, avatar) after initial
                        creation. Stores user profile data in Postgres.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div
                      className="cursor-pointer group relative"
                      onClick={() => openLightbox("user-service.png")}
                    >
                      <img
                        src="user-service.png"
                        alt="User Service"
                        className="w-full rounded-xl border border-white/5 group-hover:border-white/20 transition-all"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all rounded-xl flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 text-sm bg-white/10 backdrop-blur px-4 py-2 rounded-lg transition-all">
                          Click to enlarge
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event Service */}
              <div className="glass-dark rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all">
                <div className="p-8 md:p-12">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-green-500/10 rounded-xl flex items-center justify-center">
                      <Settings className="text-green-400" size={32} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-mono text-gray-500">
                          03
                        </span>
                        <h3 className="text-3xl font-bold">Event Service</h3>
                      </div>
                      <p className="text-lg text-gray-400 leading-relaxed">
                        Handles creation and scheduling of sporting events.
                        Manages user registration as player or owner and
                        publishes participant data to RabbitMQ. Stores event
                        data in MongoDB.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div
                      className="cursor-pointer group relative"
                      onClick={() => openLightbox("Event-service.png")}
                    >
                      <img
                        src="Event-service.png"
                        alt="Event Service"
                        className="w-full rounded-xl border border-white/5 group-hover:border-white/20 transition-all"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all rounded-xl flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 text-sm bg-white/10 backdrop-blur px-4 py-2 rounded-lg transition-all">
                          Click to enlarge
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Auction Service */}
              <div className="glass-dark rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all">
                <div className="p-8 md:p-12">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-yellow-500/10 rounded-xl flex items-center justify-center">
                      <ShoppingCart className="text-yellow-400" size={32} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-mono text-gray-500">
                          04
                        </span>
                        <h3 className="text-3xl font-bold">Auction Service</h3>
                      </div>
                      <p className="text-lg text-gray-400 leading-relaxed">
                        Consumes participant messages from RabbitMQ for live
                        player auctions. Uses Socket.IO for real-time bid
                        updates and Redis for quick access. Bidding handled
                        through Redis + Lua atomic script ensuring FCFS
                        fairness. Stores data in MongoDB.
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-8">
                    <div
                      className="cursor-pointer group relative"
                      onClick={() => openLightbox("Auction-service.png")}
                    >
                      <img
                        src="Auction-service.png"
                        alt="Auction Service"
                        className="w-full rounded-xl border border-white/5 group-hover:border-white/20 transition-all"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all rounded-xl flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 text-sm bg-white/10 backdrop-blur px-4 py-2 rounded-lg transition-all">
                          Click to enlarge
                        </span>
                      </div>
                    </div>
                    <div
                      className="cursor-pointer group relative"
                      onClick={() => openLightbox("Bidding.png")}
                    >
                      <img
                        src="Bidding.png"
                        alt="Bidding Flow"
                        className="w-full rounded-xl border border-white/5 group-hover:border-white/20 transition-all"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all rounded-xl flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 text-sm bg-white/10 backdrop-blur px-4 py-2 rounded-lg transition-all">
                          Click to enlarge
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Score Service */}
              <div className="glass-dark rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all">
                <div className="p-8 md:p-12">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-red-500/10 rounded-xl flex items-center justify-center">
                      <Radio className="text-red-400" size={32} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-mono text-gray-500">
                          05
                        </span>
                        <h3 className="text-3xl font-bold">
                          Live Score Service
                        </h3>
                      </div>
                      <p className="text-lg text-gray-400 leading-relaxed">
                        Provides real-time score updates using Socket.IO.
                        Prioritizes Redis cache for fast retrieval and fetches
                        team rosters from Auction Service. Stores match data in
                        MongoDB.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div
                      className="cursor-pointer group relative"
                      onClick={() => openLightbox("Live-score-service.png")}
                    >
                      <img
                        src="Live-score-service.png"
                        alt="Live Score Service"
                        className="w-full rounded-xl border border-white/5 group-hover:border-white/20 transition-all"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all rounded-xl flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 text-sm bg-white/10 backdrop-blur px-4 py-2 rounded-lg transition-all">
                          Click to enlarge
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RAG Agent Service */}
              <div className="glass-dark rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all">
                <div className="p-8 md:p-12">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-cyan-500/10 rounded-xl flex items-center justify-center">
                      <Bot className="text-cyan-400" size={32} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-mono text-gray-500">
                          06
                        </span>
                        <h3 className="text-3xl font-bold">
                          RAG Agent Service
                        </h3>
                      </div>
                      <p className="text-lg text-gray-400 leading-relaxed">
                        Q&A layer using LangChain and LLMs to generate insights
                        from system data. Accesses all service databases and
                        uses Pinecone for semantic search capabilities.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div
                      className="cursor-pointer group relative"
                      onClick={() => openLightbox("Cron-Jobs.png")}
                    >
                      <img
                        src="Cron-Jobs.png"
                        alt="RAG Agent Service"
                        className="w-full rounded-xl border border-white/5 group-hover:border-white/20 transition-all"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all rounded-xl flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 text-sm bg-white/10 backdrop-blur px-4 py-2 rounded-lg transition-all">
                          Click to enlarge
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Deployment Service */}
              <div className="glass-dark rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all">
                <div className="p-8 md:p-12">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="flex-shrink-0 w-16 h-16 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                      <Cloud className="text-indigo-400" size={32} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-mono text-gray-500">
                          07
                        </span>
                        <h3 className="text-3xl font-bold">Deployment</h3>
                      </div>
                      <p className="text-lg text-gray-400 leading-relaxed">
                        Deployment handled by Docker and orchestrated by AWS
                        EKS. Automated using Jenkins CI/CD pipeline, pushing to
                        DockerHub with ArgoCD managing deployment. Monitored by
                        Prometheus and Grafana.
                      </p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div
                      className="cursor-pointer group relative"
                      onClick={() => openLightbox("Deployment-service.png")}
                    >
                      <img
                        src="Deployment-service.png"
                        alt="Deployment"
                        className="w-full rounded-xl border border-white/5 group-hover:border-white/20 transition-all"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all rounded-xl flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 text-sm bg-white/10 backdrop-blur px-4 py-2 rounded-lg transition-all">
                          Click to enlarge
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section id="stack" className="py-32 px-6 bg-neutral-950/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Tech Stack
              </h2>
              <div className="w-20 h-1 bg-white mx-auto mb-8"></div>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Modern technologies powering a scalable, distributed system
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Database,
                  name: "PostgreSQL",
                  purpose: "Relational data with ACID compliance",
                  color: "blue",
                },
                {
                  icon: Code,
                  name: "Prisma ORM",
                  purpose: "Type-safe database access",
                  color: "purple",
                },
                {
                  icon: Database,
                  name: "MongoDB",
                  purpose: "Flexible document storage",
                  color: "green",
                },
                {
                  icon: Radio,
                  name: "Socket.IO",
                  purpose: "Real-time bidirectional communication",
                  color: "yellow",
                },
                {
                  icon: Database,
                  name: "Redis",
                  purpose: "High-performance caching layer",
                  color: "red",
                },
                {
                  icon: Layers,
                  name: "RabbitMQ",
                  purpose: "Asynchronous message queuing",
                  color: "orange",
                },
                {
                  icon: Bot,
                  name: "LangChain",
                  purpose: "AI agent framework",
                  color: "cyan",
                },
                {
                  icon: Bot,
                  name: "OpenAI LLM",
                  purpose: "Natural language processing",
                  color: "teal",
                },
                {
                  icon: Container,
                  name: "Docker",
                  purpose: "Application containerization",
                  color: "blue",
                },
                {
                  icon: Settings,
                  name: "Kubernetes",
                  purpose: "Container orchestration",
                  color: "indigo",
                },
                {
                  icon: GitBranch,
                  name: "Jenkins",
                  purpose: "Continuous integration",
                  color: "red",
                },
                {
                  icon: GitBranch,
                  name: "ArgoCD",
                  purpose: "GitOps deployment",
                  color: "orange",
                },
                {
                  icon: Cloud,
                  name: "AWS EKS",
                  purpose: "Managed Kubernetes service",
                  color: "yellow",
                },
                {
                  icon: Server,
                  name: "Prometheus",
                  purpose: "Metrics and monitoring",
                  color: "red",
                },
                {
                  icon: Server,
                  name: "Grafana",
                  purpose: "Visualization and dashboards",
                  color: "orange",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="glass-dark p-6 rounded-xl border border-white/5 hover:border-white/10 transition-all group"
                >
                  <div
                    className={`w-12 h-12 bg-${item.color}-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <item.icon className={`text-${item.color}-400`} size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.purpose}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl md:text-6xl font-bold mb-6">
                Get in Touch
              </h2>
              <div className="w-20 h-1 bg-white mx-auto mb-8"></div>
              <p className="text-xl text-gray-400">
                Let's connect and discuss engineering
              </p>
            </div>

            <div className="glass-dark p-12 rounded-2xl border border-white/5">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-2">Kaustubh Duse</h3>
                <p className="text-gray-400">Full Stack Developer</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <a
                  href="https://github.com/kaustubhduse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-6 glass rounded-xl hover:bg-white/10 transition-all group"
                >
                  <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Github size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">GitHub</div>
                    <div className="font-medium">kaustubhduse</div>
                  </div>
                  <ExternalLink size={16} className="ml-auto text-gray-400" />
                </a>

                <a
                  href="https://www.linkedin.com/in/kaustubh-duse-75a531254/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-6 glass rounded-xl hover:bg-white/10 transition-all group"
                >
                  <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Linkedin size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">LinkedIn</div>
                    <div className="font-medium">kaustubh-duse</div>
                  </div>
                  <ExternalLink size={16} className="ml-auto text-gray-400" />
                </a>

                <a
                  href="mailto:kaustubhduse2004@gmail.com"
                  className="flex items-center gap-4 p-6 glass rounded-xl hover:bg-white/10 transition-all group"
                >
                  <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Email</div>
                    <div className="font-medium">
                      kaustubhduse2004@gmail.com
                    </div>
                  </div>
                </a>

                <a
                  href="tel:9321992789"
                  className="flex items-center gap-4 p-6 glass rounded-xl hover:bg-white/10 transition-all group"
                >
                  <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Phone</div>
                    <div className="font-medium">+91 9321992789</div>
                  </div>
                </a>
              </div>

              <div className="mt-10 pt-10 border-t border-white/5 text-center">
                <a
                  href="https://github.com/kaustubhduse/SportSync/blob/main/README.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                >
                  <ExternalLink size={16} />
                  View Full Documentation
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto text-center text-gray-400">
            <p>
              &copy; 2025 SportsSync Engineering. Built with passion and
              precision.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
