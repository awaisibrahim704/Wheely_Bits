Running the project & admin helper

1. Install dependencies

```bash
npm install
```

2. Local env

- Create a `.env` in the project root with your Firebase values (you probably already have this). Example:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

3. Start dev server

```bash
npm run dev
```

4. Admin helper (find or delete a user)

- Download a Service Account JSON from Firebase Console → Project settings → Service accounts → Generate new private key. Save as `service-account.json` in the project root.
- Install admin runtime deps (only needed to run the script):

```bash
npm install firebase-admin minimist
```

- Usage:

```bash
npm run manage-user -- --email user@example.com         # shows user if exists
npm run manage-user -- --email user@example.com --delete  # deletes the user
```

Notes

- If email verification emails are not appearing: check Spam/Junk folders, ensure your project's `authDomain` is correct, and check Firebase Console → Authentication → Templates to customize email templates.
- If `sendEmailVerification` throws, the error will surface in the UI console and the Sign Up page will display it.
