/* ===========================================================
   tips.js
   Renders the tactic cards, filters them by difficulty, manages
   the shared favorites list (via ChessHub from main.js), and
   renders the "Your saved favorites" panel.
   =========================================================== */

const tacticsData = [
  {
    id: "fork",
    name: "Fork",
    difficulty: "beginner",
    icon: "images/icon-fork.svg",
    alt: "Icon showing a knight attacking two pieces at once",
    description:
      "A fork is a single move that attacks two or more enemy pieces at the same time, most often with a knight. The opponent can usually only save one piece, so a well-placed fork wins material.",
  },
  {
    id: "pin",
    name: "Pin",
    difficulty: "beginner",
    icon: "images/icon-pin.svg",
    alt: "Icon showing a bishop pinning a king in front of a rook",
    description:
      "A pin restricts an enemy piece from moving because doing so would expose a more valuable piece behind it, such as the king. A pinned piece is a weak piece: it usually cannot move without breaking the rules or losing material.",
  },
  {
    id: "skewer",
    name: "Skewer",
    difficulty: "intermediate",
    icon: "images/icon-skewer.svg",
    alt: "Icon showing a rook attacking through a king to a queen",
    description:
      "A skewer is the reverse of a pin: a valuable piece is attacked and forced to move, exposing a less valuable piece directly behind it, which is then captured.",
  },
  {
    id: "discovered-attack",
    name: "Discovered Attack",
    difficulty: "intermediate",
    icon: "images/icon-discovered.svg",
    alt: "Icon showing a knight moving aside to reveal a rook's attack",
    description:
      "A discovered attack happens when a piece moves out of the way and reveals an attack from another piece behind it. The moving piece can even deliver a threat of its own at the same time, which is called a discovered check when it targets the king.",
  },
  {
    id: "back-rank-mate",
    name: "Back Rank Mate",
    difficulty: "advanced",
    icon: "images/icon-backrank.svg",
    alt: "Icon showing a rook delivering checkmate along the back rank",
    description:
      "A back rank mate occurs when a king is trapped on its home row by its own pawns and gets checkmated by a rook or queen sliding along that row. Keeping an escape square open for the king (a technique called 'luft') helps avoid this pattern.",
  },
];

function buildDifficultyBadge(difficulty) {
  const label = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  return `<span class="badge badge-${difficulty}">${label}</span>`;
}

function buildTacticCard(tactic) {
  const saved = ChessHub.isFavorite(tactic.id);
  const favoriteLabel = saved ? "★ Saved" : "☆ Save tip";
  const savedClass = saved ? " is-saved" : "";

  return `
    <article class="tactic-card" data-id="${tactic.id}">
      <img src="${tactic.icon}" alt="${tactic.alt}" width="56" height="56" loading="lazy">
      ${buildDifficultyBadge(tactic.difficulty)}
      <h3>${tactic.name}</h3>
      <p>${tactic.description}</p>
      <div class="card-actions">
        <button
          type="button"
          class="favorite-btn${savedClass}"
          data-id="${tactic.id}"
          data-name="${tactic.name}"
          data-href="tips.html#${tactic.id}"
          aria-pressed="${saved}"
        >${favoriteLabel}</button>
      </div>
    </article>
  `;
}

function renderTactics(list) {
  const grid = document.querySelector("#tactic-grid");
  if (!grid) {
    return;
  }

  if (list.length === 0) {
    grid.innerHTML = `<p class="empty-state">No tactics match that difficulty yet. Try a different filter.</p>`;
    return;
  }

  const cardsHtml = list.map((tactic) => buildTacticCard(tactic)).join("");
  grid.innerHTML = `${cardsHtml}`;
}

function filterTactics(level) {
  const filtered =
    level === "all"
      ? tacticsData
      : tacticsData.filter((tactic) => tactic.difficulty === level);

  renderTactics(filtered);
}

function initFilterButtons() {
  const filterButtons = document.querySelectorAll(".filter-btn");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("is-active"));
      button.classList.add("is-active");
      filterTactics(button.dataset.level);
    });
  });
}

function renderFavoritesPanel() {
  const list = document.querySelector("#favorites-list");
  const emptyMessage = document.querySelector("#favorites-empty");
  if (!list || !emptyMessage) {
    return;
  }

  const favorites = ChessHub.getFavorites();

  if (favorites.length === 0) {
    list.innerHTML = "";
    emptyMessage.style.display = "block";
    return;
  }

  emptyMessage.style.display = "none";
  list.innerHTML = favorites
    .map((item) => {
      const typeLabel = item.type === "opening" ? "Opening" : "Tactic";
      return `
        <li>
          <span><a href="${item.href}">${item.name}</a> <span class="badge badge-beginner">${typeLabel}</span></span>
          <button type="button" class="remove-fav" data-id="${item.id}" aria-label="Remove ${item.name} from favorites">✕</button>
        </li>
      `;
    })
    .join("");
}

function handleGridClick(event) {
  const button = event.target.closest(".favorite-btn");
  if (!button) {
    return;
  }

  const item = {
    id: button.dataset.id,
    type: "tactic",
    name: button.dataset.name,
    href: button.dataset.href,
  };

  const nowSaved = ChessHub.toggleFavorite(item);
  button.classList.toggle("is-saved", nowSaved);
  button.setAttribute("aria-pressed", `${nowSaved}`);
  button.textContent = nowSaved ? "★ Saved" : "☆ Save tip";
  renderFavoritesPanel();
}

function handleFavoritesListClick(event) {
  const removeButton = event.target.closest(".remove-fav");
  if (!removeButton) {
    return;
  }

  ChessHub.removeFavorite(removeButton.dataset.id);
  renderFavoritesPanel();

  const activeFilterButton = document.querySelector(".filter-btn.is-active");
  const level = activeFilterButton ? activeFilterButton.dataset.level : "all";
  filterTactics(level);
}

document.addEventListener("DOMContentLoaded", () => {
  renderTactics(tacticsData);
  initFilterButtons();
  renderFavoritesPanel();

  const grid = document.querySelector("#tactic-grid");
  if (grid) {
    grid.addEventListener("click", handleGridClick);
  }

  const favoritesList = document.querySelector("#favorites-list");
  if (favoritesList) {
    favoritesList.addEventListener("click", handleFavoritesListClick);
  }
});
