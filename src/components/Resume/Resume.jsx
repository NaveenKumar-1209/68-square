/**
 * Resume Component
 * Compact, single-page resume layout optimized for PDF
 */
const Resume = () => {
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
            "Slide-editing platform with drag-and-drop, dynamic resizing, rich text formatting, image uploads, and shape editing.",
          achievements: [
            "Dynamic resizing, drag-and-drop, custom component rendering",
            "Rich text formatting, image uploads, shape editing tools",
          ],
          techStack: ["React.js", "Material-UI", "Redux", "Strapi.io"],
        },
        {
          name: "SuperReach Chrome Extension",
          description:
            "Chrome extension using Mutation Observer for real-time data extraction, custom iframe integration.",
          achievements: [
            "28% faster response time through algorithm optimization",
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
            "AI chatbot using ChatGPT API with AWS Voice-to-Text for personalized feedback on communication skills.",
          achievements: [
            "Vite and React.js frontend",
            "25% improvement in user communication effectiveness",
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
            "Food delivery platform with responsive web app, cross-platform mobile app, secure payment gateways, and real-time tracking.",
          achievements: [
            "Real-time order tracking integration",
            "19% faster load time through performance optimization",
          ],
          techStack: ["React.js", "Bootstrap", "Redux-saga", "Moment"],
        },
      ],
    },
  ];

  const education = [
    {
      degree: "B.Tech. (Electrical Engineering)",
      percentage: "65.3%",
      institution: "Kamla Nehru Institute of Technology, Sultanpur, UP",
      year: "2014-18",
    },
    {
      degree: "Class 12",
      percentage: "85.2%",
      institution: "Smith Inter College, Azamgarh, UP",
      year: "2013",
    },
  ];

  return (
    <div className="resume-container bg-white text-black p-6 max-w-4xl mx-auto text-xs">
      {/* Header - Compact */}
      <div className="mb-4 border-b-2 border-gray-800 pb-2">
        <h1 className="text-2xl font-bold mb-1">NAVEEN KUMAR</h1>
        <p className="text-sm font-semibold text-gray-700 mb-2">
          SOFTWARE DEVELOPER
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
          <div>
            <strong>Mobile:</strong> +917007450894
          </div>
          <div>
            <strong>Email:</strong> nkc.2096@gmail.com
          </div>
          <div>
            <strong>LinkedIn:</strong>{" "}
            <a
              href="https://www.linkedin.com/in/naveen-kumar-19077712a/"
              className="text-blue-600"
            >
              linkedin.com/in/naveen-kumar-19077712a/
            </a>
          </div>
        </div>
      </div>

      {/* Skills & Technologies - Side by Side */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Core Skills */}
        <div>
          <h2 className="text-sm font-bold mb-2 border-b border-gray-300 pb-1">
            CORE SKILLS
          </h2>
          <div className="flex flex-wrap gap-1">
            {coreSkills.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-gray-100 rounded text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div>
          <h2 className="text-sm font-bold mb-2 border-b border-gray-300 pb-1">
            TECHNOLOGY
          </h2>
          <div className="flex flex-wrap gap-1">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-0.5 bg-gray-100 rounded text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Work Experience - Compact */}
      <div className="mb-4">
        <h2 className="text-sm font-bold mb-2 border-b border-gray-300 pb-1">
          WORK EXPERIENCE
        </h2>
        {workExperience.map((work, workIndex) => (
          <div key={workIndex} className="mb-3">
            <div className="mb-1">
              <h3 className="text-sm font-bold inline">{work.company}</h3>
              <span className="text-xs text-gray-600 mx-2">|</span>
              <span className="text-xs font-semibold text-gray-700">
                {work.position}
              </span>
              <span className="text-xs text-gray-600 mx-2">|</span>
              <span className="text-xs text-gray-600">{work.period}</span>
            </div>

            {work.projects.map((project, projectIndex) => (
              <div key={projectIndex} className="mb-2 ml-3">
                <h4 className="text-xs font-semibold mb-0.5">
                  {project.name}:
                </h4>
                <p className="text-xs text-gray-700 mb-1 leading-tight">
                  {project.description}
                </p>
                <ul className="list-disc list-inside mb-1 text-xs text-gray-700 leading-tight">
                  {project.achievements.map((achievement, achIndex) => (
                    <li key={achIndex} className="mb-0.5">
                      {achievement}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-600">
                  <strong>Tech:</strong> {project.techStack.join(", ")}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Education - Compact */}
      <div>
        <h2 className="text-sm font-bold mb-2 border-b border-gray-300 pb-1">
          EDUCATION
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {education.map((edu, index) => (
            <div key={index}>
              <h3 className="text-xs font-semibold">{edu.degree}</h3>
              <p className="text-xs text-gray-700 leading-tight">
                {edu.percentage} | {edu.institution} | {edu.year}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resume;
