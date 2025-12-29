// Utility for persistent storage using Firebase Cloud Firestore
import { db } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const COLLECTION = "persistent_storage";

export async function getPersistedItem(key, fallback) {
  try {
    const docRef = doc(db, COLLECTION, key);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().value;
    } else {
      return fallback;
    }
  } catch (error) {
    console.error("Error getting persisted item:", error);
    return fallback;
  }
}

export async function setPersistedItem(key, value) {
  try {
    const docRef = doc(db, COLLECTION, key);
    await setDoc(docRef, { value });
  } catch (error) {
    console.error("Error setting persisted item:", error);
  }
}
