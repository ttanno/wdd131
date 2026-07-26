// ---------- Temple Data ----------
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "St. George Utah",
    location: "St. George, Utah, United States",
    dedicated: "1877, April, 6",
    area: 94000,
    imageUrl: "images/templos/st-george-utah-temple.webp"
  },
  {
    templeName: "São Paulo Brazil",
    location: "São Paulo, Brazil",
    dedicated: "2004, June, 6",
    area: 51839,
    imageUrl: "images/templos/sao-paulo-brazil-temple.webp"
  },
  {
    templeName: "Nauvoo Illinois",
    location: "Nauvoo, Illinois, United States",
    dedicated: "2002, June, 27",
    area: 54000,
    imageUrl: "images/templos/nauvoo-illinois-temple.webp"
  }
];

// ---------- Card Rendering ----------
const gallery = document.querySelector("#gallery");

function renderTemples(templeArray) {
  gallery.innerHTML = "";

  for (const temple of templeArray) {
    const card = document.createElement("figure");
    card.classList.add("temple-card");

    card.innerHTML = `
      <img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy" width="400" height="250">
      <figcaption class="temple-card-info">
        <h2>${temple.templeName}</h2>
        <p>Location: ${temple.location}</p>
        <p>Dedicated: ${temple.dedicated}</p>
        <p>Area: ${temple.area.toLocaleString()} sq ft</p>
      </figcaption>
    `;

    gallery.appendChild(card);
  }
}

// ---------- Filtering ----------
function getDedicatedYear(temple) {
  return parseInt(temple.dedicated.split(",")[0], 10);
}

function filterTemples(filter) {
  switch (filter) {
    case "old":
      return temples.filter((temple) => getDedicatedYear(temple) < 1900);
    case "new":
      return temples.filter((temple) => getDedicatedYear(temple) > 2000);
    case "large":
      return temples.filter((temple) => temple.area > 90000);
    case "small":
      return temples.filter((temple) => temple.area < 10000);
    case "home":
    default:
      return temples;
  }
}

const navLinks = document.querySelectorAll("#primary-nav a");

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    navLinks.forEach((navLink) => navLink.classList.remove("active"));
    link.classList.add("active");

    const filter = link.dataset.filter;
    renderTemples(filterTemples(filter));

    if (primaryNav.classList.contains("open")) {
      primaryNav.classList.remove("open");
      hamburger.setAttribute("aria-expanded", false);
      hamburger.querySelector(".hamburger-icon").innerHTML = "&#9776;";
    }
  });
});

// ---------- Initial Render ----------
renderTemples(temples);

// ---------- Footer: dynamic year and last modified date ----------
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

// ---------- Responsive hamburger menu ----------
const hamburger = document.querySelector("#hamburger");
const primaryNav = document.querySelector("#primary-nav");

hamburger.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("open");
  hamburger.setAttribute("aria-expanded", isOpen);
  hamburger.querySelector(".hamburger-icon").innerHTML = isOpen ? "&times;" : "&#9776;";
});