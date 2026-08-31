#!/usr/bin/env node
/**
 * Usage:
 * 1) Place your Firebase service account JSON at the project root as `service-account.json` (download from Firebase Console → Project settings → Service accounts).
 * 2) Install dependency: `npm install firebase-admin minimist`
 * 3) Run:
 *    node scripts/manageUser.js --email user@example.com            # find user
 *    node scripts/manageUser.js --email user@example.com --delete   # delete user
 */

const fs = require('fs');
const path = require('path');

const admin = require('firebase-admin');

const argv = require('minimist')(process.argv.slice(2));
const email = argv.email || argv.e;
const doDelete = !!argv.delete;
const saPath = path.resolve(process.cwd(), argv.service || 'service-account.json');

if (!email) {
  console.error('Error: pass --email user@example.com');
  process.exit(1);
}

if (!fs.existsSync(saPath)) {
  console.error('Error: service account JSON not found at', saPath);
  console.error('Download it from Firebase Console → Project settings → Service accounts');
  process.exit(1);
}

const serviceAccount = require(saPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function main() {
  try {
    const user = await admin.auth().getUserByEmail(email);
    console.log('Found user:');
    console.log({ uid: user.uid, email: user.email, providers: user.providerData.map(p => p.providerId) });
    if (doDelete) {
      console.log('Deleting user', user.uid);
      await admin.auth().deleteUser(user.uid);
      console.log('Deleted.');
    }
  } catch (err) {
    if (err.code === 'auth/user-not-found') {
      console.log('User not found in this project.');
    } else {
      console.error('Error:', err.code || err.message || err);
    }
  }
  process.exit(0);
}

main();
