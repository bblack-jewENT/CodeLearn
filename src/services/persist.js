// Utility for persistent storage using IndexedDB via idb-keyval
import { get, set } from "idb-keyval";

export async function getPersistedItem(key, fallback) {
  const value = await get(key);
  return value !== undefined ? value : fallback;
}

export async function setPersistedItem(key, value) {
  await set(key, value);
}
