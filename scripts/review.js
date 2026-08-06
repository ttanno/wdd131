const params = new URLSearchParams(window.location.search);

function labelFor(key) {
  const labels = {
    product: "Product",
    rating: "Overall Rating",
    installDate: "Date of Installation",
    feature: "Useful Features",
    review: "Written Review",
    username: "Submitted By",
  };
  return labels[key] || key;
}

function formatValue(key) {
  if (key === "product") {
    const product = products.find((p) => p.id === Number(params.get("product")));
    return product ? product.name : params.get("product");
  }
  if (key === "rating") {
    return "&star;".repeat(Number(params.get("rating"))) + ` (${params.get("rating")}/5)`;
  }
  if (key === "feature") {
    const features = params.getAll("feature");
    return features.length ? features.join(", ") : "None selected";
  }
  if (key === "username") {
    return params.get("username") || "Anonymous";
  }
  return params.get(key) || "N/A";
}

const summary = document.getElementById("summary");
const fields = ["product", "rating", "installDate", "feature", "review", "username"];

fields.forEach((key) => {
  if (key === "review" && !params.get("review")) return;

  const dt = document.createElement("dt");
  dt.textContent = labelFor(key);

  const dd = document.createElement("dd");
  dd.innerHTML = formatValue(key);

  summary.appendChild(dt);
  summary.appendChild(dd);
});

// Track and display the running count of submitted reviews.
const reviewCount = Number(localStorage.getItem("reviewCount") || 0) + 1;
localStorage.setItem("reviewCount", reviewCount);
document.getElementById("counter").textContent =
  `You are reviewer #${reviewCount}. Thanks for sharing your feedback!`;

document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent =
  "Last Modification: " + document.lastModified;
