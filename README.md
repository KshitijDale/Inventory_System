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
