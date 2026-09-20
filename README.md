# WebBrief

## Overview

AI-powered website summarizer.

## Features

* Enter public URL
* Parse URL
* Fetch webpage text
* AI-generated summary
* Search fallback when direct fetch fails
* Trust & authenticity analysis
* Loading and error handling

## Tech Stack

Frontend: React, Vite, CSS
Backend: Node.js, Express
AI: Gemini API

## Setup

### Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
GEMINI_API_KEY=your_key_here
```

Then start the backend:

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal.

## How AI Was Used

The fetched webpage content and URL information are sent to the Gemini API.

The model generates a structured website report including overview, requested page, key points, audience, topics, and trust signals.

## Environment

The backend requires the following environment variable:

```env
GEMINI_API_KEY=your_key_here
PORT=5000
```

The backend uses one Gemini generation request per submitted URL.
