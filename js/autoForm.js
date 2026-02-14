document.addEventListener("submit", (e) => {
  if (e.target.classList.contains("auto-form")) {
    e.preventDefault();
    fillFields(e.target);
  }
});

function fillFields(form) {
  let resultContainer = document.getElementById(form.dataset.resultId);
  if (!resultContainer) return;

  let targetElements = resultContainer.children;
  let targets = [];
  for (const target of targetElements) {
    targets[target.id] = target;
  }

  let elements = form.elements;
  let submitButton = null;

  for (let element of elements) {
    if (element.type === "submit") {
      submitButton = element;
      continue;
    }

    if (element.name && targets[element.name]) {
      fillField(targets[element.name], element);
    }
  }

  navigator.clipboard.writeText(resultContainer.outerHTML).then(() => {
    if (submitButton) {
      const originalText = submitButton.value;
      submitButton.value = "Copied !";
      submitButton.disabled = true;

      setTimeout(() => {
        submitButton.value = originalText;
        submitButton.disabled = false;
      }, 2000);
    }
  });
}

function fillField(targetField, element) {
  if (element.type === "checkbox") {
    if (element.checked) {
      fillDefault(targetField, element.value);
    } else {
      fillDefault(targetField, "");
    }
    return;
  }
  if (element.type === "radio") {
    if (element.checked) {
      fillDefault(targetField, element.value);
    }
    return;
  }
  fillDefault(targetField, element.value);
}

function fillDefault(targetField, value) {
  targetField.replaceChildren(value);
}
