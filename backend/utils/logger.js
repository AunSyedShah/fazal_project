export function logError(error) {
  console.error(`[${new Date().toISOString()}] ERROR:`, error.message || error);
}
