import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const HASH_SCROLL_RETRY_DELAY_MS = 120;
const HASH_SCROLL_MAX_RETRIES = 8;

function scrollToHash(hash: string, attempt = 0) {
  const targetId = decodeURIComponent(hash.replace(/^#/, ""));
  const target = document.getElementById(targetId);

  if (target) {
    const header = document.querySelector("header");
    const headerOffset = header instanceof HTMLElement ? header.offsetHeight + 16 : 96;
    const top = window.scrollY + target.getBoundingClientRect().top - headerOffset;

    window.scrollTo({
      top: Math.max(top, 0),
      behavior: "smooth",
    });
    return;
  }

  if (attempt >= HASH_SCROLL_MAX_RETRIES) {
    return;
  }

  window.setTimeout(() => {
    scrollToHash(hash, attempt + 1);
  }, HASH_SCROLL_RETRY_DELAY_MS);
}

export function ScrollToRouteTarget() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      scrollToHash(location.hash);
      return;
    }

    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.hash, location.pathname]);

  return null;
}
