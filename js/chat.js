import users from "../data/users.js";

let chats = JSON.parse(localStorage.chats || "[]");

let userId = localStorage.userId;

if (!userId) {
  window.location.replace("./login.html");
}

let friendId = window.location.hash.slice(1);

if (!friendId) {
  window.location.replace("./chat-list.html");
}

let chat = chats.find((chat) => {
  if (
    chat.members.includes(userId + "") &&
    chat.members.includes(friendId + "")
  ) {
    return true;
  }

  return false;
});

if (!chat) {
  chats.push({
    members: [userId, friendId],
    messages: [],
  });

  localStorage.chats = JSON.stringify(chats);
}

const form = document.querySelector("#new-message-from");
const friendWrapper = document.querySelector("#friend-wrapper");
const messagesWrapper = document.querySelector("#chat .container");

const friend = users.find((u) => u.id + "" === friendId);

friendWrapper.innerHTML = `
<img
  class="profile-img"
  src="${friend.image}"
  alt=""
/>
<div class="d-flex flex-column">
  <span class="username h2 m-0">${friend.name}</span>
  <span class="status">${
    friend.status === "online" ? "online" : `last seen ${friend.status}`
  }</span>
</div>
`;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const messageText = e.target[0].value;

  if (!messageText) return;

  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();
  let template = `
    <div class="message from-me text-bg-primary">
      ${messageText}
      <span class="time">${hour}:${minute}</span>
    </div>
        `;
  messagesWrapper.innerHTML += template;

  e.target.reset();
});
