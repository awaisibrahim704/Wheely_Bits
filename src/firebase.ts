import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig as Record<string, string>);

// Log minimal config in development to confirm the app uses the expected project
if (import.meta.env.DEV) {
  try {
    // Only surface non-secret identifiers to avoid exposing keys accidentally.
    // `projectId` and `authDomain` are sufficient to confirm the target project.
    // eslint-disable-next-line no-console
    console.log("Firebase config (dev):", {
      projectId: firebaseConfig.projectId,
      authDomain: firebaseConfig.authDomain,
    });
  } catch (e) {
    // ignore
  }
}

export const auth = getAuth(app);

export default app;
