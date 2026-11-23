import React, { useState } from "react";
import axios from "axios";

const careers = [

  "Data Scientist",

  "Web Developer",

  "AI Engineer",

  "Mobile Developer",

  "Cloud Engineer",

  "Cyber Security Analyst"

];

function Roadmap() {

  const [career, setCareer] = useState("");

  const [roadmap, setRoadmap] = useState([]);

  const [loading, setLoading] = useState(false);

  const generate = async () => {

    if (!career) return;

    setLoading(true);

    try {

      const res = await axios.post(

        "http://127.0.0.1:5000/career-roadmap",

        {

          career

        }

      );

      await axios.post(

        "http://127.0.0.1:5000/track-activity",

        {

          user: localStorage.getItem("user"),

          feature: "Roadmap"

        }

      );

      setRoadmap(res.data.roadmap);

    }

    catch {

      alert("Error generating roadmap");

    }

    setLoading(false);

  };

  return (

    <div className="min-h-screen gradient-bg pt-28 px-4 pb-14">

      <div className="max-w-4xl mx-auto">

        {/* HEADER */}

        <div className="text-center mb-8">

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-3xl mx-auto mb-4 shadow-2xl">

            🗺️

          </div>

          <h1 className="text-4xl md:text-5xl font-black gradient-text mb-3">

            Career Roadmap

          </h1>

          <p className="text-slate-300 text-sm md:text-base">

            Get your personalised AI-powered career roadmap

          </p>

        </div>

        {/* CONTROLS */}

        <div className="glass rounded-3xl p-4 mb-8">

          <div className="flex flex-col md:flex-row gap-3">

            <select

              value={career}

              onChange={(e) => setCareer(e.target.value)}

              className="flex-1 bg-[#1e293b] border border-white/10 rounded-2xl px-4 py-3 text-sm text-white outline-none"

            >

              <option value="" className="bg-slate-900">

                Select a Career

              </option>

              {careers.map((c) => (

                <option

                  key={c}

                  className="bg-slate-900"

                >

                  {c}

                </option>

              ))}

            </select>

            <button

              onClick={generate}

              disabled={loading || !career}

              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-60"

            >

              {loading

                ? "Generating..."

                : "🚀 Generate"}

            </button>

          </div>

        </div>

        {/* ROADMAP */}

        {roadmap.length > 0 && (

          <div className="glass rounded-3xl p-6">

            <h2 className="text-xl font-bold text-white mb-6">

              📋 {career} Roadmap

            </h2>

            <div className="relative">

              <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-400 to-purple-500" />

              <div className="space-y-4">

                {roadmap.map((step, i) => (

                  <div

                    key={i}

                    className="flex gap-4 items-start"

                  >

                    <div className="relative z-10 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-lg flex-shrink-0">

                      {i + 1}

                    </div>

                    <div className="bg-[#1e293b] border border-white/10 rounded-2xl px-4 py-3 flex-1 text-slate-300 text-sm leading-relaxed shadow-lg">

                      {step}

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

        )}

        {/* EMPTY STATE */}

        {roadmap.length === 0 && !loading && (

          <div className="glass rounded-3xl p-12 text-center">

            <div className="text-6xl mb-5">

              🗺️

            </div>

            <h3 className="text-2xl font-bold text-white mb-3">

              No Roadmap Yet

            </h3>

            <p className="text-slate-400 text-sm">

              Select a career and generate your roadmap.

            </p>

          </div>

        )}

      </div>

    </div>

  );

}

export default Roadmap;