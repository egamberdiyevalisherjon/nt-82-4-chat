let userId = localStorage.getItem("userId");

if (userId) location.replace("./pages/chat-list.html");
else location.replace("./pages/login.html");
