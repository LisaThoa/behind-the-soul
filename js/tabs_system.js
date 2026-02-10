document.addEventListener("DOMContentLoaded", function () {
  const tabsContainer = document.getElementById("topic_tabs_container");
  if (!tabsContainer) return;

  const tabsList = tabsContainer.querySelector(".tabs_list");
  const tabsContent = tabsContainer.querySelector(".tabs");
  const allPosts = document.querySelectorAll(".post_row");
  if (allPosts.length === 0) return;

  const mainPost = tabsContainer.closest(".post_row");

  allPosts.forEach((post) => {
    if (post === mainPost) return;

    const postMessageDiv = post.querySelector(
      ".post_message.postbody.content > div",
    );
    if (!postMessageDiv) return;

    let tabTitle = "";

    const titleElement = postMessageDiv.querySelector(
      "h1, h2, h3, maintitle, subtitle, smalltitle",
    );

    if (titleElement) {
      tabTitle = titleElement.textContent.trim();
    } else {
      const lines = postMessageDiv.innerText
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l.length > 0);
      tabTitle = lines.length > 0 ? lines[0] : "Sans titre";
    }

    if (tabTitle.length > 25) {
      tabTitle = tabTitle.substring(0, 22) + "...";
    }

    const tabId = "tab-content-" + post.id;

    const tabButton = document.createElement("button");
    tabButton.className = "tab-trigger";
    tabButton.textContent = tabTitle;
    tabButton.dataset.target = tabId;

    const tabPane = document.createElement("div");
    tabPane.id = tabId;
    tabPane.className = "tab-pane";
    tabPane.style.display = "none";
    tabPane.appendChild(postMessageDiv);

    tabsList.appendChild(tabButton);
    tabsContent.appendChild(tabPane);

    post.style.display = "none";

    tabButton.addEventListener("click", function () {
      tabsList
        .querySelectorAll(".tab-trigger")
        .forEach((btn) => btn.classList.remove("active"));
      tabsContent
        .querySelectorAll(".tab-pane")
        .forEach((pane) => (pane.style.display = "none"));

      this.classList.add("active");
      document.getElementById(this.dataset.target).style.display = "block";
    });
  });

  const firstTab = tabsList.querySelector(".tab-trigger");
  if (firstTab) firstTab.click();
});
