// Populate select options from the shared product array (see products.js).
// The product id is used for the option value, the name for the display text.
const productSelect = document.getElementById("product");

products.forEach((product) => {
  const option = document.createElement("option");
  option.value = product.id;
  option.textContent = product.name;
  productSelect.appendChild(option);
});

document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent =
  "Last Modification: " + document.lastModified;