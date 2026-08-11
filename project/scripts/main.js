/* ===========================================================
   main.js
   Shared behavior for every page: mobile nav toggle, footer year,
   and the ChessHub favorites helper used by openings.js / tips.js.
   =========================================================== */

const FAVORITES_KEY = "chessHubFavorites";

/**
 * Small shared namespace so multiple pages/scripts can read and write
 * the same localStorage-backed favorites list without repeating code.
 */
const ChessHub = {
  getFavorites() {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (!stored) {
      return [];
    }
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.warn(`Could not parse saved favorites: ${error.message}`);
      return [];
    }
  },

  saveFavorites(list) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(list));
  },

  isFavorite(id) {
    const favorites = this.getFavorites();
    return favorites.some((item) => item.id === id);
  },

  toggleFavorite(item) {
    const favorites = this.getFavorites();
    const alreadySaved = favorites.some((fav) => fav.id === item.id);

    let updated;
    if (alreadySaved) {
      updated = favorites.filter((fav) => fav.id !== item.id);
    } else {
      updated = [...favorites, item];
    }

    this.saveFavorites(updated);
    return !alreadySaved;
  },

  removeFavorite(id) {
    const favorites = this.getFavorites().filter((fav) => fav.id !== id);
    this.saveFavorites(favorites);
    return favorites;
  },
};

function initNavToggle() {
  const toggleButton = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");

  if (!toggleButton || !nav) {
    return;
  }

  toggleButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggleButton.setAttribute("aria-expanded", `${isOpen}`);
    toggleButton.textContent = isOpen ? "Close menu ✕" : "Menu ☰";
  });
}

function setFooterYear() {
  const yearSpan = document.querySelector("#year");
  if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = `${currentYear}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initNavToggle();
  setFooterYear();
});
