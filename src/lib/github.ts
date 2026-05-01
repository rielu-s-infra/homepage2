export interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
}

export async function getGitHubRepos(username: string): Promise<Repo[]> {
  // Next.jsのServer Component環境では process.env を使用します
  const token = process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };

  if (token) {
    headers.Authorization = `token ${token}`;
  }

  // まずはユーザーのリポジトリとして取得を試みます
  let res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=10`,
    { method: "GET", headers }
  );

  // 404（ユーザーが見つからない）場合は、Organizationとして取得を試みます
  if (!res.ok && res.status === 404) {
    res = await fetch(
      `https://api.github.com/orgs/${username}/repos?sort=updated&per_page=10`,
      { method: "GET", headers }
    );
  }

  if (!res.ok) {
    // レートリミット制限などに掛かった場合のハンドリング
    console.error(`GitHub API error: ${res.status}`);
    return [];
  }

  return (await res.json()) as Repo[];
}
