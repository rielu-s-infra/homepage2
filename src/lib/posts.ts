<<<<<<< HEAD
// src/lib/posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

=======
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

>>>>>>> a22570f6e304e9b5e8192c688edd2aae8c22031c
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
<<<<<<< HEAD
  const postsDir = path.join(process.cwd(), "posts");
  if (!fs.existsSync(postsDir)) return [];

  const fileNames = fs.readdirSync(postsDir);
  return fileNames
    .filter(fileName => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDir, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content: body } = matter(fileContents);

      // ファイル名の先頭から日付を取得 (例: 2024-05-20-slug.md)
      const dateMatch = fileName.match(/^(\d{4}-\d{2}-\d{2})/);
      const fileNameDate = dateMatch ? dateMatch[1] : "";
=======
  // key は "/posts/filename.md" になります
  return Object.entries(postModules)
    .map(([filepath, content]) => {
      const slug = filepath.split("/").pop()?.replace(".md", "") || "";
      const { data, content: body } = matter(content as string);
>>>>>>> a22570f6e304e9b5e8192c688edd2aae8c22031c

      return {
        slug,
        content: body,
        title: data.title || "Untitled",
        date: data.date ? String(data.date) : fileNameDate,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAboutContent(): AboutData {
<<<<<<< HEAD
  const aboutPath = path.join(process.cwd(), "public", "about", "about.md");

  if (!fs.existsSync(aboutPath)) {
    return { attributes: {}, content: "about.md not found" };
=======
  // 指定したパス "/content/about.md" と一致させる
  const content = aboutModules["/public/about/about.md"] as string;

  if (!content) {
    // デバッグ用：何が読み込まれているかコンソールに出す
    console.error("Vite Glob Keys:", Object.keys(aboutModules));
    return { attributes: {}, content: "about.md not found. フォルダ位置を確認してください。" };
>>>>>>> a22570f6e304e9b5e8192c688edd2aae8c22031c
  }

  const fileContent = fs.readFileSync(aboutPath, "utf8");
  const { data, content: body } = matter(fileContent);
  return {
    attributes: data,
    content: body,
  };
}

export function getPostBySlug(slug: string): Post | undefined {
  const allPosts = getPosts();
  return allPosts.find((p) => p.slug === slug);
}