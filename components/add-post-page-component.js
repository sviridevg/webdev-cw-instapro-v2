
import { checking } from "./add-checks.js";
import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
    let imageUrl = "";
    // TODO: Реализовать страницу добавления поста
    const formAddPost = `
    <div class="form add-post-page-form">
      <h1 class="center">Добавить пост</h1>
      <div class="upload-image-container"></div>

      <label>
        Опишите фотографию:
        <textarea id="description" class="input textarea" rows="4"></textarea>
      </label>

      <button class="button" id="add-button">Добавить</button>
    </div>
  `;

    const appHtml = `

  <div class="page-container">
  <div class="header-container"></div>
  <div class="center">${formAddPost}</div>
`;

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });

    const uploadImageContainer = document.querySelector(
      ".upload-image-container"
    );

    if (uploadImageContainer) {
      renderUploadImageComponent({
        element: document.querySelector(".upload-image-container"),
        onImageUrlChange(newImageUrl) {
          imageUrl = newImageUrl;
        },
      });
    }

    document.getElementById("add-button").addEventListener("click", () => {
      const descriptionElement = document.getElementById("description");

      onAddPostClick({
        description: checking(`${descriptionElement.value}`),
        imageUrl: `${imageUrl}`,
      });
    });
  };

  render();
}
