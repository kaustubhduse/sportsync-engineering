import React, { useEffect, useState, useRef } from "react";
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
  ZoomIn,
  ZoomOut,
  Maximize2,
} from "lucide-react";

const App = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef(null);

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

  // Touch/Swipe support for mobile - only when not zoomed
  useEffect(() => {
    if (!lightboxOpen) return;

    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    };

    const handleSwipe = () => {
      // Only allow swipe navigation when zoom is at 100%
      if (zoomLevel !== 1) return;

      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swiped left - next image
          navigateImage("next");
        } else {
          // Swiped right - previous image
          navigateImage("prev");
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [lightboxOpen, currentImageIndex, zoomLevel]);

  const openLightbox = (imageSrc) => {
    const index = architectureImages.findIndex((img) => img.src === imageSrc);
    if (index !== -1) {
      setCurrentImageIndex(index);
      setLightboxOpen(true);
      resetZoom();
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    resetZoom();
    document.body.style.overflow = "unset";
  };

  const navigateImage = (direction) => {
    resetZoom();
    if (direction === "next") {
      setCurrentImageIndex((prev) => (prev + 1) % architectureImages.length);
    } else {
      setCurrentImageIndex(
        (prev) =>
          (prev - 1 + architectureImages.length) % architectureImages.length
      );
    }
  };

  // Zoom functions
  const resetZoom = () => {
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const newZoom = Math.max(prev - 0.5, 1);
      if (newZoom === 1) {
        setImagePosition({ x: 0, y: 0 });
      }
      return newZoom;
    });
  };

  const handleResetZoom = () => {
    resetZoom();
  };

  // Mouse wheel zoom
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleWheel = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        setZoomLevel((prev) => {
          const newZoom = Math.max(1, Math.min(prev + delta, 4));
          if (newZoom === 1) {
            setImagePosition({ x: 0, y: 0 });
          }
          return newZoom;
        });
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [lightboxOpen]);

  // Pan/drag functionality
  const handleMouseDown = (e) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - imagePosition.x,
        y: e.clientY - imagePosition.y,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && zoomLevel > 1) {
      setImagePosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Enhanced Touch handling for mobile - Pinch zoom & Pan
  useEffect(() => {
    if (!lightboxOpen || !imageContainerRef.current) return;

    let initialDistance = 0;
    let initialZoom = 1;
    let touchStartX = 0;
    let touchStartY = 0;
    let lastTouchX = 0;
    let lastTouchY = 0;
    let isPanning = false;

    const getDistance = (touches) => {
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const handleTouchStart = (e) => {
      if (e.touches.length === 2) {
        // Two finger pinch zoom
        e.preventDefault();
        initialDistance = getDistance(e.touches);
        initialZoom = zoomLevel;
        isPanning = false;
      } else if (e.touches.length === 1 && zoomLevel > 1) {
        // Single finger pan when zoomed
        isPanning = true;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        lastTouchX = touchStartX;
        lastTouchY = touchStartY;
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 2) {
        // Pinch zoom
        e.preventDefault();
        const currentDistance = getDistance(e.touches);
        const scale = currentDistance / initialDistance;
        const newZoom = Math.max(1, Math.min(initialZoom * scale, 4));
        setZoomLevel(newZoom);
        if (newZoom === 1) {
          setImagePosition({ x: 0, y: 0 });
        }
      } else if (e.touches.length === 1 && isPanning && zoomLevel > 1) {
        // Pan
        e.preventDefault();
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const deltaX = currentX - lastTouchX;
        const deltaY = currentY - lastTouchY;

        setImagePosition((prev) => ({
          x: prev.x + deltaX,
          y: prev.y + deltaY,
        }));

        lastTouchX = currentX;
        lastTouchY = currentY;
      }
    };

    const handleTouchEnd = () => {
      isPanning = false;
    };

    const container = imageContainerRef.current;
    container.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [lightboxOpen, zoomLevel]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="bg-black text-white min-h-screen relative overflow-x-hidden w-full">
      {/* Subtle gradient overlay - minimal */}
      <div className="fixed inset-0 bg-gradient-to-br from-neutral-950 via-black to-neutral-950 pointer-events-none opacity-60"></div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 50 ? "glass-dark shadow-lg" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-3">
              <img
                src="sportsync_logo.jpg"
                alt="Logo"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full ring-2 ring-white/10"
              />
              <span className="text-sm md:text-xl font-semibold tracking-tight whitespace-nowrap">
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

      {/* Image Lightbox Modal - Mobile Optimized */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-xl flex flex-col"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Top Bar: Title, Counter, Close */}
          <div className="flex-shrink-0 glass-dark border-b border-white/5 px-3 py-3 md:px-6 md:py-4">
            <div className="flex items-center justify-between gap-3">
              {/* Counter & Title */}
              <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
                <span className="text-xs md:text-sm font-mono text-gray-400 whitespace-nowrap">
                  {currentImageIndex + 1}/{architectureImages.length}
                </span>
                <div className="w-px h-4 bg-white/20 hidden sm:block"></div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm md:text-lg font-semibold truncate">
                    {architectureImages[currentImageIndex].title}
                  </h3>
                  <p className="text-xs text-gray-400 hidden md:block truncate">
                    {architectureImages[currentImageIndex].description}
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="glass-dark w-9 h-9 md:w-11 md:h-11 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all group flex-shrink-0"
                aria-label="Close"
              >
                <X
                  size={20}
                  className="md:w-6 md:h-6 group-hover:rotate-90 transition-transform"
                />
              </button>
            </div>
          </div>

          {/* Floating Thumbnail Carousel - Bottom Positioned for Mobile */}
          <div className="absolute bottom-0 left-0 right-0 z-30 flex-shrink-0 glass-dark border-t border-white/5 md:relative md:border-t-0 md:border-b">
            {/* Mobile Zoom Controls */}
            <div className="md:hidden flex items-center justify-center gap-2 px-3 py-2 border-b border-white/5">
              <button
                onClick={handleZoomIn}
                disabled={zoomLevel >= 4}
                className="glass-dark w-9 h-9 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all disabled:opacity-30"
                aria-label="Zoom in"
              >
                <ZoomIn size={16} />
              </button>

              <div className="glass-dark px-3 py-1.5 rounded-lg text-xs font-mono min-w-[3rem] text-center">
                {Math.round(zoomLevel * 100)}%
              </div>

              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= 1}
                className="glass-dark w-9 h-9 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all disabled:opacity-30"
                aria-label="Zoom out"
              >
                <ZoomOut size={16} />
              </button>

              <button
                onClick={handleResetZoom}
                disabled={zoomLevel === 1}
                className="glass-dark w-9 h-9 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all disabled:opacity-30"
                aria-label="Reset"
              >
                <Maximize2 size={14} />
              </button>
            </div>

            {/* Thumbnail List */}
            <div className="flex gap-2 sm:gap-2.5 md:gap-3 overflow-x-auto scrollbar-thin px-3 py-3 sm:px-4 sm:py-4 snap-x snap-mandatory">
              {architectureImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentImageIndex(idx);
                    resetZoom();
                  }}
                  className={`relative flex-shrink-0 transition-all duration-200 snap-center ${
                    idx === currentImageIndex
                      ? "scale-110"
                      : "opacity-60 hover:opacity-100 scale-95"
                  }`}
                >
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-lg overflow-hidden border-2 transition-all ${
                      idx === currentImageIndex
                        ? "border-white shadow-lg shadow-white/20"
                        : "border-white/20"
                    }`}
                  >
                    <img
                      src={img.src}
                      alt={img.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {idx === currentImageIndex && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2/3 h-1 bg-white rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Main Image Area */}
          <div className="flex-1 relative min-h-0 pb-24 md:pb-0">
            {/* Navigation Arrows */}
            <button
              onClick={() => navigateImage("prev")}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-14 md:h-14 glass-dark rounded-lg md:rounded-xl flex items-center justify-center hover:bg-white/10 transition-all group"
              aria-label="Previous"
            >
              <ChevronLeft
                size={20}
                className="md:w-7 md:h-7 group-hover:-translate-x-1 transition-transform"
              />
            </button>

            <button
              onClick={() => navigateImage("next")}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-14 md:h-14 glass-dark rounded-lg md:rounded-xl flex items-center justify-center hover:bg-white/10 transition-all group"
              aria-label="Next"
            >
              <ChevronRight
                size={20}
                className="md:w-7 md:h-7 group-hover:translate-x-1 transition-transform"
              />
            </button>

            {/* Zoom Controls - Desktop Right Side */}
            <div className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 flex-col gap-2">
              <button
                onClick={handleZoomIn}
                disabled={zoomLevel >= 4}
                className="glass-dark w-10 h-10 md:w-11 md:h-11 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all disabled:opacity-30 group"
                aria-label="Zoom in"
              >
                <ZoomIn
                  size={18}
                  className="md:w-5 md:h-5 group-hover:scale-110 transition-transform"
                />
              </button>

              <div className="glass-dark px-3 py-2.5 rounded-lg text-xs font-mono flex items-center justify-center min-w-[3rem]">
                {Math.round(zoomLevel * 100)}%
              </div>

              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= 1}
                className="glass-dark w-10 h-10 md:w-11 md:h-11 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all disabled:opacity-30 group"
                aria-label="Zoom out"
              >
                <ZoomOut
                  size={18}
                  className="md:w-5 md:h-5 group-hover:scale-110 transition-transform"
                />
              </button>

              <button
                onClick={handleResetZoom}
                disabled={zoomLevel === 1}
                className="glass-dark w-10 h-10 md:w-11 md:h-11 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all disabled:opacity-30 group"
                aria-label="Reset"
              >
                <Maximize2
                  size={16}
                  className="md:w-4 md:h-4 group-hover:scale-110 transition-transform"
                />
              </button>
            </div>

            {/* Image Container */}
            <div
              ref={imageContainerRef}
              className="absolute inset-0 flex items-center justify-center p-2 md:p-4 overflow-hidden touch-none"
              style={{
                cursor:
                  zoomLevel > 1
                    ? isDragging
                      ? "grabbing"
                      : "grab"
                    : "default",
              }}
            >
              <img
                src={architectureImages[currentImageIndex].src}
                alt={architectureImages[currentImageIndex].title}
                className="max-w-full max-h-full object-contain rounded-lg transition-transform duration-200 select-none"
                style={{
                  transform: `scale(${zoomLevel}) translate(${
                    imagePosition.x / zoomLevel
                  }px, ${imagePosition.y / zoomLevel}px)`,
                  transformOrigin: "center center",
                }}
                onMouseDown={handleMouseDown}
                draggable={false}
              />
            </div>
          </div>

          {/* Bottom Hint - Desktop Only */}
          <div className="hidden md:block flex-shrink-0 glass-dark border-t border-white/5 px-4 py-2">
            <div className="flex items-center justify-center gap-3 text-xs text-gray-400">
              <span>Arrow keys: Navigate</span>
              <span>•</span>
              <span>Scroll/Pinch: Zoom</span>
              <span>•</span>
              <span>Drag: Pan</span>
              <span>•</span>
              <span>ESC: Close</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20">
          <div className="max-w-5xl mx-auto text-center w-full">
            <div className="mb-6 sm:mb-8 inline-block">
              <img
                src="sportsync_logo.jpg"
                alt="SportsSync"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto ring-4 ring-white/10"
              />
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold tracking-tight mb-4 sm:mb-6 px-2">
              Engineering behind
              <br />
              <span className="text-gray-400">SportsSync</span>
            </h1>

            <p className="text-base sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
              A scalable microservices architecture for real-time sports auction
              management
            </p>

            <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 px-4">
              <a
                href="#overview"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("overview");
                }}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition text-sm sm:text-base"
              >
                Explore Architecture
              </a>
              <a
                href="https://github.com/kaustubhduse/SportSync"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 sm:px-8 py-3 sm:py-4 glass border border-white/10 font-medium rounded-lg hover:bg-white/10 transition inline-flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Github size={18} className="sm:w-5 sm:h-5" />
                View on GitHub
              </a>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section id="overview" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">
                The Challenge
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-white mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              <div className="glass-dark p-6 sm:p-8 md:p-12 rounded-2xl">
                <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
                  The Problem
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm sm:text-base md:text-lg">
                  During sports auctions at our institute, the excitement was
                  real, but so was the <strong className="text-white font-semibold">confusion</strong>. Volunteers tried to track
                  every bid, but updates were either <strong className="text-white font-semibold">delayed or inconsistent</strong>. By
                  the time the auction ended, teams questioned <strong className="text-white font-semibold">who won which
                  player</strong>, and players weren't sure where they landed.
                </p>
              </div>

              <div className="glass-dark p-6 sm:p-8 md:p-12 rounded-2xl">
                <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
                  The Solution
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm sm:text-base md:text-lg">
                  SportsSync creates a <strong className="text-white font-semibold">centralized platform</strong> for managing sports
                  auctions efficiently. It ensures <strong className="text-white font-semibold">complete transparency</strong> by
                  displaying <strong className="text-white font-semibold">final bid amounts</strong> and <strong className="text-white font-semibold">team assignments</strong>, with data
                  seamlessly flowing into the <strong className="text-white font-semibold">Live Score Service</strong> for <strong className="text-white font-semibold">real-time
                  match management</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture Diagram */}
        <section
          id="architecture"
          className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-neutral-950/50"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">
                System Architecture
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-white mx-auto mb-6 sm:mb-8"></div>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4">
                High-level overview of the microservices architecture powering
                SportsSync
              </p>
            </div>

            <div
              className="glass-dark p-4 sm:p-6 md:p-8 rounded-2xl cursor-pointer hover:border-white/20 transition-all group"
              onClick={() => openLightbox("High-level.png")}
            >
              <img
                src="High-level.png"
                alt="Architecture Diagram"
                className="w-full h-auto rounded-xl group-hover:scale-[1.02] transition-transform"
              />
              <div className="text-center mt-3 sm:mt-4 text-xs sm:text-sm text-gray-400 group-hover:text-white transition-colors">
                Click to view full size
              </div>
            </div>
          </div>
        </section>

        {/* Microservices */}
        <section id="services" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">
                Microservices
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-white mx-auto mb-6 sm:mb-8"></div>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4">
                Seven specialized services working together to deliver a
                seamless experience
              </p>
            </div>

            <div className="space-y-6 sm:space-y-8">
              {/* Auth Service */}
              <div className="glass-dark rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all">
                <div className="p-6 sm:p-8 md:p-12">
                  <div className="flex items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-blue-500/10 rounded-xl flex items-center justify-center">
                      <Lock className="text-blue-400" size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2">
                        <span className="text-xs sm:text-sm font-mono text-gray-500">
                          01
                        </span>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
                          Auth Service
                        </h3>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed">
                        Manages user <strong className="text-white font-semibold">sign-up</strong>, <strong className="text-white font-semibold">login</strong>, and <strong className="text-white font-semibold">Google OAuth 2.0</strong> integration. 
                        Issues and validates <strong className="text-white font-semibold">JWTs</strong> for securing all
                        other services. Stores authentication details and
                        refresh tokens in <strong className="text-white font-semibold">Postgres</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8">
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
                <div className="p-6 sm:p-8 md:p-12">
                  <div className="flex items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-purple-500/10 rounded-xl flex items-center justify-center">
                      <Server className="text-purple-400" size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2">
                        <span className="text-xs sm:text-sm font-mono text-gray-500">
                          02
                        </span>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
                          User Service
                        </h3>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed">
                        Central <strong className="text-white font-semibold">user profile repository</strong> storing basic user data
                        and allowing <strong className="text-white font-semibold">profile updates</strong> (bio, avatar) after initial
                        creation. Stores user profile data in <strong className="text-white font-semibold">Postgres</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-8">
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
                        <span className="opacity-0 group-hover:opacity-100 text-xs sm:text-sm bg-white/10 backdrop-blur px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all">
                          Click to enlarge
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event Service */}
              <div className="glass-dark rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all">
                <div className="p-6 sm:p-8 md:p-12">
                  <div className="flex items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-green-500/10 rounded-xl flex items-center justify-center">
                      <Settings className="text-green-400" size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2">
                        <span className="text-xs sm:text-sm font-mono text-gray-500">
                          03
                        </span>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
                          Event Service
                        </h3>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed">
                        Handles <strong className="text-white font-semibold">creation and scheduling</strong> of sporting events.
                        Manages user registration as <strong className="text-white font-semibold">player or owner</strong> and
                        publishes participant data to <strong className="text-white font-semibold">RabbitMQ</strong>. Stores event
                        data in <strong className="text-white font-semibold">MongoDB</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-8">
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
                        <span className="opacity-0 group-hover:opacity-100 text-xs sm:text-sm bg-white/10 backdrop-blur px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all">
                          Click to enlarge
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Auction Service */}
              <div className="glass-dark rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all">
                <div className="p-6 sm:p-8 md:p-12">
                  <div className="flex items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-yellow-500/10 rounded-xl flex items-center justify-center">
                      <ShoppingCart className="text-yellow-400" size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2">
                        <span className="text-xs sm:text-sm font-mono text-gray-500">
                          04
                        </span>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
                          Auction Service
                        </h3>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed">
                        Consumes participant messages from <strong className="text-white font-semibold">RabbitMQ</strong> for live
                        player auctions. Uses <strong className="text-white font-semibold">Socket.IO</strong> for <strong className="text-white font-semibold">real-time bid
                        updates</strong> and <strong className="text-white font-semibold">Redis</strong> for quick access. Bidding handled
                        through <strong className="text-white font-semibold">Redis + Lua atomic script</strong> ensuring <strong className="text-white font-semibold">FCFS
                        fairness</strong>. Stores data in <strong className="text-white font-semibold">MongoDB</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8">
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
                        <span className="opacity-0 group-hover:opacity-100 text-xs sm:text-sm bg-white/10 backdrop-blur px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all">
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
                        <span className="opacity-0 group-hover:opacity-100 text-xs sm:text-sm bg-white/10 backdrop-blur px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all">
                          Click to enlarge
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Score Service */}
              <div className="glass-dark rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all">
                <div className="p-6 sm:p-8 md:p-12">
                  <div className="flex items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-red-500/10 rounded-xl flex items-center justify-center">
                      <Radio className="text-red-400" size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2">
                        <span className="text-xs sm:text-sm font-mono text-gray-500">
                          05
                        </span>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
                          Live Score Service
                        </h3>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed">
                        Provides <strong className="text-white font-semibold">real-time score updates</strong> using <strong className="text-white font-semibold">Socket.IO</strong>.
                        Prioritizes <strong className="text-white font-semibold">Redis cache</strong> for fast retrieval and fetches
                        <strong className="text-white font-semibold">team rosters</strong> from Auction Service. Stores match data in
                        <strong className="text-white font-semibold">MongoDB</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-8">
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
                        <span className="opacity-0 group-hover:opacity-100 text-xs sm:text-sm bg-white/10 backdrop-blur px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all">
                          Click to enlarge
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RAG Agent Service */}
              <div className="glass-dark rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all">
                <div className="p-6 sm:p-8 md:p-12">
                  <div className="flex items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-cyan-500/10 rounded-xl flex items-center justify-center">
                      <Bot className="text-cyan-400" size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2">
                        <span className="text-xs sm:text-sm font-mono text-gray-500">
                          06
                        </span>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
                          RAG Agent Service
                        </h3>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed">
                        <strong className="text-white font-semibold">Q&A layer</strong> using <strong className="text-white font-semibold">LangChain and LLMs</strong> to generate insights
                        from system data. Accesses <strong className="text-white font-semibold">all service databases</strong> and
                        uses <strong className="text-white font-semibold">Pinecone</strong> for <strong className="text-white font-semibold">semantic search</strong> capabilities.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-8">
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
                        <span className="opacity-0 group-hover:opacity-100 text-xs sm:text-sm bg-white/10 backdrop-blur px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all">
                          Click to enlarge
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Deployment Service */}
              <div className="glass-dark rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all">
                <div className="p-6 sm:p-8 md:p-12">
                  <div className="flex items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
                    <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                      <Cloud className="text-indigo-400" size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2">
                        <span className="text-xs sm:text-sm font-mono text-gray-500">
                          07
                        </span>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
                          Deployment
                        </h3>
                      </div>
                      <p className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed">
                        Deployment handled by <strong className="text-white font-semibold">Docker</strong> and orchestrated by <strong className="text-white font-semibold">AWS
                        EKS</strong>. Automated using <strong className="text-white font-semibold">Jenkins CI/CD pipeline</strong>, pushing to
                        <strong className="text-white font-semibold">DockerHub</strong> with <strong className="text-white font-semibold">ArgoCD</strong> managing deployment. Monitored by
                        <strong className="text-white font-semibold">Prometheus and Grafana</strong>.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-8">
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
                        <span className="opacity-0 group-hover:opacity-100 text-xs sm:text-sm bg-white/10 backdrop-blur px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all">
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
        <section
          id="stack"
          className="py-16 sm:py-24 md:py-32 px-4 sm:px-6 bg-neutral-950/50"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">
                Tech Stack
              </h2>
              <div className="w-16 sm:w-20 h-1 bg-white mx-auto mb-6 sm:mb-8"></div>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4">
                Modern technologies powering a scalable, distributed system
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  icon: Database,
                  name: "Postgres",
                  usage: "Auth-Service & User-Service",
                  why: "Structured relational data (user accounts and profile fields) that requires strong consistency and transactional integrity.",
                  color: "blue",
                },
                {
                  icon: Code,
                  name: "Prisma ORM",
                  usage: "With PostgreSQL",
                  why: "Familiar syntax, less boilerplate code and fewer bugs.",
                  color: "purple",
                },
                {
                  icon: Database,
                  name: "MongoDB",
                  usage: "Event, Auction & Live-Score Services",
                  why: "Flexible document schema for rapidly changing data.",
                  color: "green",
                },
                {
                  icon: Radio,
                  name: "Socket.IO",
                  usage: "Real-time Communication",
                  why: "Enables instant bid updates and live score updates.",
                  color: "yellow",
                },
                {
                  icon: Database,
                  name: "Redis",
                  usage: "Caching",
                  why: "Fast read access to frequently requested, non-permanent data.",
                  color: "red",
                },
                {
                  icon: Layers,
                  name: "RabbitMQ",
                  usage: "Message Queues",
                  why: "Decouples services and enables asynchronous communication.",
                  color: "orange",
                },
                {
                  icon: Bot,
                  name: "Langchain",
                  usage: "AI Agent",
                  why: "Provides a framework for building and managing AI agents.",
                  color: "cyan",
                },
                {
                  icon: Bot,
                  name: "OpenAI LLM",
                  usage: "AI Analysis",
                  why: "Leverages advanced language models for natural language understanding.",
                  color: "teal",
                },
                {
                  icon: Container,
                  name: "Docker",
                  usage: "Containerization",
                  why: "Ensures consistent environments across development and production.",
                  color: "blue",
                },
                {
                  icon: Settings,
                  name: "Kubernetes",
                  usage: "Orchestration",
                  why: "Automates deployment, scaling, and management of containerized applications.",
                  color: "indigo",
                },
                {
                  icon: GitBranch,
                  name: "Jenkins",
                  usage: "CI",
                  why: "Automates the software development process, enabling continuous integration.",
                  color: "red",
                },
                {
                  icon: GitBranch,
                  name: "ArgoCD",
                  usage: "CD",
                  why: "Enables continuous delivery and deployment of applications.",
                  color: "orange",
                },
                {
                  icon: Cloud,
                  name: "AWS EC2",
                  usage: "Deployment",
                  why: "Provides scalable compute capacity in the cloud.",
                  color: "yellow",
                },
                {
                  icon: Cloud,
                  name: "AWS EKS",
                  usage: "Container Orchestration",
                  why: "Simplifies running Kubernetes on AWS without needing to install and operate your own Kubernetes control plane.",
                  color: "indigo",
                },
                {
                  icon: Server,
                  name: "Prometheus & Grafana",
                  usage: "Monitoring",
                  why: "Provides powerful monitoring and visualization capabilities for the entire system.",
                  color: "orange",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="glass-dark p-4 sm:p-5 md:p-6 rounded-xl border border-white/5 hover:border-white/10 transition-all group"
                >
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 bg-${item.color}-500/10 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <item.icon className={`text-${item.color}-400`} size={20} />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                    for {item.usage}
                  </p>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-white/90">Why?</p>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                      {item.why}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="py-12 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-10 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 md:mb-6">
                Get in Touch
              </h2>
              <div className="w-12 sm:w-16 md:w-20 h-1 bg-white mx-auto mb-4 sm:mb-6 md:mb-8"></div>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-400 px-4">
                Let's connect and discuss engineering
              </p>
            </div>

            <div className="glass-dark p-4 sm:p-6 md:p-8 lg:p-12 rounded-xl sm:rounded-2xl border border-white/5">
              <div className="text-center mb-8 sm:mb-10 md:mb-12">
                <h3 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">
                  Kaustubh Duse
                </h3>
                <p className="text-sm sm:text-base text-gray-400">
                  Full Stack Developer
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                <a
                  href="https://github.com/kaustubhduse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 glass rounded-lg sm:rounded-xl hover:bg-white/10 transition-all group"
                >
                  <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-white/5 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                    <Github size={20} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs sm:text-sm text-gray-400">
                      GitHub
                    </div>
                    <div className="font-medium text-sm sm:text-base truncate">
                      kaustubhduse
                    </div>
                  </div>
                  <ExternalLink
                    size={14}
                    className="sm:w-4 sm:h-4 text-gray-400 flex-shrink-0"
                  />
                </a>

                <a
                  href="https://www.linkedin.com/in/kaustubh-duse-75a531254/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 glass rounded-lg sm:rounded-xl hover:bg-white/10 transition-all group"
                >
                  <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-white/5 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                    <Linkedin
                      size={20}
                      className="sm:w-5 sm:h-5 md:w-6 md:h-6"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs sm:text-sm text-gray-400">
                      LinkedIn
                    </div>
                    <div className="font-medium text-sm sm:text-base truncate">
                      kaustubh-duse
                    </div>
                  </div>
                  <ExternalLink
                    size={14}
                    className="sm:w-4 sm:h-4 text-gray-400 flex-shrink-0"
                  />
                </a>

                <a
                  href="mailto:kaustubhduse2004@gmail.com"
                  className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 glass rounded-lg sm:rounded-xl hover:bg-white/10 transition-all group"
                >
                  <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-white/5 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                    <Mail size={20} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs sm:text-sm text-gray-400">
                      Email
                    </div>
                    <div className="font-medium text-sm sm:text-base truncate">
                      kaustubhduse2004@gmail.com
                    </div>
                  </div>
                </a>

                <a
                  href="tel:9321992789"
                  className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 glass rounded-lg sm:rounded-xl hover:bg-white/10 transition-all group"
                >
                  <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-white/5 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                    <Phone size={20} className="sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs sm:text-sm text-gray-400">
                      Phone
                    </div>
                    <div className="font-medium text-sm sm:text-base">
                      +91 9321992789
                    </div>
                  </div>
                </a>
              </div>

              <div className="mt-6 sm:mt-8 md:mt-10 pt-6 sm:pt-8 md:pt-10 border-t border-white/5 text-center">
                <a
                  href="https://github.com/kaustubhduse/SportSync/blob/main/README.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm sm:text-base text-gray-400 hover:text-white transition-colors"
                >
                  <ExternalLink size={14} className="sm:w-4 sm:h-4" />
                  View Full Documentation
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-6 sm:py-8 md:py-12 px-4 sm:px-6 border-t border-white/5">
          <div className="max-w-7xl mx-auto text-center text-gray-400">
            <p className="text-xs sm:text-sm md:text-base leading-relaxed">
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
