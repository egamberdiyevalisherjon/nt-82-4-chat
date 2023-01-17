import users from "../data/users.js";

const chatList = document.querySelector("#chat-list");

let userId = localStorage.userId;

if (!userId) window.location.replace("./login.html");

users.forEach((u) => {
  if (u.id + "" !== userId + "") {
    let template = `
    <li class="list-group-item">
      <a href="./chat.html#${u.id}" class="text-decoration-none text-reset">
        <img
          src="${u.image}"
          alt=""
          style="
            width: 50px;
            height: 50px;
            border-radius: 50%;
            object-fit: cover;
          "
        />

        <span class="d-inline-block ms-2"> ${u.name} </span>
      </a>
    </li>
    `;

    chatList.innerHTML += template;
  }
});
