export interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
}

export async function getGitHubRepos(username: string): Promise<Repo[]> {
  // Next.js では process.env を使用します
  const token = process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };

  if (token) {
    headers.Authorization = `token ${token}`;
  }

  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=10`,
    {
      // Vite(React)では next: { revalidate } は無視されますが、
      // ブラウザのキャッシュ機能は働きます。
      method: "GET",
      headers: headers,
    },
  );

  if (!res.ok) {
    // レートリミット制限などに掛かった場合のハンドリング
    console.error(`GitHub API error: ${res.status}`);
    return [];
  }

  return res.json();
}

export async function getGitHubOrgRepos(org: string): Promise<Repo[]> {
  const token = process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };

  if (token) {
    headers.Authorization = `token ${token}`;
  }

  const res = await fetch(
    `https://api.github.com/orgs/${org}/repos?sort=updated&per_page=10`,
    {
      method: "GET",
      headers: headers,
    },
  );

  if (!res.ok) {
    console.error(`GitHub Org API error: ${res.status}`);
    return [];
  }

  return res.json();
}
