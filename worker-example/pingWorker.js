import fetch from 'node-fetch';  tch

const workers = [
  'https://hi.onrender.com/worker-0/ping',
  'https://hi.onrender.com/worker-1/ping',
  'https://hi.onrender.com/worker-2/ping'
];

export const pingWorkers = async () => {
  for (const url of workers) {
    try {
      const res = await fetch(url);
      const text = await res.text();
      console.log(`[✓] Pinged ${url}: ${text}`);
    } catch (err) {
      console.error(`[✗] Failed to ping ${url}:`, err.message);
    }
  }
};

