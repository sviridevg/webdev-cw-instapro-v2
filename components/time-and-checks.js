import { ru } from "date-fns/locale";
import { formatDistanceToNow } from "date-fns";

// форматирование даты
export const postTimeFormat = (post) =>
  formatDistanceToNow(new Date(post.createdAt), {
    locale: ru,
    addSuffix: true,
  });

// Замена не допустимых символов
export const checking = (text) => {
  return text.replaceAll("<", "&lt").replaceAll(">", "&gt");
};

export const innerdellButton = ({ user, post }) => {
  if (user === null) {
    return "";
  }  if (user.login === post.user.login) {
    const dillButton = `<button  data-post-id="${post.id}" class="dell-button"> Удалить пост </button>`;
    return dillButton;
  } else {
    return "";
  }
};
