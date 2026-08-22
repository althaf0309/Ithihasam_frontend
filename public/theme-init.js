// Applies the saved theme before first paint.
//
// Without this the document starts on the hardcoded `dark` class in index.html
// and a light-mode user sees a dark flash on every page load. Kept as an
// external file (not inline) so the Content-Security-Policy can stay at
// script-src 'self' with no hash or nonce to maintain.
(function () {
  try {
    var saved = localStorage.getItem("theme");
    if (saved === "light") {
      document.documentElement.classList.remove("dark");
    } else if (saved === "dark") {
      document.documentElement.classList.add("dark");
    }
  } catch (error) {
    /* Private mode or blocked storage: keep the markup default. */
  }
})();
