# 📅 Year in Review Generator

![Project Status](https://img.shields.io/badge/status-live-success)
![License](https://img.shields.io/badge/license-MIT-blue)
![Tech Stack](https://img.shields.io/badge/stack-React%20%7C%20Tailwind%20%7C%20Vite-blueviolet)

> **Turn your yearly stats and memories into aesthetic, shareable stories.**

A privacy-focused, zero-backend web application that empowers users to visualize their year (reading stats, fitness goals, coding commits, etc.) in a "Spotify Wrapped" style format. Features 12+ unique visual themes ranging from 8-Bit Retro to Cyberpunk Neon.

🔗 **Live Demo:** [https://year-in-review-jak.vercel.app/](https://year-in-review-jak.vercel.app/)

---

## ✨ Key Features

### 🎨 12 Visual Themes
Diverse aesthetic engines catering to different user personas:
* **Retro:** 8-Bit console nostalgia.
* **Swiss:** International Typographic Style (Grid systems).
* **Neon:** Cyberpunk/Dark mode aesthetics.
* **LoFi, Minimal, Brutalism, Vaporwave, and more.**

### 📸 Smart Screenshot Mode
Native "Download" buttons often fail on mobile webviews. We implemented a dedicated **"Clean Mode"**:
* Toggles a full-screen overlay.
* Hides all UI chrome (buttons, navigation arrows).
* Allows users to take perfect native screenshots for Instagram Stories/TikTok.

### 🔒 Privacy-First (Local-First)
* **Zero Backend:** No user data is sent to a server.
* **Persistence:** Data is saved automatically to the browser's `localStorage`, allowing users to return later without losing progress.

### 🚀 UX & Accessibility
* **Onboarding Flow:** Interactive guide for first-time users.
* **Internationalization (i18n):** Full support for English (`en`) and Indonesian (`id`).
* **Smart Summary:** Deterministic algorithm that generates personalized yearly summaries based on the icons/stats selected by the user.

---

## 🛠️ Tech Stack

* **Frontend:** React 18
* **Styling:** Tailwind CSS (Utility-first architecture)
* **Icons:** Lucide React
* **Build Tool:** Vite
* **Deployment:** Vercel

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites
* Node.js (v16 or higher)
* npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/fadlyzaki/year-in-review.git](https://github.com/fadlyzaki/year-in-review.git)
    cd year-in-review
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  Open `http://localhost:5173` in your browser.

---

## 📂 Project Structure

The project is transitioning to a **Domain-Driven Architecture** (Architecture 2.0) for scalability.

```text
src/
├── components/
│   ├── themes/       # Individual theme renderers (RenderRetro, RenderSwiss, etc.)
│   └── ui/           # Reusable atoms (Buttons, Inputs, Modals)
├── hooks/            # Custom hooks (usePersistentState, useScreenshotMode)
├── types/            # TypeScript interfaces & Domain Contracts
├── constants/        # Static config (Icon mappings, Theme definitions)
├── utils/            # Business logic (Summary generators)
└── App.jsx           # Main composition root
