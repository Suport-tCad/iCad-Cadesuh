"use client";
import React from "react";

function MainComponent() {
  const [selectedGame, setSelectedGame] = React.useState("Overwatch");
  const [following, setFollowing] = React.useState(() => {
    return localStorage.getItem("hasFollowed") === "true";
  });
  const [hasFollowed, setHasFollowed] = React.useState(() => {
    return localStorage.getItem("hasFollowed") === "true";
  });
  const [notificationPermission, setNotificationPermission] =
    React.useState(false);
  const [cookieConsent, setCookieConsent] = React.useState(() => {
    const saved = localStorage.getItem("cookieConsent");
    return saved === "true";
  });
  const socialLinks = {
    youtube: "https://youtube.com/@Official-tCad",
    instagram: "https://www.instagram.com/cadesuh_?igsh=c2lobmVzejRidWtr",
    github: "https://github.com/Suport-tCad",
  };
  const handleFollow = async () => {
    if (!following) {
      window.open(socialLinks.instagram, "_blank");
      setFollowing(true);
      setHasFollowed(true);
      localStorage.setItem("hasFollowed", "true");
      if (notificationPermission) {
        new Notification("Thanks for following!", {
          body: "Welcome to the community!",
          icon: "/avatar.png",
        });
      }
    }
  };
  const [selectedAI, setSelectedAI] = React.useState(null);
  const [aiProgress, setAIProgress] = React.useState(() => {
    return JSON.parse(localStorage.getItem("aiProgress") || "{}");
  });

  React.useEffect(() => {
    document.title = "iCad";
    const favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.href = "https://ucarecdn.com/d9134685-484e-46e7-9534-1521d2b3741d/";
    document.head.appendChild(favicon);

    const savedProgress = localStorage.getItem("hasFollowed");
    if (savedProgress) {
      setHasFollowed(true);
      setFollowing(true);
    }

    if (!cookieConsent) {
      const consent = window.confirm(
        "To enhance your experience, we use cookies and notifications. Do you accept?"
      );
      if (consent) {
        setCookieConsent(true);
        localStorage.setItem("cookieConsent", "true");
        if ("Notification" in window) {
          if (Notification.permission === "granted") {
            setNotificationPermission(true);
          } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then((permission) => {
              if (permission === "granted") {
                setNotificationPermission(true);
              }
            });
          }
        }
      }
    }

    const branding = document.querySelector('a[href="https://created.app/"]');
    if (branding) {
      branding.style.display = "none";
    }
  }, [cookieConsent]);

  const saveAIProgress = (aiName, progress) => {
    const newProgress = { ...aiProgress, [aiName]: progress };
    setAIProgress(newProgress);
    localStorage.setItem("aiProgress", JSON.stringify(newProgress));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2F3367] to-[#1C1F45] p-2 md:p-4 font-poppins">
      <div className="max-w-7xl mx-auto bg-[#1C1F45]/80 backdrop-blur-lg rounded-xl md:rounded-3xl p-3 md:p-6 shadow-[0_0_15px_rgba(0,0,255,0.3)]">
        <header className="flex justify-between items-center mb-6 bg-[#1C1F45]/60 p-4 rounded-xl backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <i className="fas fa-laptop-code text-blue-400 text-2xl"></i>
            <span className="text-white text-xl font-bold">iCad</span>
          </div>
          <a
            href="https://icad-io.blogspot.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <i className="fas fa-crown"></i>
            Get Premium
          </a>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          <div className="md:col-span-3">
            <div className="bg-[#252A5C]/90 rounded-xl p-4 mb-6 hover:shadow-[0_0_10px_rgba(0,0,255,0.2)] transition-all">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://ucarecdn.com/d9134685-484e-46e7-9534-1521d2b3741d/"
                  alt="Cadesuh profile avatar showing a cute cartoon character with black hair and pink cheeks"
                  className="w-12 h-12 rounded-full ring-2 ring-blue-500"
                />
                <div>
                  <p className="text-white font-semibold flex items-center gap-1">
                    Cadesuh
                    <i className="fas fa-check-circle text-blue-500"></i>
                  </p>
                  <p className="text-gray-400 text-sm">Bronze profile</p>
                </div>
              </div>
              <div className="flex gap-2 mb-4">
                <button
                  onClick={handleFollow}
                  className={`${
                    following ? "bg-green-500" : "bg-blue-500"
                  } text-white px-4 py-1 rounded-full text-sm hover:brightness-110 transition-all`}
                >
                  {following ? "Following" : "Follow"}
                </button>
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1C1F45] text-white px-4 py-1 rounded-full text-sm hover:bg-[#2F3367] transition-colors"
                >
                  View Projects
                </a>
              </div>
            </div>

            <div className="bg-[#252A5C]/90 rounded-xl p-4 hover:shadow-[0_0_10px_rgba(0,0,255,0.2)] transition-all">
              <div className="flex justify-between mb-4">
                <h3 className="text-white">Recent Projects</h3>
                <a
                  href={socialLinks.github}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  View All
                </a>
              </div>
              <div className="space-y-4">
                <div id="github-projects" className="space-y-4">
                  <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                    Loading projects...
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-6">
            <div className="bg-[#252A5C]/90 rounded-xl p-4 mb-6 hover:shadow-[0_0_10px_rgba(0,0,255,0.2)] transition-all">
              <img
                src="/banner.png"
                alt="Featured Project Banner"
                className="w-full h-32 md:h-48 object-cover rounded-xl mb-4 hover:opacity-90 transition-opacity"
              />
              <div className="flex flex-wrap gap-2 md:gap-4">
                {["React", "Node.js", "MongoDB", "TypeScript", "Next.js"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="px-3 md:px-4 py-2 rounded-xl text-sm bg-[#1C1F45] text-gray-300"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {["Portfolio", "E-commerce", "App Store"].map(
                (project, index) => (
                  <a
                    href={`${socialLinks.github}/${project}`}
                    key={index}
                    className="block"
                  >
                    <div className="bg-[#252A5C]/90 rounded-xl p-4 hover:shadow-[0_0_10px_rgba(0,0,255,0.2)] transition-all">
                      <img
                        src={`/project${index + 1}.png`}
                        alt={project}
                        className="w-full h-32 object-cover rounded-xl mb-2 hover:opacity-90 transition-opacity"
                      />
                      <div className="flex items-center gap-2">
                        <i className="fas fa-code text-blue-400"></i>
                        <span className="text-white text-sm">{project}</span>
                      </div>
                    </div>
                  </a>
                )
              )}
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="bg-[#252A5C]/90 rounded-xl p-4 mb-6 hover:shadow-[0_0_10px_rgba(0,0,255,0.2)] transition-all">
              <h3 className="text-white mb-4">AI Tools</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    name: "ChatGPT",
                    icon: "fas fa-comments",
                    url: "https://chat.openai.com",
                  },
                  {
                    name: "DALL·E 3",
                    icon: "fas fa-paint-brush",
                    url: "https://labs.openai.com",
                  },
                  {
                    name: "Stable Diffusion",
                    icon: "fas fa-image",
                    url: "https://stability.ai",
                  },
                  {
                    name: "Cadesuh AI",
                    icon: "fas fa-robot",
                    url: "https://cadesuh.com/ai",
                  },
                  {
                    name: "Gemini",
                    icon: "fas fa-brain",
                    url: "https://gemini.google.com",
                  },
                  {
                    name: "Claude",
                    icon: "fas fa-microchip",
                    url: "https://claude.ai",
                  },
                ].map((ai) => (
                  <a
                    key={ai.name}
                    href={ai.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#1C1F45] p-3 rounded-lg hover:bg-[#2F3367] transition-colors text-left"
                  >
                    <div className="flex items-center gap-2">
                      <i className={`${ai.icon} text-blue-400`}></i>
                      <div>
                        <h4 className="text-white text-sm">{ai.name}</h4>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <div className="bg-[#252A5C]/90 rounded-xl p-4 mb-6 hover:shadow-[0_0_10px_rgba(0,0,255,0.2)] transition-all">
              <h3 className="text-white mb-4">Skills & Technologies</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-[#1C1F45] rounded-lg p-2 text-center text-gray-300">
                  <i className="fas fa-edit mr-2"></i>Editor
                </div>
                <div className="bg-[#1C1F45] rounded-lg p-2 text-center text-gray-300">
                  <i className="fas fa-paint-brush mr-2"></i>Designer
                </div>
                <div className="bg-[#1C1F45] rounded-lg p-2 text-center text-gray-300">
                  <i className="fas fa-palette mr-2"></i>Artist
                </div>
              </div>
            </div>

            <div className="bg-[#252A5C]/90 rounded-xl p-4 hover:shadow-[0_0_10px_rgba(0,0,255,0.2)] transition-all">
              <h3 className="text-white mb-4">Connect With Me</h3>
              <div className="space-y-4">
                {[
                  {
                    name: "YouTube",
                    icon: "fab fa-youtube",
                    color: "text-red-500",
                    link: socialLinks.youtube,
                  },
                  {
                    name: "Instagram",
                    icon: "fab fa-instagram",
                    color: "text-pink-500",
                    link: socialLinks.instagram,
                  },
                  {
                    name: "GitHub",
                    icon: "fab fa-github",
                    color: "text-white",
                    link: socialLinks.github,
                  },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between hover:bg-[#1C1F45] p-2 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <i className={`${social.icon} ${social.color}`}></i>
                      <span className="text-gray-300">{social.name}</span>
                    </div>
                    <i className="fas fa-external-link-alt text-gray-400"></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-8 text-center text-gray-400 border-t border-gray-700 pt-4">
          <div className="flex justify-center gap-6 mb-4">
            <a
              href={socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-red-500 transition-colors"
            >
              <i className="fab fa-youtube"></i>
            </a>
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-pink-500 transition-colors"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-white transition-colors"
            >
              <i className="fab fa-github"></i>
            </a>
          </div>
          <p>Created by Cadesuh © 2024</p>
        </footer>
      </div>
      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(-100%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default MainComponent;