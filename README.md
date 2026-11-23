# 🎓 Career Recommendation System — CareerAI

## What Changed (CSS → Tailwind Upgrade)

### ✅ Files Removed (Unnecessary)
- `frontend/src/styles/` — entire folder deleted (all individual CSS files)
- `frontend/src/App.css` — Vite boilerplate CSS removed
- `frontend/node_modules/` — not included (run `npm install`)
- `backend/venv/` — not included (run `pip install -r requirements.txt`)
- `backend/__pycache__/` — compiled cache removed
- `backend/main.ipynb` — development notebook removed
- `package-lock.json` — regenerated on `npm install`
- Unused dependencies: `antd`, `@reduxjs/toolkit`, `react-redux`, `react-scripts`, `@testing-library/*`, `web-vitals`, `react-spinners`

### ✅ Files Updated (Tailwind Rewrite)
| File | Change |
|------|--------|
| `src/index.css` | Tailwind directives + custom component classes |
| `tailwind.config.js` | Extended with custom colors, animations, gradients |
| `src/App.jsx` | Cleaned, no CSS import |
| `src/components/Navbar.jsx` | Responsive hamburger menu, scroll-aware |
| `src/components/Footer.jsx` | Modern multi-column footer |
| `src/components/Chatbot.jsx` | Polished chat bubbles, typing indicator |
| `src/pages/Home.jsx` | Hero gradient, feature cards, career grid |
| `src/pages/Login.jsx` | Glassmorphism card, show/hide password |
| `src/pages/Signup.jsx` | Gradient background, clean form |
| `src/pages/Dashboard.jsx` | Card grid with gradients, stat boxes |
| `src/pages/Resume.jsx` | Drag-and-drop upload, results cards |
| `src/pages/Roadmap.jsx` | Timeline steps with connector line |
| `src/pages/MockInterview.jsx` | Clean select + results display |
| `src/pages/Portfolio.jsx` | Profile card with PDF export |

## Setup

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
pip install -r requirements.txt
python app.py
```
