import admin from 'firebase-admin';
import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import SHOP_DATA from '../src/shop-data.js';

const COLLECTION_NAME = 'categories';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resolveCredentialsPath = () => {
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return process.env.GOOGLE_APPLICATION_CREDENTIALS;
  }

  const defaultPath = path.resolve(__dirname, '../new-dev-b41dc-firebase-adminsdk-fbsvc-e0b245f916.json');
  return defaultPath;
};

const credentialsPath = resolveCredentialsPath();

if (!existsSync(credentialsPath)) {
  console.error('Service account JSON not found. Set GOOGLE_APPLICATION_CREDENTIALS to a valid path.');
  process.exit(1);
}

const serviceAccount = JSON.parse(readFileSync(credentialsPath, 'utf8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();

(async () => {
  try {
    const collectionRef = firestore.collection(COLLECTION_NAME);
    const snapshot = await collectionRef.limit(1).get();

    if (!snapshot.empty) {
      console.log('Firestore already contains categories. Skipping seed.');
      return;
    }

    const batch = firestore.batch();

    SHOP_DATA.forEach((category) => {
      const docRef = collectionRef.doc(category.title.toLowerCase());
      batch.set(docRef, category);
    });

    await batch.commit();
    console.log('Categories seeded successfully.');
  } catch (error) {
    console.error('Failed to seed categories:', error);
    process.exitCode = 1;
  }
})();
