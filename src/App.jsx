import React, { useEffect, useState } from "react";

const App = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-gray-100 min-h-screen font-sans relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-3/4 left-1/3 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 p-8 flex flex-col items-center">
        {/* Header */}
        <header
          className="my-20 flex flex-col items-center"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          <div className="relative mb-12 group">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition duration-500"></div>
            <img
              src="sportsync_logo.jpg"
              alt="SportsSync Logo"
              className="relative w-36 h-36 rounded-full shadow-2xl transform transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <h1
            className="text-7xl font-black text-center tracking-tight leading-tight mb-4"
            style={{
              fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
            }}
          >
            Engineering behind{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text animate-pulse">
              SportsSync
            </span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
        </header>

        {/* Warming up */}
        <section className="mb-24 text-center max-w-4xl">
          <h2
            className="text-5xl font-bold mb-8 bg-gradient-to-r from-yellow-300 to-orange-400 text-transparent bg-clip-text"
            style={{
              fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
            }}
          >
            Setting the stage: What, Why, and How?
          </h2>

          <p
            className="text-xl text-gray-300 leading-relaxed"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            First, I will cover the problem this application aims to solve. Then
            we move quickly to the high-level design. After that, we will see
            the architecture of all the micro-services and finally the tech
            stack.
          </p>
        </section>

        {/* Problem */}
        <section className="mb-24 max-w-4xl">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-3xl p-12 border border-slate-700/50 shadow-2xl">
            <h2
              className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-300 to-blue-400 text-transparent bg-clip-text"
              style={{
                fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
              }}
            >
              In our institute...
            </h2>
            <div
              className="space-y-6 text-lg text-gray-300 leading-relaxed"
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            >
              <p>
                During sports auctions at our institute, the excitement was
                real, but so was the confusion. Volunteers tried to track every
                bid, but updates were either delayed or inconsistent. By the
                time the auction ended, teams sometimes questioned who won which
                player, and players weren't sure where they landed.
              </p>
              <p>
                The main goal behind building{" "}
                <span className="text-yellow-300 font-bold">SportsSync </span>
                was to create a centralized platform for managing sports
                auctions efficiently. It ensures complete transparency by
                displaying the final bid amount for each player and clearly
                showing which team has drafted which player — eliminating any
                confusion. Once the auction concludes, all the data seamlessly
                flows into the
                <span className="text-yellow-300 font-bold">
                  {" "}
                  Live Score Service
                </span>
                , where the admin can easily create and manage matches between
                the teams in real time.
              </p>
            </div>
          </div>
        </section>

        {/* High-level Design */}
        <section className="mb-24 w-full max-w-7xl">
          <h2
            className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-green-300 to-emerald-400 text-transparent bg-clip-text"
            style={{
              fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
            }}
          >
            High-Level Diagram
          </h2>
          <p
            className="mb-8 text-center text-xl text-gray-300"
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            Here is a high-level diagram of how SportsSync works:
          </p>
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-8 rounded-3xl border border-slate-700/50 shadow-2xl flex justify-center items-center hover:border-slate-600/50 transition-all duration-300">
            <img
              src="High-level.png"
              alt="High-Level Diagram"
              className="w-full h-auto max-h-[90vh] rounded-2xl object-contain shadow-xl"
            />
          </div>
        </section>

        {/* Microservices */}
        <section className="mb-24 w-full max-w-6xl">
          <h2
            className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-violet-300 to-fuchsia-400 text-transparent bg-clip-text"
            style={{
              fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
            }}
          >
            Microservices Architecture
          </h2>

          <div className="space-y-20">
            {/* Auth Service */}
            <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-3xl p-10 border border-slate-700/50 shadow-2xl hover:border-blue-500/30 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl font-black text-blue-400">01</span>
                <h3
                  className="text-3xl font-bold text-blue-300"
                  style={{
                    fontFamily:
                      "'Inter', 'SF Pro Display', system-ui, sans-serif",
                  }}
                >
                  Auth-Service
                </h3>
              </div>
              <p
                className="mb-8 text-lg text-gray-300 leading-relaxed"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                Manages user sign-up, login, and Google OAuth 2.0 integration.
                Its main job is to issue and validate JWTs for securing all
                other services. Stores user authentication details and refresh
                tokens in Postgres.
              </p>

              <div className="flex justify-center items-start gap-6 flex-wrap w-full">
                <img
                  src="Auth-service.png"
                  alt="Auth Service Flow"
                  className="w-[48%] min-w-[300px] h-auto rounded-2xl shadow-2xl border border-slate-700/50 hover:scale-[1.02] transition-transform duration-300"
                />
                <img
                  src="Google-Oauth-2.0.png"
                  alt="Auth Service Database Diagram"
                  className="w-[48%] min-w-[300px] h-auto rounded-2xl shadow-2xl border border-slate-700/50 hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
            </div>

            {/* User Service */}
            <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-3xl p-10 border border-slate-700/50 shadow-2xl hover:border-purple-500/30 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl font-black text-purple-400">02</span>
                <h3
                  className="text-3xl font-bold text-purple-300"
                  style={{
                    fontFamily:
                      "'Inter', 'SF Pro Display', system-ui, sans-serif",
                  }}
                >
                  User-Service
                </h3>
              </div>
              <p
                className="mb-8 text-lg text-gray-300 leading-relaxed"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                Acts as the central user profile repository for the entire
                application. It stores basic user data and allows profile
                updates (bio, avatar) after the initial creation request from
                the Auth Service. Stores user profile data in Postgres.
              </p>
              <img
                src="user-service.png"
                alt="User Service Diagram"
                className="w-full h-auto rounded-2xl mx-auto shadow-2xl border border-slate-700/50 hover:scale-[1.01] transition-transform duration-300"
              />
            </div>

            {/* Event Service */}
            <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-3xl p-10 border border-slate-700/50 shadow-2xl hover:border-green-500/30 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl font-black text-green-400">03</span>
                <h3
                  className="text-3xl font-bold text-green-300"
                  style={{
                    fontFamily:
                      "'Inter', 'SF Pro Display', system-ui, sans-serif",
                  }}
                >
                  Event-Service
                </h3>
              </div>
              <p
                className="mb-8 text-lg text-gray-300 leading-relaxed"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                Handles the creation and scheduling of sporting events by
                administrators. It manages user registration as a player or
                owner and publishes participant data to RabbitMQ for
                asynchronous processing. Stores event data in MongoDB.
              </p>
              <img
                src="Event-service.png"
                alt="Event Service Diagram"
                className="w-full h-auto rounded-2xl mx-auto shadow-2xl border border-slate-700/50 hover:scale-[1.01] transition-transform duration-300"
              />
            </div>

            {/* Auction Service */}
            <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-3xl p-10 border border-slate-700/50 shadow-2xl hover:border-yellow-500/30 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl font-black text-yellow-400">04</span>
                <h3
                  className="text-3xl font-bold text-yellow-300"
                  style={{
                    fontFamily:
                      "'Inter', 'SF Pro Display', system-ui, sans-serif",
                  }}
                >
                  Auction-Service
                </h3>
              </div>
              <p
                className="mb-8 text-lg text-gray-300 leading-relaxed"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                Consumes participant messages from RabbitMQ and is responsible
                for conducting the live player/team auction. It uses Socket.IO
                for real-time bid updates and Redis for quick access to live
                auction rosters. Stores auction data in MongoDB.
              </p>
              <img
                src="Auction-service.png"
                alt="Auction Service Diagram"
                className="w-full h-auto rounded-2xl mx-auto shadow-2xl border border-slate-700/50 hover:scale-[1.01] transition-transform duration-300"
              />
            </div>

            {/* Live Score Service */}
            <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-3xl p-10 border border-slate-700/50 shadow-2xl hover:border-red-500/30 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl font-black text-red-400">05</span>
                <h3
                  className="text-3xl font-bold text-red-300"
                  style={{
                    fontFamily:
                      "'Inter', 'SF Pro Display', system-ui, sans-serif",
                  }}
                >
                  Live-Score-Service
                </h3>
              </div>
              <p
                className="mb-8 text-lg text-gray-300 leading-relaxed"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                Provides real-time score updates for ongoing matches, relying on
                Socket.IO to broadcast data to clients instantly. It prioritizes
                Redis cache for fast retrieval and fetches finalized team
                rosters from the Auction Service. Stores match score data in
                MongoDB.
              </p>
              <img
                src="Live-score-service.png"
                alt="Live Score Service Diagram"
                className="w-full h-auto rounded-2xl mx-auto shadow-2xl border border-slate-700/50 hover:scale-[1.01] transition-transform duration-300"
              />
            </div>

            {/* RAG Agent Service */}
            <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-3xl p-10 border border-slate-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl font-black text-cyan-400">06</span>
                <h3
                  className="text-3xl font-bold text-cyan-300"
                  style={{
                    fontFamily:
                      "'Inter', 'SF Pro Display', system-ui, sans-serif",
                  }}
                >
                  RAG-Agent-Service
                </h3>
              </div>
              <p
                className="mb-8 text-lg text-gray-300 leading-relaxed"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                Acts as a Q&A layer for the entire system, using LangChain and
                LLMs to generate insights from stored system data. It accesses
                all service databases (Postgres and MongoDB) and uses Pinecone
                for semantic search capabilities.
              </p>
              <img
                src="Cron-Jobs.png"
                alt="RAG Agent Service Diagram"
                className="w-full h-auto rounded-2xl mx-auto shadow-2xl border border-slate-700/50 hover:scale-[1.01] transition-transform duration-300"
              />
            </div>

            <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-sm rounded-3xl p-10 border border-slate-700/50 shadow-2xl hover:border-cyan-500/30 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-5xl font-black text-cyan-400">06</span>
                <h3
                  className="text-3xl font-bold text-cyan-300"
                  style={{
                    fontFamily:
                      "'Inter', 'SF Pro Display', system-ui, sans-serif",
                  }}
                >
                  Deployment-side
                </h3>
              </div>
              <p
                className="mb-8 text-lg text-gray-300 leading-relaxed"
                style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
              >
                Microservices deployment is handled by Docker for
                containerization and orchestrated by AWS EKS (Elastic Kubernetes
                Service). The process is automated using a Jenkins CI/CD
                pipeline, which pushes images to DockerHub and uses ArgoCD to
                manage the continuous deployment to the EKS cluster. Prometheus
                and Grafana provide monitoring for the running services.
              </p>
              <img
                src="Deployment-service.png"
                alt="Deployment Diagram"
                className="w-full h-auto rounded-2xl mx-auto shadow-2xl border border-slate-700/50 hover:scale-[1.01] transition-transform duration-300"
              />
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-24 w-full max-w-5xl text-center mx-auto">
          <h2
            className="text-5xl font-bold mb-12 bg-gradient-to-r from-orange-300 to-rose-400 text-transparent bg-clip-text"
            style={{
              fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif",
            }}
          >
            Tech Stack
          </h2>

          <div
            className="grid gap-8 text-left grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mx-auto" // <-- ADDED grid-cols-* and mx-auto for centering
            style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
          >
            {[
              {
                tech: "Postgres",
                why: "structured relational data (user accounts and profile fields) that requires strong consistency and transactional integrity.",
                services: "auth-Service and user-service",
              },
              {
                tech: "Prisma ORM",
                why: "familiar syntax, less boilerplate code and fewer bugs.",
                services: "with PostgreSQL",
              },
              {
                tech: "MongoDB",
                why: "flexible document schema for rapidly changing data.",
                services: "event, auction and live-score services",
              },
              {
                tech: "Socket.IO",
                why: "enables instant bid updates and live score updates.",
                services: "real-time communication",
              },
              {
                tech: "Redis",
                why: "fast read access to frequently requested, non-permanent data.",
                services: "caching",
              },
              {
                tech: "RabbitMQ",
                why: "decouples services and enables asynchronous communication.",
                services: "message queues",
              },
              {
                tech: "Langchain",
                why: "provides a framework for building and managing AI agents.",
                services: "AI agent",
              },
              {
                tech: "OpenAI LLM",
                why: "leverages advanced language models for natural language understanding.",
                services: "AI analysis",
              },
              {
                tech: "Docker",
                why: "ensures consistent environments across development and production.",
                services: "containerization",
              },
              {
                tech: "Kubernetes",
                why: "automates deployment, scaling, and management of containerized applications.",
                services: "orchestration",
              },
              {
                tech: "Jenkins",
                why: "automates the software development process, enabling continuous integration.",
                services: "CI",
              },
              {
                tech: "ArgoCD",
                why: "enables continuous delivery and deployment of applications.",
                services: "CD",
              },
              {
                tech: "AWS EC2",
                why: "provides scalable compute capacity in the cloud.",
                services: "deployment",
              },
              {
                tech: "AWS EKS",
                why: "simplifies running Kubernetes on AWS without needing to install and operate your own Kubernetes control plane.",
                services: "container orchestration",
              },
              {
                tech: "Prometheus & Grafana",
                why: "provides powerful monitoring and visualization capabilities for the entire system.",
                services: "monitoring",
              },
            ].map((item, idx) => (
              <div key={idx} className="text-gray-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-bold text-lg text-yellow-300">
                        {item.tech}
                      </span>
                      <span className="text-sm text-white">
                        for {item.services}
                      </span>
                      <span className="text-purple-300 font-semibold">
                        Why?
                      </span>
                    </div>
                    <p className="text-gray-400 text-base">{item.why}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
      className="mb-24 w-full max-w-2xl mx-auto p-6 bg-gray-800 rounded-lg shadow-xl flex flex-col items-center justify-center space-y-6"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* Optional: Add a section title if desired */}
      <h2 className="text-4xl font-bold text-center text-blue-300">
        Connect with the Developer
      </h2>

      <div className="text-center space-y-3">
        {/* Full Documentation Link */}
        <p className="text-lg">
          <a
            href="https://github.com/kaustubhduse/SportSync/blob/main/README.md"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-200 font-semibold underline transition-colors duration-200"
          >
            View Full Project Documentation (README.md)
          </a>
        </p>

        {/* LinkedIn */}
        <p className="text-lg text-gray-300">
          LinkedIn:{" "}
          <a
            href="https://www.linkedin.com/in/kaustubh-duse-75a531254/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-200 underline transition-colors duration-200"
          >
            kaustubh-duse
          </a>
        </p>

        {/* GitHub */}
        <p className="text-lg text-gray-300">
          GitHub:{" "}
          <a
            href="https://github.com/kaustubhduse"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-200 underline transition-colors duration-200"
          >
            kaustubhduse
          </a>
        </p>
        <p className="text-lg text-gray-300">
          Gmail:{" "}
          <a
            href="mailto:kaustubhduse2004@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-200 underline transition-colors duration-200"
          >
            kaustubhduse2004@gmail.com
          </a>
        </p>

        {/* Name and Phone */}
        <div className="pt-4 border-t border-gray-700 mt-4"> {/* Separator line */}
          <p className="text-xl text-white font-semibold">
            Developed by Kaustubh Duse
          </p>
          <p className="text-gray-400 text-base">9321992789</p>
        </div>
      </div>
    </section>

        {/* Footer */}
        <footer
          className="text-gray-600 mt-16 text-center pb-12"
          style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
        >
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4"></div>
          <p className="text-lg">&copy; 2025 SportsSync</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
