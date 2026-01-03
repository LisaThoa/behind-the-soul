const SPECIAL_REMOVE = [
  ".post_profile",
  ".btn-quote",
  ".post_character_name",
  ".target-avatar",
  ".target-pseudo",
  ".target-pronoms",
  ".target-messages",
  ".target-inscription",
  ".target-username",
  ".blog_profile",
];

const NORMAL_REMOVE = [".target-internet-id"];

document.addEventListener("DOMContentLoaded", runCleaner);
document.addEventListener("fa.pagination.complete", runCleaner);

function runCleaner() {
  let selectorsToRemove = isSpecialForum() ? SPECIAL_REMOVE : NORMAL_REMOVE;
  cleanSpecialForum(selectorsToRemove);
}

function isSpecialForum() {
  return [...document.querySelectorAll('a.nav[href^="/f"]')].some((a) => {
    const match = a.getAttribute("href").match(/^\/f(\d+)(?:-|$)/);
    return match && SPECIAL_FORUMS.includes(match[1]);
  });
}

function cleanSpecialForum(selectorsToRemove) {
  selectorsToRemove.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => el.remove());
  });
}
