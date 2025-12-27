import { useTheme } from "../theme/ThemeProvider";

/**
 * Contact Page
 * Contact information and form
 * Uses centralized theme system
 */
const Contact = () => {
  const theme = useTheme();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div
        className={`relative overflow-hidden bg-gradient-to-br ${theme.gradients.hero}`}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-white/90">Get in touch with us</p>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Contact Form */}
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 shadow-xl">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                  placeholder="Your message here..."
                />
              </div>

              <button
                type="submit"
                className={`w-full px-6 py-3 bg-gradient-to-r ${theme.gradients.primary} text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 shadow-lg`}
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Other Ways to Reach Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 text-center hover:border-blue-500/50 transition-all">
                <div className="text-4xl mb-3">📧</div>
                <h3 className="font-semibold text-white mb-2">Email</h3>
                <p className="text-slate-300">contact@gamecenter.com</p>
              </div>
              <div className="bg-slate-800/80 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 text-center hover:border-purple-500/50 transition-all">
                <div className="text-4xl mb-3">💬</div>
                <h3 className="font-semibold text-white mb-2">Support</h3>
                <p className="text-slate-300">support@gamecenter.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
