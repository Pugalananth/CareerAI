import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

function PredictionHistory() {

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    fetchHistory();

  }, []);

  const fetchHistory = async () => {

    try {

      const res = await axios.get(
        "http://127.0.0.1:5000/interview-history"
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

          const parsed = JSON.parse(user);

          return parsed.name || "Unknown User";

        }

        return user;

      }

      if (typeof user === "object") {

        return user.name || "Unknown User";

      }

      return "Unknown User";

    }

    catch {

      return "Unknown User";

    }

  };

  // SCORE

  const getScore = (feedback) => {

    const match = feedback?.match(/\d+\/10/);

    if (!match) return "0/10";

    return match[0];

  };

  // STATUS

  const getStatus = (score) => {

    const num = parseInt(score);

    if (num >= 8) {

      return {
        label: "Ready",
        color: "text-emerald-400"
      };

    }

    else if (num >= 5) {

      return {
        label: "Practice Needed",
        color: "text-yellow-400"
      };

    }

    else {

      return {
        label: "Not Ready",
        color: "text-red-400"
      };

    }

  };

  // GROUP USERS

  const grouped = {};

  data.forEach((item) => {

    const username = formatUser(item.user);

    if (!grouped[username]) {

      grouped[username] = [];

    }

    grouped[username].push(item);

  });

  // SEARCH

  const users = Object.keys(grouped).filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="min-h-screen gradient-bg pt-24 px-3 pb-8">

      {/* TITLE */}

      <div className="text-center mb-6">

        <h1 className="text-3xl font-bold gradient-text mb-1">

          Interview History

        </h1>

        <p className="text-slate-400 text-xs">

          Final Interview Records

        </p>

      </div>

      {/* SEARCH */}

      <div className="max-w-md mx-auto mb-6">

        <input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 rounded-xl bg-slate-900/70 border border-slate-700 text-white text-sm outline-none"
        />

      </div>

      {/* USERS */}

      <div className="max-w-4xl mx-auto space-y-5">

        {users.map((username, index) => (

          <div
            key={index}
            className="glass rounded-2xl p-4 border border-white/10"
          >

            {/* HEADER */}

            <div className="flex items-center gap-3 mb-4">

              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-sm font-bold">

                {username.charAt(0).toUpperCase()}

              </div>

              <div>

                <h2 className="text-lg font-bold text-cyan-300">

                  {username}

                </h2>

                <p className="text-slate-500 text-xs">

                  Interview Candidate

                </p>

              </div>

            </div>

            {/* ATTEMPTS */}

            <div className="space-y-3">

              {grouped[username].map((attempt, i) => {

                const score = getScore(attempt.feedback);

                const status = getStatus(score);

                return (

                  <div
                    key={i}
                    className="bg-slate-900/60 border border-slate-700 rounded-xl p-3"
                  >

                    <div className="grid grid-cols-3 gap-3">

                      {/* DATE */}

                      <div>

                        <p className="text-slate-400 text-[10px] mb-1">

                          Date

                        </p>

                        <h3 className="text-white text-sm font-semibold">

                          {attempt.created_at
                            ? new Date(attempt.created_at).toLocaleDateString()
                            : new Date().toLocaleDateString()}

                        </h3>

                      </div>

                      {/* SCORE */}

                      <div>

                        <p className="text-slate-400 text-[10px] mb-1">

                          Score

                        </p>

                        <h3 className="text-xl font-bold text-white">

                          {score}

                        </h3>

                      </div>

                      {/* STATUS */}

                      <div>

                        <p className="text-slate-400 text-[10px] mb-1">

                          Status

                        </p>

                        <h3 className={`text-sm font-bold ${status.color}`}>

                          {status.label}

                        </h3>

                      </div>

                    </div>

                  </div>

                );

              })}

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default PredictionHistory;