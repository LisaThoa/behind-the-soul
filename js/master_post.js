const REMOVE = [
  ".post_userprofile",
  ".post_userinfo",
  "h4",
  ".post_contact",
  ".under_avatar",
  ".target-faceclaim",
  ".post_pseudo",
];

document.addEventListener("DOMContentLoaded", transformPost);
document.addEventListener("fa.pagination.complete", transformPost);

function transformPost() {
  let posts = document.querySelectorAll('div[data-rank*="master"]');
  posts.forEach((post) => {
    transformAvatar(post);
    removeElements(post);
  });
}

function removeElements(parent) {
  REMOVE.forEach((selector) =>
    parent.querySelectorAll(selector).forEach((el) => el.remove())
  );
  parent.querySelector(".post_profile").style.visibility = "hidden";
}

function transformAvatar(parent) {
  parent.querySelector(".post_details").style.justifyContent = "space-around";
  let avatar = parent.querySelector(".post_avatar");
  avatar.classList.add("master_avatar");
  parent.querySelector(".post_details").prepend(avatar);
}
