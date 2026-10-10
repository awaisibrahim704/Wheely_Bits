# React + TypeScript + Vite

## Seller MongoDB API

Seller drafts remain in browser storage for recovery, while completing seller setup and publishing a product save data to MongoDB through the seller API.

1. Copy `.env.example` to `.env` and set `MONGODB_URI` to your local MongoDB or Atlas connection string.
2. Start the API with `npm run seller-api`.
3. Start the frontend with `npm run dev`.

Community discussions are shared through MongoDB and refresh automatically while
the discussion page is open. Start the seller API and MongoDB before creating
topics or replies; discussions are not saved to browser-only storage.
Signed-in contributors appear under their account display name. Guests are asked
to choose a community display name, and topic owners can replace an old
"Enthusiast" author label on their topic.

The API exposes `GET /api/health`, `PUT /api/sellers/:userId`, and `POST /api/products`. Seller profiles are stored in the `sellers` collection and published listings in the `products` collection.

## AI Rim Scanner

The AI Rim Scan button on the Rim Selection page opens the image scanner. The scanner uploads a photo to the EfficientNet-B0/FAISS service in `backend/`.

Start the AI service in a separate terminal:

```powershell
cd D:\wheely_bits\backend
.\venv\Scripts\python.exe .\server.py
```

If the backend virtual environment is not present, create it and install the backend dependencies first:

```powershell
cd D:\wheely_bits\backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python .\server.py
```

Then start the frontend with `npm run dev` from the repository root. The frontend uses `VITE_RIM_SCAN_API_URL` (default `http://localhost:8000`) to reach the model service. Check that the model service is ready at `http://localhost:8000/health`.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
