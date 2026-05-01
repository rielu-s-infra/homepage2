<<<<<<< HEAD
import Image from "next/image";
import StatusGrid from "./StatusGrid";
=======
import { useEffect, useState } from "react";
>>>>>>> a22570f6e304e9b5e8192c688edd2aae8c22031c
import ReactMarkdown from "react-markdown";
import AboutInfoCard from "./AboutInfoCard";
import type { Repo } from "../lib/github";
import { getGitHubRepos } from "../lib/github";
import { getAboutContent, getPosts } from "../lib/posts";
import { getKumaStatus } from "../lib/status";

export default async function HomePage() {
  const kumaSlug = "rielu-service";
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "penti-nameko";
  const orgName = process.env.NEXT_PUBLIC_GITHUB_ORG || "rielu-s-infra";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://rielu.uniproject.jp";

<<<<<<< HEAD
  // Data fetching happens on the server
  const posts = getPosts();
  const about = getAboutContent();
  // On the server, we must provide an absolute URL. 
  // Ensure getKumaStatus supports absolute URLs or prepends a base.
  // サーバーサイドでのフェッチには、ドメインを含む絶対パスが必要です。
  const statusUrl = `${baseUrl}/api-kuma/api/status-page/${kumaSlug}`;
  const initialServices = await getKumaStatus(statusUrl).catch(() => []);
  const repos = await getGitHubRepos(username).catch(() => [] as Repo[]);
  const orgRepos = await getGitHubRepos(orgName).catch(() => [] as Repo[]);
=======
  useEffect(() => {
    // 初回読み込み
    getKumaStatus(kumaSlug).then(setServices);

    // 1分ごとに更新（ポーリング）
    const interval = setInterval(() => {
      getKumaStatus(kumaSlug).then(setServices);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const username = import.meta.env.VITE_GITHUB_USERNAME || "penti-nameko";

  useEffect(() => {
    setPosts(getPosts());
    setAbout(getAboutContent());
    getGitHubRepos(username).then(setRepos).catch(console.error);
  }, [username]);
>>>>>>> a22570f6e304e9b5e8192c688edd2aae8c22031c

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="max-w-5xl mx-auto pt-24 px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
<<<<<<< HEAD
                <div className="absolute -inset-1 bg-linear-to-r from-sky-500 to-blue-600 rounded-full blur opacity-40 animate-pulse" />
                <Image
                  src="/img/icon.png"
                  alt="Rieru Icon"
                  width={80}
                  height={80}
                  className="relative w-20 h-20 rounded-full border-2 border-slate-800 object-cover bg-slate-900"
=======
                <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full blur opacity-40 animate-pulse" />
                <img 
                  src="/img/icon.png" 
                  alt="Rieru Icon" 
                  width="80" 
                  height="80" 
                  className="relative w-20 h-20 rounded-full border-2 border-slate-800 object-cover bg-slate-900" 
>>>>>>> a22570f6e304e9b5e8192c688edd2aae8c22031c
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-mono text-slate-500 tracking-widest uppercase">
                    System Active
                  </span>
                </div>
                <h1 className="text-5xl font-black text-white sm:text-7xl tracking-tighter">
                  Rieru<span className="text-sky-500">.</span>dev
                </h1>
              </div>
            </div>

            <p className="mt-6 text-xl text-slate-400 max-w-max leading-relaxed">
              Infrastructure Engineer. focusing on{" "}
              <span className="text-white">Kubernetes</span>,{" "}
              <span className="text-white">IPv6 Networking</span>, and{" "}
              <span className="text-white">Self-hosting</span>.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#repos" className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-lg font-bold transition-all shadow-lg shadow-sky-900/20">
                GitHub Projects
              </a>
              <a href="#posts" className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold transition-all border border-slate-700">
                Read Blog
              </a>
<<<<<<< HEAD
              <a href="https://rielulinks.uniproject.jp" target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 bg-transparent hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg font-bold transition-all border border-slate-800 flex items-center gap-2">
=======
              {/* リンク集へのボタン */}
              <a
                href="https://rielulink.uniproject.jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-transparent hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg font-bold transition-all border border-slate-800 flex items-center gap-2"
              >
>>>>>>> a22570f6e304e9b5e8192c688edd2aae8c22031c
                <span>Link Tree</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" role="img">
                  <title>External Link</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 mt-32 space-y-32">
        <section id="about" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-xl font-bold text-white tracking-tight">About Me</h2>
            <div className="h-px flex-1 bg-slate-800" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-3 flex flex-col items-center gap-6">
              <div className="w-full aspect-square rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
<<<<<<< HEAD
                <Image src="/img/icon.png" alt="Profile" width={400} height={400} className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" />
=======
                <img
                  src="/img/icon.png"
                  alt="Profile"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                />
>>>>>>> a22570f6e304e9b5e8192c688edd2aae8c22031c
              </div>
              <div className="w-full space-y-4">
                <AboutInfoCard label="Role" value={about?.attributes.role || "Engineer"} color="text-sky-400" />
                <AboutInfoCard label="Base" value={about?.attributes.location || "Japan"} color="text-slate-200" />
              </div>
            </div>
            <div className="md:col-span-9 prose-custom">
              <ReactMarkdown
                components={{
                  img: ({ ...props }) => (
                    <img
                      {...props}
                      className="rounded-xl border border-slate-800 w-full h-auto my-8 opacity-90 hover:opacity-100 transition-opacity shadow-2xl"
                      loading="lazy"
                      alt={props.alt || ""}
                    />
                  ),
                }}
              >
                {about?.content || ""}
              </ReactMarkdown>
            </div>
          </div>
        </section>

        <StatusGrid initialServices={initialServices} kumaSlug={kumaSlug} />

        <section id="repos" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-xl font-bold text-white tracking-tight">Personal Projects</h2>
            <div className="h-px flex-1 bg-slate-800" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {repos.slice(0, 6).map((repo) => (
              <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" className="glass-card group flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg text-white group-hover:text-sky-400 transition-colors">{repo.name}</h3>
                    <span className="text-xs font-mono text-slate-500">⭐ {repo.stargazers_count}</span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">{repo.description || "No description provided."}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-sky-500 border border-slate-700 uppercase tracking-tighter">{repo.language || "Config"}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="org-repos" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-xl font-bold text-white tracking-tight">Organization Projects</h2>
            <div className="h-px flex-1 bg-slate-800" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orgRepos.length > 0 ? (
              orgRepos.slice(0, 6).map((repo) => (
                <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer" className="glass-card group flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-bold text-lg text-white group-hover:text-sky-400 transition-colors">{repo.name}</h3>
                      <span className="text-xs font-mono text-slate-500">⭐ {repo.stargazers_count}</span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed mb-6">{repo.description || "No description provided."}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-sky-500 border border-slate-700 uppercase tracking-tighter">{repo.language || "Config"}</span>
                  </div>
                </a>
              ))
            ) : (
              <p className="text-slate-500 text-sm italic col-span-full">No organization projects found.</p>
            )}
          </div>
        </section>

        <section id="posts" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-xl font-bold text-white tracking-tight">Latest Logs</h2>
            <div className="h-px flex-1 bg-slate-800" />
          </div>
          <div className="space-y-1 font-mono">
            {posts.map((post) => (
              <a key={post.slug} href={`/posts/${post.slug}`} className="group flex items-start gap-4 p-3 rounded hover:bg-slate-800/50 transition-all border-l-2 border-transparent hover:border-sky-500">
                <span className="text-slate-500 shrink-0 text-xs mt-1">[{post.date.replace(/-/g, "/")}]</span>
                <span className="text-sky-500 shrink-0 text-xs mt-1">INFO</span>
                <div className="flex-1">
                  <span className="text-slate-200 group-hover:text-white transition-colors">{post.title}</span>
                  <span className="ml-2 opacity-0 group-hover:opacity-100 text-sky-500 text-xs transition-opacity">--read-more</span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}