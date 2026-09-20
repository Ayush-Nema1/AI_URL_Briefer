# WebBrief

AI-powered website summarizer that analyzes a public URL, fetches its webpage content, and generates a structured report using the Gemini API.

## Overview

WebBrief allows a user to enter any public webpage URL. The application parses the URL, fetches the webpage content, and sends the relevant content to the Gemini AI model. The generated response is displayed as a structured website report.

The application also includes a fallback search mechanism when direct webpage fetching is unsuccessful.

## Features

* Enter any public URL
* Parse URL and identify the website/page
* Fetch visible webpage text
* Search fallback when direct fetching fails
* AI-generated website analysis
* Website overview and purpose
* Requested page/section analysis
* Key points extraction
* Content/data type identification
* Target audience and main topics
* Trust and authenticity signals
* Loading indicator
* Error handling
* Responsive and simple interface

## Tech Stack

### Frontend

* React
* Vite
* CSS

### Backend

* Node.js
* Express.js

### AI

* Google Gemini API

## Project Structure

```text
WebBrief/
│
├── backend/
│   ├── src/
│   │   ├── aiService.js
│   │   ├── pageFetcher.js
│   │   ├── searchFallback.js
│   │   ├── server.js
│   │   └── urlParser.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── index.html
│
├── .gitignore
└── README.md
```

## How It Works

The application follows this flow:

```text
User enters URL
       ↓
Frontend sends URL to backend
       ↓
URL is parsed
       ↓
Backend tries to fetch webpage content
       ↓
If direct fetch fails → search fallback is used
       ↓
Relevant webpage content is prepared
       ↓
Content + URL information sent to Gemini API
       ↓
Gemini generates structured report
       ↓
Report returned to frontend
       ↓
Report displayed to user
```

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/Ayush-Nema1/AI_URL_Briefer.git
cd AI_URL_Briefer
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
GEMINI_API_KEY=your_key_here
PORT=5000
```

Start the backend:

```bash
npm start
```

The backend will run on:

```text
http://localhost:5000
```

### 3. Setup Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal.

## How AI Was Used

WebBrief uses the **Google Gemini API** to analyze the content collected from the submitted webpage.

The backend sends the fetched webpage content together with URL information to the Gemini model.

Gemini generates a structured website report containing information such as:

* Website overview
* Website purpose
* Requested page or section
* Key points
* Content/data type
* Target audience
* Main topics
* Trust and authenticity signals
* Advice and limitations when applicable

The AI response is then returned by the backend and displayed in the React frontend.

## Backend API

### Analyze URL

```http
POST /api/analyze
```

Request:

```json
{
  "url": "https://example.com"
}
```

The backend processes the URL and returns the generated website report.

## Environment Variables

The backend requires:

```env
GEMINI_API_KEY=your_key_here
PORT=5000
```

The Gemini API key should be stored only in the backend environment and should **not** be committed to GitHub.

## Error Handling

The application handles common failures such as:

* Invalid URL
* Webpage fetch failure
* Empty webpage content
* AI service errors
* Network/API errors

A loading indicator is also displayed while the webpage is being analyzed.

## Deployment

The project can be deployed with:

* Frontend: Vercel
https://ai-url-briefer.vercel.app/

* Backend: Render


The frontend communicates with the deployed backend API.

## Demo

A short demo video can be provided to demonstrate the complete flow:

```text
Enter URL → Analyze → Fetch Content → AI Processing → Display Report
```

## Author

**Ayush Nema**

B.Tech Computer Science and Engineering
