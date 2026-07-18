"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/hooks/useTheme";
import {
  GISCUS_REPO,
  GISCUS_REPO_ID,
  GISCUS_CATEGORY,
  GISCUS_CATEGORY_ID,
} from "@/lib/constants";

export default function GiscusComments() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolved } = useTheme();

  useEffect(() => {
    if (!containerRef.current) return;
    if (!GISCUS_REPO || !GISCUS_REPO_ID || !GISCUS_CATEGORY || !GISCUS_CATEGORY_ID) {
      return;
    }

    const container = containerRef.current;
    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", GISCUS_REPO);
    script.setAttribute("data-repo-id", GISCUS_REPO_ID);
    script.setAttribute("data-category", GISCUS_CATEGORY);
    script.setAttribute("data-category-id", GISCUS_CATEGORY_ID);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", resolved === "dark" ? "dark_dimmed" : "light");
    script.setAttribute("data-lang", "en");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [resolved]);

  if (!GISCUS_REPO) {
    return (
      <div className="mt-12 border-t border-neutral-200 dark:border-neutral-800 pt-8">
        <p className="text-sm text-neutral-400 text-center">
          Comments are not configured. Set Giscus environment variables to enable.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-12 border-t border-neutral-200 dark:border-neutral-800 pt-8">
      <div ref={containerRef} />
    </div>
  );
}
