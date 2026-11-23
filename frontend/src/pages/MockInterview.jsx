import React, {

  useState,

  useEffect

} from "react";

import axios from "axios";

const careers = [

  "Data Scientist",

  "AI Engineer",

  "Web Developer",

  "Mobile Developer",

  "Cloud Engineer",

  "Cyber Security Analyst"

];

function MockInterview() {

  const [career, setCareer] = useState("");

  const [questions, setQuestions] = useState([]);

  const [loading, setLoading] = useState(false);

  // PROTECT ROUTE

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {

      window.location.href = "/login";

    }

  }, []);

  // GENERATE QUESTIONS

  const generate = async () => {

    if (!career) return;

    setLoading(true);

    try {

      const res = await axios.post(

        "http://127.0.0.1:5000/mock-interview",

        {

          career,

          user: localStorage.getItem("user")

        }

      );

      setQuestions(

        res.data.questions.map((q) => ({

          text: q,

          answer: "",

          feedback: ""

        }))

      );

    }

    catch (err) {

      console.log(err);

      alert("Error generating questions");

    }

    setLoading(false);

  };

  // EVALUATE ANSWER

  const evaluateAnswer = async(i)=>{

    try{

      const res = await axios.post(

        "http://127.0.0.1:5000/evaluate-answer",

        {

          user: localStorage.getItem("user"),

          question: questions[i].text,

          answer: questions[i].answer

        }

      );

      const updated=[...questions];

      updated[i].feedback =

        res.data.feedback ||

        "No feedback received";

      setQuestions(updated);

    }

    catch(err){

      console.log(err);

      alert("Evaluation failed");

    }

  };

  return (

    <div className="min-h-screen gradient-bg pt-24 pb-10 px-4">

      <div className="max-w-4xl mx-auto">

        {/* HEADER */}

        <div className="text-center mb-8">

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-2xl mx-auto mb-3 shadow-xl">

            🎤

          </div>

          <h1 className="text-3xl font-black gradient-text mb-2">

            AI Mock Interview

          </h1>

          <p className="text-slate-400 text-sm">

            Practice with AI-generated interview questions

          </p>

        </div>

        {/* CONTROLS */}

        <div className="glass p-4 rounded-2xl mb-6">

          <div className="flex flex-col md:flex-row gap-3">

            <select

              value={career}

              onChange={(e) => setCareer(e.target.value)}

              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700 text-white text-sm outline-none"

            >

              <option value="">

                Select Career Role

              </option>

              {careers.map((c, i) => (

                <option key={i}>

                  {c}

                </option>

              ))}

            </select>

            <button

              onClick={generate}

              disabled={loading || !career}

              className="glow-btn px-5 py-2.5 rounded-xl text-white text-sm font-semibold disabled:opacity-60"

            >

              {

                loading

                ?

                "Generating..."

                :

                "Generate"

              }

            </button>

          </div>

        </div>

        {/* QUESTIONS */}

        {questions.length > 0 && (

          <div className="space-y-4">

            {questions.map((q, i) => (

              <div

                key={i}

                className="glass p-5 rounded-2xl"

              >

                {/* QUESTION */}

                <div className="flex items-start gap-3 mb-4">

                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-sm font-bold">

                    {i + 1}

                  </div>

                  <div>

                    <h2 className="text-base font-semibold text-white mb-1">

                      Interview Question

                    </h2>

                    <p className="text-slate-300 text-sm leading-relaxed">

                      {q.text}

                    </p>

                  </div>

                </div>

                {/* ANSWER */}

                <textarea

                  placeholder="Write your answer here..."

                  className="w-full mt-3 px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700 text-white text-sm min-h-[100px] outline-none"

                  value={q.answer}

                  onChange={(e)=>{

                    const updated=[...questions];

                    updated[i].answer=e.target.value;

                    setQuestions(updated);

                  }}

                />

                {/* BUTTON */}

                <button

                  onClick={()=>evaluateAnswer(i)}

                  className="mt-4 glow-btn px-4 py-2 rounded-xl text-white text-sm font-medium"

                >

                  Evaluate Answer

                </button>

                {/* FEEDBACK */}

                {q.feedback && (

                  <div className="mt-4 p-4 rounded-xl bg-slate-800/60 border border-slate-700 text-slate-300 text-sm whitespace-pre-wrap leading-relaxed">

                    {q.feedback}

                  </div>

                )}

              </div>

            ))}

          </div>

        )}

        {/* EMPTY */}

        {!questions.length && !loading && (

          <div className="glass p-10 rounded-2xl text-center">

            <div className="text-4xl mb-3">

              🎤

            </div>

            <h3 className="text-lg font-bold text-white mb-2">

              Ready for Interview?

            </h3>

            <p className="text-slate-400 text-sm">

              Select a role and generate AI interview questions.

            </p>

          </div>

        )}

      </div>

    </div>

  );

}

export default MockInterview;