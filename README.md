# 👋 Christopher Cadger | Aspiring AGI/ML Engineer, Honolulu HI
*IBM AI Engineering Cert | Robotics + Computer Vision | Open to junior roles*
# GlowAI - AI Skin Analysis

GlowAI is an AI-powered skin analysis web app. Take a selfie or upload a photo and receive a full personalized report including detected skin issues, food recommendations, a daily skincare routine, product suggestions, lifestyle tips, and doctor visit guidance.

## Features

- **Camera Capture & Upload** - Use your device camera to take a selfie or upload an existing photo. Works on desktop and mobile.
- **AI Skin Analysis** - Powered by GPT-4o Vision to detect skin type, identify issues (acne, dryness, dark spots, redness, etc.), and rate overall skin health.
- **Food Recommendations** - Personalized food suggestions that target your specific skin concerns.
- **Skincare Routine** - Step-by-step morning and evening routines tailored to your skin.
- **Product Suggestions** - Product category recommendations with key ingredients to look for.
- **Doctor Visit Advice** - Urgency-rated guidance on whether you should see a dermatologist, and what specialist to look for.
- **Lifestyle Tips** - General habits and tips for healthier skin.

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) components
- [Vercel AI SDK 6](https://sdk.vercel.ai/) with GPT-4o Vision
- [Lucide React](https://lucide.dev/) icons
- [Zod](https://zod.dev/) for schema validation

## Getting Started

### Prerequisites

- Node.js 18+
- An OpenAI API key (for GPT-4o Vision)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR_USERNAME/glowai-skin-analysis.git
   cd glowai-skin-analysis
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your OpenAI API key:

   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
  layout.tsx           # Root layout with fonts and metadata
  page.tsx             # Main page with app state management
  globals.css          # Theme tokens and global styles
  api/
    analyze/
      route.ts         # AI analysis API route (GPT-4o Vision + Zod schema)
components/
  header.tsx           # App header/branding
  camera-capture.tsx   # Camera and file upload component
  analysis-loading.tsx # Loading skeleton during analysis
  analysis-results.tsx # Results dashboard layout
  score-ring.tsx       # Animated SVG health score ring
  issue-card.tsx       # Skin issue cards with severity badges
  food-card.tsx        # Food recommendation cards
  routine-card.tsx     # Skincare routine step cards
  product-card.tsx     # Product suggestion cards
  doctor-card.tsx      # Doctor visit advice card
  tips-card.tsx        # Lifestyle tips card
```

## How It Works

1. The user takes a selfie or uploads a photo via the `CameraCapture` component.
2. The image is sent as base64 to the `/api/analyze` route.
3. The API sends the image to GPT-4o Vision with a structured Zod schema using the Vercel AI SDK's `Output.object()`.
4. The AI returns a structured JSON response with skin type, issues, food recommendations, routines, products, doctor advice, and tips.
5. The results are displayed in a dashboard with animated score ring, color-coded severity badges, and organized recommendation cards.

## Deployment

### Deploy to Vercel

The easiest way to deploy is with [Vercel](https://vercel.com):

1. Push your code to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import your repository.
3. Add your `OPENAI_API_KEY` environment variable in the Vercel dashboard.
4. Click Deploy.

### Environment Variables

| Variable         | Required | Description                        |
| ---------------- | -------- | ---------------------------------- |
| `OPENAI_API_KEY` | Yes      | Your OpenAI API key for GPT-4o    |

## Disclaimer

GlowAI provides general skincare guidance only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified dermatologist for serious skin concerns.

## License

MIT License - see [LICENSE](LICENSE) for details.
