document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".forum").forEach((forum) => {
    const titleLink = forum.querySelector(".forumtitle");
    if (!titleLink) return;

    const match = titleLink.getAttribute("href")?.match(/^\/f(\d+)(?:-|$)/);

    if (match && SPECIAL_FORUMS.includes(match[1])) {
      forum.querySelectorAll(".forum_avatar").forEach((el) => el.remove());
    }
  });
});
