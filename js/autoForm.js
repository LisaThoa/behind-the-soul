document.addEventListener("submit", (e) => {
  if (e.target.classList.contains("auto-form")) {
    e.preventDefault();
    fillFields(e.target);
  }
});

function fillFields(form) {
  let targetContainer = document.getElementById(
    form.dataset.resultId,
  )?.children;
  let targets = [];
  for (const target of targetContainer) {
    targets[target.id] = target;
  }

  let elements = form.children;
  let submitButton = null;
  for (let element of elements) {
    if (element.type === "submit") {
      submitButton = element;
    }
    if (element.nodeName === "LABEL") {
      let children = element.children;
      for (const child of children) {
        if (child.ønodeName === "INPUT") element = child;
      }
    }
    if (
      (element.nodeName === "INPUT" || element.nodeName === "TEXTAREA") &&
      element.type !== "submit"
    ) {
      let targetField = targets[element.name];
      fillField(targetField, element);
    }
  }
  let htmlCode = document.getElementById(form.dataset.resultId);
  navigator.clipboard.writeText(htmlCode.outerHTML).then(() => {
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
