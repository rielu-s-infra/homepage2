// src/lib/posts.ts
import matter from "gray-matter";
import fs from "fs";
import path from "path";

// Define the base directory for posts and content
// Next.jsのプロジェクトルートからの相対パスで指定
const postsDirectory = path.join(process.cwd(), "posts");
const aboutContentPath = path.join(process.cwd(), "public", "about", "about.md");

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
// Server Componentで実行されるため、fsモジュールを使用
export function getPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content: body } = matter(fileContents);

    return {
      slug,
      content: body,
      title: data.title || "Untitled",
      date: data.date || "",
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// 自己紹介を取得する関数（ここがエラーの原因）
// Server Componentで実行されるため、fsモジュールを使用
export function getAboutContent(): AboutData {
  let content = "";
  try {
    content = fs.readFileSync(aboutContentPath, "utf8");
  } catch (error) {
    console.error("Error reading about.md:", error);
    // ファイルが見つからない、または読み込めない場合のフォールバック
    return { attributes: {}, content: "about.md not found" };
  }

  const { data, content: body } = matter(content);
  return {
    attributes: data,
    content: body,
  };
}

export function getPostBySlug(slug: string): Post | undefined {
  const allPosts = getPosts(); // 既存の全取得関数
  return allPosts.find((p) => p.slug === slug);
}
