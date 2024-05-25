import { getPosts, setLike, userPosts } from "../api.js";
import { page } from "../index.js";
import { POSTS_PAGE, USER_POSTS_PAGE } from "../routes.js";
import { renderAddPostPageUser } from "./add-user-post-page.js";
import { renderPostsPageComponent } from "./posts-page-component.js";

export function likeed({ appEl, token, user }) {
  for (let likeEl of document.querySelectorAll(".like-button")) {
    likeEl.addEventListener("click", () => {
      const idPost = likeEl.dataset.postId;
      const likeStatus = likeEl.dataset.likeStatus;

      setLike({ token, idPost, likeStatus }).then((responsedata) => {
        if (token === undefined) {
          alert("Авторизуйтесь чтобы поставить лайк");
        }

        const idUser = responsedata.post.user.id;
        if (page === POSTS_PAGE) {
          getPosts({ token }).then((data) => {
            const posts = data;
            renderPostsPageComponent({ appEl, token, posts, user });
          });
        }
        if (page === USER_POSTS_PAGE) {
          userPosts({ token, idUser }).then((data) => {
            const posts = data;
            renderAddPostPageUser({ appEl, token, posts, user });
          });
        }
      });
    });
  }
}
