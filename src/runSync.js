// Temporary script to run the local-to-cloud sync
import { syncLocalToCloud } from "./services/syncLocalToCloud";

// Run the sync when this script is loaded
syncLocalToCloud().then(() => {
  console.log("Sync complete. You can now remove this script if desired.");
});
