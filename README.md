# LMS Chatbot 

A lightweight LMS assistant: Python backend + Vite React frontend.

## Repository structure

- `LMS_Assistant_Backend/` — Python backend (entry: `main.py`).
- `LMS-Frontend/` — Vite + React frontend (entry: `src/` and `package.json`).

## Prerequisites

- Python 3.9+ and `pip` (for backend)
- Node 18+ and `npm` or `pnpm` (for frontend)

## Backend — Quick start

1. Open a terminal and change directory:

```powershell
cd LMS_Assistant_Backend
```

2. (Optional) Create and activate a virtual environment:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1    # PowerShell
# or
.\.venv\Scripts\activate.bat     # cmd.exe
```

3. Install dependencies and run:

```powershell
pip install -r requirements.txt
python main.py
```

Notes:
- See `requirements.txt` for backend dependencies.

## Frontend — Quick start

1. Open a terminal and change directory:

```powershell
cd LMS-Frontend
```

2. Install dependencies and run dev server:

```powershell
npm install
npm run dev
```

3. Open the local dev URL shown by Vite (usually `http://localhost:5173`).

## Environment & Configuration

- If the backend exposes an API, update the frontend config or `fetch` base URL to point to the backend server (e.g., `http://localhost:8000`).
