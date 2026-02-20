# Product Requirements Document (PRD): Year in Review Generator

## 1. Product Overview
**Year in Review Generator** is a privacy-first, client-side web application that empowers users to create aesthetic, shareable stories of their yearly milestones. Inspired by the "Spotify Wrapped" format, the application allows users to input their personal statistics, key memories, and photos, and then renders them into beautiful, downloadable formats across various visual themes.

## 2. Target Audience
- Individuals looking to summarize their year creatively.
- Users who want to share their yearly achievements on visually driven social media platforms (Instagram Stories, TikTok, Twitter).
- Privacy-conscious individuals who hesitate to use third-party apps demanding backend data access for similar functionalities.

## 3. Core Objectives
- **Aesthetic Customization:** Offer a wide variety of high-quality templates that cater to different personal brands and visual preferences.
- **Privacy First:** Ensure zero user data leaves the device.
- **Ease of Use:** Provide an intuitive mobile-first interface for data entry and customization.
- **Shareability:** Make it frictionless to export the final result natively for social media.

## 4. Key Features & Requirements

### 4.1. Data Entry & Customization
- **Personalized Stats:** Users can input numerical data paired with 30+ categorized icons (e.g., Books Read, Workouts, Lines of Code, Travel, Gaming).
- **Core Memories:** Users can add multiple text-based highlights with titles, descriptions, and emojis.
- **Photo Dump:** Support for uploading local images directly into the layout.

### 4.2. Theming Engine
- The application must support at least 12 distinct stylistic themes, rendering the inputted data uniquely.
- **Available Themes:** 8-Bit Retro, Swiss Grid, Lo-Fi Scrapbook, Cyberpunk Neon, Modern Minimalist, Hand-Drawn Journal, Glassmorphism, Neo-Brutalism, Vaporwave, Dark Academia, Pop Art, and Blueprint.

### 4.3. Smart Generation
- **Smart Summary ("Magic Write"):** An algorithm that automatically generates a personalized, aesthetic summary paragraph based on the user's most prominent inputted stats and active language.

### 4.4. Internationalization (i18n)
- Native support for multiple languages, specifically **English (`en`)** and **Indonesian (`id`)**.
- The entire UI, including placeholders, generated summaries, and theme-specific labels, must adapt to the selected language.

### 4.5. Export & Sharing
- **Screenshot Mode / Clean UI:** Since native canvas-based downloads often fail or degrade quality on mobile webviews (like Instagram's in-app browser), the app must provide a "Screenshot Mode".
- This mode hides all interactive UI elements (buttons, sliders, forms) and overlays the layout full-screen, prompting the user to take a native device screenshot.

### 4.6. Data Persistence
- **Local Storage:** All inputs (stats, texts, base64 photo data) must auto-save to the browser's `localStorage` so users can return and continue editing without data loss.

## 5. Non-Functional Requirements
- **Architecture:** Zero-backend architecture. The app runs entirely in the browser.
- **Responsiveness:** Mobile-first layout. The generated "slides" should ideally mimic a 9:16 aspect ratio fitting standard phone screens and social media story formats.
- **Performance:** Instantaneous theme switching and efficient handling of user-uploaded images to prevent browser lag.

## 6. Technology Stack
- **Framework:** React 18
- **Styling:** Tailwind CSS (Utility-first framework for rapid UI styling)
- **Icons:** Lucide React
- **Build Tool:** Vite
- **Deployment:** Vercel (or any static hosting)
- **Analytics (Optional/Opt-in):** Google Analytics 4 / Vercel Web Analytics for basic traffic monitoring.

## 7. Future Road Map / Scope
- Transitioning from a single monolithic component (`YearInReviewGenerator.jsx`) to a Domain-Driven Architecture with separated theme components.
- Adding drag-and-drop reordering for stats and photos.
- Introducing a native "Download as Image" feature using `html2canvas` as a fallback for desktop users.
