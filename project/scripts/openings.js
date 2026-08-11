/* ===========================================================
   openings.js
   Wires up the "Save to favorites" buttons on the Openings page.
   Depends on the ChessHub helper defined in main.js.
   =========================================================== */

function updateFavoriteButton(button, isSaved) {
  button.classList.toggle("is-saved", isSaved);
  button.setAttribute("aria-pressed", `${isSaved}`);
  const label = isSaved ? "★ Saved" : "☆ Save opening";
  button.textContent = `${label}`;
}

function refreshOpeningButtonStates() {
  const buttons = document.querySelectorAll(".favorite-btn[data-id]");
  buttons.forEach((button) => {
    const id = button.dataset.id;
    const saved = ChessHub.isFavorite(id);
    updateFavoriteButton(button, saved);
  });
}

function handleFavoriteClick(event) {
  const button = event.currentTarget;
  const item = {
    id: button.dataset.id,
    type: "opening",
    name: button.dataset.name,
    href: button.dataset.href,
  };

  const nowSaved = ChessHub.toggleFavorite(item);
  updateFavoriteButton(button, nowSaved);
}

function initOpeningFavorites() {
  const buttons = document.querySelectorAll(".favorite-btn[data-id]");
  if (buttons.length === 0) {
    return;
  }

  buttons.forEach((button) => {
    button.addEventListener("click", handleFavoriteClick);
  });

  refreshOpeningButtonStates();
}

document.addEventListener("DOMContentLoaded", initOpeningFavorites);
