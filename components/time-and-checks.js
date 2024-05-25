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

// Вставка кнопки удалить пост
export const innerdellButton = ({ user, post }) => {
  // Если данных юзера нет вставляем пустое поле
  if (user === null) {
    return "";
  }
  // Если данные юзера есть и его логин совпадает с логином автора поставставляем кнопку "Удалить пост"
  else if (user.login === post.user.login) {
    const dillButton = `<button  data-post-id="${post.id}" class="dell-button"> Удалить пост </button>`;
    return dillButton;
  }
  // Если пользователь не автор, вставляем пустое поле
  else {
    return "";
  }
};
