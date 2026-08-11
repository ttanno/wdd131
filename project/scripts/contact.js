/* ===========================================================
   contact.js
   Handles the contact form: client-side validation feedback,
   a personalized "welcome back" banner, and a saved-name memory
   in localStorage.
   =========================================================== */

const CONTACT_NAME_KEY = "chessHubContactName";

const topicLabels = {
  openings: "an opening question",
  tactics: "a tactic or tip question",
  suggestion: "a topic suggestion",
  other: "a general question",
};

function describeTopic(topicValue) {
  if (Object.prototype.hasOwnProperty.call(topicLabels, topicValue)) {
    return topicLabels[topicValue];
  }
  return "your message";
}

function showFormStatus(element, message, type) {
  element.textContent = `${message}`;
  element.classList.remove("success", "error");
  element.classList.add(type, "is-visible");
}

function initWelcomeBanner() {
  const banner = document.querySelector("#welcome-banner");
  if (!banner) {
    return;
  }

  const savedName = localStorage.getItem(CONTACT_NAME_KEY);
  if (savedName) {
    banner.textContent = `Welcome back, ${savedName}! Thanks for reaching out to the Chess Strategy & Learning Hub before.`;
    banner.classList.add("is-visible");
  }
}

function handleContactSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const nameField = form.querySelector("#name");
  const emailField = form.querySelector("#email");
  const topicField = form.querySelector("#topic");
  const messageField = form.querySelector("#message");
  const statusBox = form.querySelector("#form-status");

  const name = nameField.value.trim();
  const email = emailField.value.trim();
  const topic = topicField.value;
  const message = messageField.value.trim();

  if (!name || !email || !topic || !message) {
    showFormStatus(
      statusBox,
      "Please fill in your name, email, topic, and message before submitting.",
      "error"
    );
    return;
  }

  const topicDescription = describeTopic(topic);
  localStorage.setItem(CONTACT_NAME_KEY, name);

  showFormStatus(
    statusBox,
    `Thanks, ${name}! Your message about ${topicDescription} has been received. We'll reply to ${email} soon.`,
    "success"
  );

  form.reset();
  initWelcomeBanner();
}

function initContactForm() {
  const form = document.querySelector("#contact-form");
  if (!form) {
    return;
  }
  form.addEventListener("submit", handleContactSubmit);
}

document.addEventListener("DOMContentLoaded", () => {
  initWelcomeBanner();
  initContactForm();
});
