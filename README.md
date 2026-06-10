# Lab Inventory (Backend + Frontend)

This repository contains two projects:

- `lab-inventory-backend` — Express + MongoDB backend API
- `lab-inventory-frontend` — React (Create React App) frontend

This document explains prerequisites, required environment variables, how to start both services (Windows `cmd.exe` examples), and common troubleshooting steps.

**Prerequisites**

- Node.js (LTS recommended, e.g. >= 16)
- npm (comes with Node.js)
- MongoDB (local) or a MongoDB Atlas cluster
- Optional: `nodemon` for development (install globally with `npm i -g nodemon`)

---

**Backend — `lab-inventory-backend`**

What the backend requires:

- Uses `mongoose` (MongoDB). Provide `MONGODB_URI`.
- JWT secrets and expiry config used by auth features.

Required environment variables (create a `.env` file in `lab-inventory-backend`):

```
MONGODB_URI=mongodb://localhost:27017/lab_inventory
PORT=5000

# JWT settings
ACCESS_TOKEN_SECRET=your_access_secret_here
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_SECRET=your_refresh_secret_here
REFRESH_TOKEN_EXPIRY=7d
```

Notes:
- The backend loads environment variables via `dotenv` in `server.js`.
- The code expects `process.env.MONGODB_URI` and the `ACCESS/REFRESH` secrets and expiries.
- CORS origin is currently set in `app.js` to a Netlify URL. For local development, change the `origin` to `http://localhost:3000` or set it more permissively while developing.

Install and run (Windows `cmd.exe`):

```bat
cd lab-inventory-backend
npm install

# Option A: Run directly
node server.js

# Option B (recommended for development): if you have nodemon installed
# nodemon server.js
```

If you prefer an npm script, add the following to `lab-inventory-backend/package.json` under `scripts`:

```json
"start": "node server.js",
"dev": "nodemon server.js"
```

---

**Frontend — `lab-inventory-frontend`**

This is a Create React App project. By default it runs on port `3000`.

Install and run (Windows `cmd.exe`):

```bat
cd lab-inventory-frontend
npm install
npm start
```

Build for production:

```bat
npm run build
```

Optional: to make API calls to the backend during development without adjusting CORS or absolute URLs, you can add a `proxy` field to `lab-inventory-frontend/package.json`:

```json
"proxy": "http://localhost:5000"
```

Frontend checks before running
- Node & npm: Ensure `node -v` and `npm -v` are installed (Node LTS >=16 recommended).
- Dependencies: Run `npm install` inside `lab-inventory-frontend` before starting.
- Backend availability: The frontend expects the backend API to be reachable at the address configured by either the `proxy` in `package.json` or a runtime env variable (see below). Ensure the backend is running on `http://localhost:5000` (or update the URL accordingly).
- Environment variables: CRA reads env vars that start with `REACT_APP_`. If you need to point the frontend to a custom API URL use a `.env` file in the frontend root with e.g. `REACT_APP_API_URL=http://localhost:5000` and reference it in code as `process.env.REACT_APP_API_URL`.
- CORS / Cookies: If the frontend uses cookies for auth, set `withCredentials: true` on axios/fetch and make sure the backend `FRONTEND_ORIGIN` or CORS allowlist includes the frontend origin.
- Browser console: Watch for CORS, network or JS errors in DevTools when the app loads or calls the API.

How to configure the API URL in the frontend
- Option A (recommended for local dev): add `"proxy": "http://localhost:5000"` to `lab-inventory-frontend/package.json`. This lets you use relative API paths like `/api/product` in development.
- Option B (recommended for environments): create `lab-inventory-frontend/.env` with:

```
REACT_APP_API_URL=http://localhost:5000
```

Then in the frontend code use it like:

```js
const apiUrl = process.env.REACT_APP_API_URL || '';
axios.get(`${apiUrl}/api/product`, { withCredentials: true })
```

Running tests & build
- Run unit tests (if present):

```bat
cd lab-inventory-frontend
npm test
```

- Create a production build:

```bat
cd lab-inventory-frontend
npm run build
```

Common frontend troubleshooting
- Blank page / compilation errors: run `npm start` and read the terminal output; fix syntax or dependency errors displayed.
- API 401/403 errors: ensure tokens/cookies are being sent and backend CORS allows origin + `credentials: true`.
- API network errors: confirm `REACT_APP_API_URL` or `proxy` points at a running backend.


---

**MongoDB: Local or Atlas**

- Local example connection string: `mongodb://localhost:27017/lab_inventory`
- MongoDB Atlas example (replace values):

```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/lab_inventory?retryWrites=true&w=majority
```

---

**CORS and Cookies**

- `app.js` sets `cors({ origin: "https://stellar-gingersnap-b6eb63.netlify.app", credentials: true, ... })`. Update `origin` to your frontend URL (for local: `http://localhost:3000`).
- Authentication uses cookies (`accessToken` and `refreshToken`) and also returns tokens in JSON. When testing with a browser, ensure `credentials` is enabled on fetch/axios requests and that front and back ports match your CORS settings.

Example axios request with credentials:

```js
axios.get('/api/product', { withCredentials: true })
```

---

**Common Troubleshooting**

- "MongoDB connection failed": Verify `MONGODB_URI` is correct and MongoDB is running (or Atlas credentials are correct).
- "CORS" errors: Update `origin` in `lab-inventory-backend/app.js` or add `proxy` to the frontend for local dev.
- Port conflicts: Backend default port is `5000` (change `PORT` env var); frontend is `3000`.
- Missing env values for JWT: Ensure `ACCESS_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET` and expiry values exist.

---

**Next Steps & Tips**

- Consider adding `.env.example` to the backend with the keys listed above so new contributors know what's required.
- Add `start` and `dev` scripts to backend `package.json` for consistency with the frontend.
- If you use Docker or a process manager, add instructions here for containerization or PM2.

If you want, I can:

- create a `lab-inventory-backend/.env.example` file for you
- add `start`/`dev` scripts to the backend `package.json`
- update `app.js` to use an environment variable for allowed CORS origin (safer for deployment)

Let me know which of those you'd like me to do next.
