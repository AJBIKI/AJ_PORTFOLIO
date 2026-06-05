# 🔬 Diabetes Prediction System — Developer Blueprint
> **Re-Engineering Reference · v1.0 · June 2026**  
> A forensic dissection of every layer: ML pipeline → REST API → React frontend.  
> Read this before you touch a single line of code.

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Repository Anatomy](#2-repository-anatomy)
3. [Architecture Diagram](#3-architecture-diagram)
4. [Service Layer Deep-Dives](#4-service-layer-deep-dives)
   - 4.1 [ML Model Service (Python / Flask)](#41-ml-model-service-python--flask)
   - 4.2 [Backend API (Node.js / Express)](#42-backend-api-nodejs--express)
   - 4.3 [Frontend (React / Vite)](#43-frontend-react--vite)
5. [Data Contracts & API Reference](#5-data-contracts--api-reference)
6. [Database Schema](#6-database-schema)
7. [Authentication & Security Model](#7-authentication--security-model)
8. [ML Pipeline Internals](#8-ml-pipeline-internals)
9. [Environment Configuration](#9-environment-configuration)
10. [Developer Runbook](#10-developer-runbook)
11. [Re-Engineering Roadmap](#11-re-engineering-roadmap)
12. [Known Weaknesses & Tech Debt](#12-known-weaknesses--tech-debt)

---

## 1. System Overview

The **Diabetes Prediction System** is a full-stack, AI-powered clinical risk assessment tool. Users enter eight physiological biomarkers and receive a real-time probability-based classification — *Diabetic* or *Non-Diabetic* — driven by a trained ensemble of scikit-learn classifiers.

### Core Capabilities

| Capability | Implementation |
|---|---|
| ML Inference | scikit-learn classifier (best of RF / SVM / LR) via Flask REST |
| Persistence | MongoDB Atlas via Mongoose ODM |
| Auth | JWT (RS256-compatible) + bcrypt password hashing |
| Guest Mode | Predictions work without login; history not saved |
| Batch Inference | `/batch-predict` endpoint for multiple patients |
| Dashboard | Per-user history + aggregate statistics |

### Tech Stack at a Glance

```
┌─────────────────────────────────────────────────────────────────┐
│  REACT (Vite) · JSX · Vanilla CSS                               │  ← Frontend :5173
├─────────────────────────────────────────────────────────────────┤
│  EXPRESS.JS 4.x · Mongoose 8.x · JWT · Axios                   │  ← Backend  :3000
├─────────────────────────────────────────────────────────────────┤
│  FLASK 3.0 · scikit-learn 1.4+ · joblib · NumPy                │  ← ML API   :5000
├─────────────────────────────────────────────────────────────────┤
│  MONGODB ATLAS (Pima Indians Dataset → diabetes.csv)            │  ← Data Layer
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Repository Anatomy

```
Antigravity/
│
├── 📄 README.md                  # User-facing getting-started guide
├── 📄 ATLAS_SETUP.md             # MongoDB Atlas connection walkthrough
├── 📄 AUTH_GUIDE.md              # JWT auth implementation notes
├── 📄 .gitignore                 # Ignores node_modules, .env, venv, *.pkl
│
├── 🐍 ml-model/                  # Python service — training + inference
│   ├── train.py                  # Full training pipeline (class DiabetesPredictor)
│   ├── app.py                    # Flask REST API serving the model
│   ├── diabetes.csv              # Pima Indians Diabetes Dataset (768 samples)
│   ├── diabetes_model.pkl        # Serialised best model (~1.3 MB)
│   ├── scaler.pkl                # Fitted StandardScaler (~1 KB)
│   ├── feature_names.pkl         # Ordered feature list
│   ├── model_metadata.pkl        # Algorithm, accuracy, sample counts
│   ├── model_performance.png     # 4-panel evaluation visualisation
│   ├── requirements.txt          # Python dependencies (pinned)
│   └── venv/                     # Python virtual environment (gitignored)
│
├── ⚙️  backend/                   # Node.js service — orchestration + persistence
│   ├── server.js                 # App entry point; all routes inline
│   ├── package.json              # npm manifest; scripts: start / dev
│   ├── .env                      # Secrets (gitignored)
│   ├── .env.example              # Template for local setup
│   ├── controllers/
│   │   └── authController.js     # signup / login / getMe handlers
│   ├── middleware/
│   │   └── auth.js               # protect + optionalAuth JWT guards
│   └── models/
│       ├── User.js               # Mongoose User schema + pre-save hook
│       └── Prediction.js         # Mongoose Prediction schema
│
└── ⚛️  frontend/                  # React SPA — user interface
    ├── index.html                # Shell HTML; mounts #root
    ├── vite.config.js            # Vite config (minimal)
    ├── eslint.config.js          # ESLint rules
    ├── package.json              # React 18, dependencies
    └── src/
        ├── main.jsx              # ReactDOM.createRoot entry
        ├── App.jsx               # Root component; routing logic (state-based)
        ├── App.css               # Global styles (14 KB — all-in-one)
        ├── index.css             # Base reset + font import
        ├── config.js             # API_URL constant (env-aware)
        ├── context/
        │   └── AuthContext.jsx   # React Context; token + user state
        └── components/
            ├── PredictionForm.jsx   # 8-field biomarker input form
            ├── ResultDisplay.jsx    # Prediction result + probability gauge
            ├── Dashboard.jsx        # User history + aggregate stats
            └── AuthModal.jsx        # Login / signup modal overlay
```

---

## 3. Architecture Diagram

```
  USER BROWSER
       │
       │  HTTP (Vite dev: :5173)
       ▼
┌──────────────────────────────────┐
│         REACT FRONTEND           │
│                                  │
│  AuthContext ──► JWT localStorage│
│  PredictionForm                  │
│  ResultDisplay                   │
│  Dashboard                       │
│  AuthModal                       │
└────────────┬─────────────────────┘
             │
             │  REST JSON  (Bearer token in Authorization header)
             │  POST /api/predict
             │  GET  /api/history
             │  POST /api/auth/signup | /login
             ▼
┌──────────────────────────────────┐
│       EXPRESS BACKEND :3000      │
│                                  │
│  authController ◄── JWT guard    │
│  optionalAuth middleware         │
│        │                         │
│        │  axios.post /predict    │
│        ▼                         │
│  ┌─────────────┐  ┌───────────┐  │
│  │ Python ML   │  │ MongoDB   │  │
│  │ proxy call  │  │ (Atlas)   │  │
│  └─────────────┘  └───────────┘  │
└────────────┬─────────────────────┘
             │
             │  Internal HTTP (axios)
             │  POST /predict
             ▼
┌──────────────────────────────────┐
│     FLASK ML SERVICE :5000       │
│                                  │
│  validate_features()             │
│  scaler.transform(input)         │
│  model.predict() + predict_proba │
│  → { prediction, probability,    │
│      confidence, algorithm }     │
└──────────────────────────────────┘
```

### Request Lifecycle (Prediction)

```
1.  User fills PredictionForm → clicks "Predict"
2.  App.jsx::handlePredict() builds fetch({ POST /api/predict }, formData)
3.  Express server.js receives POST /api/predict
4.  optionalAuth middleware runs: attaches req.user if Bearer token present
5.  Express proxies body → axios.post(PYTHON_API_URL/predict, inputData)
6.  Flask app.py::predict():
      a. Validates all 8 features are present
      b. validate_features() checks physiological range bounds
      c. scaler.transform(features_array) — StandardScaler normalisation
      d. model.predict() → 0 or 1
      e. model.predict_proba() → [p_no_diabetes, p_diabetes]
      f. Returns JSON { prediction, result, probability, confidence, model_algorithm }
7.  Express receives response → new Prediction({ userId?, ...result }).save()
8.  Express returns enriched response (+ MongoDB _id) to frontend
9.  App.jsx sets result state → renders <ResultDisplay />
```

---

## 4. Service Layer Deep-Dives

### 4.1 ML Model Service (Python / Flask)

**Entry point:** [`ml-model/app.py`](file:///c:/code/Antigravity/ml-model/app.py)  
**Training script:** [`ml-model/train.py`](file:///c:/code/Antigravity/ml-model/train.py)

#### Flask Endpoints

| Method | Route | Auth | Description |
|---|---|---|---|
| `GET` | `/` | None | API overview + model info |
| `GET` | `/health` | None | Liveness probe |
| `GET` | `/model-info` | None | Algorithm, accuracy, features |
| `POST` | `/predict` | None | Single-patient inference |
| `POST` | `/batch-predict` | None | Multi-patient batch inference |

#### Feature Validation Rules

Enforced in [`validate_features()`](file:///c:/code/Antigravity/ml-model/app.py#L176-L198):

| Feature | Min | Max | Unit |
|---|---|---|---|
| `Pregnancies` | 0 | 20 | count |
| `Glucose` | 0 | 300 | mg/dL |
| `BloodPressure` | 0 | 200 | mm Hg |
| `SkinThickness` | 0 | 100 | mm |
| `Insulin` | 0 | 900 | mu U/ml |
| `BMI` | 0 | 70 | kg/m² |
| `DiabetesPedigreeFunction` | 0 | 3 | score |
| `Age` | 0 | 120 | years |

#### Inference Pipeline

```python
# Pseudocode of the hot path
features = [float(data[f]) for f in feature_names]   # ordered extraction
features_array = np.array(features).reshape(1, -1)    # (1, 8) matrix
features_scaled = scaler.transform(features_array)    # z-score normalisation
prediction = model.predict(features_scaled)[0]        # 0 or 1
proba = model.predict_proba(features_scaled)[0]       # [p0, p1]
```

#### Serialised Artifacts

| File | Size | Contents |
|---|---|---|
| `diabetes_model.pkl` | ~1.3 MB | Best trained scikit-learn estimator |
| `scaler.pkl` | ~1 KB | Fitted `StandardScaler` |
| `feature_names.pkl` | ~121 B | Ordered list of 8 feature strings |
| `model_metadata.pkl` | ~229 B | `{ model_name, accuracy, training_samples, test_samples }` |

---

### 4.2 Backend API (Node.js / Express)

**Entry point:** [`backend/server.js`](file:///c:/code/Antigravity/backend/server.js)

#### Express Routes

| Method | Route | Middleware | Handler |
|---|---|---|---|
| `POST` | `/api/auth/signup` | — | `authController.signup` |
| `POST` | `/api/auth/login` | — | `authController.login` |
| `GET` | `/api/auth/me` | `protect` | `authController.getMe` |
| `GET` | `/api/health` | — | Inline health check |
| `GET` | `/api/model-info` | — | Proxy → Flask `/model-info` |
| `POST` | `/api/predict` | `optionalAuth` | Proxy → Flask + MongoDB save |
| `GET` | `/api/history` | `protect` | Fetch user's prediction history |
| `GET` | `/api/history/:id` | — | Fetch single prediction by ID |
| `GET` | `/api/stats` | — | Aggregate prediction statistics |

#### Key Dependencies

```json
{
  "express": "^4.18.2",       // HTTP framework
  "mongoose": "^8.0.3",       // MongoDB ODM
  "axios": "^1.6.2",          // HTTP client → Flask proxy
  "jsonwebtoken": "^9.0.3",   // JWT signing/verification
  "bcryptjs": "^3.0.3",       // Password hashing (12 salt rounds)
  "cors": "^2.8.5",           // CORS headers
  "dotenv": "^16.3.1"         // .env loading
}
```

#### Error Handling Strategy

```
Flask unavailable  → 503 { error: "ML service unavailable" }
ECONNREFUSED       → 503 { error: "Python ML service is not running" }
Flask 4xx          → Mirrors Flask status + body
Unhandled          → 500 { error: "Prediction failed" }
```

---

### 4.3 Frontend (React / Vite)

**Entry:** [`frontend/src/main.jsx`](file:///c:/code/Antigravity/frontend/src/main.jsx) → [`App.jsx`](file:///c:/code/Antigravity/frontend/src/App.jsx)

#### Component Tree

```
<AuthProvider>                   ← AuthContext: user, token, login, logout
  <App>
    <header>
      [user]   → <UserProfile> + <LogoutBtn>
      [!user]  → <LoginBtn> → opens <AuthModal>
      [user]   → <NavToggle> (predict | dashboard)
      [!user]  → <GuestNotice>
    </header>

    <content>
      view === 'dashboard' && user  → <Dashboard />
      !result                       → <PredictionForm onSubmit={handlePredict} />
      result                        → <ResultDisplay result={result} />
    </content>

    [showAuthModal] → <AuthModal onClose={...} />
  </App>
</AuthProvider>
```

#### State Topology (App.jsx)

| State | Type | Purpose |
|---|---|---|
| `result` | `object \| null` | Latest prediction response |
| `loading` | `boolean` | Disables form submit button |
| `error` | `string \| null` | Error message display |
| `showAuthModal` | `boolean` | Controls modal visibility |
| `view` | `'predict' \| 'dashboard'` | Navigation state |

#### Auth Context (`context/AuthContext.jsx`)

- Token stored in **`localStorage`** under key `token`
- User object stored in **`localStorage`** under key `user`
- `login(token, user)` — persists both, sets state
- `logout()` — clears both, resets state
- `token` auto-attached to `Authorization: Bearer <token>` in requests

#### API Base URL (`config.js`)

```js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
export default API_URL;
```

---

## 5. Data Contracts & API Reference

### POST `/api/predict` → Flask → Express

**Request Body**

```json
{
  "Pregnancies": 6,
  "Glucose": 148,
  "BloodPressure": 72,
  "SkinThickness": 35,
  "Insulin": 0,
  "BMI": 33.6,
  "DiabetesPedigreeFunction": 0.627,
  "Age": 50
}
```

**Success Response `200`**

```json
{
  "id": "6659abc123...",
  "prediction": 1,
  "result": "Diabetes",
  "probability": {
    "no_diabetes": 0.2341,
    "diabetes": 0.7659
  },
  "confidence": 0.7659,
  "input_features": { "...": "..." },
  "model_algorithm": "Random Forest"
}
```

**Error Responses**

| Status | Condition |
|---|---|
| `400` | Missing or out-of-range features |
| `503` | Flask ML service not running |
| `500` | Unexpected server error |

---

### GET `/api/history` (protected)

**Headers:** `Authorization: Bearer <token>`

**Response `200`**

```json
{
  "total": 12,
  "predictions": [
    {
      "_id": "...",
      "userId": "...",
      "input": { "Glucose": 148, "..." : "..." },
      "prediction": 1,
      "result": "Diabetes",
      "probability": { "no_diabetes": 0.23, "diabetes": 0.77 },
      "confidence": 0.77,
      "model_algorithm": "Random Forest",
      "createdAt": "2026-06-05T10:00:00.000Z"
    }
  ]
}
```

---

### GET `/api/stats`

```json
{
  "total_predictions": 150,
  "diabetes_predictions": 62,
  "no_diabetes_predictions": 88,
  "diabetes_percentage": "41.33"
}
```

---

### POST `/api/auth/signup`

```json
// Request
{ "name": "Alice", "email": "alice@example.com", "password": "secret123" }

// Response 201
{ "token": "eyJ...", "user": { "_id": "...", "name": "Alice", "email": "alice@example.com" } }
```

---

### POST `/api/batch-predict`

```json
// Request
{
  "patients": [
    { "Pregnancies": 2, "Glucose": 120, "..." : "..." },
    { "Pregnancies": 5, "Glucose": 160, "..." : "..." }
  ]
}

// Response 200
{
  "total_patients": 2,
  "successful_predictions": 2,
  "results": [
    { "patient_index": 0, "prediction": 0, "result": "No Diabetes", "probability": {...}, "success": true },
    { "patient_index": 1, "prediction": 1, "result": "Diabetes",    "probability": {...}, "success": true }
  ]
}
```

---

## 6. Database Schema

### Collection: `users`

Defined in [`backend/models/User.js`](file:///c:/code/Antigravity/backend/models/User.js)

```
users {
  _id              ObjectId    (auto)
  name             String      required, trimmed
  email            String      required, unique, lowercase, regex validated
  password         String      required, min 6 chars, bcrypt-12, select: false
  createdAt        Date        default: Date.now
}
```

> ⚠️ `password` has `select: false` — never returned in queries unless explicitly selected.

**Pre-save Hook:**
```js
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);  // 12 salt rounds
});
```

---

### Collection: `predictions`

Defined in [`backend/models/Prediction.js`](file:///c:/code/Antigravity/backend/models/Prediction.js)

```
predictions {
  _id              ObjectId    (auto)
  userId           ObjectId    ref: User, optional (null = guest)
  input {
    Pregnancies               Number   required
    Glucose                   Number   required
    BloodPressure             Number   required
    SkinThickness             Number   required
    Insulin                   Number   required
    BMI                       Number   required
    DiabetesPedigreeFunction  Number   required
    Age                       Number   required
  }
  prediction       Number      0 | 1
  result           String      "Diabetes" | "No Diabetes"
  probability {
    no_diabetes               Number
    diabetes                  Number
  }
  confidence       Number      max(probability.no_diabetes, probability.diabetes)
  model_algorithm  String      "Random Forest" | "SVM" | "Logistic Regression"
  createdAt        Date        default: Date.now
}
```

---

## 7. Authentication & Security Model

### Token Flow

```
Signup/Login
  → authController hashes password (bcrypt, 12 rounds)
  → jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30d' })
  → returns { token, user } to frontend

Authenticated Request
  → Frontend adds Authorization: Bearer <token>
  → protect middleware: jwt.verify(token, JWT_SECRET)
  → User.findById(decoded.id) → attaches req.user

Optional Auth (predictions)
  → optionalAuth: same flow, but errors are swallowed
  → If no token: req.user = undefined, prediction saved with userId: null
```

### Security Gaps (Current State)

> [!WARNING]
> The following are **known gaps** that should be addressed before any production deployment.

| Gap | Risk | Recommended Fix |
|---|---|---|
| `app.use(cors())` — wildcard CORS | Any origin can call API | Whitelist known frontend origins |
| JWT stored in localStorage | XSS can steal tokens | Move to `httpOnly` cookie |
| No rate limiting on `/api/auth/*` | Brute-force attacks | Add `express-rate-limit` |
| No password strength policy | Weak passwords allowed | Enforce complexity rules |
| `/api/history/:id` has no ownership check | Any user can fetch any prediction by ID | Add `userId` check |
| Flask runs with `debug=True` | Exposes stack traces | Use `debug=False` + gunicorn in prod |

---

## 8. ML Pipeline Internals

Defined in [`ml-model/train.py`](file:///c:/code/Antigravity/ml-model/train.py) — class `DiabetesPredictor`.

### Pipeline Stages

```
Stage 1: Load Data
  └── pd.read_csv('diabetes.csv')
  └── 768 samples × 9 columns (8 features + Outcome)
  └── Class distribution: 500 (65.1%) No Diabetes / 268 (34.9%) Diabetes

Stage 2: Preprocessing
  └── Zero-imputation: Glucose, BloodPressure, SkinThickness, Insulin, BMI
      → zeros replaced with per-column median (non-zero rows only)
  └── train_test_split(test_size=0.2, random_state=42, stratify=y)
  └── StandardScaler.fit_transform(X_train) → X_train_scaled
  └── StandardScaler.transform(X_test) → X_test_scaled
  └── Scaler serialised → scaler.pkl

Stage 3: Model Competition
  ┌────────────────────────────────────┬───────────────────┐
  │ Model                              │ Selection Metric  │
  ├────────────────────────────────────┼───────────────────┤
  │ LogisticRegression(max_iter=1000)  │ F1-Score          │
  │ SVC(kernel='rbf', probability=True)│ F1-Score          │
  │ RandomForestClassifier(n=100)      │ F1-Score          │
  └────────────────────────────────────┴───────────────────┘
  → Winner: serialised to diabetes_model.pkl

Stage 4: Detailed Evaluation (winner only)
  └── Confusion matrix (printed)
  └── Full classification report
  └── ROC-AUC score

Stage 5: Save Artifacts
  └── diabetes_model.pkl
  └── scaler.pkl
  └── feature_names.pkl
  └── model_metadata.pkl

Stage 6: Visualisations
  └── model_performance.png
      ├── Feature Importance (RF) or Feature Correlation
      ├── Confusion Matrix heatmap (seaborn)
      ├── Class Distribution pie chart
      └── ROC Curve with AUC annotation
```

### Cross-Validation

```python
cv_scores = cross_val_score(model, X_train, y_train, cv=5, scoring='accuracy')
# Reports mean ± std across 5 folds
```

### Dataset: Pima Indians Diabetes

- **Source:** UCI ML Repository
- **768 samples**, balanced split 80/20
- **Stratified split** preserves class ratio in train/test
- **Medical zero imputation:** biological impossibility zeros (glucose=0, BP=0, BMI=0) replaced with column median — a deliberate clinical preprocessing decision

---

## 9. Environment Configuration

### Backend `.env` (required)

```bash
# MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority

# JWT signing secret — use a strong random value
JWT_SECRET=your_super_secret_jwt_key_here

# URL of the Python ML service
PYTHON_API_URL=http://localhost:5000

# Express port (default: 3000)
PORT=3000
```

### Frontend `.env` (optional)

```bash
# Overrides default localhost:3000
VITE_API_URL=http://localhost:3000
```

### Python — No `.env`

The Flask app loads model artifacts from the **current working directory**. Always launch `app.py` from inside `ml-model/`.

---

## 10. Developer Runbook

### Prerequisites

| Tool | Version | Check |
|---|---|---|
| Node.js | ≥ 18.x | `node -v` |
| npm | ≥ 9.x | `npm -v` |
| Python | ≥ 3.10 | `python --version` |
| MongoDB Atlas | any | see ATLAS_SETUP.md |

---

### Step-by-Step: First-Time Setup

```powershell
# ① Clone the repo
git clone <repo-url> && cd Antigravity

# ② Backend
cd backend
cp .env.example .env          # Fill in MONGODB_URI, JWT_SECRET
npm install

# ③ Frontend
cd ../frontend
npm install

# ④ ML Service
cd ../ml-model
python -m venv venv
.\venv\Scripts\Activate.ps1   # Windows
pip install -r requirements.txt
python train.py               # Trains model, saves .pkl artifacts (~30 sec)
```

---

### Daily Development

Open **three terminals** — one per service.

```powershell
# Terminal 1 — ML Service
cd ml-model
.\venv\Scripts\Activate.ps1
python app.py                  # → http://localhost:5000

# Terminal 2 — Backend
cd backend
npm run dev                    # nodemon → http://localhost:3000

# Terminal 3 — Frontend
cd frontend
npm run dev                    # Vite HMR → http://localhost:5173
```

---

### Re-training the Model

```powershell
cd ml-model
.\venv\Scripts\Activate.ps1
python train.py
# Outputs: diabetes_model.pkl, scaler.pkl, feature_names.pkl,
#          model_metadata.pkl, model_performance.png
```

> [!IMPORTANT]
> After re-training, **restart the Flask service** — it loads artifacts at startup, not per-request.

---

### Health Check Sequence

```powershell
# 1. ML Service alive?
curl http://localhost:5000/health
# → { "status": "healthy", "model_loaded": true }

# 2. Backend alive?
curl http://localhost:3000/api/health
# → { "status": "healthy", "service": "Diabetes Prediction Backend" }

# 3. Model info proxied correctly?
curl http://localhost:3000/api/model-info
# → { "algorithm": "...", "accuracy": 0.xx, "features": [...] }

# 4. Full prediction test
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"Pregnancies":6,"Glucose":148,"BloodPressure":72,"SkinThickness":35,"Insulin":0,"BMI":33.6,"DiabetesPedigreeFunction":0.627,"Age":50}'
```

---

## 11. Re-Engineering Roadmap

This section proposes concrete improvements, ordered by impact.

### 🔴 Critical (Security & Correctness)

| ID | Area | Problem | Solution |
|---|---|---|---|
| R-01 | Auth | CORS wildcard | `cors({ origin: ['http://localhost:5173'] })` |
| R-02 | Auth | JWT in localStorage | Switch to `httpOnly` `Secure` cookie + CSRF protection |
| R-03 | Auth | No rate limiting | `express-rate-limit` on all `/api/auth/*` routes |
| R-04 | Auth | History endpoint ownership gap | Add `{ userId: req.user._id }` filter to `/api/history/:id` |
| R-05 | ML | Flask `debug=True` in production | Launch via gunicorn: `gunicorn app:app -w 4 -b 0.0.0.0:5000` |

### 🟡 Architectural (Scalability & Maintainability)

| ID | Area | Problem | Solution |
|---|---|---|---|
| A-01 | Backend | All routes inline in `server.js` | Introduce `routes/` directory; use `express.Router()` |
| A-02 | Backend | No request validation | Add `express-validator` or `zod` schema validation |
| A-03 | Backend | No logging framework | Integrate `winston` or `pino` with structured JSON logs |
| A-04 | ML | Model reloaded only at boot | Add `/reload-model` admin endpoint or watch `.pkl` for changes |
| A-05 | Frontend | State-based navigation | Replace with `react-router-dom` for proper URL routing & deep-linking |
| A-06 | Full-stack | No tests | Add `jest` + `supertest` for API; `pytest` for ML; `vitest` for UI |

### 🟢 Enhancement (UX & ML Quality)

| ID | Area | Enhancement |
|---|---|---|
| E-01 | ML | Add SHAP explainability — show which features drove the prediction |
| E-02 | ML | Hyperparameter tuning via GridSearchCV (already scaffolded in imports) |
| E-03 | ML | Add XGBoost / LightGBM to the model competition |
| E-04 | Frontend | Progressive Web App (PWA) manifest for mobile install |
| E-05 | Frontend | Internationalisation (i18n) — medical data is global |
| E-06 | Backend | Redis caching for `/api/stats` (currently hits DB on every call) |
| E-07 | Ops | Docker Compose file to orchestrate all three services |
| E-08 | Ops | GitHub Actions CI pipeline: lint → test → build → deploy |

---

## 12. Known Weaknesses & Tech Debt

> [!CAUTION]
> The following are active tech debt items. Flag them in code reviews.

### ML Layer

- **No model versioning** — overwriting `.pkl` files destroys previous model; consider MLflow or DVC
- **Zero imputation is naive** — replacing zeros with median ignores distributional assumptions; consider KNN or MICE imputation
- **Single dataset** — Pima Indians dataset is from 1988 and demographic-specific; may not generalise
- **No data drift detection** — once deployed, there's no monitoring if incoming data drifts from training distribution
- **Class imbalance unaddressed** — 65/35 split; consider SMOTE or class_weight='balanced'

### Backend Layer

- **Monolithic server.js** — all 179 lines of route logic in one file
- **No pagination** on `/api/history` (only `limit` parameter, default 10)
- **Sync Axios calls** — if Flask is slow, Express event loop is blocked (use connection pooling)
- **No input sanitisation** before passing to Mongoose (prototype pollution risk)
- **`MongoDB` package AND `mongoose`** both listed in dependencies — redundant

### Frontend Layer

- **All styles in one 14 KB `App.css`** — no component-level CSS modules
- **No error boundary** — any component throw crashes the whole app
- **No loading skeleton** — blank states during async operations
- **`config.js` hard-codes localhost** — no staging/production environment handling beyond `VITE_API_URL`

---

*This document was auto-generated via forensic codebase analysis and is intended as a living reference. Update it as the system evolves.*

**Last Updated:** June 2026 · **System Version:** 1.0.0
