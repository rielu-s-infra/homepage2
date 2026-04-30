import matter from "gray-matter";

// 1. プロジェクトルート直下の /posts フォルダをスキャン
const postModules = import.meta.glob("/posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

// 2. public/about/about.md は Vite の制限で直接インポートできないため
// ルート直下に content フォルダなどを作成して移動するか、
// もしくは posts フォルダの中に about.md を入れてしまうのが最も簡単です。
// ここでは、仮にルート直下の /content/about.md に置いたと想定します。
const aboutModules = import.meta.glob("/public/about/about.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

export interface Post {
  slug: string;
  title: string;
  date: string;
  content: string;
}

export interface AboutData {
  attributes: {
    role?: string;
    location?: string;
    [key: string]: unknown;
  };
  content: string;
}

export function getPosts(): Post[] {
  // key は "/posts/filename.md" になります
  return Object.entries(postModules)
    .map(([filepath, content]) => {
      const slug = filepath.split("/").pop()?.replace(".md", "") || "";
      const { data, content: body } = matter(content as string);

      return {
        slug,
        content: body,
        title: data.title || "Untitled",
        date: data.date || "",
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAboutContent(): AboutData {
  // 指定したパス "/content/about.md" と一致させる
  const content = aboutModules["/public/about/about.md"] as string;

  if (!content) {
    // デバッグ用：何が読み込まれているかコンソールに出す
    console.error("Vite Glob Keys:", Object.keys(aboutModules));
    return { attributes: {}, content: "about.md not found. フォルダ位置を確認してください。" };
  }

  const { data, content: body } = matter(content);
  return {
    attributes: data,
    content: body,
  };
}

export function getPostBySlug(slug: string): Post | undefined {
  const allPosts = getPosts();
  return allPosts.find((p) => p.slug === slug);
}