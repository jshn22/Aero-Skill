# AeroSkills

A modern, responsive, and interactive landing page and contact portal for **AeroSkills**. Built to help students turn theoretical knowledge into real-world skills through guided mentorship and practical projects.

## 🚀 Features

- **Modern UI/UX:** Built with React, Tailwind CSS, and Framer Motion for smooth animations and premium aesthetics.
- **Dark/Light Mode:** Full support for system-based and user-toggled theme switching.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop viewports.
- **Integrated Contact Form:** Seamlessly sends user inquiries directly to a Google Sheet.
- **Interactive Feedback Modal:** A beautiful 5-star rating feedback system that also saves directly to Google Sheets.
- **Zero-Backend Database:** Uses a custom Google Apps Script (`Code.gs`) as a serverless backend to handle form submissions via CORS without needing a traditional database.

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Routing:** React Router DOM
- **Backend (Forms):** Google Apps Script + Google Sheets

## 💻 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites

You will need [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jshn22/Aero-Skill.git
   cd Aero-Skill
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Copy the example environment file and add your Google Apps Script URL.
   ```bash
   cp .env.example .env
   ```
   Open `.env` and configure your `VITE_APPS_SCRIPT_URL`. *(See the [Google Sheets Setup Guide](./Code.gs) for instructions on deploying the Apps Script).*

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open in Browser:**
   Navigate to `http://localhost:5173` in your web browser.

## 📄 Scripts

- `npm run dev` - Starts the Vite development server.
- `npm run build` - Builds the app for production to the `dist` folder.
- `npm run preview` - Locally preview the production build.
- `npm run lint` - Runs ESLint to check for code issues.

## 📊 Google Sheets Integration

The Contact and Feedback forms do not require a database. Instead, they use a Google Apps Script to write data directly to a Google Spreadsheet.

To set this up yourself or migrate to a company account:
1. Create a Google Sheet with two tabs: `Contact Submissions` and `Feedback Submissions`.
2. Go to **Extensions > Apps Script** in your Sheet.
3. Paste the contents of the `Code.gs` file found in this repository.
4. Replace `SPREADSHEET_ID` in the script with your actual Sheet ID.
5. Deploy as a **Web App** (Execute as: Me, Who has access: Anyone).
6. Copy the resulting Web App URL into your `.env` file as `VITE_APPS_SCRIPT_URL`.

## 📜 License

This project is proprietary and intended for the AeroSkills platform.
