import React, {

  useState,

  useEffect

} from "react";

import { motion } from "framer-motion";

import axios from "axios";

function Resume() {

  const [result, setResult] = useState(null);

  const [dragging, setDragging] = useState(false);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {

      window.location.href = "/";

    }

  }, []);

  const processFile = async(file) => {

    if (!file) return;

    try {

      const formData = new FormData();

      formData.append(

        "resume",

        file

      );

      formData.append(

        "user",

        localStorage.getItem("user")

      );

      const res = await axios.post(

        "http://127.0.0.1:5000/resume-analysis",

        formData,

        {

          headers: {

            "Content-Type":

            "multipart/form-data"

          }

        }

      );

      await axios.post(

        "http://127.0.0.1:5000/track-activity",

        {

          user: localStorage.getItem("user"),

          feature: "Resume Builder"

        }

      );

      setResult({

        score: res.data.ats_score,

        skills: res.data.skills,

        career: res.data.career,

        improvements: [

          "Add more projects",

          "Improve GitHub profile",

          "Add certifications",

          "Improve technical skills"

        ]

      });

    }

    catch (err) {

      console.log(err);

      alert("Resume analysis failed");

    }

  };

  const handleFile = (e) => {

    processFile(e.target.files[0]);

  };

  const handleDrop = (e) => {

    e.preventDefault();

    setDragging(false);

    processFile(e.dataTransfer.files[0]);

  };

  return (

    <div className="min-h-screen gradient-bg pt-28 px-4 pb-14">

      <motion.div

        initial={{ opacity:0, y:30 }}

        animate={{ opacity:1, y:0 }}

        className="glass w-full max-w-4xl mx-auto p-6 rounded-3xl"

      >

        {/* HEADER */}

        <div className="text-center mb-8">

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-2xl mx-auto mb-4 shadow-xl">

            📄

          </div>

          <h1 className="text-3xl md:text-4xl font-black gradient-text mb-3">

            Resume Analysis

          </h1>

          <p className="text-slate-400 text-sm">

            Upload your resume and get AI-powered feedback

          </p>

        </div>

        {/* UPLOAD BOX */}

        <div

          onDragOver={(e) => {

            e.preventDefault();

            setDragging(true);

          }}

          onDragLeave={() => setDragging(false)}

          onDrop={handleDrop}

          className={`glass p-8 text-center mb-6 border border-dashed transition-all duration-300 rounded-3xl ${
            dragging
              ? "border-cyan-400 bg-cyan-500/10"
              : "border-white/10 hover:border-indigo-400"
          }`}

        >

          <div className="text-5xl mb-4">

            📁

          </div>

          <h3 className="text-xl font-bold text-white mb-2">

            Drop your resume here

          </h3>

          <p className="text-slate-400 text-sm mb-5">

            Supports PDF, DOC, DOCX

          </p>

          <label className="cursor-pointer inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-2xl text-sm font-semibold shadow-lg hover:scale-105 transition-all duration-300">

            Browse Files

            <input

              type="file"

              accept=".pdf,.doc,.docx"

              onChange={handleFile}

              className="hidden"

            />

          </label>

        </div>

        {/* RESULTS */}

        {result && (

          <motion.div

            initial={{ opacity:0 }}

            animate={{ opacity:1 }}

            className="space-y-5"

          >

            {/* SCORE */}

            <div className="glass p-5 rounded-3xl">

              <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">

                🏆 Resume Score

              </h3>

              <div className="flex flex-col md:flex-row items-center gap-6">

                <div className="w-20 h-20 rounded-full border-4 border-cyan-400 flex items-center justify-center">

                  <span className="text-xl font-black text-cyan-300">

                    {result.score}%

                  </span>

                </div>

                <div className="flex-1 w-full">

                  <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">

                    <div

                      className="h-3 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500"

                      style={{

                        width: `${result.score}%`

                      }}

                    />

                  </div>

                  <p className="text-slate-400 text-sm mt-2">

                    Resume analyzed successfully

                  </p>

                </div>

              </div>

            </div>

            {/* SKILLS */}

            <div className="glass p-5 rounded-3xl">

              <h3 className="text-lg font-bold text-white mb-4">

                💡 Skills Detected

              </h3>

              <div className="flex flex-wrap gap-2">

                {result.skills.map((s, i) => (

                  <span

                    key={i}

                    className="border border-indigo-400 text-indigo-300 px-3 py-1 rounded-xl text-xs"

                  >

                    {s}

                  </span>

                ))}

              </div>

            </div>

            {/* CAREER */}

            <div className="glass p-5 rounded-3xl border border-emerald-400/20">

              <h3 className="text-lg font-bold text-white mb-4">

                🎯 Suggested Career

              </h3>

              <span className="border border-emerald-400 text-emerald-300 px-4 py-2 rounded-xl text-sm inline-block">

                {result.career}

              </span>

            </div>

            {/* IMPROVEMENTS */}

            <div className="glass p-5 rounded-3xl">

              <h3 className="text-lg font-bold text-white mb-4">

                📈 Improvements

              </h3>

              <ul className="space-y-3">

                {result.improvements.map((item, i) => (

                  <li

                    key={i}

                    className="flex items-center gap-3 text-slate-300 text-sm"

                  >

                    <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs">

                      !

                    </span>

                    {item}

                  </li>

                ))}

              </ul>

            </div>

          </motion.div>

        )}

      </motion.div>

    </div>

  );

}

export default Resume;