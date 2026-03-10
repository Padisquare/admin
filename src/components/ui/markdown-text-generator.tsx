"use client";

import { cn } from "@/lib/utils";
import { memo } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export const MarkdownTextGenerator = memo(
  ({ words, className }: { words: string; className?: string }) => {
    // Check if content has multiple paragraphs or line breaks
    const hasMultipleParagraphs = words.split("\n\n").length > 1;
    const hasLineBreaks = words.includes("\n");

    return (
      <div className={cn("prose dark:prose-invert max-w-none", className)}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            p: ({ children }) => (
              <p
                className={cn(
                  "last:mb-0", // Remove margin from last paragraph
                  hasMultipleParagraphs || hasLineBreaks ? "mb-2" : "mb-0"
                )}
              >
                {children}
              </p>
            ),
            strong: ({ children }) => (
              <strong className="font-bold">{children}</strong>
            ),
            em: ({ children }) => <em className="font-italic">{children}</em>,
            li: ({ children }) => (
              <li className="mb-1 ml-6 list-disc">{children}</li>
            ),
            h2: ({ children }) => (
              <h2 className="mt-6 text-xl font-bold">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="mt-4 text-lg font-semibold">{children}</h3>
            ),
            a: ({ href, children, ...props }) => (
              <a
                href={href}
                className="text-brand-main underline hover:text-brand-main/80"
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              >
                {children}
              </a>
            ),
          }}
        >
          {words}
        </ReactMarkdown>
      </div>
    );
  }
);

MarkdownTextGenerator.displayName = "MarkdownTextGenerator";
