/* =========================================================
   Portfolio behaviour
   - Mobile navigation
   - Light / dark theme with localStorage
   - Live project search
   No API keys and no chatbot in this version.
   ========================================================= */

(function () {
  const html = document.documentElement;
  const nav = document.getElementById("primary-nav");
  const navToggle = document.querySelector(".nav-toggle");
  const themeToggle = document.querySelector(".theme-toggle");
  const themeIcon = document.querySelector(".theme-toggle-icon");
  const themeText = document.querySelector(".theme-toggle-text");
  const searchInput = document.getElementById("project-search");
  const projectCards = document.querySelectorAll(".project-card");
  const noResults = document.getElementById("no-projects");
  const THEME_KEY = "portfolio-theme";

  function setTheme(theme) {
    html.setAttribute("data-theme", theme);

    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (error) {
      // Storage can fail in private browsing. The theme still applies for this visit.
    }

    if (!themeToggle) {
      return;
    }

    const isDark = theme === "dark";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
    if (themeIcon) {
      themeIcon.textContent = isDark ? "🌙" : "☀️";
    }
    if (themeText) {
      themeText.textContent = isDark ? "Dark" : "Light";
    }
  }

  // Restore the last chosen theme, or use dark navy as the default.
  let savedTheme = "dark";
  try {
    savedTheme = localStorage.getItem(THEME_KEY);
  } catch (error) {
    savedTheme = "dark";
  }
  setTheme(savedTheme === "light" ? "light" : "dark");

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const nextTheme =
        html.getAttribute("data-theme") === "dark" ? "light" : "dark";
      setTheme(nextTheme);
    });
  }

  function closeNav() {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation menu");
  }

  function openNav() {
    nav.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close navigation menu");
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      if (nav.classList.contains("is-open")) {
        closeNav();
      } else {
        openNav();
      }
    });

    // Close the mobile menu after a navigation link is chosen.
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });
  }

  function filterProjects(query) {
    const term = query.trim().toLowerCase();
    let visibleCount = 0;

    projectCards.forEach(function (card) {
      const haystack = (
        card.dataset.search +
        " " +
        card.textContent
      ).toLowerCase();
      const isMatch = term === "" || haystack.indexOf(term) !== -1;
      card.hidden = !isMatch;
      if (isMatch) {
        visibleCount += 1;
      }
    });

    noResults.hidden = visibleCount !== 0;
  }

  if (searchInput) {
    searchInput.addEventListener("input", function (event) {
      filterProjects(event.target.value);
    });
  }
})();
