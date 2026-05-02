import { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getPostBySlug, getPosts } from "../../../lib/posts";
import LinkCard from "../../LinkCard";

type Props = {
  params: Promise<{ slug: string }>;
};

// SSG（静的サイト生成）のために全スラグを事前に定義
export async function generateStaticParams() {
  const posts = getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// OGPなどのメタデータを定義
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return {};

  // 本文から最初の100文字を説明文として抽出
  const description = post.content.slice(0, 100).replace(/\n/g, " ") + "...";

  return {
    title: `${post.title} | rielu officialsite`,
    description: description,
    openGraph: {
      title: post.title,
      description: description,
      type: "article",
      url: `https://rielu.uniproject.jp/posts/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: description,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
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

      {/* Markdownを表示 */}
      <div className="prose prose-invert prose-sky max-w-none">
        <ReactMarkdown
          components={{
            a: ({ node, ...props }) => {
              // リンクのテキストがURLそのものである場合、LinkCardとしてレンダリングする
              // (例: [https://google.com](https://google.com) のような記述)
              const isLinkCard = props.children === props.href;
              
              if (isLinkCard && props.href) {
                return (
                  <LinkCard url={props.href} title={props.title || undefined} />
                );
              }
              return <a {...props} className="text-sky-500 hover:underline" />;
            }
          }}
        >
          {post.content}
        </ReactMarkdown>
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
