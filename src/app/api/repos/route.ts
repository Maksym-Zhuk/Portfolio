export async function GET() {
  const res = await fetch('https://api.github.com/users/Maksym-Zhuk/repos', {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });

  if (!res.ok) {
    return new Response('GitHub API error', { status: 500 });
  }

  const data = await res.json();
  const filtered = data.filter((item: any) => item.description !== null);

  return Response.json(filtered);
}
