import { initializeDataSource } from './data-source';
import { initializeServer } from './server';

async function initApp() {
  try {
    await initializeDataSource();
    await initializeServer();
  } catch (err) {
    process.exit(1);
  }
}

initApp();
