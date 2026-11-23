import React from "react";
import { useNavigate } from "react-router-dom";
import Chatbot from "../components/Chatbot";

const cards = [

  {
    icon: "🚀",
    title: "Career Prediction",
    desc: "Discover suitable career paths using AI.",
    features: ["AI Suggestions", "Future Scope", "Salary Insights"],
    route: "/career",
    label: "Explore",
    color: "from-indigo-500 to-violet-600",
  },

  {
    icon: "📄",
    title: "Resume Analysis",
    desc: "Upload resume and get AI feedback.",
    features: ["Resume Score", "Skill Detection", "ATS Tips"],
    route: "/resume",
    label: "Analyze",
    color: "from-violet-500 to-purple-600",
  },

  {
    icon: "💡",
    title: "Skill Assessment",
    desc: "Analyze technical skills instantly.",
    features: ["Skill Analysis", "Job Match", "Roadmap"],
    route: "/skills",
    label: "Assess",
    color: "from-pink-500 to-rose-600",
  },

  {
    icon: "🗺️",
    title: "Career Roadmap",
    desc: "Step-by-step learning roadmap.",
    features: ["Timeline", "Resources", "Learning Plan"],
    route: "/roadmap",
    label: "View",
    color: "from-cyan-500 to-blue-600",
  },

  {
    icon: "🎤",
    title: "Mock Interview",
    desc: "Practice AI interview questions.",
    features: ["Interview Qs", "AI Feedback", "Confidence"],
    route: "/interview",
    label: "Start",
    color: "from-emerald-500 to-teal-600",
  },

  {
    icon: "📊",
    title: "Portfolio",
    desc: "View your career portfolio.",
    features: ["PDF Export", "Summary", "Skills"],
    route: "/portfolio",
    label: "Open",
    color: "from-amber-500 to-orange-600",
  },

];

const stats = [

  {
    value: "15+",
    label: "Domains",
    icon: "🎯",
  },

  {
    value: "AI",
    label: "Guidance",
    icon: "🤖",
  },

  {
    value: "24/7",
    label: "Support",
    icon: "⏰",
  },

];

function Dashboard() {

  const navigate = useNavigate();

  const user = JSON.parse(

    localStorage.getItem("user") || "{}"

  );

  return (

    <div className="min-h-screen gradient-bg pt-24 px-4 pb-10">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="text-center mb-10">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-indigo-300 text-sm font-medium mb-5">

            👋 Welcome back, {user.name || "Student"}

          </div>

          <h1 className="text-4xl md:text-5xl font-black mb-4">

            <span className="text-white">

              Career

            </span>

            <span className="gradient-text">

              {" "}Dashboard

            </span>

          </h1>

          <p className="text-slate-300 text-base max-w-2xl mx-auto">

            AI-powered career guidance platform.

          </p>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">

          {stats.map((item) => (

            <div

              key={item.label}

              className="glass rounded-2xl p-5 text-center"

            >

              <div className="text-3xl mb-2">

                {item.icon}

              </div>

              <h2 className="text-3xl font-black gradient-text">

                {item.value}

              </h2>

              <p className="text-slate-300 text-sm mt-1">

                {item.label}

              </p>

            </div>

          ))}

        </div>

        {/* FEATURE CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">

          {cards.map((card) => (

            <div

              key={card.title}

              onClick={() => navigate(card.route)}

              className="glass rounded-2xl p-5 cursor-pointer hover:scale-105 transition-all duration-300"

            >

              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-2xl mb-4 shadow-xl`}>

                {card.icon}

              </div>

              <h2 className="text-xl font-bold text-white mb-2">

                {card.title}

              </h2>

              <p className="text-slate-300 text-sm leading-relaxed mb-4">

                {card.desc}

              </p>

              <ul className="space-y-2 mb-5">

                {card.features.map((f) => (

                  <li

                    key={f}

                    className="flex items-center gap-2 text-sm text-slate-400"

                  >

                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />

                    {f}

                  </li>

                ))}

              </ul>

              <button className={`w-full py-3 rounded-xl bg-gradient-to-r ${card.color} text-white font-semibold text-sm`}>

                {card.label} →

              </button>

            </div>

          ))}

        </div>

        {/* CAREER TEST */}

        <div className="glass rounded-2xl p-6 mb-10 relative overflow-hidden">

          <div className="absolute top-0 right-0 w-52 h-52 bg-indigo-500/10 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-5">

            <div>

              <div className="text-4xl mb-3">

                🧠

              </div>

              <h2 className="text-2xl font-black text-white mb-2">

                Career Interest Test

              </h2>

              <p className="text-slate-300 text-sm max-w-lg">

                Discover your ideal technology domain.

              </p>

            </div>

            <button

              onClick={() => navigate("/career")}

              className="btn-primary px-6 py-3 text-sm"

            >

              Start Test →

            </button>

          </div>

        </div>

        {/* CHATBOT */}

        <div className="glass rounded-2xl overflow-hidden p-2">

          <Chatbot />

        </div>

      </div>

    </div>

  );

}

export default Dashboard;