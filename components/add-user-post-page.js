import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { goToPage } from "../index.js";
import { likeed } from "./add-like.js";


export function renderAddPostPageUser({ appEl, token, posts }) {
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
        <span class="user-name"> ${post.user.name}</span>
        ${post.description}
        </p>
        <p class="post-date">
        ${post.createdAt}
        </p>
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

  likeed({ appEl, token });

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
