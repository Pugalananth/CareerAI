import React, {

  useEffect,

  useState

} from "react";

import {

  Link,

  useNavigate

} from "react-router-dom";

import axios from "axios";

function Admin() {

  const navigate = useNavigate();

  // REAL STATS

  const [stats,setStats] = useState({

    users:0,

    ai_accuracy:0,

    predictions:0,

    resume_score:0

  });

  // ADMIN PROTECTION

  useEffect(() => {

    const role = localStorage.getItem("role");

    if(role !== "admin"){

      navigate("/login");

    }

    fetchStats();

  }, []);

  // FETCH REAL STATS

  const fetchStats = async()=>{

    try{

      const res = await axios.get(

        "http://127.0.0.1:5000/admin-stats"

      );

      setStats(res.data);

    }

    catch(err){

      console.log(err);

    }

  };

  // DASHBOARD CARDS

  const cards = [

    {

      title: "Users",

      icon: "👥",

      path: "/admin-users",

      value: stats.users,

      color: "from-cyan-500 to-blue-600"

    },

    {

      title: "Analytics",

      icon: "📊",

      path: "/analytics-page",

      value: `${stats.ai_accuracy}%`,

      color: "from-violet-500 to-purple-600"

    },

    {

      title: "Prediction History",

      icon: "🧠",

      path: "/prediction-history",

      value: stats.predictions,

      color: "from-emerald-500 to-teal-600"

    },

    {

      title: "Resume Scores",

      icon: "📄",

      path: "/resume-scores",

      value: `${stats.resume_score}%`,

      color: "from-orange-500 to-amber-600"

    }

  ];

  return (

    <div className="min-h-screen gradient-bg pt-24 px-4 pb-10">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="text-center mb-8">

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-2xl mx-auto mb-4 shadow-xl">

            🛡️

          </div>

          <h1 className="text-3xl font-black gradient-text mb-2">

            Admin Dashboard

          </h1>

          <p className="text-slate-400 text-sm">

            Real-time CareerAI platform analytics

          </p>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-7">

          <div className="glass rounded-2xl p-4 text-center">

            <h2 className="text-2xl font-black text-cyan-300">

              {stats.users}

            </h2>

            <p className="text-slate-400 text-xs mt-1">

              Total Users

            </p>

          </div>

          <div className="glass rounded-2xl p-4 text-center">

            <h2 className="text-2xl font-black text-violet-300">

              {stats.ai_accuracy}%

            </h2>

            <p className="text-slate-400 text-xs mt-1">

              AI Accuracy

            </p>

          </div>

          <div className="glass rounded-2xl p-4 text-center">

            <h2 className="text-2xl font-black text-emerald-300">

              {stats.predictions}

            </h2>

            <p className="text-slate-400 text-xs mt-1">

              Predictions

            </p>

          </div>

          <div className="glass rounded-2xl p-4 text-center">

            <h2 className="text-2xl font-black text-amber-300">

              {stats.resume_score}%

            </h2>

            <p className="text-slate-400 text-xs mt-1">

              ATS Score

            </p>

          </div>

        </div>

        {/* MAIN CARDS */}

        <div className="grid md:grid-cols-2 gap-5">

          {cards.map((card, i) => (

            <Link

              key={i}

              to={card.path}

              className="glass rounded-3xl p-5 hover:scale-[1.02] transition-all duration-300"

            >

              {/* TOP */}

              <div className="flex items-center justify-between mb-4">

                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-2xl shadow-xl`}>

                  {card.icon}

                </div>

                <div className="text-right">

                  <h2 className="text-3xl font-black text-white">

                    {card.value}

                  </h2>

                  <p className="text-slate-400 text-xs">

                    Live Data

                  </p>

                </div>

              </div>

              {/* CONTENT */}

              <h3 className="text-lg font-bold text-white mb-1">

                {card.title}

              </h3>

              <p className="text-slate-400 text-sm">

                Open dashboard section

              </p>

              {/* BUTTON */}

              <div className="mt-4">

                <button className={`px-4 py-2 rounded-xl bg-gradient-to-r ${card.color} text-white text-sm font-semibold shadow-lg`}>

                  Open →

                </button>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </div>

  );

}

export default Admin;