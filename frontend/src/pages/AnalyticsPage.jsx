import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

function AnalyticsPage() {

  const [data, setData] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {

      window.location.href = "/login";

    }

    fetchAnalytics();

  }, []);

  // FETCH ANALYTICS

  const fetchAnalytics = async () => {

    try {

      const res = await axios.get(
        "http://127.0.0.1:5000/analytics-data"
      );

      setData(res.data || []);

    }

    catch (err) {

      console.log(err);

    }

  };

  // FORMAT USER

  const formatUser = (user) => {

    try {

      if (typeof user === "string") {

        if (user.startsWith("{")) {

          return JSON.parse(user);

        }

        return {
          name: user,
          email: "No Email"
        };

      }

      return user;

    }

    catch {

      return {
        name: "Unknown User",
        email: "No Email"
      };

    }

  };

  // SEARCH FILTER

  const filtered = data.filter((item) => {

    const user = formatUser(item.user);

    return user.name
      ?.toLowerCase()
      .includes(search.toLowerCase());

  });

  // CHART DATA

  const chartData = [

    {
      feature: "Career",
      count: data.filter(
        x => x.feature === "Career Prediction"
      ).length
    },

    {
      feature: "Skills",
      count: data.filter(
        x => x.feature === "Skill Assessment"
      ).length
    },

    {
      feature: "Resume",
      count: data.filter(
        x => x.feature === "Resume Builder"
      ).length
    },

    {
      feature: "Roadmap",
      count: data.filter(
        x => x.feature === "Roadmap"
      ).length
    }

  ];

  const COLORS = [
    "#06b6d4",
    "#8b5cf6",
    "#10b981",
    "#f43f5e"
  ];

  return (

    <div className="min-h-screen gradient-bg pt-24 px-4 pb-8">

      {/* TITLE */}

      <div className="text-center mb-8">

        <h1 className="text-3xl font-bold gradient-text">

          Analytics Dashboard

        </h1>

        <p className="text-slate-400 text-sm mt-2">

          CareerAI platform usage overview

        </p>

      </div>

      {/* SEARCH */}

      <div className="max-w-2xl mx-auto mb-8">

        <input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700 text-white text-sm outline-none"
        />

      </div>

      {/* STATS */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

        <div className="glass p-4 rounded-2xl text-center">

          <p className="text-slate-400 text-sm mb-2">

            Users

          </p>

          <h2 className="text-2xl font-bold text-cyan-300">

            {new Set(data.map(x => JSON.stringify(x.user))).size}

          </h2>

        </div>

        <div className="glass p-4 rounded-2xl text-center">

          <p className="text-slate-400 text-sm mb-2">

            Predictions

          </p>

          <h2 className="text-2xl font-bold text-indigo-300">

            {
              data.filter(
                x => x.feature === "Career Prediction"
              ).length
            }

          </h2>

        </div>

        <div className="glass p-4 rounded-2xl text-center">

          <p className="text-slate-400 text-sm mb-2">

            Skills

          </p>

          <h2 className="text-2xl font-bold text-pink-300">

            {
              data.filter(
                x => x.feature === "Skill Assessment"
              ).length
            }

          </h2>

        </div>

        <div className="glass p-4 rounded-2xl text-center">

          <p className="text-slate-400 text-sm mb-2">

            Resumes

          </p>

          <h2 className="text-2xl font-bold text-emerald-300">

            {
              data.filter(
                x => x.feature === "Resume Builder"
              ).length
            }

          </h2>

        </div>

      </div>

      {/* CHARTS */}

      <div className="grid lg:grid-cols-2 gap-6 mb-8">

        {/* BAR */}

        <div className="glass rounded-2xl p-5">

          <h2 className="text-lg font-semibold text-white mb-4">

            Feature Usage

          </h2>

          <div className="h-64">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={chartData}>

                <XAxis dataKey="feature" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="count"
                  radius={[8,8,0,0]}
                >

                  <Cell fill="#06b6d4" />
                  <Cell fill="#8b5cf6" />
                  <Cell fill="#10b981" />
                  <Cell fill="#f43f5e" />

                </Bar>

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* PIE */}

        <div className="glass rounded-2xl p-5">

          <h2 className="text-lg font-semibold text-white mb-4">

            Distribution

          </h2>

          <div className="h-64">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={chartData}
                  dataKey="count"
                  nameKey="feature"
                  outerRadius={90}
                  label
                >

                  {chartData.map((entry, index) => (

                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />

                  ))}

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

      {/* RECENT ACTIVITY */}

      <div className="glass rounded-2xl p-5">

        <h2 className="text-xl font-bold text-white mb-5">

          Recent User Activity

        </h2>

        <div className="space-y-4">

          {filtered.slice(0,10).map((item, i) => {

            const user = formatUser(item.user);

            return (

              <div
                key={i}
                className="bg-slate-900/40 border border-slate-700 rounded-xl p-4 flex items-center justify-between"
              >

                <div className="flex items-center gap-4">

                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold">

                    {user.name?.charAt(0)?.toUpperCase()}

                  </div>

                  <div>

                    <h3 className="text-base font-semibold text-white">

                      {user.name}

                    </h3>

                    <p className="text-slate-400 text-xs">

                      {user.email}

                    </p>

                    <span className="inline-block mt-2 px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs">

                      {item.feature}

                    </span>

                  </div>

                </div>

                <div className="text-2xl">

                  📊

                </div>

              </div>

            );

          })}

        </div>

      </div>

    </div>

  );

}

export default AnalyticsPage;