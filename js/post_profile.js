!(function () {
  main = (_) => {
    removeDefaultProfileFields();
    manageProfileFields();
  };
  document.addEventListener("DOMContentLoaded", main);
})();

const SETTINGS_PROFILE = {
  semicolon: false,
  selectorField: ".user_field",
  selectorPost: ".post",

  moveFromTo: [
    {
      target: ".target-pseudo",
      fields: ["pseudo"],
    },
    {
      target: ".target-pronoms",
      fields: ["pronoms-irl"],
    },
    {
      target: ".target-messages",
      fields: ["messages"],
    },
    {
      target: ".target-inscription",
      fields: ["date-d-inscription"],
    },
  ],
};

function findTarget(slug) {
  let target;
  SETTINGS_PROFILE.moveFromTo.forEach((i) => {
    if (i.fields.includes(slug)) target = i.target;
  });
  return target;
}

function removeDefaultProfileFields() {
  const form = document.querySelector("form#ucp");
  if (!form) return;

  form.querySelectorAll("dl").forEach((dl) => {
    if (dl.querySelector('input[type="radio"], select')) {
      dl.remove();
    }
  });
}

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function manageProfileFields() {
  document.querySelectorAll(SETTINGS_PROFILE.selectorField).forEach((champ) => {
    const label = champ.querySelector(".label");
    const name = label.textContent.replace(/ *: *$/, "");
    const slug = slugify(name);

    champ.classList.add("field-" + slug);
    label.textContent = SETTINGS_PROFILE.semicolon ? name + ": " : name;

    let movingSomewhere = findTarget(slug);
    if (movingSomewhere) {
      label.textContent = "";
      champ
        .closest(SETTINGS_PROFILE.selectorPost)
        .querySelector(movingSomewhere)
        ?.appendChild(champ);
    }
  });
}
