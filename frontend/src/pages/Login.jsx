import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  // LOGIN

  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");

    if (!email || !password) {

      setError("Please fill all fields");

      return;

    }

    setLoading(true);

    try {

      const response = await axios.post(

        "http://127.0.0.1:5000/login",

        {

          email,

          password

        }

      );

      // SAVE TOKEN

      localStorage.setItem(

        "token",

        response.data.token

      );

      // SAVE ROLE

      localStorage.setItem(

        "role",

        response.data.role || "user"

      );

      // SAVE USER

      localStorage.setItem(

        "user",

        JSON.stringify({

          name:
            response.data.user?.name ||
            "Student",

          email:
            response.data.user?.email ||
            email,

          role:
            response.data.role ||
            "user"

        })

      );

      // ADMIN REDIRECT

      if (

        response.data.role === "admin"

      ) {

        navigate("/admin");

      }

      // USER REDIRECT TO HOME

      else {

        navigate("/");

      }

    }

    catch (error) {

      console.log(error);

      setError(

        error.response?.data?.message ||

        "Invalid email or password"

      );

    }

    setLoading(false);

  };

  return (

    <div className="min-h-screen flex items-center justify-center gradient-bg px-4 overflow-hidden relative">

      {/* BACKGROUND */}

      <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl" />

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl" />

      {/* LOGIN CARD */}

      <div className="relative z-10 w-full max-w-sm">

        <div className="glass rounded-3xl p-7 shadow-2xl border border-white/10">

          {/* HEADER */}

          <div className="text-center mb-6">

            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-2xl mx-auto mb-4 shadow-xl">

              🔐

            </div>

            <h1 className="text-3xl font-black text-white mb-1">

              Welcome Back

            </h1>

            <p className="text-slate-400 text-sm">

              Login to CareerAI

            </p>

          </div>

          {/* ERROR */}

          {

            error && (

              <div className="mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm">

                {error}

              </div>

            )

          }

          {/* FORM */}

          <form
            onSubmit={handleLogin}
            className="space-y-4"
          >

            {/* EMAIL */}

            <div>

              <label className="block text-xs text-slate-300 mb-2">

                Email Address

              </label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500"
              />

            </div>

            {/* PASSWORD */}

            <div>

              <label className="block text-xs text-slate-300 mb-2">

                Password

              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-sm text-slate-400"
                >

                  {showPassword ? "🙈" : "👁️"}

                </button>

              </div>

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold text-sm shadow-xl hover:scale-[1.02] transition-all disabled:opacity-60"
            >

              {

                loading

                ?

                "Signing In..."

                :

                "Sign In →"

              }

            </button>

          </form>

          {/* SIGNUP */}

          <p className="text-center text-xs text-slate-400 mt-5">

            New User?

            <Link
              to="/signup"
              className="text-indigo-400 ml-1 font-semibold hover:text-indigo-300"
            >

              Create Account

            </Link>

          </p>

        </div>

      </div>

    </div>

  );

}

export default Login;