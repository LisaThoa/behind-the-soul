const PROFILE_FORM = document.querySelector("#ucp");

const LABELS_TO_REMOVE = [
  /genre/i,
  /date de naissance/i,
  /facebook/i,
  /twitter/i,
  /skype/i,
];

function removeFields() {
  if (PROFILE_FORM) {
    PROFILE_FORM.querySelectorAll("dl").forEach((dl) => {
      const span = dl.querySelector("dt span") ?? dl.querySelector("dt");
      if (!span) return;

      const label = span.textContent.trim();

      if (LABELS_TO_REMOVE.some((rx) => rx.test(label))) {
        dl.remove();
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", removeFields);
document.addEventListener("fa.pagination.complete", removeFields);
