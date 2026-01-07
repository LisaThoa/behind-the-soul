document.addEventListener("DOMContentLoaded", () => {
  if (!isSpecialForum()) return;
  document.querySelectorAll(".forum").forEach((forum) => {
    forum
      .querySelectorAll(".forum_avatar img[alt='avatar']")
      .forEach((el) => el.remove());
    forum
      .querySelectorAll(".forum_avatar .gensmall")
      .forEach((el) => el.remove());
  });
  document.querySelectorAll(".topicslist_row").forEach((row) => {
    row.querySelectorAll(".lastpostavatar").forEach((el) => el.remove());
    row.querySelectorAll(".lastpost").forEach((el) => el.remove());
    row.querySelectorAll(".topic-author").forEach((el) => el.remove());
  });
});

function isSpecialForum() {
  return [...document.querySelectorAll('a.nav[href^="/f"]')].some((a) => {
    const match = a.getAttribute("href").match(/^\/f(\d+)(?:-|$)/);
    return match && SPECIAL_FORUMS.includes(match[1]);
  });
}
