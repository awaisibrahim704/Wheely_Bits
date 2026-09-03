#!/usr/bin/env node
/**
 * Lightweight server that generates Firebase email verification links via the Admin SDK
 * and sends them using SendGrid. Use this to send verification emails from your own
 * verified sending domain (improves deliverability and avoids spam).
 *
 * Setup:
 * 1) Download service-account.json and save to project root.
 * 2) Create a SendGrid account and verify your sending domain (set up SPF/DKIM in DNS).
 * 3) Create a .env file with: SERVICE_ACCOUNT=service-account.json, SENDGRID_API_KEY, SENDER_EMAIL, PORT (optional), ACTION_DOMAIN (optional)
 * 4) Install deps: `npm install express body-parser firebase-admin @sendgrid/mail dotenv cors`
 * 5) Run: `node scripts/sendVerificationServer.js`
 *
 * POST /sendVerification
 * Body: { "email": "user@example.com" }
 */

const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDER_EMAIL = process.env.SENDER_EMAIL;
const SERVICE_ACCOUNT = process.env.SERVICE_ACCOUNT || 'service-account.json';
const PORT = process.env.PORT || 4000;
const ACTION_DOMAIN = process.env.ACTION_DOMAIN; // optional: override continue URL domain

if (!fs.existsSync(path.resolve(process.cwd(), SERVICE_ACCOUNT))) {
  console.error('service account JSON not found at', SERVICE_ACCOUNT);
  console.error('Download it from Firebase Console → Project settings → Service accounts');
  process.exit(1);
}
if (!SENDGRID_API_KEY) {
  console.error('Set SENDGRID_API_KEY in .env');
  process.exit(1);
}
if (!SENDER_EMAIL) {
  console.error('Set SENDER_EMAIL in .env (must be a verified sender/domain in SendGrid)');
  process.exit(1);
}

const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.cert(require(path.resolve(process.cwd(), SERVICE_ACCOUNT))),
});

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/sendVerification', async (req, res) => {
  const { email } = req.body || {};
  if (!email) return res.status(400).json({ error: 'email is required' });

  try {
    const actionCodeSettings = {
      url: (ACTION_DOMAIN ? ACTION_DOMAIN : `https://${process.env.VITE_FIREBASE_AUTH_DOMAIN || ''}`) || undefined,
      handleCodeInApp: true,
    };

    const link = await admin.auth().generateEmailVerificationLink(email, actionCodeSettings);

    const msg = {
      to: email,
      from: SENDER_EMAIL,
      subject: 'Verify your email',
      html: `<p>Please verify your email by clicking the link below:</p><p><a href="${link}">Verify email</a></p>`,
    };

    await sgMail.send(msg);
    return res.json({ success: true });
  } catch (err) {
    console.error('sendVerification error', err);
    return res.status(500).json({ error: err.message || String(err) });
  }
});

app.listen(PORT, () => {
  console.log(`sendVerification server running on http://localhost:${PORT}`);
});
