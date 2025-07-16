import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPnzGH9W4oPDeX1MdTV7ERzIe1dqIKIeI",
  authDomain: "theqbarber-d10c0.firebaseapp.com",
  projectId: "theqbarber-d10c0",
  storageBucket: "theqbarber-d10c0.firebasestorage.app",
  messagingSenderId: "11941973637",
  appId: "1:11941973637:web:9a1857b337d6b6b1eda3ec",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
