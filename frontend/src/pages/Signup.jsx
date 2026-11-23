import React, { useState } from "react";

import { motion } from "framer-motion";

import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

import AnimatedBackground from "../components/AnimatedBackground";

export default function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {

    if (!name || !email || !password) {

      alert("Please fill all fields");

      return;

    }

    setLoading(true);

    try {

      await axios.post(

        "http://127.0.0.1:5000/signup",

        {

          name,

          email,

          password

        }

      );

      alert("Account Created Successfully");

      navigate("/login");

    }

    catch (err) {

      alert(

        err.response?.data?.message ||

        "Signup Failed"

      );

    }

    setLoading(false);

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 relative overflow-hidden px-4">

      {/* BACKGROUND */}

      <AnimatedBackground />

      <div className="absolute top-10 left-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />

      <div className="absolute bottom-10 right-10 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl" />

      {/* CARD */}

      <motion.div

        initial={{ opacity: 0, y: 40 }}

        animate={{ opacity: 1, y: 0 }}

        transition={{ duration: 0.7 }}

        className="relative z-10 w-full max-w-[360px] bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-6"

      >

        {/* LOGO */}

        <div className="text-center mb-6">

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-2xl mx-auto mb-4 shadow-xl">

            🚀

          </div>

          <h1 className="text-4xl font-black gradient-text">

            CareerAI

          </h1>

          <p className="text-slate-400 text-sm mt-2">

            Build your AI-powered career journey

          </p>

        </div>

        {/* FORM */}

        <div className="space-y-4">

          {/* NAME */}

          <input

            type="text"

            placeholder="Full Name"

            value={name}

            onChange={(e) => setName(e.target.value)}

            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 outline-none focus:border-indigo-500 text-sm"

          />

          {/* EMAIL */}

          <input

            type="email"

            placeholder="Email Address"

            value={email}

            onChange={(e) => setEmail(e.target.value)}

            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 outline-none focus:border-indigo-500 text-sm"

          />

          {/* PASSWORD */}

          <input

            type="password"

            placeholder="Password"

            value={password}

            onChange={(e) => setPassword(e.target.value)}

            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 outline-none focus:border-indigo-500 text-sm"

          />

          {/* BUTTON */}

          <button

            onClick={handleSignup}

            disabled={loading}

            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold text-sm shadow-xl hover:scale-[1.02] transition-all disabled:opacity-60"

          >

            {

              loading

              ?

              "Creating Account..."

              :

              "Create Account"

            }

          </button>

        </div>

        {/* LOGIN */}

        <p className="text-center text-xs text-slate-400 mt-5">

          Already have an account?

          <Link

            to="/login"

            className="text-indigo-400 ml-1 font-semibold hover:text-indigo-300"

          >

            Sign In

          </Link>

        </p>

      </motion.div>

    </div>

  );

}