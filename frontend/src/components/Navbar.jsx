import React, { useState, useEffect } from "react";
import {
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();

  // USER DATA

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const role = localStorage.getItem("role");

  const token = localStorage.getItem("token");

  // LOGOUT

  const logout = () => {

    localStorage.clear();

    navigate("/login");

  };

  // NAV LINKS

  const navLinks = [

    { to: "/", label: "Home" },

    { to: "/dashboard", label: "Dashboard" },

    { to: "/career", label: "Career" },

    { to: "/skills", label: "Skills" },

    { to: "/resume", label: "Resume" },

    { to: "/roadmap", label: "Roadmap" },

    { to: "/interview", label: "Interview" },

    { to: "/portfolio", label: "Portfolio" }

  ];

  useEffect(() => {

    const onScroll = () => {

      setScrolled(window.scrollY > 10);

    };

    window.addEventListener("scroll", onScroll);

    return () =>
      window.removeEventListener("scroll", onScroll);

  }, []);

  useEffect(() => {

    setMenuOpen(false);

  }, [location]);

  return (

    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/90 backdrop-blur-xl border-b border-white/10 shadow-2xl"
          : "bg-slate-950/70 backdrop-blur-md"
      }`}
    >

      <div className="max-w-7xl mx-auto px-4">

        <div className="flex items-center justify-between h-16">

          {/* LOGO */}

          <Link
            to="/"
            className="flex items-center gap-3"
          >

            <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 flex items-center justify-center text-white font-black shadow-lg">

              AI

            </div>

            <h1 className="text-2xl font-black text-white">

              Career

              <span className="text-indigo-400">

                AI

              </span>

            </h1>

          </Link>

          {/* DESKTOP NAV */}

          <div className="hidden lg:flex items-center gap-2">

            {navLinks.map((item) => (

              <Link
                key={item.to}
                to={item.to}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  location.pathname === item.to
                    ? "bg-indigo-500/20 text-indigo-300"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >

                {item.label}

              </Link>

            ))}

            {/* ADMIN */}

            {role === "admin" && (

              <Link
                to="/admin"
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  location.pathname === "/admin"
                    ? "bg-rose-500/20 text-rose-300"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >

                Admin

              </Link>

            )}

          </div>

          {/* RIGHT SIDE */}

          <div className="hidden lg:flex items-center gap-3">

            {token ? (

              <>

                <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300">

                  👋 {user?.name || "User"}

                </div>

                <button
                  onClick={logout}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 text-white text-sm font-semibold hover:scale-105 transition-all"
                >

                  Logout

                </button>

              </>

            ) : (

              <>

                <Link
                  to="/login"
                  className="text-slate-300 hover:text-white text-sm font-medium"
                >

                  Login

                </Link>

                <Link
                  to="/signup"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-sm font-semibold shadow-lg hover:scale-105 transition-all"
                >

                  Get Started

                </Link>

              </>

            )}

          </div>

          {/* MOBILE BUTTON */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-white"
          >

            ☰

          </button>

        </div>

      </div>

      {/* MOBILE MENU */}

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >

        <div className="bg-slate-950 border-t border-white/10 px-4 py-4 space-y-2">

          {navLinks.map((item) => (

            <Link
              key={item.to}
              to={item.to}
              className={`block px-4 py-3 rounded-xl text-sm ${
                location.pathname === item.to
                  ? "bg-indigo-500/20 text-indigo-300"
                  : "text-slate-300 hover:bg-white/5"
              }`}
            >

              {item.label}

            </Link>

          ))}

          {/* ADMIN MOBILE */}

          {role === "admin" && (

            <Link
              to="/admin"
              className="block px-4 py-3 rounded-xl text-sm text-rose-300 bg-rose-500/10"
            >

              Admin

            </Link>

          )}

          {/* MOBILE AUTH */}

          {token ? (

            <button
              onClick={logout}
              className="w-full mt-2 px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm font-semibold"
            >

              Logout

            </button>

          ) : (

            <div className="flex flex-col gap-2 pt-2">

              <Link
                to="/login"
                className="block text-center px-4 py-3 rounded-xl border border-white/10 text-slate-300"
              >

                Login

              </Link>

              <Link
                to="/signup"
                className="block text-center px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold"
              >

                Get Started

              </Link>

            </div>

          )}

        </div>

      </div>

    </nav>

  );

}

export default Navbar;