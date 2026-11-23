import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">AI</div>
              <span className="text-white text-lg font-bold">CareerAI</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              AI-powered career guidance platform helping students discover their ideal career path.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                ["/", "Home"],
                ["/dashboard", "Dashboard"],
                ["/career", "Career Prediction"],
                ["/resume", "Resume Analysis"],
                ["/roadmap", "Roadmap"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="hover:text-indigo-400 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2 text-sm">
              {[
                ["/skills", "Skill Assessment"],
                ["/interview", "Mock Interview"],
                ["/analytics", "Analytics"],
                ["/portfolio", "My Portfolio"],
                ["/signup", "Create Account"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="hover:text-indigo-400 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 text-center text-sm">
          <p>© 2026 Career Recommendation System · Built with ❤️ for students</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
