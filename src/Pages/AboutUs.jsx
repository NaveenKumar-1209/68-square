import { useTheme } from "../theme/ThemeProvider";

/**
 * About Us Page
 * Information about the Game Center application
 * Uses centralized theme system
 */
const AboutUs = () => {
  const theme = useTheme();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div
        className={`relative overflow-hidden bg-gradient-to-br ${theme.gradients.hero}`}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              About Us
            </h1>
            <p className="text-xl text-white/90">
              Learn more about Game Center
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            <section className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
              <h2 className="text-3xl font-bold text-white mb-4">
                Welcome to Game Center
              </h2>
              <p className="text-lg leading-relaxed text-slate-200">
                Game Center is a modern, interactive gaming platform built with
                React. We provide a collection of classic and modern games for
                you to enjoy. Our mission is to create an engaging and
                user-friendly gaming experience.
              </p>
            </section>

            <section className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
              <h2 className="text-3xl font-bold text-white mb-6">
                Our Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Multiple classic board games",
                  "Beautiful, modern user interface",
                  "Responsive design for all devices",
                  "Easy navigation and intuitive controls",
                  "Regular updates with new games",
                  "100% free to play",
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-4 bg-slate-700/30 rounded-lg border border-slate-600/50"
                  >
                    <span className="text-blue-400 text-xl">✓</span>
                    <span className="text-slate-200">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
              <h2 className="text-3xl font-bold text-white mb-6">
                Technology Stack
              </h2>
              <p className="text-lg leading-relaxed text-slate-200 mb-6">
                Game Center is built using modern web technologies:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-6 rounded-xl border border-blue-500/30">
                  <h3 className="font-semibold text-white mb-3 text-lg">
                    Frontend
                  </h3>
                  <p className="text-slate-300">
                    React 19, React Router, Tailwind CSS
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 p-6 rounded-xl border border-purple-500/30">
                  <h3 className="font-semibold text-white mb-3 text-lg">
                    Architecture
                  </h3>
                  <p className="text-slate-300">
                    Monorepo structure, Component-based design
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
              <h2 className="text-3xl font-bold text-white mb-4">
                Our Mission
              </h2>
              <p className="text-lg leading-relaxed text-slate-200">
                We believe that gaming should be accessible, enjoyable, and
                engaging. Game Center brings together classic games in a modern,
                easy-to-use platform. Whether you're looking to play chess,
                checkers, or other board games, we've got you covered.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
