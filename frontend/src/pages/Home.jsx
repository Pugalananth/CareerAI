import React from "react";

import {

  useNavigate,

  Link

} from "react-router-dom";

import Footer from "../components/Footer";

const careers = [

  {

    img:"https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80",

    title:"AI / ML Engineer",

    desc:"Build AI systems and machine learning models."

  },

  {

    img:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80",

    title:"Full Stack Developer",

    desc:"Create websites, APIs and modern web apps."

  },

  {

    img:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80",

    title:"UI / UX Designer",

    desc:"Design creative interfaces and user experiences."

  },

  {

    img:"https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&q=80",

    title:"QA Engineer",

    desc:"Test applications and automate quality assurance."

  },

  {

    img:"https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80",

    title:"Cloud Engineer",

    desc:"Work with cloud deployment and DevOps."

  },

  {

    img:"https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=400&q=80",

    title:"Cyber Security",

    desc:"Protect systems and applications from threats."

  }

];

const features = [

  {

    icon:"🤖",

    title:"AI Prediction",

    desc:"AI-powered career recommendations."

  },

  {

    icon:"📄",

    title:"Resume Analysis",

    desc:"Upload resumes and get ATS feedback."

  },

  {

    icon:"💡",

    title:"Skill Assessment",

    desc:"Analyze skills and identify gaps."

  },

  {

    icon:"💬",

    title:"AI Chatbot",

    desc:"Career guidance in multiple languages."

  },

  {

    icon:"🗺️",

    title:"Roadmap",

    desc:"Step-by-step career learning roadmap."

  },

  {

    icon:"🎤",

    title:"Mock Interview",

    desc:"Practice AI-generated interview questions."

  }

];

const stats = [

  {

    value:"100+",

    label:"Career Domains"

  },

  {

    value:"AI",

    label:"Powered Guidance"

  },

  {

    value:"24/7",

    label:"Career Support"

  },

  {

    value:"100%",

    label:"Free Platform"

  }

];

function Home() {

  const navigate = useNavigate();

  return (

    <div className="min-h-screen gradient-bg overflow-hidden">

      {/* HERO */}

      <section className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-16">

        {/* BACKGROUND EFFECTS */}

        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl" />

        <div className="absolute bottom-20 right-10 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#6366f122,transparent_40%)]" />

        <div className="relative z-10 max-w-6xl mx-auto text-center">

          {/* BADGE */}

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs font-semibold mb-6">

            ✨ AI Career Guidance Platform

          </div>

          {/* TITLE */}

          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">

            Discover Your

            <span className="block gradient-text">

              Dream Career

            </span>

          </h1>

          {/* SUBTITLE */}

          <p className="text-slate-300 text-base md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">

            AI-powered career prediction,
            resume analysis, roadmap generation,
            interview preparation and skill assessment.

          </p>

          {/* BUTTONS */}

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-14">

            <button

              onClick={()=>navigate("/career")}

              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-sm shadow-2xl hover:scale-105 transition-all duration-300"

            >

              🚀 Start Career Test

            </button>

            <Link

              to="/dashboard"

              className="px-8 py-4 rounded-2xl bg-white/10 border border-white/10 text-white text-sm font-semibold hover:bg-white/20 transition-all duration-300"

            >

              Explore Dashboard →

            </Link>

          </div>

          {/* STATS */}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">

            {stats.map((item)=>(

              <div

                key={item.label}

                className="glass rounded-2xl p-5"

              >

                <h2 className="text-3xl font-black gradient-text mb-2">

                  {item.value}

                </h2>

                <p className="text-slate-400 text-sm">

                  {item.label}

                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="py-20 px-4">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-14">

            <h2 className="text-4xl md:text-5xl font-black gradient-text mb-4">

              Platform Features

            </h2>

            <p className="text-slate-400 text-sm md:text-base">

              Everything you need for career growth

            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            {features.map((item)=>(

              <div

                key={item.title}

                className="glass rounded-3xl p-6 hover:scale-105 transition-all duration-300"

              >

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl mb-4 shadow-xl">

                  {item.icon}

                </div>

                <h3 className="text-xl font-bold text-white mb-3">

                  {item.title}

                </h3>

                <p className="text-slate-400 text-sm leading-relaxed">

                  {item.desc}

                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* CAREERS */}

      <section className="py-20 px-4">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-14">

            <h2 className="text-4xl md:text-5xl font-black gradient-text mb-4">

              Career Domains

            </h2>

            <p className="text-slate-400 text-sm md:text-base">

              Explore trending technology careers

            </p>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {careers.map((career)=>(

              <div

                key={career.title}

                className="glass rounded-3xl overflow-hidden hover:scale-105 transition-all duration-300"

              >

                <div className="h-44 overflow-hidden">

                  <img

                    src={career.img}

                    alt={career.title}

                    className="w-full h-full object-cover hover:scale-110 transition-all duration-500"

                  />

                </div>

                <div className="p-5">

                  <h3 className="text-lg font-bold text-white mb-2">

                    {career.title}

                  </h3>

                  <p className="text-slate-400 text-sm leading-relaxed">

                    {career.desc}

                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="py-20 px-4">

        <div className="max-w-4xl mx-auto">

          <div className="glass rounded-[32px] p-10 text-center relative overflow-hidden">

            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />

            <div className="relative z-10">

              <div className="text-6xl mb-5">

                🚀

              </div>

              <h2 className="text-4xl md:text-5xl font-black text-white mb-5">

                Ready To Start?

              </h2>

              <p className="text-slate-300 text-base mb-8 max-w-2xl mx-auto">

                Explore your ideal technology domain with AI-powered career guidance.

              </p>

              <button

                onClick={()=>navigate("/career")}

                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-sm shadow-2xl hover:scale-105 transition-all duration-300"

              >

                Check Career Path →

              </button>

            </div>

          </div>

        </div>

      </section>

      <Footer />

    </div>

  );

}

export default Home;