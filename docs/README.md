# 📅 Year in Review Generator

![Project Status](https://img.shields.io/badge/status-live-success)
![License](https://img.shields.io/badge/license-MIT-blue)
![Tech Stack](https://img.shields.io/badge/stack-React%20%7C%20Tailwind%20%7C%20Vite-blueviolet)

> **Turn your yearly stats and memories into aesthetic, shareable stories.**

A privacy-focused, zero-backend web application that empowers users to visualize their year (reading stats, fitness goals, coding commits, etc.) in a "Spotify Wrapped" style format. Features 12+ unique visual themes ranging from 8-Bit Retro to Cyberpunk Neon.

🔗 **Live Demo:** [https://year-in-review-jak.vercel.app/](https://year-in-review-jak.vercel.app/)

---

## ✨ Key Features

### 🎨 12+ Visual Themes
Diverse aesthetic engines catering to different user personas, instantly transforming the same data into entirely different vibes:
* **Retro:** 8-Bit console nostalgia.
* **Swiss:** International Typographic Style (Grid systems).
* **Neon:** Cyberpunk/Dark mode aesthetics.
* **Journal:** Hand-drawn, sketchbook vibes.
* **Glass:** Frosted, gradient glassmorphism.
* ... and many more including LoFi, Minimal, Brutalism, Vaporwave, Dark Academia, Pop Art, and Blueprint.

### 📸 Smart Screenshot Mode
Native "Download" buttons often fail on in-app mobile webviews (like clicking a link from Instagram). We implemented a dedicated **"Screenshot Mode"**:
* Toggles a full-screen, clean overlay.
* Hides all UI chrome (buttons, navigation arrows, forms).
* Allows users to take perfect native device screenshots designed for Instagram Stories/TikTok dimensions.

### 🔒 Privacy-First (Local-First)
* **Zero Backend:** No user text, data, or photos are sent to any server. Everything is processed directly in your browser.
* **Persistence:** Data is saved automatically to the browser's `localStorage`, allowing users to return later without losing their progress.

### 🚀 UX & Accessibility
* **Magic Write / Smart Summary:** A deterministic algorithm that reads your selected stats and automatically generates personalized, aesthetic summary paragraphs.
* **Internationalization (i18n):** Full localization support for English (`en`) and Indonesian (`id`).
* **Interactive UI:** Smooth transitions, responsive forms, and live previews.

---

## 🛠️ Tech Stack

* **Frontend Framework:** React 18
* **Styling:** Tailwind CSS 
* **Icons:** Lucide React
* **Building & Bundling:** Vite
* **Deployment:** Vercel

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites
* Node.js (v18 or higher recommended)
* npm, yarn, or pnpm

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/fadlyzaki/year-in-review.git
    cd year-in-review
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or yarn install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    # or yarn dev
    ```

4.  Open `http://localhost:5173` in your browser.

---

## 📂 Project Architecture

The core logic currently lives within the React components, driven by a configuration-based approach. 

```text
src/
├── YearInReviewGenerator.jsx # Main core application, monolithic logic & views
├── App.jsx                   # Application entry point
├── main.jsx                  # React DOM rendering
└── index.css                 # Global Tailwind styles
```

*(Note: The project aims to eventually transition to a more heavily modularized architecture to separate theme renderers and config data.)*

---

## 📄 Documentation

- **PRD.md**: Contains the comprehensive Product Requirements Document detailing the scope, features, and non-functional requirements of this project.

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/fadlyzaki/year-in-review/issues).

## 📝 License
This project is licensed under the MIT License.
