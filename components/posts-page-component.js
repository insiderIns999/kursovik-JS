import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../main.js";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

//let posts = [];

export function renderPostsPageComponent({ appEl, toggleLike: toggleLike }) {
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */

  // user id 642d00329b190443860c2f31
  // data post id 642d00579b190443860c2f32

  // image url https://www.imgonline.com.ua/examples/bee-on-daisy.jpg

  const postsHtml = posts
    .map((post) => {
      return `
    <li class="post">
      <div class="post-header" data-user-id="${post.user.id}">
          <img src="${post.user.imageUrl}" class="post-header__user-image">
          <p class="post-header__user-name">${post.user.name}</p>
      </div>
      <div class="post-image-container">
        <img class="post-image" src="${post.imageUrl}">
      </div>
      <div class="post-likes">
        <button data-post-id="${post.id}" class="like-button">
          <img src="./assets/images/like-active.svg">
        </button>
        <p class="post-likes-text">
          Нравится: <strong>${post.user.name}</strong>
        </p>
      </div>
      <p class="post-text">
        <span class="user-name">${post.user.name}</span>
        ${post.description}.
      </p>
      <p class="post-date">
        дата добавления: ${formatDistanceToNow(post.createdAt, {locale: ru, addSuffix: 'назад'})}
      </p>
    </li>
    `;
    })
    .join("");

    //${format(new Date(post.createdAt))}

  const appHtml = `
  <div class="page-container">
    <div class="header-container"></div>
    <ul class="posts">${postsHtml}</ul>
  </div>
  `;
  appEl.innerHTML = appHtml;

    for (let likeEl of document.querySelectorAll('.like-button')) {
      likeEl.addEventListener('click', () => {
        //добавить проверку авторизован или нет юзер
        // если нет, то return alert('Вы не авторизовались')
        toggleLike(likeEl.dataset.postId)
      })
    }

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
