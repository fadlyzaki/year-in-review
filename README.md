**📅 Year in Review Generator**

Turn your yearly stats and memories into aesthetic, shareable stories.
A privacy-focused, zero-backend web application that empowers users to visualize their year (reading stats, fitness goals, coding commits, etc.) in a "Spotify Wrapped" style format. Features 12+ unique visual themes ranging from 8-Bit Retro to Cyberpunk Neon.
🔗 Live Demo: https://year-in-review-jak.vercel.app/

**✨ Key Features**

🎨 12 Visual Themes
Diverse aesthetic engines catering to different user personas:
Retro: 8-Bit console nostalgia.
Swiss: International Typographic Style (Grid systems).
Neon: Cyberpunk/Dark mode aesthetics.
LoFi, Minimal, Brutalism, Vaporwave, and more.

**📸 Smart Screenshot Mode**

Native "Download" buttons often fail on mobile webviews. We implemented a dedicated "Clean Mode":
Toggles a full-screen overlay.
Hides all UI chrome (buttons, navigation arrows).
Allows users to take perfect native screenshots for Instagram Stories/TikTok.

**🔒 Privacy-First (Local-First)**
Zero Backend: No user data is sent to a server.
Persistence: Data is saved automatically to the browser's localStorage, allowing users to return later without losing progress.

**🚀 UX & Accessibility**
Onboarding Flow: Interactive guide for first-time users.
Internationalization (i18n): Full support for English (en) and Indonesian (id).
Smart Summary: Deterministic algorithm that generates personalized yearly summaries based on the icons/stats selected by the user.

**🛠️ Tech Stack**
Frontend: React 18
Styling: Tailwind CSS (Utility-first architecture)
Icons: Lucide React
Build Tool: Vite
Deployment: Vercel

**🚀 Getting Started**
Follow these steps to run the project locally.
Prerequisites
Node.js (v16 or higher)
npm or yarn
Installation
Clone the repository
git clone [https://github.com/yourusername/year-in-review.git](https://github.com/yourusername/year-in-review.git)
cd year-in-review


Install dependencies
npm install


Start the development server
npm run dev


Open http://localhost:5173 in your browser.


**📂 Project Structure**
The project is transitioning to a Domain-Driven Architecture (Architecture 2.0) for scalability.
src/
├── components/
│   ├── themes/       # Individual theme renderers (RenderRetro, RenderSwiss, etc.)
│   └── ui/           # Reusable atoms (Buttons, Inputs, Modals)
├── hooks/            # Custom hooks (usePersistentState, useScreenshotMode)
├── types/            # TypeScript interfaces & Domain Contracts
├── constants/        # Static config (Icon mappings, Theme definitions)
├── utils/            # Business logic (Summary generators)
└── App.jsx           # Main composition root


**📖 Usage Guide**
Input Data: Fill in your yearly statistics (e.g., Books Read, km Run, Lines of Code).
Add Highlights: Note down your top 3 moments of the year.
Photo Dump: Upload images directly from your device (processed locally).
Select Theme: Swipe through the theme selector to find your vibe.
Preview & Capture:
Click "Preview Story".
Click "Screenshot Mode".
Tap the Camera Icon to hide the UI.
Take a screenshot!

**🤝 Contributing**
Contributions are welcome! Please feel free to submit a Pull Request.
Fork the project.
Create your feature branch (git checkout -b feature/AmazingFeature).
Commit your changes (git commit -m 'Add some AmazingFeature').
Push to the branch (git push origin feature/AmazingFeature).
Open a Pull Request.

**📄 License**
Distributed under the MIT License. See LICENSE for more information.
<p align="center">
Made with ❤️ by <a href="https://www.linkedin.com/in/fadlyzaki/">Fadly Zaki</a>
</p>
