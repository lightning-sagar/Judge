const links = [
  'https://workers-judge.onrender.com/ping',
  'https://workers-judge-1.onrender.com/ping',
  'https://workers-judge-2.onrender.com/ping',
  'https://judge-microser.onrender.com/',
];

export async function GET() {
  const results = await Promise.all(
    links.map(async (url) => {
      try {
        const res = await fetch(url);
        return { url, status: res.ok ? 'running' : 'error' };
      } catch {
        return { url, status: 'error' };
      }
    })
  );

  return new Response(JSON.stringify({ result: results }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  });
}
