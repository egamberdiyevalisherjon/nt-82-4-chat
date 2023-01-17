import users from "../data/users.js";

const form = document.querySelector("#login-form");
const nameSelect = document.querySelector("#name-select");

let userId = localStorage.getItem("userId");

if (userId) location.replace("./chat-list.html");

users.forEach((user) => {
  let option = document.createElement("option");
  option.setAttribute("value", user.id);
  option.innerText = user.name;

  nameSelect.append(option);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let id = e.target[0].value;
  let password = e.target[1].value;

  const user = users.find((u) => u.id + "" === id + "");

  if (!user) {
    alert("Tori odammi talla!");
    return;
  }

  if (user.password !== password) {
    alert("Noto'g'ri parol");
    e.target.reset();
    return;
  }

  localStorage.userId = id;
  window.location.replace("./chat-list.html");
});
