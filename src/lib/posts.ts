// src/lib/posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

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
    [key: string]: unknown; // Changed 'any' to 'unknown'
  };
  content: string;
}

// 記事一覧を取得する関数
export function getPosts(): Post[] {
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
  const aboutPath = path.join(process.cwd(), "public", "about", "about.md");

  if (!fs.existsSync(aboutPath)) {
    return { attributes: {}, content: "about.md not found" };
  }

  const fileContent = fs.readFileSync(aboutPath, "utf8");
  const { data, content: body } = matter(fileContent);
  return {
    attributes: data,
    content: body,
  };
}

export function getPostBySlug(slug: string): Post | undefined {
  const allPosts = getPosts(); // 既存の全取得関数
  return allPosts.find((p) => p.slug === slug);
}
