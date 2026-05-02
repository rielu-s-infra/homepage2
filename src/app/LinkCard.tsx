'use client';

import Image from "next/image";

type LinkCardProps = {
  url: string;
  title?: string;
  description?: string;
  image?: string;
};

export default function LinkCard({ url, title, description, image }: LinkCardProps) {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="block my-6 no-underline! glass-card hover:bg-slate-800/80 transition-all border-l-4 border-l-sky-500"
    >
      <div className="flex flex-col md:flex-row gap-4 items-start">
        {image && (
          <div className="w-full md:w-40 aspect-video relative rounded-lg overflow-hidden shrink-0">
            <Image
              src={image}
              alt=""
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="flex-1 min-w-0 py-1 text-left">
          <div className="text-white font-bold text-lg leading-tight truncate mb-2">
            {title || url}
          </div>
          {description && (
            <div className="text-slate-400 text-sm line-clamp-2 mb-2">{description}</div>
          )}
          <div className="text-sky-500 text-xs font-mono truncate">{new URL(url).hostname}</div>
        </div>
      </div>
    </a>
  );
}