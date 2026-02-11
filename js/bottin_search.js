document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("bottinSearch");
  const groupFilters = document.querySelectorAll(".group-filter");
  const bottinItems = document.querySelectorAll(".bottin_container > div");

  function filterBottin() {
    const searchText = searchInput.value.toLowerCase().trim();
    const activeGroups = Array.from(groupFilters)
      .filter((cb) => cb.checked)
      .map((cb) => cb.value);

    bottinItems.forEach((item) => {
      const itemGroup = item.getAttribute("data-group");
      const content = item.innerText.toLowerCase();

      const matchesGroup = activeGroups.includes(itemGroup);

      const matchesSearch = content.includes(searchText);

      if (matchesGroup && matchesSearch) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  }

  searchInput.addEventListener("input", filterBottin);
  groupFilters.forEach((cb) => cb.addEventListener("change", filterBottin));
});
