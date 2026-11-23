import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

function ResumeScores() {

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  // AUTH + FETCH

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {

      window.location.href = "/login";

    }

    fetchScores();

  }, []);

  // FETCH DATA

  const fetchScores = async () => {

    try {

      const res = await axios.get(
        "http://127.0.0.1:5000/resume-scores"
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

  return (

    <div className="min-h-screen gradient-bg pt-24 px-4 pb-8">

      {/* TITLE */}

      <div className="text-center mb-8">

        <h1 className="text-3xl font-bold gradient-text mb-1">

          Resume Scores

        </h1>

        <p className="text-slate-400 text-xs">

          ATS Resume Analysis Records

        </p>

      </div>

      {/* SEARCH */}

      <div className="max-w-2xl mx-auto mb-8">

        <input
          type="text"
          placeholder="Search candidate..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700 outline-none text-white text-sm"
        />

      </div>

      {/* CARDS */}

      <div className="max-w-5xl mx-auto space-y-5">

        {filtered.length === 0 ? (

          <div className="glass rounded-2xl p-8 text-center">

            <h2 className="text-xl font-bold text-white mb-2">

              No Resume Data Found

            </h2>

            <p className="text-slate-400 text-sm">

              Resume analysis records will appear here.

            </p>

          </div>

        ) : (

          filtered.map((item, i) => {

            const user = formatUser(item.user);

            return (

              <div
                key={i}
                className="glass rounded-2xl p-5 flex flex-col md:flex-row justify-between gap-5 border border-white/10"
              >

                {/* LEFT */}

                <div className="flex-1">

                  {/* NAME */}

                  <h2 className="text-xl font-bold text-white mb-1">

                    {user.name}

                  </h2>

                  {/* EMAIL */}

                  <p className="text-slate-400 text-sm mb-3">

                    {user.email}

                  </p>

                  {/* CAREER */}

                  <p className="text-sm text-slate-300">

                    Suggested Career:

                    <span className="text-cyan-300 ml-2 font-semibold">

                      {item.career}

                    </span>

                  </p>

                  {/* SKILLS */}

                  <div className="flex flex-wrap gap-2 mt-4">

                    {item.skills?.map((skill, index) => (

                      <span
                        key={index}
                        className="px-3 py-1 rounded-lg border border-indigo-500/40 bg-indigo-500/10 text-indigo-300 text-xs"
                      >

                        {skill}

                      </span>

                    ))}

                  </div>

                </div>

                {/* RIGHT */}

                <div className="flex flex-col items-center justify-center">

                  <div className="w-20 h-20 rounded-full border-4 border-cyan-400 flex items-center justify-center">

                    <span className="text-2xl font-black text-cyan-300">

                      {item.score}%

                    </span>

                  </div>

                  <p className="text-slate-400 text-xs mt-3">

                    Resume Score

                  </p>

                </div>

              </div>

            );

          })

        )}

      </div>

    </div>

  );

}

export default ResumeScores;