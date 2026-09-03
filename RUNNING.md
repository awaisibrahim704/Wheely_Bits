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

5. Sending verification emails using SendGrid (recommended to avoid spam)

- Create a SendGrid account and verify your sending domain. Follow SendGrid's docs to add SPF and DKIM DNS records for your domain — this is the most important step to keep emails out of Spam.
- Add `.env` entries:

```
SERVICE_ACCOUNT=service-account.json
SENDGRID_API_KEY=your_sendgrid_api_key
SENDER_EMAIL=verify@yourdomain.com   # must be a verified sender in SendGrid
PORT=4000
# optional: ACTION_DOMAIN=https://your-app-domain.example
```

- Install server deps (only needed to run the local send server):

```bash
npm install express body-parser firebase-admin @sendgrid/mail dotenv cors
```

- Run the send server:

```bash
node scripts/sendVerificationServer.js
```

- Use the server to send verification email by POSTing JSON to `http://localhost:4000/sendVerification` with `{ "email": "user@example.com" }`.

Notes: verifying your sending domain (SPF/DKIM) in SendGrid is the main way to improve deliverability — without that, messages may still land in Spam.
