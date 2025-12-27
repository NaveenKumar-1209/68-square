import { useTheme } from "../theme/ThemeProvider";
import Resume from "../components/Resume/Resume";
import { downloadResume, downloadResumeAsHTML } from "../utils/downloadResume";

/**
 * Portfolio Page
 * Professional portfolio showcasing skills, experience, and education
 * Uses centralized theme system
 */
const AboutUs = () => {
  const theme = useTheme();

  const handleDownloadPDF = () => {
    downloadResume();
  };

  const handleDownloadHTML = () => {
    downloadResumeAsHTML();
  };

  const coreSkills = [
    "React.js",
    "JavaScript",
    "React-Native",
    "Next.js",
    "Node.js",
    "TypeScript",
    "DBMS (MySQL, MongoDB)",
    "HTML/HTML5",
    "CSS/CSS3/SASS",
  ];

  const technologies = [
    "Redux",
    "Material-UI",
    "Bootstrap",
    "WebPack",
    "Babel",
    "Google Analytics",
    "Ant-design",
    "Strapi-io",
    "Git",
    "Firebase",
  ];

  const workExperience = [
    {
      company: "GNX Infinity Pvt. Ltd.",
      position: "SOFTWARE DEVELOPER",
      period: "NOV 2021 – PRESENT",
      projects: [
        {
          name: "SuperTeach Studio",
          description:
            "Built a slide-editing platform enabling teachers to create visually stunning presentations.",
          achievements: [
            "Implemented dynamic resizing, drag-and-drop functionality, and custom component rendering",
            "Integrated rich text formatting, image uploads, and shape editing tools for versatile slide creation",
          ],
          techStack: ["React.js", "Material-UI", "Redux", "Strapi.io"],
        },
        {
          name: "SuperReach Chrome Extension",
          description:
            "Developed a Chrome extension to extract real-time data from websites using Mutation Observer.",
          achievements: [
            "Integrated custom iframe into website's DOM for seamless user interaction",
            "Optimized data processing algorithms, reducing response times by 28%",
            "Published on Chrome Web Store",
          ],
          techStack: [
            "React.js",
            "Material-UI",
            "Redux",
            "Sails.js",
            "Socket.io",
          ],
        },
        {
          name: "SuperReach Learning Platform (AI Chatbot)",
          description:
            "Designed and developed an AI-powered chatbot using ChatGPT API for personalized feedback.",
          achievements: [
            "Integrated AWS Voice-to-Text (Transcribe) for seamless speech input",
            "Built user-friendly frontend using Vite and React.js",
            "Achieved 25% improvement in user communication effectiveness",
          ],
          techStack: [
            "React.js",
            "Material-UI",
            "Redux",
            "Node.js",
            "MongoDB",
            "Express.js",
          ],
        },
      ],
    },
    {
      company: "Evelyn Learning System",
      position: "SOFTWARE DEVELOPER",
      period: "MAY 2019 – JULY 2021",
      projects: [
        {
          name: "Lifely Web-app and Mobile app",
          description:
            "Developed a food delivery platform with responsive web app and cross-platform mobile app.",
          achievements: [
            "Integrated secure payment gateways and real-time order tracking",
            "Optimized performance, achieving 19% faster load time compared to similar platforms",
          ],
          techStack: ["React.js", "Bootstrap", "Redux-saga", "Moment"],
        },
      ],
    },
  ];

  const education = [
    {
      degree: "B.Tech. (Electrical Engineering)",
      percentage: "65.3% Aggregate",
      institution: "Kamla Nehru Institute of Technology, Sultanpur, UP",
      year: "2014-18",
    },
    {
      degree: "Class 12",
      percentage: "85.2%",
      institution: "Smith Inter College, Azamgarh, UP",
      year: "2013",
    },
    {
      degree: "Class 11",
      percentage: "75.3%",
      institution: "Smith Inter College, Azamgarh, UP",
      year: "2011",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div
        className={`relative overflow-hidden bg-gradient-to-br ${theme.gradients.hero}`}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <div className="inline-block px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <span className="text-white/90 text-sm font-medium">
                  👨‍💻 SOFTWARE DEVELOPER
                </span>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              NAVEEN KUMAR
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Building modern web applications with React & Node.js
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+917007450894"
                className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg border border-white/20 hover:bg-white/20 transition-all"
              >
                📱 +91 7007450894
              </a>
              <a
                href="mailto:nkc.2096@gmail.com"
                className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg border border-white/20 hover:bg-white/20 transition-all"
              >
                ✉️ nkc.2096@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/naveen-kumar-19077712a/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg border border-white/20 hover:bg-white/20 transition-all"
              >
                💼 LinkedIn
              </a>
              <button
                onClick={handleDownloadPDF}
                className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all shadow-lg flex items-center gap-2 transform hover:scale-105"
              >
                <span>📄</span>
                <span>Download Resume</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Core Skills */}
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                <span className="mr-3">🎯</span> Core Skills
              </h2>
              <div className="flex flex-wrap gap-3">
                {coreSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg border border-blue-500/30 text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                <span className="mr-3">⚙️</span> Technologies
              </h2>
              <div className="flex flex-wrap gap-3">
                {technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-lg border border-purple-500/30 text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Work Experience */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-white mb-8 flex items-center">
              <span className="mr-3">💼</span> Work Experience
            </h2>
            <div className="space-y-8">
              {workExperience.map((work, workIndex) => (
                <div
                  key={workIndex}
                  className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50"
                >
                  <div className="mb-6 pb-6 border-b border-slate-700/50">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {work.company}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-slate-300">
                      <span className="text-blue-400 font-semibold">
                        {work.position}
                      </span>
                      <span className="text-sm">•</span>
                      <span className="text-sm">{work.period}</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {work.projects.map((project, projectIndex) => (
                      <div
                        key={projectIndex}
                        className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/50"
                      >
                        <h4 className="text-xl font-bold text-white mb-3">
                          {project.name}
                        </h4>
                        <p className="text-slate-300 mb-4">
                          {project.description}
                        </p>

                        <div className="mb-4">
                          <h5 className="text-sm font-semibold text-slate-200 mb-2">
                            Key Achievements:
                          </h5>
                          <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm">
                            {project.achievements.map(
                              (achievement, achIndex) => (
                                <li key={achIndex}>{achievement}</li>
                              )
                            )}
                          </ul>
                        </div>

                        <div>
                          <h5 className="text-sm font-semibold text-slate-200 mb-2">
                            Tech Stack:
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-3 py-1 bg-slate-600/50 text-slate-200 rounded-md text-xs"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-4xl font-bold text-white mb-8 flex items-center">
              <span className="mr-3">🎓</span> Education
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all"
                >
                  <div className="text-4xl mb-4">📚</div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {edu.degree}
                  </h3>
                  <p className="text-blue-400 font-semibold mb-2">
                    {edu.percentage}
                  </p>
                  <p className="text-slate-300 text-sm mb-2">
                    {edu.institution}
                  </p>
                  <p className="text-slate-400 text-xs">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Resume for Download - Not visible on page but used for PDF generation */}
      <div id="resume-content" className="hidden">
        <Resume />
      </div>
    </div>
  );
};

export default AboutUs;
