import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { goToPage } from "../index.js";
import { likeed } from "./add-like.js";
import { innerdellButton, postTimeFormat } from "./time-and-checks.js";
import { dellPostButton } from "./dell-post.js";

export function renderPostsPageComponent({ appEl, token, posts, user }) {
  const apiPosts = posts
    .map((post) => {
      const postImgEl = post.imageUrl;

      const badImg =
        "https://img.freepik.com/free-vector/hand-drawn-flat-design-no-photo-sign_23-2149278078.jpg?t=st=1715845218~exp=1715848818~hmac=b10acb9e6acfd9acbcc146563626f08da88ee022c7ba544b7ba9dee2eef8bf57&w=740";
      const imgForPost = postImgEl.includes("skypro-webdev-homework-bucket")
        ? postImgEl
        : badImg;

      const likeStatusButton =
        post.isLiked === true
          ? "./assets/images/like-active.svg"
          : "./assets/images/like-not-active.svg";

      return `<li class="post">
  <div class="post-header" data-user-id="${post.user.id}">
    <img src="${post.user.imageUrl}" class="post-header__user-image">
    <p class="post-header__user-name">${post.user.name}</p>
  </div>
  <div class="post-image-container">
  <img class="post-image" src="${imgForPost}">
  </div>
  <div class="post-likes">
  <button data-post-id="${post.id}" data-like-Status="${post.isLiked}" class="like-button">
    <img src="${likeStatusButton}" class="isLiked">
  </button>
  <p class="post-likes-text">
    Нравится: <strong>${post.likes.length}</strong>
  </p>
  </div>
  <p class="post-text">
  <span class="user-name">${post.user.name}</span>
  ${post.description}
  </p>
  
  <div class="post-futer">
  <p class="post-date"> ${postTimeFormat(post)} </p>
  <div class="dell-button-element post-date">${innerdellButton({ user, post })}</div>
  </div>
  
  </li>`;
    })
    .join("");

  const appHtml = `

      <div class="page-container">
        <div class="header-container"></div>
        <div class="center">
        <ul  class="posts">${apiPosts}</ul>
        </div>
      </div>

  `;

  appEl.innerHTML = appHtml;

  likeed({ appEl, token, user });

  dellPostButton({ token, appEl, user });

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
}
