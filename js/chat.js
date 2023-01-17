import users from "../data/users.js";

const form = document.querySelector("#new-message-from");
const friendWrapper = document.querySelector("#friend-wrapper");
const messagesWrapper = document.querySelector("#chat .container");
const logoutBtn = document.querySelector("#logout-btn");
const chatListBtn = document.querySelector("#chat-list-btn");

let chats = JSON.parse(localStorage.chats || "[]");

let userId = localStorage.userId;

if (!userId) {
  window.location.replace("./login.html");
}

let friendId = window.location.hash.slice(1);

if (!friendId) {
  window.location.replace("./chat-list.html");
}

let chatIndex;

let chat = chats.find((chat, index) => {
  if (
    chat.members.includes(userId + "") &&
    chat.members.includes(friendId + "")
  ) {
    chatIndex = index;
    return true;
  }

  return false;
});

if (!chat) {
  chat = {
    members: [userId, friendId],
    messages: [],
  };

  chatIndex = chats.length;
  chats.push(chat);

  localStorage.chats = JSON.stringify(chats);
} else {
  chat.messages.forEach((message) => {
    let template = `<div class="message ${
      message.fromId === userId
        ? "from-me text-bg-primary"
        : "for-me text-bg-light"
    }">
          ${message.text}
          <span class="time">${message.date}</span>
        </div>`;

    messagesWrapper.innerHTML += template;
  });
}

const friend = users.find((u) => u.id + "" === friendId);

friendWrapper.innerHTML = `
<a href="../images/chat-bg-pattern.jpg" download="${friend.name}.${
  friend.image.split(".")[friend.image.split(".").length - 1]
}">
  <img
    class="profile-img"
    src="${friend.image}"
    alt=""
  />
</a>
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
  const hour = (date.getHours() + "").padStart(2, "0");
  const minute = (date.getMinutes() + "").padStart(2, "0");

  let template = `
    <div class="message from-me text-bg-primary">
      ${messageText}
      <span class="time">${hour}:${minute}</span>
    </div>
        `;

  messagesWrapper.innerHTML += template;

  let message = {
    text: messageText,
    fromId: userId,
    date: `${hour}:${minute}`,
  };

  chat.messages.push(message);

  chats[chatIndex] = chat;

  localStorage.chats = JSON.stringify(chats);

  e.target.reset();
});

logoutBtn.addEventListener("click", () => {
  if (confirm("Are you sure to logout?")) {
    localStorage.removeItem("userId");
    location.replace("./login.html");
  }
});

chatListBtn.addEventListener("click", () => {
  location.replace("./chat-list.html");
});
