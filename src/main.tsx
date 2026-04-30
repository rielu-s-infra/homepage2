// src/main.tsx
import { Buffer } from "buffer";
import React, { useEffect, useState } from "react";
import HomePage from "./app/page";
import PostPage from "./app/posts/[slug]/page";

window.Buffer = Buffer;

import ReactDOM from "react-dom/client";
import "./index.css"; // 必ず他のコンポーネントより後にインポート

declare global {
  interface Window {
    Buffer: typeof Buffer; // Use typeof Buffer for type safety
  }
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // URLの変更を検知する
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  // ルーティングロジック
  if (currentPath.startsWith("/posts/")) {
    const slug = currentPath.split("/").pop() || "";
    return <PostPage params={Promise.resolve({ slug })} />;
  }

  return <HomePage />;
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Failed to find the root element");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);