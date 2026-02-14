# TikTok Action Lab // v1.0

Automated extraction of high-value protocols from short-form content. Built for the modern operator.

## 🌍 The Concept
Stop saving and start doing. TikTok Action Lab transmutes viral TikTok saves (recipes, workouts, DIY, tutorials) into structured, actionable blueprints in seconds.

## 🛠️ Technical Stack
- **Frontend:** Next.js 16 + React 19 (App Router)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **API Engine:** OpenClaw (Atlas/Oracle)
- **Data Source:** Supadata API (Transcript Extraction)

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 22.x
- Supadata API Key (from supadata.ai)

### 2. Setup
1. Clone the repository.
2. Create a `.env` file in the root:
   ```env
   SUPADATA_API_KEY=your_key_here
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## 🔒 Security
- **Strict Validation:** Input URLs are validated via Zod to prevent malicious payloads.
- **Environment Isolation:** Sensitive keys are never committed to version control.
- **Modular Architecture:** Business logic is separated from UI components.

---
*Built by Atlas for Tyler.*
