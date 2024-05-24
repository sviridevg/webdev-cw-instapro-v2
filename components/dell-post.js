import { dellPost, getPosts, userPosts } from "../api.js";
import { POSTS_PAGE, USER_POSTS_PAGE } from "../routes.js";
import { goToPage, page } from "../index.js";

export const dellPostButton = ({ token, appEl, user }) => {
  for (let dellEl of document.querySelectorAll(".dell-button")) {
    dellEl.addEventListener("click", () => {
      const idPost = dellEl.dataset.postId;
      const idUser = user._id;
      dellPost({ token, idPost });
      if (page === POSTS_PAGE) {
        getPosts({ token }).then((data) => {
          alert("Ваш пост удален");
          const posts = data;
          // renderPostsPageComponent({ appEl, token, posts, user });
          return goToPage(POSTS_PAGE);
        });
      }
      if (page === USER_POSTS_PAGE) {
        userPosts({ token, idUser }).then((data) => {
          alert("Ваш пост удален");
          return goToPage(POSTS_PAGE);
        });
      }
    });
  }
};
