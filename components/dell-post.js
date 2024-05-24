import { dellPost, getPosts } from "../api.js";
import { POSTS_PAGE } from "../routes.js";
import { goToPage } from "../index.js";

export const dellPostButton = ({ token }) => {
  for (let dellEl of document.querySelectorAll(".dell-button")) {
    dellEl.addEventListener("click", () => {
      const idPost = dellEl.dataset.postId;
      dellPost({ token, idPost }).then((data) => {
        if (data.status === 200) {
          getPosts({ token }).then((data) => {
            alert("Ваш пост удален");
            return goToPage(POSTS_PAGE);
          });
        }
      });
    });
  }
};
