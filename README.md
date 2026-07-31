# Fake Internship Detector

Fake Internship Detector is an AI-powered, full-stack application that analyzes internship and job postings for fraud signals. It combines a supervised ML model with Google Gemini to return a trust score, red flag breakdown, and plain-English verdict.

### Why This Matters
With the rise of employment scams targeting job seekers, especially in developing markets, this tool provides an automated first line of defense. Using both classical ML techniques and generative AI, it can identify suspicious patterns in job postings with high accuracy and provide actionable insights to users.

## Table of Contents
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [ML Pipeline](#ml-pipeline)
- [API Overview](#api-overview)
- [Local Setup](#local-setup)
- [API Examples](#api-examples)
- [Troubleshooting](#troubleshooting)
- [Contributors](#contributors)

## Key Features
- ML-based fraud probability with calibrated trust score
- Red flag detection with severity levels
- Gemini-powered risk narrative and recommendation
- File upload for PDF, DOCX, and TXT postings
- Authenticated reporting and history dashboard

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React (Vite), Tailwind CSS, Axios, React Router |
| Backend | FastAPI, Motor (MongoDB), JWT Auth |
| ML | Scikit-learn, NLTK, Imbalanced-learn, Scipy |
| AI | Google Gemini 1.5 Flash |
| Database | MongoDB |

## Project Structure
```
fake-internship-detector/
├── frontend/                          # React (Vite) UI application
│   ├── src/
│   │   ├── components/                # Reusable UI components
│   │   │   ├── FlagList.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── RiskCard.jsx
│   │   │   ├── TrustScore.jsx
│   │   │   └── UploadForm.jsx
│   │   ├── pages/                     # Route pages
│   │   │   ├── Analyze.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Home.jsx
│   │   │   └── Reports.jsx
│   │   ├── api/
│   │   │   └── api.jsx                # API integration layer
│   │   ├── assets/                    # Static assets
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── eslint.config.js
│   └── README.md
│
├── backend/                           # FastAPI backend server
│   ├── routes/                        # API endpoint handlers
│   │   ├── analyze.py                 # Analysis endpoint
│   │   ├── auth.py                    # Authentication endpoints
│   │   ├── reports.py                 # Reporting endpoints
│   │   └── upload.py                  # File upload handling
│   ├── schemas/                       # Pydantic models
│   │   ├── posting.py
│   │   ├── report.py
│   │   └── user.py
│   ├── services/                      # Business logic
│   │   ├── gemini_service.py          # Google Gemini integration
│   │   ├── nlp_service.py             # NLP utilities
│   │   └── score_service.py           # Scoring logic
│   ├── database/                      # Database layer
│   │   ├── mongodb.py                 # MongoDB connection
│   │   └── schema.py                  # Database schemas
│   ├── ml_models/                     # Trained ML artifacts
│   ├── app.py                         # FastAPI application entry
│   ├── config.py                      # Configuration settings
│   └── requirements.txt
│
├── ml/                                # Machine learning pipeline
│   ├── dataset/
│   │   ├── raw/
│   │   │   └── fake_job_postings.csv  # Source data (EMSCAD)
│   │   └── processed/
│   │       ├── train_text.csv
│   │       ├── train_structured.csv
│   │       ├── test_text.csv
│   │       └── test_structured.csv
│   ├── features/
│   │   └── feature_builder.py         # Feature engineering
│   ├── train.py                       # Model training script
│   ├── evaluate.py                    # Model evaluation
│   └── requirements.txt
│
├── docs/                              # Documentation
│
└── README.md                          # Project overview
```

## How It Works
1. A posting is submitted through the UI or uploaded from a file.
2. The backend extracts and cleans text, builds structured features, and runs the ML model.
3. Gemini analyzes the posting with the ML score as context.
4. The API returns a combined verdict, trust score, and red flag list.

## ML Pipeline

### Dataset
The model is trained on EMSCAD (Employment Scam Arabic Dataset). The source file is ml/dataset/raw/fake_job_postings.csv and processed splits are in ml/dataset/processed/.

Class distribution:
- Legitimate: 17,014 (95.16%)
- Fraudulent: 866 (4.84%)

### Feature Engineering
The shared feature builder is in ml/features/feature_builder.py and is used by both training and inference. It includes:
- Text normalization and lemmatization
- Red flag keyword counts
- Structured signals (missing fields, text lengths, employment type)
- TF-IDF features on cleaned text

### Training
Training is implemented in ml/train.py and includes TF-IDF vectorization, SMOTE balancing, and a GradientBoostingClassifier. The script exports:
- backend/ml_models/scam_detector.pkl
- backend/ml_models/vectorizer.pkl

## API Overview
Base URL: http://127.0.0.1:8000

Key endpoints:
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me
- POST /api/analyze
- POST /api/upload
- GET /api/reports
- POST /api/reports
- DELETE /api/reports/{id}

Interactive docs are available at http://127.0.0.1:8000/docs.

## API Examples

### Authentication Flow

**Register a new user:**
```bash
curl -X POST "http://127.0.0.1:8000/api/auth/register" \
  -H "Content-Type: application/json" \
  -d {
    "email": "user@example.com",
    "password": "securepassword",
    "full_name": "John Doe"
  }
```

**Login:**
```bash
curl -X POST "http://127.0.0.1:8000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d {
    "email": "user@example.com",
    "password": "securepassword"
  }
```
Response includes `access_token` - use this in subsequent requests.

### Analyze a Job Posting

**Direct text analysis:**
```bash
curl -X POST "http://127.0.0.1:8000/api/analyze" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d {
    "title": "Work from home - Easy Money!",
    "description": "Make $5000 per week...",
    "company": "XYZ Corp"
  }
```

**File upload analysis:**
```bash
curl -X POST "http://127.0.0.1:8000/api/upload" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -F "file=@posting.pdf"
```

### Reporting & History

**Get all reports:**
```bash
curl -X GET "http://127.0.0.1:8000/api/reports" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

**Save a report:**
```bash
curl -X POST "http://127.0.0.1:8000/api/reports" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d {
    "posting_id": "analysis_result_id",
    "notes": "Flagged due to missing company details"
  }
```

## Local Setup

### Prerequisites
- Python 3
- Node.js with npm
- A MongoDB instance (Atlas or local)

### 1) Install dependencies
```bash
cd backend
pip install -r requirements.txt

cd ../ml
pip install -r requirements.txt

cd ../frontend
npm install
```

### 2) Configure environment
Create `backend/.env` with the following values:

```env
# Google Gemini API Configuration
# Get your free API key from: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=your_key

# MongoDB Connection URI
# Local: mongodb://localhost:27017
# Atlas: mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority
MONGO_URI=your_mongodb_uri

# Database Configuration
DB_NAME=internship_detector

# JWT Authentication
# Generate a strong secret key: python -c "import secrets; print(secrets.token_urlsafe(32))"
SECRET_KEY=your_jwt_secret
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

**Environment Variables Guide:**
- `GEMINI_API_KEY`: Obtain from [Google AI Studio](https://makersuite.google.com/app/apikey) (free tier available)
- `MONGO_URI`: Can use local MongoDB or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free cluster available)
- `SECRET_KEY`: Use a strong random string for JWT signing
- `DB_NAME`: Name of MongoDB database (will be created automatically)

### 3) Train the model
```bash
cd ml
python train.py
```

### 4) Run the services
```bash
cd backend
uvicorn app:app --reload

cd ../frontend
npm run dev
```

Frontend: http://localhost:5173
Backend: http://127.0.0.1:8000

## Troubleshooting

### MongoDB Connection Issues
**Problem:** `Connection refused` error
- **Local MongoDB:** Ensure MongoDB is running (`mongod` command)
- **Atlas:** Check IP whitelist in MongoDB Atlas dashboard - add your IP
- **URI Format:** Verify connection string format matches your setup

### Gemini API Errors
**Problem:** `401 Unauthorized` or `INVALID_API_KEY`
- Verify your API key is correctly copied from [Google AI Studio](https://makersuite.google.com/app/apikey)
- Check `.env` file has no extra spaces around the key
- Ensure API is enabled in your Google Cloud project

### Model Training Issues
**Problem:** Model training fails or takes too long
- Ensure dataset is in `ml/dataset/raw/fake_job_postings.csv`
- Check system has sufficient RAM (4GB+ recommended)
- For imbalanced dataset issues, SMOTE is already applied in the pipeline

### File Upload Failures
**Problem:** Upload endpoint returns error
- Supported formats: PDF, DOCX, TXT
- Maximum file size: 10MB
- Ensure file is not corrupted
- Check backend logs for detailed error message

### Port Already in Use
**Problem:** Port 8000 or 5173 already in use
```bash
# Frontend (change port)
npm run dev -- --port 3000

# Backend (change port)
uvicorn app:app --reload --port 8001
```

## Contributors

<a href="https://github.com/SaiVaibhav1805">
  <img src="https://github.com/SaiVaibhav1805.png" width="50" height="50" alt="SaiVaibhav1805" style="border-radius: 50%;"/>
</a>
<a href="https://github.com/subxm">
  <img src="https://github.com/subxm.png" width="50" height="50" alt="subxm" style="border-radius: 50%;"/>
</a>

- [SaiVaibhav1805](https://github.com/SaiVaibhav1805)
- [subxm](https://github.com/subxm)

Maintained by:
- Sai Vaibhav
- Subham Singh Negi
