import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { goToPage } from "../index.js";
import { likeed } from "./add-like.js";
import {
  checking,
  innerdellButton,
  postTimeFormat,
} from "./time-and-checks.js";
import { dellPostButton } from "./dell-post.js";

export function renderAddPostPageUser({ appEl, token, posts, user }) {
  const apiPosts = posts
    .map((post) => {
      const postImgEl = post.imageUrl;
      const badImg =
        "https://storage.yandexcloud.net/skypro-webdev-homework-bucket/1716610061122-error.jpg";
      const imgForPost = postImgEl.includes("skypro-webdev-homework-bucket")
        ? postImgEl
        : badImg;

      const likeStatusButton =
        post.isLiked === true
          ? "./assets/images/like-active.svg"
          : "./assets/images/like-not-active.svg";

      return `<li class="post">
        <div class="post-header" data-user-id="${post.id}"></div>
        <div class="post-image-container">
        <img class="post-image" src="${imgForPost}">
        </div>
        <div class="post-likes">
        <button data-post-id="${post.id}" data-like-Status="${post.isLiked}" class="like-button">
            <img src="${likeStatusButton}">
        </button>
        <p class="post-likes-text">
            Нравится: <strong>${post.likes.length}</strong>
        </p>
        </div>
        <p class="post-text">
        <span class="user-name"> ${checking(post.user.name)}</span>
        ${checking(post.description)}
        </p>

        <div class="post-futer">
        <p class="post-date"> ${postTimeFormat(post)} </p>
        <div class="dell-button-element post-date">${innerdellButton({ user, post })}</div>
        </div>

        </li>`;
    })
    .join("");

  const userNameForHeader = (posts) => {
    for (let i = 0; i < posts.length; i++) {
      const element = posts[i];
      return element.user.imageUrl;
    }
  };

  const imgUrlForHeader = (posts) => {
    for (let i = 0; i < posts.length; i++) {
      const element = posts[i];
      return element.user.name;
    }
  };

  const appHtml = `

      <div class="page-container">
        <div class="header-container"></div>
        <div class="center">

        <div class="posts-user-header">
            <img src="${userNameForHeader(posts)}" class="posts-user-header__user-image">
            <h2 class="post-header__user-name">${imgUrlForHeader(posts)}</h2>
            </div>    

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
