// Script to sync existing local IndexedDB data (idb-keyval) to Firestore
import { get, keys } from "idb-keyval";
import { setPersistedItem } from "./persist";

export async function syncLocalToCloud() {
  try {
    const allKeys = await keys();
    for (const key of allKeys) {
      const value = await get(key);
      await setPersistedItem(key, value);
      console.log(`Synced key: ${key}`);
    }
    console.log("Local data sync to Firestore complete.");
  } catch (error) {
    console.error("Error syncing local data to Firestore:", error);
  }
}
