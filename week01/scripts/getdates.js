// Display the current year in the footer copyright notice
document.getElementById("currentyear").textContent = new Date().getFullYear();

// Display the date the document was last modified
document.getElementById("lastModified").textContent =
    "Last Modification: " + document.lastModified;