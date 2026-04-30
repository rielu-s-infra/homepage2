import { Buffer } from "buffer";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import HomePage from "./app/page";
import PostPage from "./app/posts/[slug]/page";
import "./index.css";

window.Buffer = Buffer;

declare global {
  interface Window {
    Buffer: typeof Buffer;
  }
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  // ルーティング: /posts/ から始まる場合
  if (currentPath.startsWith("/posts/")) {
    // 末尾のスラッシュを除去してから最後の要素（slug）を取得
    const slug = currentPath.replace(/\/$/, "").split("/").pop() || "";
    return <PostPage slug={slug} />;
  }

  return <HomePage />;
}

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}