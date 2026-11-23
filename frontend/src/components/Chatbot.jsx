import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

function Chatbot() {

  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState([

    {

      type: "bot",

      text: "👋 Welcome to CareerAI Assistant. Ask me about careers, skills, resume building, interview preparation or job opportunities.",

      time: new Date().toLocaleTimeString()

    }

  ]);

  const [loading, setLoading] = useState(false);

  const bottomRef = useRef();

  useEffect(() => {

    bottomRef.current?.scrollIntoView({

      behavior: "smooth"

    });

  }, [messages]);

  const askAI = async () => {

    if (!question.trim()) return;

    const time = new Date().toLocaleTimeString();

    // USER MESSAGE

    setMessages((prev) => [

      ...prev,

      {

        type: "user",

        text: question,

        time

      }

    ]);

    setLoading(true);

    try {

      const response = await axios.post(

        "http://127.0.0.1:5000/chat",

        {

          message: question

        }

      );

      setMessages((prev) => [

        ...prev,

        {

          type: "bot",

          text:

            response.data.reply ||

            response.data.message ||

            "AI response unavailable.",

          time: new Date().toLocaleTimeString(),

        }

      ]);

    }

    catch {

      setMessages((prev) => [

        ...prev,

        {

          type: "bot",

          text: "⚠️ AI service temporarily unavailable.",

          time: new Date().toLocaleTimeString()

        }

      ]);

    }

    setLoading(false);

    setQuestion("");

  };

  return (

    <div className="w-full max-w-6xl mx-auto rounded-[32px] overflow-hidden border border-white/10 bg-[#111827]/95 shadow-2xl backdrop-blur-xl">

      {/* HEADER */}

      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-700 px-6 py-5 flex justify-between items-center border-b border-white/10">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-3xl shadow-lg">

            🤖

          </div>

          <div>

            <h2 className="text-2xl font-bold text-white">

              AI Career Assistant

            </h2>

            <p className="text-indigo-100 text-sm">

              Smart AI guidance for careers, interviews and skills

            </p>

          </div>

        </div>

        <div className="flex items-center gap-2 text-green-300 text-sm font-medium">

          <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></span>

          Online

        </div>

      </div>

      {/* CHAT AREA */}

      <div className="h-[520px] overflow-y-auto bg-[#0f172a] px-6 py-6 space-y-6">

        {messages.map((msg, idx) => (

          <div

            key={idx}

            className={`flex ${

              msg.type === "user"

                ? "justify-end"

                : "justify-start"

            }`}

          >

            {/* BOT MESSAGE */}

            {msg.type === "bot" && (

              <div className="flex gap-3 items-start max-w-[80%]">

                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-lg shadow-lg flex-shrink-0">

                  🤖

                </div>

                <div>

                  <div className="bg-[#1e293b] border border-white/10 text-slate-200 px-5 py-4 rounded-2xl shadow-lg text-sm leading-relaxed whitespace-pre-wrap">

                    {msg.text}

                  </div>

                  <p className="text-xs text-slate-500 mt-2 ml-1">

                    {msg.time}

                  </p>

                </div>

              </div>

            )}

            {/* USER MESSAGE */}

            {msg.type === "user" && (

              <div className="max-w-[75%]">

                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-4 rounded-2xl shadow-xl text-sm leading-relaxed whitespace-pre-wrap">

                  {msg.text}

                </div>

                <p className="text-xs text-slate-500 mt-2 text-right mr-1">

                  {msg.time}

                </p>

              </div>

            )}

          </div>

        ))}

        {/* LOADING */}

        {loading && (

          <div className="flex gap-3 items-start">

            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-lg shadow-lg">

              🤖

            </div>

            <div className="bg-[#1e293b] border border-white/10 rounded-2xl px-5 py-4 shadow-lg">

              <div className="flex gap-2 items-center">

                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce"></span>

                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce delay-100"></span>

                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce delay-200"></span>

              </div>

            </div>

          </div>

        )}

        <div ref={bottomRef} />

      </div>

      {/* INPUT AREA */}

      <div className="bg-[#111827] border-t border-white/10 p-5 flex gap-4">

        <input

          type="text"

          placeholder="Ask about careers, skills, interviews..."

          value={question}

          onChange={(e) =>

            setQuestion(e.target.value)

          }

          onKeyDown={(e) =>

            e.key === "Enter" && askAI()

          }

          className="flex-1 bg-[#1e293b] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-slate-400 outline-none focus:border-indigo-500"

        />

        <button

          onClick={askAI}

          disabled={loading}

          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-60"

        >

          Send 🚀

        </button>

      </div>

    </div>

  );

}

export default Chatbot;