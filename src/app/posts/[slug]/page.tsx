import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import { getPostBySlug } from "../../../lib/posts";

interface PostPageProps {
  slug: string;
}

export default function PostPage({ slug }: PostPageProps) {
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // データ取得を実行
    const data = getPostBySlug(slug);
    setPost(data);
    setLoading(false);
  }, [slug]);

  if (loading) {
    return <div className="text-white p-10">Loading...</div>;
  }

  if (!post) {
    return (
      <div className="text-white p-10">
        Post not found. (slug: {slug})
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto pt-32 px-6 pb-20">
      <header className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-sm font-mono text-sky-500">{post.date}</span>
          <span className="h-[1px] w-12 bg-slate-800" />
          <span className="text-xs font-mono text-slate-500 uppercase">
            System Log
          </span>
        </div>
        <h1 className="text-4xl font-black text-white tracking-tight sm:text-5xl">
          {post.title}
        </h1>
      </header>

      <div className="prose prose-invert prose-sky max-w-none">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>

      <footer className="mt-20 pt-8 border-t border-slate-800">
        <a
          href="/"
          className="text-sky-500 hover:text-sky-400 font-mono text-sm"
        >
          ← ./return_to_home
        </a>
      </footer>
    </article>
  );
}