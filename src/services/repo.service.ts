export async function GetRepos() {
  const res = await fetch('/api/repos');
  if (!res.ok) {
    throw new Error('GitHub API error');
  }
  return res.json();
}
